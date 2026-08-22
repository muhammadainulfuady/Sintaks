<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quiz_id',
        'score',
        'total_questions',
        'correct_count',
        'wrong_count',
        'status', // 'in_progress', 'completed', 'abandoned'
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'score' => 'integer',
        'total_questions' => 'integer',
        'correct_count' => 'integer',
        'wrong_count' => 'integer',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Quiz
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    // Relasi ke Jawaban (QuizAttemptAnswer)
    public function answers()
    {
        return $this->hasMany(QuizAttemptAnswer::class);
    }

    // Relasi ke Code Submissions
    public function codeSubmissions()
    {
        return $this->hasMany(CodeSubmission::class);
    }
}
