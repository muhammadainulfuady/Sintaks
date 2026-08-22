<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'title',
        'description',
        'passing_score',
        'is_active',
    ];

    protected $casts = [
        'passing_score' => 'integer',
        'is_active' => 'boolean',
    ];

    // Relasi: Quiz milik 1 Module
    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    // Relasi: Quiz memiliki banyak Soal (QuizQuestion)
    public function questions()
    {
        return $this->hasMany(QuizQuestion::class)->orderBy('order');
    }

    // Relasi: Quiz memiliki banyak Percobaan (QuizAttempt)
    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class);
    }
}
