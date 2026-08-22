<?php

namespace App\Http\Controllers;

use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class ProfileController extends Controller
{
    public function getProfile(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Data profil berhasil diambil.',
            'code' => 200,
            'data' => new UserResource($request->user()),
            'errors' => null,
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();
        Gate::authorize('update', $user);

        $user->update($request->validated());

        return response()->json([
            'message' => 'Profil berhasil diperbarui.',
            'code' => 200,
            'data' => new UserResource($user->fresh()),
            'errors' => null,
        ]);
    }

    public function getPublicProfile(string $username): JsonResponse
    {
        $user = User::where('username', $username)->first();

        if (! $user) {
            return response()->json([
                'message' => 'Data tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $completedModules = DB::table('module_progress')
            ->join('modules', 'modules.id', '=', 'module_progress.module_id')
            ->where('module_progress.user_id', $user->id)
            ->where('module_progress.status', 'completed')
            ->orderBy('modules.order')
            ->get([
                'modules.id',
                'modules.title',
                'module_progress.completed_at',
            ]);

        return response()->json([
            'message' => 'Profil berhasil diambil.',
            'code' => 200,
            'data' => [
                'name' => $user->name,
                'username' => $user->username,
                'avatar' => $user->avatar,
                'total_xp' => $user->total_xp,
                'completed_modules' => $completedModules,
            ],
            'errors' => null,
        ]);
    }
}
