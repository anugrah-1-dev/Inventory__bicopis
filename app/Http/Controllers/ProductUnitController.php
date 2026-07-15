<?php

namespace App\Http\Controllers;

use App\Models\ProductUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProductUnitController extends Controller
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
        $units = ProductUnit::query()
            ->where('shop_id', '=', $shop_id);

        if ($search) {
            $units->where('name', 'like', '%'.$search.'%');
        }

        if (preg_match('/^U\d{3,}$/', $search)) {
            $units->where('id', 'like', (int)substr($search, 1), 'or');
        }

        if (in_array($column, ['id', 'name']) && $sort && in_array($sort, ['asc', 'desc'])) {
            $units->orderBy($column, $sort);
        }

        return Inertia::render('ProductUnit/Index', [
            'units' => $units->paginate(10),
            'query' => [
                'search' => $search,
                'col' => $column,
                'sort' => $sort
            ]
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'shop_id' => 'required|integer',
        ]);

        ProductUnit::create($request->all());

        return redirect()->route('product-units.get')->with('success', 'Data berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!preg_match('/^C\d+$/', $id)) return abort(404); // Pastikan format ID diawali "U"
        $product_unit_id = (int)substr($id, 1); // Ambil angka setelah "U"
        $shop_id = Auth::user()->shop_id;
    
        $productUnit = ProductUnit::query()
            ->where('id', '=', $product_unit_id)
            ->where('shop_id', '=', $shop_id)
            ->first();
    
        return Inertia::render('ProductUnit/Detail', [
            'productUnit' => $productUnit,
        ]);
    }    


    public function create()
    {
        $shop_id = Auth::user()->shop_id;

        return Inertia::render('ProductUnit/New', [
            'shop_id' => $shop_id
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (!preg_match('/^C\d+$/', $id)) return abort(404);
        $product_unit_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        $request->validate([
            'name' => ['required', 'string', 'unique:product_units,name,NULL,id,shop_id,'.$shop_id.'id,id,'.$id],
            'shop_id' => ['required', 'integer']
        ],[
            'name.required' => 'Nama satuan wajib diisi',
            'name.string' => 'Nama satuan wajib berupa teks',
            'name.unique' => 'Nama satuan sudah ada',
            'shop_id.required' => 'Shop ID wajib diisi',
            'shop_id.integer' => 'Shop ID harus berupa angka'
        ]);

        ProductUnit::query()
            ->where('id', '=', $product_unit_id)
            ->where('shop_id', '=', $shop_id)
            ->update([
                'name' => $request->name,
                'shop_id' => $request->shop_id
            ]);

        return redirect()->route('product-units.get')->with('success', 'Berhasil mengubah data satuan barang');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!preg_match('/^C\d+$/', $id)) {
            abort(404);
        }

        $productUnit_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        ProductUnit::where('id', $productUnit_id)
            ->where('shop_id', $shop_id)
            ->delete();

        return redirect()->route('product-units.get')->with('success', 'Data berhasil dihapus!');
    }

}
