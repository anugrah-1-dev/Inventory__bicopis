<?php

namespace App\Http\Controllers;

use App\Models\Distributor;
use App\Models\Product;
use App\Models\ProductIn;
use App\Models\ProductInDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductInController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request()->query('search');
        $column = request()->query('col');
        $sort = request()->query('sort');

        $shop_id = Auth::user()->shop_id;
        $productIns = ProductIn::query()
            ->join('distributors as d', 'd.id', '=', 'product_ins.distributor_id')
            ->where('product_ins.shop_id', '=', $shop_id);

        if(preg_match('/^BM\d{3,}$/', $search)) $productIns->where('product_ins.id', 'like', (int)substr($search, 2));
        if(in_array($sort, ['asc', 'desc'])) $productIns->orderBy('product_ins.'.$column, $sort);
        $productIns->select('product_ins.id', 'product_ins.date', 'd.name as distributor', 'product_ins.total_price');

        return Inertia::render('ProductIn/Index', [
            'productIns' => $productIns->paginate(10),
            'query' => [
                'search' => $search,
                'col' => $column,
                'sort' => $sort
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $product = request()->query('product');
        $distributor = request()->query('distributor');

        $shop_id = Auth::user()->shop_id;
        $products = Product::query()
            ->select('id', 'name', 'stock')
            ->where('shop_id', $shop_id);
        $distributors = Distributor::query()
            ->select('id', 'name')
            ->where('shop_id', $shop_id);

        if ($products) $products->where('name', 'like', '%'.$product.'%');
        if ($distributors) $distributors->where('name', 'like', '%'.$distributor.'%');

        return Inertia::render('ProductIn/New', [
            'products' => $products->take(5)->get(),
            'distributors' => $distributors->take(5)->get(),
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
            'distributor.id' => ['numeric', 'min:1'],
            'products.*.id' => ['numeric', 'min:1'],
            'products.*.quantity' => ['numeric', 'min:1'],
            'products.*.price' => ['numeric', 'min:0'],
        ],[
            'date.required' => 'Tanggal wajib diisi',
            'distributor.id.numeric' => 'Distributor wajib diisi',
            'product.*.id.min' => 'Barang wajib diisi',
            'product.*.quantity.min' => 'Barang wajib diisi',
            'product.*.price.min' => 'Harga beli minimal 0',
        ]);

        $shop_id = Auth::user()->shop_id;
        $date = $request->date;
        $distributor_id = $request->distributor['id'];
        $products = $request->products;

        DB::beginTransaction();

        $product_in = ProductIn::create([
            'date' => $date,
            'shop_id' => $shop_id,
            'distributor_id' => $distributor_id,
            'total_price' => 0
        ]);

        $total_price = 0;

        foreach ($products as $product) {
            ProductInDetail::create([
                'product_in_id' => $product_in->id,
                'product_id' => $product['id'],
                'price' => $product['price'],
                'quantity' => $product['quantity'],
                'total_price' => $product['price'] * $product['quantity']
            ]);
            $total_price += $product['price'] * $product['quantity'];
            $prod = Product::find($product['id']);
            $prod->stock += $product['quantity'];
            $prod->save();
        }

        $product_in->total_price = $total_price;
        $product_in->save();

        DB::commit();

        return redirect('/product-in')->with(['success' => 'Berhasil menambah data barang masuk']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!preg_match('/^BM\d{3,}$/', $id)) return abort(404);
        $product_in_id = (int)substr($id, 2);
        $shop_id = Auth::user()->shop_id;

        $product_in = ProductIn::with(['detail', 'distributor'])
            ->where('id', '=', $product_in_id)
            ->where('shop_id', '=', $shop_id)
            ->first();

        $products = [];

        foreach ($product_in->detail as $detail) {
            $data = [
                'name' => $detail->product->name,
                'quantity' => $detail->quantity,
                'price' => $detail->price,
                'total_price' => $detail->total_price,
                'code' => $detail->product->code,
            ];
            array_push($products, $data);
        }
        
        if ($product_in) {
            $product_in = [
                'id' => $product_in->id,
                'date' => $product_in->date,
                'total_price' => $product_in->total_price,
                'products' => $products,
                'distributor' => $product_in->distributor->name
            ];
        }
        
        return Inertia::render('ProductIn/Detail', [
            'productIn' => $product_in
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
        if (!preg_match('/^BM\d{3,}$/', $id)) return abort(404);
        $product_in_id = (int)substr($id, 2);
        $shop_id = Auth::user()->shop_id;

        $product_in = ProductIn::with(['detail'])
            ->where('id', '=', $product_in_id)
            ->where('shop_id', '=', $shop_id)
            ->first();

        if(!$product_in) return abort(404);

        DB::beginTransaction();

        try {
            foreach ($product_in->detail as $detail) {
                $prod = Product::find($detail->product->id);
                if ($prod->stock < $detail->quantity) {
                    throw new Exception('Stok barang "'.$prod->name.'" tidak cukup');
                }
                $prod->stock -= $detail->quantity;
                $prod->save();
            }
            $product_in->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            session()->flash('error', $e->getMessage());
            return redirect()->back();
        }

        return redirect('/product-in')->with(['success' => 'Berhasil menghapus transaksi data barang masuk']);
    }
}
