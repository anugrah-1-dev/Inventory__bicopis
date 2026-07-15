<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('Register');
    }

    public function store(Request $request) 
    {
        $request->validate([
            'name' => ['required', 'regex:/^[A-Za-z\s]+$/'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
        ],[
            'name.required' => 'Nama wajib diisi',
            'name.regex' => 'Nama wajib berupa huruf',
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Kata sandi wajib diisi',
            'password.min' => 'Kata sandi minimal 8 karakter',
        ]);

        // $shop = Shop::create();
        $shop = Shop::create([
            'name' => $request->name . "'s Shop", // atau bisa disesuaikan
        ]);
        

        User::create([
            'name' => $request->name,
            'shop_id' => $shop->id,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return redirect('/login');
    }
}
