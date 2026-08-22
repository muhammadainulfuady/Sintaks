<?php

namespace App\Http\Requests\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class SubmitTheoryAnswerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'quiz_question_id' => 'required|integer|exists:quiz_questions,id',
            'answer_value' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'quiz_question_id.required' => 'Soal kuis wajib dipilih.',
            'quiz_question_id.exists' => 'Soal kuis tidak ditemukan atau tidak valid.',
            'answer_value.required' => 'Jawaban kuis wajib diisi.',
        ];
    }
}
