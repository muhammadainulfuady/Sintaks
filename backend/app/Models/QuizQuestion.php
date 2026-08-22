<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'type', // 'theory', 'code_writing', 'code_completion'
        'order',
        'question',
        'explanation',
        'starter_code',
        'code_template',
        'language',
        'time_limit_seconds',
        'memory_limit_mb',
        'is_active',
    ];

    protected $casts = [
        'order' => 'integer',
        'time_limit_seconds' => 'integer',
        'memory_limit_mb' => 'integer',
        'is_active' => 'boolean',
    ];

    // Relasi ke Quiz
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    // Relasi ke Pilihan Jawaban (untuk Theory & Code Completion)
    public function options()
    {
        return $this->hasMany(QuizQuestionOption::class)->orderBy('order');
    }

    // Relasi ke Test Cases (untuk Code Writing & Code Completion)
    public function testCases()
    {
        return $this->hasMany(TestCase::class)->orderBy('order');
    }

    // Relasi ke Jawaban User dalam Attempt
    public function attemptAnswers()
    {
        return $this->hasMany(QuizAttemptAnswer::class);
    }

    // Relasi ke Code Submissions
    public function codeSubmissions()
    {
        return $this->hasMany(CodeSubmission::class);
    }
}
