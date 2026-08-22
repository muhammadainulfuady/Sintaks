<?php

namespace App\Http\Controllers;

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
}