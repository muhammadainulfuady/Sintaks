<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin Sintaks',
                'username' => 'admin_sintaks',
                'email' => 'admin@sintaks.id',
                'role' => 'admin',
                'avatar' => 'avatar_admin',
                'total_xp' => 1000,
            ],
            [
                'name' => 'Ainul Fuady',
                'username' => 'ainulfuady',
                'email' => 'ainul@example.com',
                'role' => 'user',
                'avatar' => 'avatar_01',
                'total_xp' => 150,
            ],
            [
                'name' => 'Budi Coder',
                'username' => 'budi_coder',
                'email' => 'budi@example.com',
                'role' => 'user',
                'avatar' => 'avatar_02',
                'total_xp' => 80,
            ],
        ];

        foreach ($users as $attributes) {
            User::updateOrCreate(
                ['email' => $attributes['email']],
                [...$attributes, 'password' => Hash::make('password123')]
            );
        }
    }
}
