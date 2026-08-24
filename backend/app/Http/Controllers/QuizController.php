<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\QuizQuestion;
use App\Models\QuizAttemptAnswer;
use App\Models\CodeSubmission;
use App\Models\XPTransaction;
use App\Models\ModuleProgress;
use App\Http\Requests\Quiz\SubmitTheoryAnswerRequest;
use App\Http\Requests\Quiz\RunCodeRequest;
use App\Services\Quiz\QuizEvaluationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    private const QUIZ_XP = 50;
    protected QuizEvaluationService $quizEvaluationService;

    public function __construct(QuizEvaluationService $quizEvaluationService)
    {
        $this->quizEvaluationService = $quizEvaluationService;
    }

    /**
     * GET /api/modules/{slug}/quiz
     * Ambil data quiz module (Hanya jika semua lesson module diselesaikan)
     */
    public function show(string $moduleSlug): JsonResponse
    {
        $module = Module::where('slug', $moduleSlug)->first();

        if (!$module) {
            return response()->json([
                'message' => 'Module tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $quiz = Quiz::where('module_id', $module->id)
            ->where('is_active', true)
            ->with(['questions' => function ($q) {
                $q->where('is_active', true)
                    ->with(['options' => function ($opt) {
                        // Eksklusi is_correct demi keamanan data (per RULES.md & api-docs.json)
                        $opt->select(['id', 'quiz_question_id', 'label', 'content', 'order']);
                    }, 'testCases' => function ($tc) {
                        // Hanya kirim public test cases (is_hidden = 0)
                        $tc->where('is_hidden', false)->select(['id', 'quiz_question_id', 'input', 'expected_output', 'order']);
                    }]);
            }])
            ->first();

        if (!$quiz) {
            return response()->json([
                'message' => 'Quiz untuk module ini tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        return response()->json([
            'message' => 'Data quiz berhasil diambil.',
            'code' => 200,
            'data' => $quiz,
            'errors' => null,
        ], 200);
    }

    /**
     * POST /api/quizzes/{id}/attempts
     * Mulai attempt kuis baru atau ambil attempt in_progress yang sedang berjalan
     */
    public function startAttempt(int $quizId): JsonResponse
    {
        $quiz = Quiz::find($quizId);

        if (!$quiz) {
            return response()->json([
                'message' => 'Quiz tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $userId = auth()->id() ?? 1; // Default fallback ID 1 untuk testing

        // Cek attempt yang sedang berjalan
        $existingAttempt = QuizAttempt::where('user_id', $userId)
            ->where('quiz_id', $quizId)
            ->where('status', 'in_progress')
            ->first();

        if ($existingAttempt) {
            return response()->json([
                'message' => 'Sesi quiz berlanjut.',
                'code' => 200,
                'data' => $existingAttempt,
                'errors' => null,
            ], 200);
        }

        $totalQuestions = $quiz->questions()->where('is_active', true)->count();

        $attempt = QuizAttempt::create([
            'user_id' => $userId,
            'quiz_id' => $quizId,
            'score' => null,
            'total_questions' => $totalQuestions,
            'correct_count' => 0,
            'wrong_count' => 0,
            'status' => 'in_progress',
            'started_at' => now(),
        ]);

        return response()->json([
            'message' => 'Attempt quiz dimulai.',
            'code' => 201,
            'data' => $attempt,
            'errors' => null,
        ], 201);
    }

    /**
     * GET /api/quizzes/{id}/attempts/{attemptId}
     * Ambil detail attempt kuis beserta hasil skor
     */
    public function getAttemptDetail(int $quizId, int $attemptId): JsonResponse
    {
        $attempt = QuizAttempt::where('id', $attemptId)
            ->where('quiz_id', $quizId)
            ->with(['quiz', 'answers.question'])
            ->first();

        if (!$attempt) {
            return response()->json([
                'message' => 'Sesi kuis tidak ditemukan.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        return response()->json([
            'message' => 'Detail attempt berhasil diambil.',
            'code' => 200,
            'data' => $attempt,
            'errors' => null,
        ], 200);
    }

    /**
     * POST /api/quizzes/{quizId}/attempts/{attemptId}/answers
     * Submit dan evaluasi jawaban untuk soal Theory (Pilihan Ganda)
     */
    public function submitAnswer(SubmitTheoryAnswerRequest $request, int $quizId, int $attemptId): JsonResponse
    {
        $attempt = QuizAttempt::where('id', $attemptId)->where('quiz_id', $quizId)->first();

        if (!$attempt) {
            return response()->json([
                'message' => 'Sesi kuis tidak ditemukan atau telah berakhir.',
                'code' => 404,
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $question = QuizQuestion::query()
            ->whereKey($request->validated('quiz_question_id'))
            ->where('quiz_id', $quizId)
            ->first();

        if ($question === null) {
            return response()->json([
                'message' => 'Soal kuis tidak valid.',
                'code' => 422,
                'data' => null,
                'errors' => null,
            ], 422);
        }

        $evaluation = $this->quizEvaluationService->evaluateTheoryAnswer(
            $question,
            $request->validated('answer_value')
        );

        // Simpan atau update jawaban di database
        QuizAttemptAnswer::updateOrCreate(
            [
                'quiz_attempt_id' => $attempt->id,
                'quiz_question_id' => $question->id,
            ],
            [
                'answer_value' => $request->validated('answer_value'),
                'is_correct' => $evaluation['is_correct'],
                'answered_at' => now(),
            ]
        );

        // Hitung ulang hasil attempt
        $attemptSummary = $this->quizEvaluationService->calculateAttemptResult($attempt);
        $xpAwarded = 0;
        $user = $attempt->user;

        if ($attemptSummary['is_complete'] && $attemptSummary['is_passed']) {
            ModuleProgress::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'module_id' => $attempt->quiz->module_id,
                ],
                [
                    'status' => 'completed',
                    'completed_at' => now(),
                ]
            );

            $xpTransaction = XPTransaction::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'source_type' => 'quiz_completion',
                    'source_id' => $quizId,
                ],
                [
                    'amount' => self::QUIZ_XP,
                    'description' => "Lulus quiz: {$attempt->quiz->title}",
                ]
            );

            if ($xpTransaction->wasRecentlyCreated) {
                $user->increment('total_xp', self::QUIZ_XP);
                $xpAwarded = self::QUIZ_XP;
            }
        }

        return response()->json([
            'message' => $evaluation['is_correct'] ? 'Jawaban benar!' : 'Jawaban belum tepat.',
            'code' => 200,
            'data' => [
                'is_correct' => $evaluation['is_correct'],
                'explanation' => $evaluation['explanation'],
                'attempt_summary' => $attemptSummary,
                'xp_awarded' => $xpAwarded,
                'total_xp' => (int) $user->fresh()->total_xp,
            ],
            'errors' => null,
        ], 200);
    }

    /**
     * POST /api/code/run
     * Jalankan dan evaluasi kode Python di Sandbox
     */
    public function runCode(RunCodeRequest $request): JsonResponse
    {
        $question = QuizQuestion::find($request->validated('quiz_question_id'));
        $attempt = QuizAttempt::find($request->validated('quiz_attempt_id'));

        $evaluation = $this->quizEvaluationService->evaluateCodeAnswer(
            $question,
            $request->validated('code')
        );

        $userId = auth()->id() ?? 1;

        // Catat submission kode
        CodeSubmission::create([
            'user_id' => $userId,
            'quiz_question_id' => $question->id,
            'quiz_attempt_id' => $attempt->id,
            'code' => $request->validated('code'),
            'language' => $request->validated('language', 'python'),
            'status' => $evaluation['status'],
            'execution_output' => $evaluation['execution_output'] ?? null,
            'error_message' => $evaluation['error_message'] ?? null,
            'execution_time_ms' => $evaluation['execution_time_ms'] ?? 0,
        ]);

        // Simpan ke jawaban attempt jika benar
        if ($evaluation['is_correct']) {
            QuizAttemptAnswer::updateOrCreate(
                [
                    'quiz_attempt_id' => $attempt->id,
                    'quiz_question_id' => $question->id,
                ],
                [
                    'answer_value' => $request->validated('code'),
                    'is_correct' => true,
                    'answered_at' => now(),
                ]
            );

            $this->quizEvaluationService->calculateAttemptResult($attempt);
        }

        return response()->json([
            'message' => $evaluation['is_correct'] ? 'Kode berhasil! Semua test case lulus.' : 'Kode belum memenuhi kriteria.',
            'code' => 200,
            'data' => $evaluation,
            'errors' => null,
        ], 200);
    }
}
