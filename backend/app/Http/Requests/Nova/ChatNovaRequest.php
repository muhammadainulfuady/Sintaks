<?php

namespace App\Http\Requests\Nova;

use Illuminate\Foundation\Http\FormRequest;

class ChatNovaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'message' => ['required', 'string', 'max:4000'],
            'context' => ['sometimes', 'array'],
            'context.lesson_id' => ['nullable', 'integer', 'exists:lessons,id'],
            'context.module_id' => ['nullable', 'integer', 'exists:modules,id'],
            'conversation_history' => ['sometimes', 'array', 'max:20'],
            'conversation_history.*.role' => ['required', 'in:user,assistant'],
            'conversation_history.*.content' => ['required', 'string', 'max:4000'],
        ];
    }
}