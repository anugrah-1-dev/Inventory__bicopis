<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOut extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'shift',
        'shop_id',
        'total_price'
    ];
    public function detail()
    {
        return $this->hasMany(ProductOutDetail::class);
    }
}
