<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Notifications\Notifiable;
use App\Models\UserMeta;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable {
    use HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'address_one',
        'address_two',
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

    protected function isAdmin(): Attribute {
        return new Attribute(
            get: fn () => $this->type == 'admin'
        );
    }

    protected function address(): Attribute {
        return new Attribute(
            get: fn () => $this->address_one . "\n" . $this->address_two
        );
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['address'];

    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
