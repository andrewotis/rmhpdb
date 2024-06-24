<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    
    public function up(): void {
        Schema::create('registration_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('type');     // admin or registered_mhp
            $table->string('token');
            $table->timestamp('created_at');
        });
    }

    public function down(): void {
        Schema::dropIfExists('registration_tokens');
    }
};
