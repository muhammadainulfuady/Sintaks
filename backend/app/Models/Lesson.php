<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'title',
        'slug',
        'order',
        'explanation',
        'code_example',
        'output_example',
        'key_points',
        'tips',
        'common_mistakes',
        'is_active',
    ];

    protected $casts = [
        'key_points' => 'array',
        'order' => 'integer',
        'is_active' => 'boolean',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function references()
    {
        return $this->hasMany(LessonReference::class)->orderBy('order');
    }

    public function progress()
    {
        return $this->hasMany(LessonProgress::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
