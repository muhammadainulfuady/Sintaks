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
        Schema::create('module_prerequisites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('module_id');
            $table->unsignedBigInteger('prerequisite_module_id');

            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->foreign('prerequisite_module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->index('module_id');
            $table->index('prerequisite_module_id');
            $table->unique(['module_id', 'prerequisite_module_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('module_prerequisites');
    }
};
