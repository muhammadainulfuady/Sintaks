<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class XPTransaction extends Model
{
    use HasFactory;

    public const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'amount',
        'source_type',
        'source_id',
        'description',
    ];

    protected $casts = [
        'amount' => 'integer',
        'source_id' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}