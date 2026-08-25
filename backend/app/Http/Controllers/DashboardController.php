<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $stats = [
            'total_xp' => (int) $user->total_xp,
            'modules_in_progress' => $user->moduleProgress()->count(),
            'notes_created' => $user->notes()->count(),
            'learning_paths_enrolled' => $user->learningPaths()->count(),
        ];

        return response()->json([
            'message' => 'Dashboard berhasil diambil.',
            'code' => 200,
            'data' => [
                'user' => new UserResource($user),
                'stats' => $stats,
            ],
            'errors' => null,
        ]);
    }
}
