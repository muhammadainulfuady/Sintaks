<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Services\ModuleLockService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function __construct(private readonly ModuleLockService $moduleLockService)
    {
    }

    public function show(Request $request, string $slug): JsonResponse
    {
        $module = Module::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with([
                'learningPath:id,name,slug',
                'lessons' => function ($query): void {
                    $query->where('is_active', true)->with('references');
                },
                'quiz',
                'prerequisites:id,title,slug',
            ])
            ->first();

        if ($module === null) {
            return $this->error('Module tidak ditemukan.', 404);
        }

        $this->moduleLockService->assertUnlocked($module, $request->user());
        $this->addModuleStatus($module, $request);

        return $this->success('Detail module berhasil diambil.', $module);
    }

    public function getLessons(Request $request, string $slug): JsonResponse
    {
        $module = Module::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with(['lessons' => function ($query): void {
                $query->where('is_active', true)->with('references');
            }])
            ->first();

        if ($module === null) {
            return $this->error('Module tidak ditemukan.', 404);
        }

        $this->moduleLockService->assertUnlocked($module, $request->user());

        $completedLessonIds = $request->user()
            ->lessonProgress()
            ->whereIn('lesson_id', $module->lessons->pluck('id'))
            ->where('is_completed', true)
            ->pluck('lesson_id')
            ->all();

        $lessons = $module->lessons->each(function ($lesson) use ($completedLessonIds): void {
            $lesson->setAttribute('is_completed', in_array($lesson->id, $completedLessonIds, true));
        });

        return $this->success('Daftar lesson berhasil diambil.', $lessons);
    }

    private function addModuleStatus(Module $module, Request $request): void
    {
        foreach ($this->moduleLockService->statusFor($module, $request->user()) as $attribute => $value) {
            $module->setAttribute($attribute, $value);
        }

        $completedLessonIds = $request->user()
            ->lessonProgress()
            ->whereIn('lesson_id', $module->lessons->pluck('id'))
            ->where('is_completed', true)
            ->pluck('lesson_id')
            ->all();

        $module->lessons->each(function ($lesson) use ($completedLessonIds): void {
            $lesson->setAttribute('is_completed', in_array($lesson->id, $completedLessonIds, true));
        });
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