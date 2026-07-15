<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DailyStockController extends Controller
{
    public function index(Request $request)
    {
        $dept = $request->query('dept', 'kitchen');
        $date = $request->query('date', date('Y-m-d'));
        $shop_id = Auth::user()->shop_id;

        $products = Product::where('shop_id', $shop_id)
            ->where('department', $dept)
            ->orderBy('name')
            ->get();

        $stats = DB::table('product_out_details')
            ->join('product_outs', 'product_outs.id', '=', 'product_out_details.product_out_id')
            ->where('product_outs.date', $date)
            ->where('product_outs.shop_id', $shop_id)
            ->select('product_out_details.product_id', 'product_outs.shift', DB::raw('SUM(product_out_details.quantity) as qty'))
            ->groupBy('product_out_details.product_id', 'product_outs.shift')
            ->get();

        $shift_data = [];
        foreach($stats as $stat) {
            $shift_data[$stat->product_id][$stat->shift] = $stat->qty;
        }

        $daily_stocks = [];
        foreach ($products as $product) {
            $shift_1 = $shift_data[$product->id]['1'] ?? 0;
            $shift_2 = $shift_data[$product->id]['2'] ?? 0;
            $total = $shift_1 + $shift_2;

            $daily_stocks[] = [
                'id' => $product->id,
                'name' => $product->name,
                'unit' => $product->unit,
                'price' => $product->price,
                'shift_1' => $shift_1,
                'shift_2' => $shift_2,
                'total' => $total,
                'stock' => $product->stock
            ];
        }

        return Inertia::render('DailyStock/Index', [
            'stocks' => $daily_stocks,
            'query' => compact('dept', 'date')
        ]);
    }
}
