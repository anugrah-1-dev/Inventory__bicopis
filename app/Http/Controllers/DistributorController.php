<?php

namespace App\Http\Controllers;

use App\Models\Distributor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DistributorController extends Controller
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
        $distributors = Distributor::query()
            ->where('shop_id', '=', $shop_id);

        if($search) $distributors->where('name', 'like', '%'.$search.'%');
        if(preg_match('/^D\d{3,}$/', $search)) $distributors->where('id', 'like', (int)substr($search, 1), 'or');

        if(in_array($column, ['id', 'name']) && $sort && in_array($sort, ['asc', 'desc'])) {
            $distributors->orderBy($column, $sort);
        } 
        return Inertia::render('Distributor/Index', [
            'distributors' => $distributors->paginate(10),
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
        return Inertia::render('Distributor/New');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $shop_id = Auth::user()->shop_id;

        $request->validate([
            'name' => ['required', 'string', 'unique:distributors,name,NULL,id,shop_id,'.$shop_id],
            'phone' => ['required', 'string'],
            'address' => ['required', 'string'],

        ],[
            'name.required' => 'Nama distributor wajib diisi',
            'name.string' => 'Nama distributor wajib berupa teks',
            'name.unique' => 'Nama distributor sudah ada',
            'phone.required' => 'Nomor telepon wajib diisi',
            'phone.string' => 'Nomor telepon wajib berupa teks',
            'address.required' => 'Alamat wajib diisi',
            'address.string' => 'Alamat wajib berupa teks',
        ]);

        Distributor::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'shop_id' => $shop_id
        ]);

        return redirect('/distributors')->with(['success' => 'Berhasil menambahkan data distributor']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!preg_match('/^D\d+$/', $id)) return abort(404);
        $distributor_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        $distributor = Distributor::query()
            ->where('id', '=', $distributor_id)
            ->where('shop_id', '=', $shop_id)
            ->first();
        
        return Inertia::render('Distributor/Detail', [
            'distributor' => $distributor,
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
        if (!preg_match('/^D\d+$/', $id)) return abort(404);
        $distributor_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        $request->validate([
            'name' => ['required', 'string', 'unique:distributors,name,NULL,id,shop_id,'.$shop_id.'id,id,'.$id],
            'phone' => ['required', 'string'],
            'address' => ['required', 'string']
        ],[
            'name.required' => 'Nama distributor wajib diisi',
            'name.string' => 'Nama distributor wajib berupa teks',
            'name.unique' => 'Nama distributor sudah ada',
            'phone.required' => 'Nomor telepon wajib diisi',
            'phone.string' => 'Nomor telepon wajib berupa teks',
            'address.required' => 'Alamat wajib diisi',
            'address.string' => 'Alamat wajib berupa teks',
        ]);

        Distributor::query()
            ->where('id', '=', $distributor_id)
            ->where('shop_id', '=', $shop_id)
            ->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'address' => $request->address
            ]);
        
        return redirect('/distributors')->with(['success' => 'Berhasil mengubah data distributor']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!preg_match('/^D\d+$/', $id)) return abort(404);
        $distributor_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        Distributor::query()
            ->where('id', '=', $distributor_id)
            ->where('shop_id', '=', $shop_id)
            ->delete();

        return redirect('/distributors')->with(['success' => 'Berhasil menghapus data distributor']);
    }
}
