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
        Schema::create('quiz_question_options', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quiz_question_id');
            $table->string('label', 10)->nullable();
            $table->text('content');
            $table->boolean('is_correct')->default(false);
            $table->unsignedInteger('order')->default(0);

            $table->foreign('quiz_question_id')->references('id')->on('quiz_questions')->onDelete('cascade');
            $table->index('quiz_question_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_question_options');
    }
};
