<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_question_id',
        'input',
        'expected_output',
        'is_hidden',
        'order',
    ];

    protected $casts = [
        'is_hidden' => 'boolean',
        'order' => 'integer',
    ];

    // Relasi ke QuizQuestion
    public function question()
    {
        return $this->belongsTo(QuizQuestion::class, 'quiz_question_id');
    }
}
