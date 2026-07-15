<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\ProductInDetail;
use App\Models\ProductOutDetail;
use Inertia\Response;
use App\Models\ProductIn;
use App\Models\ProductOut;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $shop_id = Auth::user()->shop_id;
        $dept = $request->query('dept', 'kitchen');

        $countitem = Product::where('shop_id', $shop_id)->where('department', $dept)->sum('stock');
        
        $countin = ProductInDetail::whereHas('productIn', function ($q) use ($shop_id) {
            $q->where('shop_id', $shop_id);
        })->whereHas('product', function ($q) use ($dept) {
            $q->where('department', $dept);
        })->sum('quantity');

        $countout = ProductOutDetail::whereHas('productOut', function ($q) use ($shop_id) {
            $q->where('shop_id', $shop_id);
        })->whereHas('product', function ($q) use ($dept) {
            $q->where('department', $dept);
        })->sum('quantity');

        $currentYear = Carbon::now()->year;
        
        $data = ProductIn::select(
            DB::raw('MONTH(date) as month'), 
            DB::raw('SUM(total_price) as total_price')
        )
        ->where('shop_id', $shop_id)
        ->whereHas('detail.product', function ($q) use ($dept) {
            $q->where('department', $dept);
        })
        ->whereYear('date', $currentYear)
        ->groupBy(DB::raw('MONTH(date)'))
        ->orderBy(DB::raw('MONTH(date)'))
        ->get();

        $data2 = ProductOut::select(
            DB::raw('MONTH(date) as month'), 
            DB::raw('SUM(total_price) as total_price')
        )
        ->where('shop_id', $shop_id)
        ->whereHas('detail.product', function ($q) use ($dept) {
            $q->where('department', $dept);
        })
        ->whereYear('date', $currentYear)
        ->groupBy(DB::raw('MONTH(date)'))
        ->orderBy(DB::raw('MONTH(date)'))
        ->get();
        
        $monthlyTotals = [
            'January' => 0,
            'February' => 0,
            'March' => 0,
            'April' => 0,
            'May' => 0,
            'June' => 0,
            'July' => 0,
            'August' => 0,
            'September' => 0,
            'October' => 0,
            'November' => 0,
            'December' => 0,
        ];

        $monthlyTotals2 = [
            'January' => 0,
            'February' => 0,
            'March' => 0,
            'April' => 0,
            'May' => 0,
            'June' => 0,
            'July' => 0,
            'August' => 0,
            'September' => 0,
            'October' => 0,
            'November' => 0,
            'December' => 0,
        ];

        foreach ($data as $item) {
            $monthName = Carbon::create()->month($item->month)->format('F');
            $monthlyTotals[$monthName] = $item->total_price;
        }
        foreach ($data2 as $item2) {
            $monthName = Carbon::create()->month($item2->month)->format('F');
            $monthlyTotals2[$monthName] = $item2->total_price;
        }
        

        return Inertia::render('Dashboard/Index', [
            'currentyear' => $currentYear,
            'countitem' => $countitem,
            'countin' => $countin,
            'countout' => $countout,
            'earnings' => [$monthlyTotals['January'], $monthlyTotals['February'], $monthlyTotals['March'], $monthlyTotals['April'], $monthlyTotals['May'], $monthlyTotals['June'], $monthlyTotals['July'], $monthlyTotals['August'], $monthlyTotals['September'], $monthlyTotals['October'], $monthlyTotals['November'], $monthlyTotals['December']],
            'expenses' => [$monthlyTotals2['January'], $monthlyTotals2['February'], $monthlyTotals2['March'], $monthlyTotals2['April'], $monthlyTotals2['May'], $monthlyTotals2['June'], $monthlyTotals2['July'], $monthlyTotals2['August'], $monthlyTotals2['September'], $monthlyTotals2['October'], $monthlyTotals2['November'], $monthlyTotals2['December']],
            'dept' => $dept
        ]);
    }
}
