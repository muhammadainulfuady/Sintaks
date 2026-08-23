<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Sintaks Learning Platform
|--------------------------------------------------------------------------
*/

// Authentication & Profile Routes (Issue #1)
Route::prefix('auth')->group(function (): void {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('/profile', [ProfileController::class, 'getProfile']);
    Route::put('/profile', [ProfileController::class, 'updateProfile']);
    Route::get('/profile/{username}', [ProfileController::class, 'getPublicProfile']);
});

// Quiz & Code Sandbox Routes (Issue #2)
Route::get('/modules/{slug}/quiz', [QuizController::class, 'show']);
Route::post('/quizzes/{id}/attempts', [QuizController::class, 'startAttempt']);
Route::get('/quizzes/{id}/attempts/{attemptId}', [QuizController::class, 'getAttemptDetail']);
Route::post('/quizzes/{quizId}/attempts/{attemptId}/answers', [QuizController::class, 'submitAnswer']);
Route::post('/code/run', [QuizController::class, 'runCode']);

// Community Routes (Issue #2)
Route::get('/communities', [CommunityController::class, 'index']);
Route::post('/communities', [CommunityController::class, 'store']);
Route::get('/communities/{id}', [CommunityController::class, 'show']);
Route::post('/communities/{id}/join', [CommunityController::class, 'join']);
Route::post('/communities/{id}/leave', [CommunityController::class, 'leave']);
Route::get('/communities/{id}/members', [CommunityController::class, 'getMembers']);
Route::get('/communities/{id}/messages', [CommunityController::class, 'getMessages']);
Route::post('/communities/{id}/messages', [CommunityController::class, 'postMessage']);
