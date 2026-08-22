<?php

namespace App\Services;

use App\Models\Module;
use App\Models\User;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ModuleLockService
{
    public function statusFor(Module $module, User $user): array
    {
        if ($this->isLocked($module, $user)) {
            return [
                'status' => 'locked',
                'is_locked' => true,
                'progress_percentage' => 0,
                'completed_lessons_count' => 0,
            ];
        }

        $lessonIds = $module->lessons()->pluck('id');
        $lessonsCount = $lessonIds->count();
        $completedLessonsCount = $lessonsCount === 0
            ? 0
            : $user->lessonProgress()
                ->whereIn('lesson_id', $lessonIds)
                ->where('is_completed', true)
                ->count();
        $progressPercentage = $lessonsCount === 0
            ? 0
            : (int) round(($completedLessonsCount / $lessonsCount) * 100);
        $moduleProgress = $module->progress()
            ->where('user_id', $user->id)
            ->first();

        return [
            'status' => $moduleProgress?->status === 'completed'
                ? 'completed'
                : ($completedLessonsCount > 0 ? 'in_progress' : 'not_started'),
            'is_locked' => false,
            'progress_percentage' => $progressPercentage,
            'completed_lessons_count' => $completedLessonsCount,
        ];
    }

    public function isLocked(Module $module, User $user): bool
    {
        return $module->prerequisites()
            ->whereDoesntHave('progress', function ($query) use ($user): void {
                $query->where('user_id', $user->id)
                    ->where('status', 'completed');
            })
            ->exists();
    }

    public function assertUnlocked(Module $module, User $user): void
    {
        if ($this->isLocked($module, $user)) {
            throw new AccessDeniedHttpException('Module ini masih terkunci. Selesaikan module sebelumnya terlebih dahulu.');
        }
    }
}