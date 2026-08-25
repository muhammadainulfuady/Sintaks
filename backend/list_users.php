<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$users = App\Models\User::all();

echo "Total Users: " . count($users) . "\n\n";
echo str_pad("ID", 3) . " | " . str_pad("Name", 20) . " | " . str_pad("Username", 20) . " | " . str_pad("Email", 30) . " | " . str_pad("Role", 6) . " | " . str_pad("XP", 5) . "\n";
echo str_repeat("-", 110) . "\n";

foreach($users as $user) {
    echo str_pad($user->id, 3) . " | " . 
         str_pad(substr($user->name, 0, 20), 20) . " | " . 
         str_pad(substr($user->username, 0, 20), 20) . " | " . 
         str_pad(substr($user->email, 0, 30), 30) . " | " . 
         str_pad($user->role, 6) . " | " . 
         str_pad($user->total_xp, 5) . "\n";
}
