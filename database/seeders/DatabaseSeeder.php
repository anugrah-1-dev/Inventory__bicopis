<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductUnit;
use App\Models\Shop;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (Shop::count() === 0) {
            Shop::factory(1)->create();
        }

        $shop = Shop::first();

        User::firstOrCreate(
            ['email' => 'admin@bicopis.com'],
            [
                'name' => 'Admin Bicopis',
                'password' => bcrypt('password'),
                'shop_id' => $shop->id ?? 1
            ]
        );

        if (ProductCategory::count() === 0) {
            ProductCategory::factory(1)->create();
        }
        
        if (ProductUnit::count() === 0) {
            ProductUnit::factory(1)->create();
        }
        // Product::factory(51)->create();
    }
}
