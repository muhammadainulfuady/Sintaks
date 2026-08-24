<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'role',
        'avatar',
        'total_xp',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'total_xp' => 'integer',
        ];
    }

    public function lessonProgress()
    {
        return $this->hasMany(LessonProgress::class);
    }

    public function moduleProgress()
    {
        return $this->hasMany(ModuleProgress::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function xpTransactions()
    {
        return $this->hasMany(XPTransaction::class);
    }

    public function learningPaths()
    {
        return $this->belongsToMany(LearningPath::class)->withPivot('enrolled_at');
    }
}
