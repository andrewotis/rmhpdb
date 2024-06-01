<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HazardCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'category',
    ];

    public $timestamps = false;
}
