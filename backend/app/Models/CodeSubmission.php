<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeSubmission extends Model
{
    use HasFactory;

    public const UPDATED_AT = null; // Immutable setelah evaluasi selesai

    protected $fillable = [
        'user_id',
        'quiz_question_id',
        'quiz_attempt_id',
        'code',
        'language',
        'status', // 'pending', 'running', 'correct', 'wrong_answer', 'syntax_error', 'runtime_error', 'timeout', etc.
        'execution_output',
        'error_message',
        'execution_time_ms',
    ];

    protected $casts = [
        'execution_time_ms' => 'integer',
    ];

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke QuizQuestion
    public function question()
    {
        return $this->belongsTo(QuizQuestion::class, 'quiz_question_id');
    }

    // Relasi ke QuizAttempt
    public function attempt()
    {
        return $this->belongsTo(QuizAttempt::class, 'quiz_attempt_id');
    }
}
