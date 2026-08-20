<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quiz_id');
            $table->enum('type', ['theory', 'code_writing', 'code_completion']);
            $table->unsignedInteger('order')->default(0);
            $table->text('question');
            $table->text('explanation')->nullable();
            $table->text('starter_code')->nullable();
            $table->text('code_template')->nullable();
            $table->string('language', 20)->default('python');
            $table->unsignedInteger('time_limit_seconds')->nullable()->default(10);
            $table->unsignedInteger('memory_limit_mb')->nullable()->default(64);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('quiz_id')->references('id')->on('quizzes')->onDelete('cascade');
            $table->index('quiz_id');
            $table->index(['quiz_id', 'order']);
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_questions');
    }
};
