<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    
    public function up(): void {
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->integer('question_number');
            $table->string('question');
            $table->string('option_a');
            $table->string('option_b');
            $table->string('option_c');
            $table->string('option_d');
            $table->string('answer');
            $table->boolean('active')->default(true);
        });
    }

    public function down(): void {
        Schema::dropIfExists('quiz_questions');
    }
};
