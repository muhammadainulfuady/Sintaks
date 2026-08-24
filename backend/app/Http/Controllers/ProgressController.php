<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    public function getProgressSummary(Request $request): JsonResponse
    {
        $user = $request->user();
        $completedLessons = $user->lessonProgress()->where('is_completed', true);
        $continueProgress = $user->lessonProgress()
            ->with('lesson:id,module_id,title')
            ->whereNotNull('last_accessed_at')
            ->latest('last_accessed_at')
            ->first();

        $continueLearning = $continueProgress?->lesson === null
            ? null
            : [
                'lesson_id' => $continueProgress->lesson->id,
                'lesson_title' => $continueProgress->lesson->title,
                'module_id' => $continueProgress->lesson->module_id,
            ];

        return $this->success('Progress berhasil diambil.', [
            'total_xp' => (int) $user->total_xp,
            'completed_lessons' => $completedLessons->count(),
            'completed_modules' => $user->moduleProgress()->where('status', 'completed')->count(),
            'continue_learning' => $continueLearning,
        ]);
    }

    public function getModuleProgress(Request $request): JsonResponse
    {
        $progress = $request->user()->moduleProgress()
            ->with('module:id,title,slug')
            ->latest('updated_at')
            ->get()
            ->map(fn ($item): array => [
                'module_id' => $item->module_id,
                'status' => $item->status,
                'completed_at' => $item->completed_at,
            ]);

        return $this->success('Progress module berhasil diambil.', $progress);
    }

    private function success(string $message, mixed $data, int $status = 200): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'code' => $status,
            'data' => $data,
            'errors' => null,
        ], $status);
    }
}