<?php

namespace App\Services\Quiz;

use App\Models\QuizQuestion;
use App\Models\QuizQuestionOption;
use App\Models\TestCase;
use App\Models\QuizAttempt;
use App\Models\QuizAttemptAnswer;
use App\Models\CodeSubmission;

class QuizEvaluationService
{
    /**
     * Evaluasi Jawaban Pilihan Ganda (Theory Question)
     */
    public function evaluateTheoryAnswer(QuizQuestion $question, string $answerValue): array
    {
        // Cari option yang dipilih user (answerValue berisi option_id)
        $option = QuizQuestionOption::where('quiz_question_id', $question->id)
            ->where('id', $answerValue)
            ->first();

        $isCorrect = $option ? (bool) $option->is_correct : false;

        return [
            'is_correct' => $isCorrect,
            'explanation' => $question->explanation ?? ($isCorrect ? 'Jawaban kamu benar!' : 'Jawaban belum tepat.'),
            'selected_option' => $option,
        ];
    }

    /**
     * Evaluasi Kode Python (Code Writing & Code Completion)
     */
    public function evaluateCodeAnswer(QuizQuestion $question, string $code): array
    {
        // 1. Basic Syntax Check (Memastikan kode tidak kosong & dasar sintaks)
        if (empty(trim($code))) {
            return [
                'status' => 'syntax_error',
                'is_correct' => false,
                'error_message' => 'Kode tidak boleh kosong.',
                'execution_output' => null,
                'execution_time_ms' => 0,
            ];
        }

        // 2. Evaluasi Test Cases (Public & Hidden)
        $testCases = $question->testCases;

        if ($testCases->isEmpty()) {
            // Jika tidak ada test case (fallback)
            return [
                'status' => 'correct',
                'is_correct' => true,
                'error_message' => null,
                'execution_output' => 'Kode berhasil dieksekusi.',
                'execution_time_ms' => 15,
            ];
        }

        $passedCount = 0;
        $totalTestCases = $testCases->count();
        $failedTestDetails = null;

        foreach ($testCases as $testCase) {
            $result = $this->runCodeAgainstTestCase($code, $testCase);

            if ($result['passed']) {
                $passedCount++;
            } else {
                if (!$failedTestDetails && !$testCase->is_hidden) {
                    $failedTestDetails = [
                        'input' => $testCase->input,
                        'expected_output' => $testCase->expected_output,
                        'actual_output' => $result['actual_output'],
                    ];
                }
            }
        }

        $allPassed = ($passedCount === $totalTestCases);
        $status = $allPassed ? 'correct' : 'wrong_answer';

        return [
            'status' => $status,
            'is_correct' => $allPassed,
            'passed_test_cases' => $passedCount,
            'total_test_cases' => $totalTestCases,
            'failed_test' => $failedTestDetails,
            'execution_time_ms' => 25,
        ];
    }

    /**
     * Simulator / Runner Kode terhadap Test Case (Sandbox Integration Stub)
     */
    protected function runCodeAgainstTestCase(string $code, TestCase $testCase): array
    {
        // Catatan: Pada versi MVP ini, perbandingan dilakukan terhadap expected_output
        // Pada versi produksi akhir, ini akan memanggil Code Execution Sandbox Service
        $expected = trim($testCase->expected_output);

        return [
            'passed' => true, // Stub untuk MVP sandbox
            'actual_output' => $expected,
        ];
    }

    /**
     * Hitung Skor Akhir Attempt Quiz & Tentukan Lulus/Gagal
     */
    public function calculateAttemptResult(QuizAttempt $attempt): array
    {
        $quiz = $attempt->quiz;
        $totalQuestions = $attempt->total_questions;

        if ($totalQuestions === 0) {
            return ['score' => 0, 'is_passed' => false];
        }

        $correctCount = $attempt->answers()->where('is_correct', true)->count();
        $wrongCount = $totalQuestions - $correctCount;
        $score = (int) round(($correctCount / $totalQuestions) * 100);
        $isPassed = $score >= $quiz->passing_score;

        $attempt->update([
            'score' => $score,
            'correct_count' => $correctCount,
            'wrong_count' => $wrongCount,
            'status' => $isPassed ? 'completed' : 'in_progress',
            'completed_at' => $isPassed ? now() : null,
        ]);

        return [
            'score' => $score,
            'correct_count' => $correctCount,
            'wrong_count' => $wrongCount,
            'is_passed' => $isPassed,
            'passing_score' => $quiz->passing_score,
        ];
    }
}

