<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductOut;
use App\Models\ProductOutDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductOutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request()->query('search');
        $column = request()->query('col');
        $sort = request()->query('sort');
        $dept = request()->query('dept', 'kitchen');

        $shop_id = Auth::user()->shop_id;
        $productOuts = ProductOut::query()
            ->where('shop_id', '=', $shop_id)
            ->whereHas('detail.product', function ($query) use ($dept) {
                $query->where('department', $dept);
            });

        if(preg_match('/^BK\d{3,}$/', $search)) $productOuts->where('id', 'like', (int)substr($search, 1));
        if(in_array($sort, ['asc', 'desc'])) $productOuts->orderBy($column, $sort);

        return Inertia::render('ProductOut/Index', [
            'productOuts' => $productOuts->paginate(10),
            'query' => [
                'search' => $search,
                'col' => $column,
                'sort' => $sort,
                'dept' => $dept
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $product = request()->query('product');
        $dept = request()->query('dept', 'kitchen');

        $shop_id = Auth::user()->shop_id;
        $products = Product::query()
            ->select('id', 'name', 'stock', 'price')
            ->where('shop_id', $shop_id)
            ->where('department', $dept);

        if ($products) $products->where('name', 'like', '%'.$product.'%');

        return Inertia::render('ProductOut/New', [
            'products' => $products->take(5)->get(),
            'dept' => $dept
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $shop_id = Auth::user()->shop_id;
        $request->validate([
            'date' => ['required', 'date'],
            'shift' => ['nullable', 'in:1,2'],
            'products.*.id' => ['numeric', 'min:1'],
            'products.*.quantity' => ['numeric', 'min:1'],
        ],[
            'date.required' => 'Tanggal wajib diisi',
            'shift.in' => 'Shift tidak valid',
            'product.*.id.min' => 'Barang wajib diisi',
            'product.*.quantity.min' => 'Jumlah barang minimal 1',
        ]);

        $shop_id = Auth::user()->shop_id;
        $date = $request->date;
        $shift = $request->shift;
        $products = $request->products;

        DB::beginTransaction();

        $product_out = ProductOut::create([
            'date' => $date,
            'shift' => $shift,
            'shop_id' => $shop_id,
            'total_price' => 0
        ]);

        $total_price = 0;

        try {
            foreach ($products as $product) {
                $prod = Product::find($product['id']);
                ProductOutDetail::create([
                    'product_out_id' => $product_out->id,
                    'product_id' => $product['id'],
                    'price' => $prod->price,
                    'quantity' => $product['quantity'],
                    'total_price' => $prod->price * $product['quantity']
                ]);
                if ($prod->stock < $product['quantity']) {
                    throw new Exception('Stok barang "'.$prod->name.'" tidak cukup');
                }
                $total_price += $prod->price * $product['quantity'];
                $prod->stock -= $product['quantity'];
                $prod->save();
            }
    
            $product_out->total_price = $total_price;
            $product_out->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            session()->flash('error', $e->getMessage());
            return redirect()->back();
        }

        $dept = 'kitchen';
        if (count($products) > 0) {
            $first_prod = Product::find($products[0]['id']);
            if ($first_prod) $dept = $first_prod->department;
        }

        return redirect('/product-out?dept='.$dept)->with(['success' => 'Berhasil menambah data barang keluar']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!preg_match('/^BK\d{3,}$/', $id)) return abort(404);
        $product_out_id = (int)substr($id, 2);
        $shop_id = Auth::user()->shop_id;

        $product_out = ProductOut::with(['detail'])
            ->where('id', '=', $product_out_id)
            ->where('shop_id', '=', $shop_id)
            ->first();

        if(!$product_out) return abort(404);

        $products = [];

        foreach ($product_out->detail as $detail) {
            $data = [
                'name' => $detail->product->name,
                'quantity' => $detail->quantity,
                'price' => $detail->price,
                'total_price' => $detail->total_price
            ];
            array_push($products, $data);
        }
        
        if ($product_out) {
            $product_out = [
                'id' => $product_out->id,
                'date' => $product_out->date,
                'total_price' => $product_out->total_price,
                'products' => $products,
            ];
        }
        
        return Inertia::render('ProductOut/Detail', [
            'productOut' => $product_out
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!preg_match('/^BK\d{3,}$/', $id)) return abort(404);
        $product_out_id = (int)substr($id, 2);
        $shop_id = Auth::user()->shop_id;

        $product_out = ProductOut::with(['detail'])
            ->where('id', '=', $product_out_id)
            ->where('shop_id', '=', $shop_id)
            ->first();
        
        if(!$product_out) return abort(404);

        DB::beginTransaction();
        foreach ($product_out->detail as $detail) {
            $prod = Product::find($detail->product->id);
            $prod->stock += $detail->quantity;
            $prod->save();
        }

        $product_out->delete();
        DB::commit();

        $dept = 'kitchen';
        if (isset($product_out->detail[0])) {
            $prod = Product::find($product_out->detail[0]->product_id);
            if ($prod) $dept = $prod->department;
        }

        return redirect('/product-out?dept='.$dept)->with(['success' => 'Berhasil menghapus transaksi data barang keluar']);
    }
}
