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
                'avatar' => 'avatar_1',
                'total_xp' => 1000,
            ],
            [
                'name' => 'Ainul Fuady',
                'username' => 'ainulfuady',
                'email' => 'ainul@example.com',
                'role' => 'user',
                'avatar' => 'avatar_2',
                'total_xp' => 450,
            ],
            [
                'name' => 'Budi Coder',
                'username' => 'budi_coder',
                'email' => 'budi@example.com',
                'role' => 'user',
                'avatar' => 'avatar_3',
                'total_xp' => 320,
            ],
            [
                'name' => 'Citra Developer',
                'username' => 'citra_dev',
                'email' => 'citra@example.com',
                'role' => 'user',
                'avatar' => 'avatar_4',
                'total_xp' => 210,
            ],
            [
                'name' => 'Dewi Engineer',
                'username' => 'dewi_eng',
                'email' => 'dewi@example.com',
                'role' => 'user',
                'avatar' => 'avatar_1',
                'total_xp' => 120,
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
