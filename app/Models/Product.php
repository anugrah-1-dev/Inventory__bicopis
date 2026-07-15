<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'code',
        'unit',
        'category',
        'department',
        'shop_id',
    ];

    protected $hidden = [
        'shop_id',
    ];
}
