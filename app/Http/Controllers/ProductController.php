<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $search = request()->query('search');
        $column = request()->query('col');
        $sort = request()->query('sort');
        $shop_id = Auth::user()->shop_id;

        $products = Product::query()
            ->where('shop_id', '=', $shop_id);

        if ($search) {
            $products->where(function($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('code', 'like', '%'.$search.'%');

                if (preg_match('/^B\d{3,}$/', $search)) {
                    $query->orWhere('id', '=', (int)substr($search, 1));
                }
            });
        }

        // Tambahkan kategori ke opsi sorting
        if (in_array($column, ['id', 'name', 'stock', 'price', 'category','unit']) && in_array($sort, ['asc', 'desc'])) {
            $products->orderBy($column, $sort);
        }

        return Inertia::render('Product/Index', [
            'products' => $products->select('id', 'name', 'price', 'stock', 'category', 'unit')->paginate(10),
            'query' => compact('search', 'column', 'sort')
        ]);
    }


    public function create()
    {
        $barcode = request()->query('barcode');

        return Inertia::render('Product/New', compact('barcode'));
    }


    public function store(Request $request)
    {
        $shop_id = Auth::user()->shop_id;

        $validated = $request->validate([
            'name' => ['required', 'string', 'unique:products,name,NULL,id,shop_id,'.$shop_id],
            'price' => ['required', 'numeric', 'min:0'],
            'code' => ['string', 'nullable', 'unique:products,code,NULL,id,shop_id,'.$shop_id],
            'description' => ['string', 'nullable'],
            'stock' => ['required', 'integer', 'min:0'],
            'category' => ['required', 'string'],
            'unit' => ['required', 'string']
        ], [
            'name.required' => 'Nama barang wajib diisi',
            'name.unique' => 'Nama barang sudah ada',
            'name.string' => 'Nama barang wajib berupa teks',
            'price.required' => 'Harga wajib diisi',
            'price.numeric' => 'Harga wajib berupa angka',
            'price.min' => 'Harga minimal 0',
            'code.unique' => 'Barcode barang sudah ada',
            'stock.required' => 'Stok wajib diisi',
            'stock.integer' => 'Stok harus berupa angka',
            'stock.min' => 'Stok tidak boleh negatif',
            'category.required' => 'Kategori wajib diisi', // Tambahkan pesan error kategori
            'category.string' => 'Kategori harus berupa teks',
            'unit.required' => 'Satuan wajib diisi', 
            'unit.string' => 'Satuan harus berupa teks'
        ]);

        Product::create([
            'name' => $request->name,
            'code' => $request->code,
            'shop_id' => $shop_id,
            'price' => $request->price,
            'description' => $request->description,
            'stock' => $request->stock,
            'category' => $request->category,
            'unit' => $request->unit
        ]);

        return redirect('/products')->with('success', 'Berhasil menambah data barang');
    }

    public function show(string $id)
    {
        if (!preg_match('/^B\d{3,}$/', $id)) {
            abort(404);
        }

        $product_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        $product = Product::where('id', $product_id)
            ->where('shop_id', $shop_id)
            ->first();

        if (!$product) {
            abort(404);
        }

        return Inertia::render('Product/Detail', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'code' => $product->code,
                'stock' => $product->stock,
                'description' => $product->description,
                'category' => $product->category,
                'unit' => $product->unit
            ]
        ]);
    }

    public function barcode(Request $request)
    {
        $validated = $request->validate(['code' => ['required', 'string']]);

        $product = Product::where('code', $validated['code'])
            ->where('shop_id', Auth::user()->shop_id)
            ->first('id');

        if ($product) {
            return redirect('/products/detail/'.sprintf("B%03d", $product->id));
        }

        return redirect('/products/new?barcode='.$validated['code'])
            ->with('error', 'Barang tidak ditemukan, silahkan tambah barang');
    }

    public function update(Request $request, string $id)
    {
        if (!preg_match('/^B\d{3,}$/', $id)) {
            abort(404);
        }

        $product_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        $validated = $request->validate([
            'name' => ['required', 'string', 'unique:products,name,'.$product_id.',id,shop_id,'.$shop_id],
            'price' => ['required', 'numeric', 'min:0'],
            'code' => ['string', 'nullable', 'unique:products,code,'.$product_id.',id,shop_id,'.$shop_id],
            'description' => ['string', 'nullable'],
            'category' => ['required', 'string'],
            'unit' => ['required', 'string']
        ], [
            'name.required' => 'Nama barang wajib diisi',
            'name.string' => 'Nama barang wajib berupa teks',
            'price.required' => 'Harga wajib diisi',
            'price.numeric' => 'Harga wajib berupa angka',
            'code.unique' => 'Barcode barang sudah ada',
            'category.required' => 'Kategori wajib diisi',
            'category.string' => 'Kategori harus berupa teks',
            'unit.required' => 'Satuab wajib diisi',
            'unit.string' => 'Satuab harus berupa teks'
        ]);

        Product::where('id', $product_id)
            ->where('shop_id', $shop_id)
            ->update([
                'name' => $request->name,
                'code' => $request->code,
                'price' => $request->price,
                'description' => $request->description,
                'category' => $request->category,
                'unit' => $request->unit
            ]);

        return redirect('/products')->with('success', 'Berhasil mengubah data barang');
    }

    public function destroy(string $id)
    {
        if (!preg_match('/^B\d{3,}$/', $id)) {
            abort(404);
        }

        $product_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        Product::where('id', $product_id)
            ->where('shop_id', $shop_id)
            ->delete();

        return redirect('/products')->with('success', 'Berhasil menghapus data barang');
    }
}
