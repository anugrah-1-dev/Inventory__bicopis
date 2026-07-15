<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOutDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_out_id',
        'product_id',
        'quantity',
        'price',
        'total_price'
    ];
    public function product_out()
    {
        return $this->belongsTo(ProductOut::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
