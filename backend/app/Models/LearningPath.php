<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningPath extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'is_active',
        'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function modules()
    {
        return $this->hasMany(Module::class)->orderBy('order');
    }

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('enrolled_at');
    }
}
