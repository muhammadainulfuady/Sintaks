<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonReference extends Model
{
    use HasFactory;

    // Database lama proyek tidak memiliki kolom created_at dan updated_at.
    public $timestamps = false;

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
