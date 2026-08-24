<?php

namespace App\Services;

use App\Models\Lesson;
use App\Models\Module;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class NovaService
{
    public function chat(User $user, string $message, array $context = [], array $history = []): array
    {
        $learningContext = $this->buildContext($user, $context);
        $provider = config('services.nova.provider');

        if ($provider === 'gemini') {
            $response = $this->chatWithGemini($message, $learningContext, $history);
        } else {
            throw new RuntimeException('Provider NOVA belum dikonfigurasi.');
        }

        return [
            'response' => $response,
            'context_used' => [
                'learning_path' => $learningContext['learning_path'],
                'module' => $learningContext['module'],
                'lesson' => $learningContext['lesson'],
            ],
        ];
    }

    private function buildContext(User $user, array $context): array
    {
        $lesson = null;
        $module = null;

        if (!empty($context['lesson_id'])) {
            $lesson = Lesson::query()
                ->whereKey($context['lesson_id'])
                ->where('is_active', true)
                ->with(['module.learningPath', 'references'])
                ->firstOrFail();
            $module = $lesson->module;
        } elseif (!empty($context['module_id'])) {
            $module = Module::query()
                ->whereKey($context['module_id'])
                ->where('is_active', true)
                ->with('learningPath')
                ->firstOrFail();
        }

        $notes = $user->notes()
            ->when($lesson, fn ($query) => $query->where('lesson_id', $lesson->id))
            ->when(!$lesson && $module, fn ($query) => $query->whereHas('lesson', fn ($lessonQuery) => $lessonQuery->where('module_id', $module->id)))
            ->latest()
            ->limit(20)
            ->pluck('content')
            ->all();

        return [
            'learning_path' => $module?->learningPath?->name,
            'module' => $module?->title,
            'lesson' => $lesson?->title,
            'lesson_content' => $lesson ? [
                'explanation' => $lesson->explanation,
                'code_example' => $lesson->code_example,
                'output_example' => $lesson->output_example,
                'key_points' => $lesson->key_points,
                'tips' => $lesson->tips,
                'common_mistakes' => $lesson->common_mistakes,
                'references' => $lesson->references->map(fn ($reference) => [
                    'title' => $reference->title,
                    'url' => $reference->url,
                ])->all(),
            ] : null,
            'notes' => $notes,
        ];
    }

    private function chatWithGemini(string $message, array $learningContext, array $history): string
    {
        $apiKey = config('services.nova.gemini.key');
        $model = config('services.nova.gemini.model', 'gemini-3.1-flash-lite');
        $baseUrl = rtrim(config('services.nova.gemini.base_url'), '/');

        if (!$apiKey || !$baseUrl) {
            throw new RuntimeException('Konfigurasi Gemini NOVA belum lengkap.');
        }

        $systemInstruction = 'Anda adalah NOVA, tutor Python Sintaks. Jawab dalam Bahasa Indonesia dan hanya berdasarkan konteks pembelajaran yang diberikan. Jangan menjawab atau memberi petunjuk untuk soal Quiz.';
        $contextText = json_encode($learningContext, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $contents = collect($history)
            ->map(fn (array $item) => [
                'role' => $item['role'] === 'assistant' ? 'model' : 'user',
                'parts' => [['text' => $item['content']]],
            ])
            ->push([
                'role' => 'user',
                'parts' => [['text' => "Konteks pembelajaran:\n{$contextText}\n\nPertanyaan:\n{$message}"]],
            ])
            ->values()
            ->all();

        $result = Http::timeout(30)
            ->acceptJson()
            ->withHeaders(['x-goog-api-key' => $apiKey])
            ->post("{$baseUrl}/models/{$model}:generateContent", [
                'systemInstruction' => ['parts' => [['text' => $systemInstruction]]],
                'contents' => $contents,
            ])
            ->throw()
            ->json();

        $text = data_get($result, 'candidates.0.content.parts.0.text');

        if (!is_string($text) || trim($text) === '') {
            throw new RuntimeException('Provider NOVA mengembalikan respons kosong.');
        }

        return $text;
    }
}
