<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\UserMeta;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable {
    use HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'address',
        'address2',
        'city',
        'state',
        'zip',
        'country',
        'company',
        'phone_number',
        'email',
        'password',
        'registration_number',
    ];

    public function userMeta(): HasMany {
        return $this->hasMany(UserMeta::class);
    }

    public function privacySettings() {
        return $this->userMeta()->where('type', 'privacy_setting');
    }

    public function credentials() {
        return $this->userMeta()->where('type', 'credential');
    }

    public function categories() {
        return $this->userMeta()->where('type', 'category');
    }

    public function sectors() {
        return $this->userMeta()->where('type', 'sector');
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
