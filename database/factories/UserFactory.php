<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use Database\Seeders\StatesAndCities;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stateAndCity = StatesAndCities::getRandomStateAndCity();
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'address_one' => fake()->buildingNumber() . ' ' . fake()->streetName() . ' ' . fake()->streetSuffix(),
            'address_two' => fake()->secondaryAddress(),
            'city' => $stateAndCity['city'],
            'state' => $stateAndCity['state'],
            'zip' => substr(fake()->postcode(),0,5),
            'country' => 'United States',
            'phone_number' => $this->phone(),
            'company' => fake()->company(),
            'registration_number' => 1,
            'password' => static::$password ??= Hash::make('password'),
        ];
    }

    protected function phone() {
        $arr = [0,1,2,3,4,5,6,7,8,9];
        $n = "";
        for($c=0;$c<=10;$c++) {
            $n .= $arr[rand(0,9)];
        }
        return "(" . substr($n, 0, 3) . ") " . substr($n, 4, 3) . "-" . substr($n, 7, 10);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
