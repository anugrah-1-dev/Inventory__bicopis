<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductIn extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'distributor_id',
        'shop_id',
        'total_price'
    ];
    public function detail()
    {
        return $this->hasMany(ProductInDetail::class);
    }
    public function distributor()
    {
        return $this->belongsTo(Distributor::class);
    }
}
