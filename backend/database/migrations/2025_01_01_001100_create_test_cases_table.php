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
        Schema::create('test_cases', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quiz_question_id');
            $table->text('input')->nullable();
            $table->text('expected_output');
            $table->boolean('is_hidden')->default(false);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();

            $table->foreign('quiz_question_id')->references('id')->on('quiz_questions')->onDelete('cascade');
            $table->index('quiz_question_id');
            $table->index(['quiz_question_id', 'is_hidden']);
            $table->index(['quiz_question_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_cases');
    }
};
