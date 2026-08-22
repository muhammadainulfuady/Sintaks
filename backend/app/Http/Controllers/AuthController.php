<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use stdClass;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'user',
            'total_xp' => 0,
        ]);

        return response()->json([
            'message' => 'Registrasi berhasil.',
            'code' => 201,
            'data' => [
                'user' => new UserResource($user),
                'token' => $user->createToken('auth-token')->plainTextToken,
            ],
            'errors' => null,
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah.',
                'code' => 401,
                'data' => null,
                'errors' => null,
            ], 401);
        }

        return response()->json([
            'message' => 'Login berhasil.',
            'code' => 200,
            'data' => [
                'user' => new UserResource($user),
                'token' => $user->createToken('auth-token')->plainTextToken,
            ],
            'errors' => null,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logout berhasil.',
            'code' => 200,
            'data' => new stdClass,
            'errors' => null,
        ]);
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        Password::sendResetLink($request->only('email'));

        return response()->json([
            'message' => 'Link reset password telah dikirim ke email Anda.',
            'code' => 200,
            'data' => new stdClass,
            'errors' => null,
        ]);
    }
}
