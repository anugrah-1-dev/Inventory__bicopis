<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Account/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update_profile(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());
        $request->user()->save();
        return redirect('/account')->with(['success' => 'Berhasil mengubah data akun']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function update_password(Request $request)
    {
        $request->validate([
            'password' => ['required', 'min:8'],
            'current_password' => ['required', 'min:8', 'current_password'],
        ],[
            'password.required' => 'Kata sandi baru wajib diisi',
            'password.min' => 'Kata sandi baru minimal 8 karakter',
            'current_password.required' => 'Kata sandi lama wajib diisi',
            'current_password.min' => 'Kata sandi lama minimal 8 karakter',
            'current_password.current_password' => 'Kata sandi salah',
        ]);
    
        $request->user()->update([
            'password' => Hash::make($request->password)
        ]);

        return back()->with(['success' => 'Berhasil mengubah kata sandi']);
    }
}
