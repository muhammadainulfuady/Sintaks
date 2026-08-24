<?php

namespace App\Http\Controllers;

use App\Http\Requests\Nova\ChatNovaRequest;
use App\Services\NovaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Client\RequestException;
use RuntimeException;

class NovaController extends Controller
{
    public function __construct(private readonly NovaService $novaService)
    {
    }

    public function chat(ChatNovaRequest $request): JsonResponse
    {
        try {
            $data = $this->novaService->chat(
                $request->user(),
                $request->validated('message'),
                $request->validated('context', []),
                $request->validated('conversation_history', [])
            );
        } catch (RequestException|RuntimeException $exception) {
            return response()->json([
                'message' => 'NOVA sedang tidak tersedia. Silakan coba lagi nanti.',
                'code' => 503,
                'data' => null,
                'errors' => ['provider' => [$exception->getMessage()]],
            ], 503);
        }

        return response()->json([
            'message' => 'Respons NOVA berhasil.',
            'code' => 200,
            'data' => $data,
            'errors' => null,
        ]);
    }
}