<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityMember extends Model
{
    use HasFactory;

    public $timestamps = false; // Hanya memakai joined_at

    protected $fillable = [
        'community_id',
        'user_id',
        'role', // 'owner', 'member'
        'joined_at',
    ];

    protected $casts = [
        'joined_at' => 'datetime',
    ];

    // Relasi ke Community
    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
