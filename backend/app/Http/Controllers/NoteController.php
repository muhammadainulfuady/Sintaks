<?php

namespace App\Http\Controllers;

use App\Http\Requests\Note\StoreNoteRequest;
use App\Models\Lesson;
use App\Models\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class NoteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $notes = $request->user()->notes()->with([
            'lesson:id,module_id,title,slug',
            'lesson.module:id,title,slug',
        ])->latest()->get();

        return $this->success('Daftar note berhasil diambil.', $notes);
    }

    public function store(StoreNoteRequest $request): JsonResponse
    {
        $note = $request->user()->notes()->create([
            'content' => $request->validated('content'),
        ]);

        return $this->success('Note berhasil disimpan.', $note->load('lesson:id,module_id,title,slug'), 201);
    }

    public function storeForLesson(StoreNoteRequest $request, string $slug): JsonResponse
    {
        $lesson = Lesson::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if ($lesson === null) {
            return $this->error('Lesson tidak ditemukan.', 404);
        }

        $note = $request->user()->notes()->create([
            'lesson_id' => $lesson->id,
            'content' => $request->validated('content'),
        ]);

        return $this->success('Note berhasil disimpan.', $note->load('lesson:id,module_id,title,slug'), 201);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $note = Note::find($id);

        if ($note === null) {
            return $this->error('Note tidak ditemukan.', 404);
        }

        Gate::authorize('delete', $note);
        $note->delete();

        return $this->success('Note berhasil dihapus.', null);
    }

    private function success(string $message, mixed $data, int $status = 200): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'code' => $status,
            'data' => $data,
            'errors' => null,
        ], $status);
    }

    private function error(string $message, int $status): JsonResponse
    {
        return $this->success($message, null, $status);
    }
}