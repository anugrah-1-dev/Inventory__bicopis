<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductInDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_in_id',
        'product_id',
        'price',
        'quantity',
        'total_price'
    ];
    public function product_in()
    {
        return $this->belongsTo(ProductIn::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
