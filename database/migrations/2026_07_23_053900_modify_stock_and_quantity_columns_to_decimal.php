<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('stock', 10, 3)->default(0)->change();
        });

        Schema::table('product_in_details', function (Blueprint $table) {
            $table->decimal('quantity', 10, 3)->change();
        });

        Schema::table('product_out_details', function (Blueprint $table) {
            $table->decimal('quantity', 10, 3)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedInteger('stock')->default(0)->change();
        });

        Schema::table('product_in_details', function (Blueprint $table) {
            $table->unsignedInteger('quantity')->change();
        });

        Schema::table('product_out_details', function (Blueprint $table) {
            $table->unsignedInteger('quantity')->change();
        });
    }
};
