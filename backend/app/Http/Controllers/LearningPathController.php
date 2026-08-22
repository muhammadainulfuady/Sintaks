<?php

namespace App\Http\Controllers;

use App\Models\LearningPath;
use App\Services\ModuleLockService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LearningPathController extends Controller
{
    public function __construct(private readonly ModuleLockService $moduleLockService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()?->id;

        $learningPaths = LearningPath::query()
            ->where('is_active', true)
            ->withCount('modules')
            ->orderBy('order')
            ->get()
            ->each(function (LearningPath $learningPath) use ($userId): void {
                $learningPath->setAttribute(
                    'is_enrolled',
                    $userId !== null && $learningPath->users()->whereKey($userId)->exists()
                );
            });

        return $this->success('Daftar learning path berhasil diambil.', $learningPaths);
    }

    public function show(Request $request, string $slug): JsonResponse
    {
        $learningPath = LearningPath::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with(['modules' => function ($query): void {
                $query->where('is_active', true)->withCount('lessons');
            }])
            ->first();

        if ($learningPath === null) {
            return $this->error('Learning path tidak ditemukan.', 404);
        }

        $learningPath->modules->each(function ($module) use ($request): void {
            $module->setRawAttributes(array_merge(
                $module->getAttributes(),
                $this->moduleLockService->statusFor($module, $request->user())
            ));
        });

        return $this->success('Detail learning path berhasil diambil.', $learningPath);
    }

    public function enroll(Request $request, string $slug): JsonResponse
    {
        $learningPath = LearningPath::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if ($learningPath === null) {
            return $this->error('Learning path tidak ditemukan.', 404);
        }

        $user = $request->user();
        $alreadyEnrolled = $learningPath->users()->whereKey($user->id)->exists();

        if (!$alreadyEnrolled) {
            $learningPath->users()->attach($user->id, ['enrolled_at' => now()]);
        }

        return $this->success('Berhasil enroll ke learning path.', [
            'learning_path_id' => $learningPath->id,
            'enrolled_at' => $learningPath->users()->whereKey($user->id)->first()->pivot->enrolled_at,
        ]);
    }

    public function getModules(string $slug): JsonResponse
    {
        $learningPath = LearningPath::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with(['modules' => function ($query): void {
                $query->where('is_active', true)
                    ->withCount('lessons')
                    ->with('prerequisites:id');
            }])
            ->first();

        if ($learningPath === null) {
            return $this->error('Learning path tidak ditemukan.', 404);
        }

        $modules = $learningPath->modules->each(function ($module) use ($request): void {
            $module->setRawAttributes(array_merge(
                $module->getAttributes(),
                $this->moduleLockService->statusFor($module, $request->user())
            ));
        });

        return $this->success('Daftar module berhasil diambil.', $modules);
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