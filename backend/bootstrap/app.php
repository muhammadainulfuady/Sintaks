<?php

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request): bool => $request->is('api/*') || $request->expectsJson()
        );

        // Tangkap Unauthenticated Exception & Route [login] not defined untuk API
        $exceptions->render(function (AuthenticationException|RouteNotFoundException $exception, Request $request) {
            if ($request->is('api/*') || $exception instanceof AuthenticationException) {
                return response()->json([
                    'message' => 'Unauthenticated.',
                    'code' => 401,
                    'data' => null,
                    'errors' => null,
                ], 401);
            }

            return null;
        });

        $exceptions->render(function (ValidationException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            return response()->json([
                'message' => 'Validasi gagal.',
                'code' => 422,
                'data' => null,
                'errors' => $exception->errors(),
            ], 422);
        });

        $exceptions->render(function (AuthorizationException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            return response()->json([
                'message' => 'Anda tidak memiliki izin untuk melakukan aksi ini.',
                'code' => 403,
                'data' => null,
                'errors' => null,
            ], 403);
        });

        $exceptions->render(function (ModelNotFoundException|NotFoundHttpException $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            return response()->json([
                'message' => 'Data tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        });

        $exceptions->render(function (Throwable $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            return response()->json([
                'message' => 'Terjadi kesalahan pada server. Silakan coba lagi.',
                'code' => 500,
                'data' => null,
                'errors' => null,
            ], 500);
        });
    })->create();
