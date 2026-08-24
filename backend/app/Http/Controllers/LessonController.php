<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\ModuleProgress;
use App\Models\XPTransaction;
use App\Services\ModuleLockService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    private const LESSON_XP = 10;

    public function __construct(private readonly ModuleLockService $moduleLockService)
    {
    }

    public function show(Request $request, string $slug): JsonResponse
    {
        $lesson = Lesson::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with([
                'module:id,learning_path_id,title,slug',
                'module.learningPath:id,name,slug',
                'references',
            ])
            ->first();

        if ($lesson === null) {
            return $this->error('Lesson tidak ditemukan.', 404);
        }

        $progress = $request->user()->lessonProgress()
            ->where('lesson_id', $lesson->id)
            ->first();
        $lesson->setAttribute('is_completed', $progress?->is_completed ?? false);

        return $this->success('Detail lesson berhasil diambil.', $lesson);
    }

    public function complete(Request $request, string $slug): JsonResponse
    {
        $lesson = Lesson::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with('module')
            ->first();

        if ($lesson === null) {
            return $this->error('Lesson tidak ditemukan.', 404);
        }

        $user = $request->user();
        $this->moduleLockService->assertUnlocked($lesson->module, $user);
        $result = DB::transaction(function () use ($lesson, $user): array {
            $progress = $user->lessonProgress()
                ->where('lesson_id', $lesson->id)
                ->lockForUpdate()
                ->first();
            $wasCompleted = $progress?->is_completed ?? false;

            if ($progress === null) {
                $progress = $user->lessonProgress()->create([
                    'lesson_id' => $lesson->id,
                    'is_completed' => true,
                    'completed_at' => now(),
                    'last_accessed_at' => now(),
                ]);
            } else {
                $progress->update([
                    'is_completed' => true,
                    'completed_at' => $progress->completed_at ?? now(),
                    'last_accessed_at' => now(),
                ]);
            }

            $xpTransaction = null;
            if (!$wasCompleted) {
                $xpTransaction = XPTransaction::firstOrCreate(
                    [
                        'user_id' => $user->id,
                        'source_type' => 'lesson_completion',
                        'source_id' => $lesson->id,
                    ],
                    [
                        'amount' => self::LESSON_XP,
                        'description' => "Menyelesaikan lesson: {$lesson->title}",
                    ]
                );

                if ($xpTransaction->wasRecentlyCreated) {
                    $user->increment('total_xp', self::LESSON_XP);
                }
            }

            $lessonsCount = $lesson->module->lessons()->count();
            $completedLessonsCount = $user->lessonProgress()
                ->whereIn('lesson_id', $lesson->module->lessons()->pluck('id'))
                ->where('is_completed', true)
                ->count();
            $status = $completedLessonsCount === $lessonsCount
                ? 'completed'
                : ($completedLessonsCount > 0 ? 'in_progress' : 'not_started');

            ModuleProgress::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'module_id' => $lesson->module_id,
                ],
                [
                    'status' => $status,
                    'completed_at' => $status === 'completed' ? now() : null,
                ]
            );

            return [
                'progress' => $progress->fresh(),
                'xp_awarded' => $xpTransaction?->wasRecentlyCreated ? self::LESSON_XP : 0,
                'module_progress_percentage' => $lessonsCount === 0
                    ? 0
                    : (int) round(($completedLessonsCount / $lessonsCount) * 100),
                'total_xp' => (int) $user->fresh()->total_xp,
            ];
        });

        return $this->success('Lesson berhasil diselesaikan.', $result);
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

    private function error(string $message, int $status): JsonResponse
    {
        return $this->success($message, null, $status);
    }
}
