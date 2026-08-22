<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'name',
        'description',
    ];

    // Relasi ke Owner (User)
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    // Relasi ke Anggota (User via pivot community_members)
    public function members()
    {
        return $this->belongsToMany(User::class, 'community_members')
                    ->withPivot('role', 'joined_at');
    }

    // Relasi ke Record Keanggotaan (CommunityMember)
    public function memberRecords()
    {
        return $this->hasMany(CommunityMember::class);
    }

    // Relasi ke Pesan Diskusi
    public function messages()
    {
        return $this->hasMany(CommunityMessage::class);
    }
}
