<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'price' => fake()->numberBetween(2000, 150000),
            'stock' => fake()->numberBetween(0, 500),
            'shop_id' => 1,
            'unit_id' => 1,
            'category_id' => 1,
        ];
    }
}
