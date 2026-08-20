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
        Schema::create('quiz_attempt_answers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quiz_attempt_id');
            $table->unsignedBigInteger('quiz_question_id');
            $table->text('answer_value')->nullable();
            $table->boolean('is_correct')->nullable();
            $table->timestamp('answered_at')->useCurrent();

            $table->foreign('quiz_attempt_id')->references('id')->on('quiz_attempts')->onDelete('cascade');
            $table->foreign('quiz_question_id')->references('id')->on('quiz_questions')->onDelete('cascade');
            $table->unique(['quiz_attempt_id', 'quiz_question_id']);
            $table->index('quiz_attempt_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_attempt_answers');
    }
};
