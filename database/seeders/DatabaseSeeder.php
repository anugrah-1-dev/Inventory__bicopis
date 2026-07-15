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
        Shop::factory(1)->create();
        User::factory(1)->create();
        ProductCategory::factory(1)->create();
        ProductUnit::factory(1)->create();
        Product::factory(51)->create();
    }
}
