<?php

namespace Tests\Feature;

use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommunityTest extends TestCase
{
    use RefreshDatabase;

    public function test_community_routes_require_authentication(): void
    {
        $this->getJson('/api/communities')->assertUnauthorized();
        $this->postJson('/api/communities')->assertUnauthorized();
    }

    public function test_user_can_create_join_chat_and_leave_a_community(): void
    {
        $owner = User::factory()->create();
        $member = User::factory()->create();
        $ownerToken = $owner->createToken('community-owner')->plainTextToken;
        $memberToken = $member->createToken('community-member')->plainTextToken;

        $createResponse = $this->withToken($ownerToken)->postJson('/api/communities', [
            'name' => 'Belajar Laravel',
            'description' => 'Ruang diskusi Laravel untuk pemula.',
        ]);

        $createResponse
            ->assertCreated()
            ->assertJsonPath('data.name', 'Belajar Laravel')
            ->assertJsonPath('data.is_member', true)
            ->assertJsonPath('data.is_owner', true);

        $communityId = $createResponse->json('data.id');
        $this->assertDatabaseHas('community_members', [
            'community_id' => $communityId,
            'user_id' => $owner->id,
            'role' => 'owner',
        ]);

        $this->withToken($memberToken)
            ->getJson("/api/communities/{$communityId}")
            ->assertOk()
            ->assertJsonPath('data.is_member', false);

        $this->withToken($memberToken)
            ->postJson("/api/communities/{$communityId}/messages", ['content' => 'Halo semua!'])
            ->assertForbidden();

        $this->withToken($memberToken)
            ->postJson("/api/communities/{$communityId}/join")
            ->assertOk()
            ->assertJsonPath('data.community_id', $communityId);

        $this->withToken($memberToken)
            ->postJson("/api/communities/{$communityId}/messages", ['content' => 'Halo semua!'])
            ->assertCreated()
            ->assertJsonPath('data.content', 'Halo semua!')
            ->assertJsonPath('data.user.id', $member->id);

        $this->withToken($memberToken)
            ->getJson("/api/communities/{$communityId}/messages")
            ->assertOk()
            ->assertJsonPath('data.messages.0.content', 'Halo semua!');

        $this->withToken($memberToken)
            ->postJson("/api/communities/{$communityId}/leave")
            ->assertOk();

        $this->assertDatabaseMissing('community_members', [
            'community_id' => $communityId,
            'user_id' => $member->id,
        ]);

        $this->withToken($memberToken)
            ->getJson("/api/communities/{$communityId}/messages")
            ->assertForbidden();
    }

    public function test_owner_cannot_leave_community(): void
    {
        $owner = User::factory()->create();
        $community = Community::create([
            'owner_id' => $owner->id,
            'name' => 'Komunitas Pemilik',
        ]);
        CommunityMember::create([
            'community_id' => $community->id,
            'user_id' => $owner->id,
            'role' => 'owner',
        ]);

        $this->withToken($owner->createToken('owner')->plainTextToken)
            ->postJson("/api/communities/{$community->id}/leave")
            ->assertForbidden()
            ->assertJsonPath('message', 'Pemilik komunitas tidak dapat meninggalkan komunitas.');
    }
}
