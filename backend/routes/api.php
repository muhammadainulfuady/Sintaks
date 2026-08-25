<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LearningPathController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\NovaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\XPController;
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
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // User Profile
    Route::get('/profile', [ProfileController::class, 'getProfile']);
    Route::put('/profile', [ProfileController::class, 'updateProfile']);
    Route::get('/profile/{username}', [ProfileController::class, 'getPublicProfile']);

    // Learning Paths & Modules (Issue #3)
    Route::get('/learning-paths', [LearningPathController::class, 'index']);
    Route::get('/learning-paths/{slug}', [LearningPathController::class, 'show']);
    Route::post('/learning-paths/{slug}/enroll', [LearningPathController::class, 'enroll']);
    Route::get('/learning-paths/{slug}/modules', [LearningPathController::class, 'getModules']);

    // Modules & Lessons (Issue #3)
    Route::get('/modules/{slug}', [ModuleController::class, 'show']);
    Route::get('/modules/{slug}/lessons', [ModuleController::class, 'getLessons']);
    Route::get('/lessons/{slug}', [LessonController::class, 'show']);
    Route::post('/lessons/{slug}/complete', [LessonController::class, 'complete']);

    // Notes (Issue #3)
    Route::get('/notes', [NoteController::class, 'index']);
    Route::post('/notes', [NoteController::class, 'store']);
    Route::post('/lessons/{slug}/notes', [NoteController::class, 'storeForLesson']);
    Route::delete('/notes/{id}', [NoteController::class, 'destroy']);

    // User Progress & XP Leaderboard (Issue #3)
    Route::get('/progress', [ProgressController::class, 'getUserProgress']);
    Route::get('/progress/modules', [ProgressController::class, 'getModuleProgress']);
    Route::get('/leaderboard', [XPController::class, 'getLeaderboard']);
    Route::get('/xp', [XPController::class, 'getXpHistory']);

    // NOVA AI Assistant (Issue #3)
    Route::post('/nova/chat', [NovaController::class, 'chat']);
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
