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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('module_id');
            $table->string('title', 200);
            $table->string('slug', 220);
            $table->unsignedInteger('order')->default(0);
            $table->longText('explanation')->nullable();
            $table->text('code_example')->nullable();
            $table->text('output_example')->nullable();
            $table->json('key_points')->nullable();
            $table->text('tips')->nullable();
            $table->text('common_mistakes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->index('module_id');
            $table->index(['module_id', 'order']);
            $table->unique(['module_id', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
