<?php

namespace App\Http\Requests\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class RunCodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string',
            'quiz_question_id' => 'required|integer|exists:quiz_questions,id',
            'quiz_attempt_id' => 'required|integer|exists:quiz_attempts,id',
            'language' => 'nullable|string|max:20',
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Kode program tidak boleh kosong.',
            'quiz_question_id.required' => 'Soal kuis wajib dipilih.',
            'quiz_question_id.exists' => 'Soal kuis tidak ditemukan atau tidak valid.',
            'quiz_attempt_id.required' => 'Sesi kuis tidak valid.',
            'quiz_attempt_id.exists' => 'Sesi kuis tidak ditemukan atau telah berakhir.',
        ];
    }
}
