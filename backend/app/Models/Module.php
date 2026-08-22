<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'learning_path_id',
        'title',
        'slug',
        'description',
        'order',
        'is_active',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_active' => 'boolean',
    ];

    public function learningPath()
    {
        return $this->belongsTo(LearningPath::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function quiz()
    {
        return $this->hasOne(Quiz::class);
    }

    public function prerequisites()
    {
        return $this->belongsToMany(
            self::class,
            'module_prerequisites',
            'module_id',
            'prerequisite_module_id'
        );
    }

    public function dependentModules()
    {
        return $this->belongsToMany(
            self::class,
            'module_prerequisites',
            'prerequisite_module_id',
            'module_id'
        );
    }

    public function progress()
    {
        return $this->hasMany(ModuleProgress::class);
    }
}
