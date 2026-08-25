<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class XPController extends Controller
{
    public function getXpHistory(Request $request): JsonResponse
    {
        $user = $request->user();
        $transactions = $user->xpTransactions()
            ->latest('created_at')
            ->get(['id', 'amount', 'source_type', 'description', 'created_at']);

        return response()->json([
            'message' => 'Data XP berhasil diambil.',
            'code' => 200,
            'data' => [
                'total_xp' => (int) $user->total_xp,
                'transactions' => $transactions,
            ],
            'errors' => null,
        ]);
    }

    public function getLeaderboard(): JsonResponse
    {
        $leaderboard = User::orderByDesc('total_xp')
            ->take(100)
            ->get(['id', 'name', 'username', 'avatar', 'total_xp']);

        return response()->json([
            'message' => 'Leaderboard berhasil diambil.',
            'code' => 200,
            'data' => $leaderboard,
            'errors' => null,
        ]);
    }
}