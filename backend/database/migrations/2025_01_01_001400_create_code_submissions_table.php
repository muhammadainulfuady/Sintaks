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
        Schema::create('code_submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('quiz_question_id');
            $table->unsignedBigInteger('quiz_attempt_id');
            $table->text('code');
            $table->string('language', 20)->default('python');
            $table->enum('status', ['pending', 'running', 'correct', 'wrong_answer', 'syntax_error', 'runtime_error', 'timeout', 'security_violation', 'execution_error'])->default('pending')->index();
            $table->text('execution_output')->nullable();
            $table->text('error_message')->nullable();
            $table->unsignedInteger('execution_time_ms')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('quiz_question_id')->references('id')->on('quiz_questions')->onDelete('cascade');
            $table->foreign('quiz_attempt_id')->references('id')->on('quiz_attempts')->onDelete('cascade');
            $table->index('user_id');
            $table->index('quiz_question_id');
            $table->index('quiz_attempt_id');
            $table->index(['user_id', 'quiz_question_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('code_submissions');
    }
};
