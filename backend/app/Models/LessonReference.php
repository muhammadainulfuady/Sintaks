<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonReference extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id',
        'title',
        'url',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
