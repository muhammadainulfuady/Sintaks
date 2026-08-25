<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\CommunityMessage;
use App\Http\Requests\Community\CreateCommunityRequest;
use App\Http\Requests\Community\SendCommunityMessageRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommunityController extends Controller
{
    /**
     * GET /api/communities
     * Daftar semua komunitas + status membership user
     */
    public function index(): JsonResponse
    {
        $userId = (int) auth()->id();

        $communities = Community::with(['owner:id,name,username,avatar'])
            ->withCount('memberRecords')
            ->get()
            ->map(function (Community $community) use ($userId) {
                $isMember = $community->memberRecords()->where('user_id', $userId)->exists();
                $isOwner = (int) $community->owner_id === $userId;

                return [
                    'id' => $community->id,
                    'name' => $community->name,
                    'description' => $community->description,
                    'owner' => $community->owner,
                    'members_count' => $community->member_records_count,
                    'is_member' => $isMember,
                    'is_owner' => $isOwner,
                    'created_at' => $community->created_at,
                ];
            });

        return response()->json([
            'message' => 'Daftar community berhasil diambil.',
            'code' => 200,
            'data' => $communities,
            'errors' => null,
        ], 200);
    }

    /**
     * POST /api/communities
     * Buat komunitas baru
     */
    public function store(CreateCommunityRequest $request): JsonResponse
    {
        $userId = (int) auth()->id();

        $community = DB::transaction(function () use ($request, $userId): Community {
            $community = Community::create([
                'owner_id' => $userId,
                'name' => $request->validated('name'),
                'description' => $request->validated('description'),
            ]);

            CommunityMember::create([
                'community_id' => $community->id,
                'user_id' => $userId,
                'role' => 'owner',
                'joined_at' => now(),
            ]);

            return $community;
        });

        return response()->json([
            'message' => 'Community berhasil dibuat.',
            'code' => 201,
            'data' => $this->communityData($community->load('owner:id,name,username,avatar'), true, true),
            'errors' => null,
        ], 201);
    }

    /**
     * GET /api/communities/{id}
     * Detail komunitas
     */
    public function show(int $id): JsonResponse
    {
        $userId = (int) auth()->id();
        $community = Community::with(['owner:id,name,username,avatar'])->withCount('memberRecords')->find($id);

        if (!$community) {
            return response()->json([
                'message' => 'Community tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        return response()->json([
            'message' => 'Detail community berhasil diambil.',
            'code' => 200,
            'data' => $this->communityData(
                $community,
                $community->memberRecords()->where('user_id', $userId)->exists(),
                (int) $community->owner_id === $userId,
            ),
            'errors' => null,
        ], 200);
    }

    /**
     * POST /api/communities/{id}/join
     * Join ke komunitas
     */
    public function join(int $id): JsonResponse
    {
        $community = Community::find($id);

        if (!$community) {
            return response()->json([
                'message' => 'Community tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $userId = (int) auth()->id();

        $isMember = CommunityMember::where('community_id', $id)->where('user_id', $userId)->exists();

        if ($isMember) {
            return response()->json([
                'message' => 'Anda sudah menjadi anggota komunitas ini.',
                'code' => 409,
                'data' => null,
                'errors' => null,
            ], 409);
        }

        CommunityMember::create([
            'community_id' => $id,
            'user_id' => $userId,
            'role' => 'member',
            'joined_at' => now(),
        ]);

        return response()->json([
            'message' => 'Berhasil bergabung dengan community.',
            'code' => 200,
            'data' => ['community_id' => $id, 'joined_at' => now()],
            'errors' => null,
        ], 200);
    }

    /**
     * POST /api/communities/{id}/leave
     * Tinggalkan komunitas
     */
    public function leave(int $id): JsonResponse
    {
        $community = Community::find($id);

        if (!$community) {
            return response()->json([
                'message' => 'Community tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $userId = (int) auth()->id();

        if ((int) $community->owner_id === $userId) {
            return response()->json([
                'message' => 'Pemilik komunitas tidak dapat meninggalkan komunitas.',
                'code' => 403,
                'data' => null,
                'errors' => null,
            ], 403);
        }

        $deleted = CommunityMember::where('community_id', $id)->where('user_id', $userId)->delete();

        if ($deleted === 0) {
            return response()->json([
                'message' => 'Anda belum menjadi anggota komunitas ini.',
                'code' => 409,
                'data' => null,
                'errors' => null,
            ], 409);
        }

        return response()->json([
            'message' => 'Berhasil meninggalkan community.',
            'code' => 200,
            'data' => null,
            'errors' => null,
        ], 200);
    }

    /**
     * GET /api/communities/{id}/messages
     * Pesan diskusi komunitas (paginated)
     */
    public function getMessages(Request $request, int $id): JsonResponse
    {
        $community = Community::find($id);

        if (!$community) {
            return response()->json([
                'message' => 'Community tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $userId = (int) auth()->id();
        $isMember = CommunityMember::where('community_id', $id)->where('user_id', $userId)->exists();

        if (!$isMember) {
            return response()->json([
                'message' => 'Anda bukan anggota komunitas ini.',
                'code' => 403,
                'data' => null,
                'errors' => null,
            ], 403);
        }

        $perPage = min(max((int) $request->query('per_page', 20), 1), 100);
        $messages = CommunityMessage::where('community_id', $id)
            ->with('user:id,name,username,avatar')
            ->oldest()
            ->paginate($perPage);

        return response()->json([
            'message' => 'Daftar pesan berhasil diambil.',
            'code' => 200,
            'data' => [
                'messages' => $messages->items(),
                'pagination' => [
                    'current_page' => $messages->currentPage(),
                    'last_page' => $messages->lastPage(),
                    'per_page' => $messages->perPage(),
                    'total' => $messages->total(),
                ]
            ],
            'errors' => null,
        ], 200);
    }

    /**
     * POST /api/communities/{id}/messages
     * Kirim pesan di komunitas
     */
    public function postMessage(SendCommunityMessageRequest $request, int $id): JsonResponse
    {
        $community = Community::find($id);

        if (!$community) {
            return response()->json([
                'message' => 'Community tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $userId = (int) auth()->id();
        $isMember = CommunityMember::where('community_id', $id)->where('user_id', $userId)->exists();

        if (!$isMember) {
            return response()->json([
                'message' => 'Anda bukan anggota komunitas ini.',
                'code' => 403,
                'data' => null,
                'errors' => null,
            ], 403);
        }

        $message = CommunityMessage::create([
            'community_id' => $id,
            'user_id' => $userId,
            'content' => $request->validated('content'),
        ]);

        return response()->json([
            'message' => 'Pesan berhasil dikirim.',
            'code' => 201,
            'data' => $message->load('user:id,name,username,avatar'),
            'errors' => null,
        ], 201);
    }

    /**
     * GET /api/communities/{id}/members
     * Daftar anggota komunitas
     */
    public function getMembers(int $id): JsonResponse
    {
        $community = Community::find($id);

        if (!$community) {
            return response()->json([
                'message' => 'Community tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $members = CommunityMember::where('community_id', $id)
            ->with('user:id,name,username,avatar')
            ->get();

        return response()->json([
            'message' => 'Daftar anggota berhasil diambil.',
            'code' => 200,
            'data' => $members,
            'errors' => null,
        ], 200);
    }

    /**
     * Bentuk respons community yang konsisten untuk list, detail, dan hasil create.
     *
     * @return array<string, mixed>
     */
    private function communityData(Community $community, bool $isMember, bool $isOwner): array
    {
        return [
            'id' => $community->id,
            'name' => $community->name,
            'description' => $community->description,
            'owner' => $community->owner,
            'members_count' => $community->member_records_count ?? $community->memberRecords()->count(),
            'is_member' => $isMember,
            'is_owner' => $isOwner,
            'created_at' => $community->created_at,
        ];
    }
}
