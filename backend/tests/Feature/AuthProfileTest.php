<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class AuthProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_and_receive_a_sanctum_token(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Ainul Fuady',
            'username' => 'ainulfuady',
            'email' => 'ainul@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Registrasi berhasil.')
            ->assertJsonPath('code', 201)
            ->assertJsonPath('data.user.username', 'ainulfuady')
            ->assertJsonPath('errors', null)
            ->assertJsonStructure(['data' => ['user', 'token']]);

        $user = User::where('email', 'ainul@example.com')->firstOrFail();

        $this->assertTrue(Hash::check('password123', $user->password));
        $this->assertDatabaseHas('personal_access_tokens', ['tokenable_id' => $user->id]);
    }

    public function test_registration_validation_errors_use_the_api_response_format(): void
    {
        $response = $this->postJson('/api/auth/register', []);

        $response
            ->assertUnprocessable()
            ->assertJsonPath('message', 'Validasi gagal.')
            ->assertJsonPath('code', 422)
            ->assertJsonPath('data', null)
            ->assertJsonStructure(['errors' => ['name', 'username', 'email', 'password']]);
    }

    public function test_user_can_login_and_invalid_credentials_are_rejected(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
        ]);

        $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ])
            ->assertOk()
            ->assertJsonPath('message', 'Login berhasil.')
            ->assertJsonPath('data.user.id', $user->id)
            ->assertJsonStructure(['data' => ['user', 'token']]);

        $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ])
            ->assertUnauthorized()
            ->assertJsonPath('code', 401)
            ->assertJsonPath('data', null)
            ->assertJsonPath('errors', null);
    }

    public function test_authenticated_user_can_logout_and_current_token_is_revoked(): void
    {
        $user = User::factory()->create();
        $accessToken = $user->createToken('test-token');

        $this->withToken($accessToken->plainTextToken)
            ->postJson('/api/auth/logout')
            ->assertOk()
            ->assertJsonPath('message', 'Logout berhasil.')
            ->assertJsonPath('code', 200)
            ->assertJsonPath('errors', null);

        $this->assertDatabaseMissing('personal_access_tokens', ['id' => $accessToken->accessToken->id]);
    }

    public function test_forgot_password_sends_a_reset_notification_for_a_registered_user(): void
    {
        Notification::fake();
        $user = User::factory()->create(['email' => 'user@example.com']);

        $this->postJson('/api/auth/forgot-password', ['email' => $user->email])
            ->assertOk()
            ->assertJsonPath('message', 'Link reset password telah dikirim ke email Anda.')
            ->assertJsonPath('code', 200)
            ->assertJsonPath('errors', null);

        Notification::assertSentTo($user, ResetPassword::class);
    }

    public function test_profile_routes_require_a_valid_bearer_token(): void
    {
        $this->getJson('/api/profile')
            ->assertUnauthorized()
            ->assertExactJson([
                'message' => 'Unauthenticated.',
                'code' => 401,
                'data' => null,
                'errors' => null,
            ]);

        $this->getJson('/api/profile/unknown-user')
            ->assertUnauthorized();
    }

    public function test_user_can_get_and_update_only_their_own_profile(): void
    {
        $user = User::factory()->create([
            'name' => 'Nama Lama',
            'username' => 'nama_lama',
            'avatar' => 'avatar_01',
        ]);
        $token = $user->createToken('profile-test')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/profile')
            ->assertOk()
            ->assertJsonPath('data.email', $user->email)
            ->assertJsonMissingPath('data.password');

        $this->withToken($token)
            ->putJson('/api/profile', [
                'name' => 'Nama Baru',
                'username' => 'nama_baru',
                'avatar' => 'avatar_02',
            ])
            ->assertOk()
            ->assertJsonPath('message', 'Profil berhasil diperbarui.')
            ->assertJsonPath('data.username', 'nama_baru')
            ->assertJsonPath('data.avatar', 'avatar_02');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Nama Baru',
            'username' => 'nama_baru',
            'avatar' => 'avatar_02',
        ]);
    }

    public function test_profile_update_rejects_another_users_username(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create(['username' => 'already_taken']);
        $token = $user->createToken('profile-test')->plainTextToken;

        $this->withToken($token)
            ->putJson('/api/profile', [
                'name' => $user->name,
                'username' => $otherUser->username,
                'avatar' => $user->avatar,
            ])
            ->assertUnprocessable()
            ->assertJsonPath('code', 422)
            ->assertJsonStructure(['errors' => ['username']]);
    }

    public function test_authenticated_user_can_view_a_public_profile_or_receive_not_found(): void
    {
        $viewer = User::factory()->create();
        $profileUser = User::factory()->create([
            'name' => 'Profil Publik',
            'username' => 'profil_publik',
            'avatar' => 'avatar_03',
            'total_xp' => 250,
        ]);
        $token = $viewer->createToken('viewer-token')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/profile/'.$profileUser->username)
            ->assertOk()
            ->assertJsonPath('data.name', 'Profil Publik')
            ->assertJsonPath('data.username', 'profil_publik')
            ->assertJsonPath('data.total_xp', 250)
            ->assertJsonPath('data.completed_modules', []);

        $this->withToken($token)
            ->getJson('/api/profile/tidak_ada')
            ->assertNotFound()
            ->assertJsonPath('code', 404)
            ->assertJsonPath('data', null);
    }

    public function test_user_seeder_creates_one_admin_and_two_regular_users(): void
    {
        $this->seed(UserSeeder::class);

        $this->assertDatabaseCount('users', 3);
        $this->assertDatabaseHas('users', [
            'email' => 'admin@sintaks.id',
            'role' => 'admin',
        ]);
        $this->assertSame(2, User::where('role', 'user')->count());
    }
}
