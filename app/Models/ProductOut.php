<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOut extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'shop_id',
        'total_price'
    ];
    public function detail()
    {
        return $this->hasMany(ProductOutDetail::class);
    }
}
