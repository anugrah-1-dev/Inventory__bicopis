<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distributor extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'phone',
        'address',
        'shop_id'
    ];
    protected $hidden = [
        'shop_id'
    ];
}
