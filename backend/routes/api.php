<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LearningPathController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\XPController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\CommunityController;

/*
|--------------------------------------------------------------------------
| API Routes — Sintaks Learning Platform
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
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

	Route::get('/learning-paths', [LearningPathController::class, 'index']);
	Route::get('/learning-paths/{slug}', [LearningPathController::class, 'show']);
	Route::post('/learning-paths/{slug}/enroll', [LearningPathController::class, 'enroll']);
	Route::get('/learning-paths/{slug}/modules', [LearningPathController::class, 'getModules']);
	Route::get('/modules/{slug}', [ModuleController::class, 'show']);
	Route::get('/modules/{slug}/lessons', [ModuleController::class, 'getLessons']);
	Route::get('/lessons/{slug}', [LessonController::class, 'show']);
	Route::post('/lessons/{slug}/complete', [LessonController::class, 'complete']);
	Route::get('/notes', [NoteController::class, 'index']);
	Route::post('/lessons/{slug}/notes', [NoteController::class, 'storeForLesson']);
	Route::delete('/notes/{id}', [NoteController::class, 'destroy']);
	Route::get('/progress', [ProgressController::class, 'getProgressSummary']);
	Route::get('/progress/modules', [ProgressController::class, 'getModuleProgress']);
	Route::get('/xp', [XPController::class, 'getXpHistory']);
});
