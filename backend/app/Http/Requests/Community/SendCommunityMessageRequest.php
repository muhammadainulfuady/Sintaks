<?php

namespace App\Http\Requests\Community;

use Illuminate\Foundation\Http\FormRequest;

class SendCommunityMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'content' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'content.required' => 'Isi pesan tidak boleh kosong.',
        ];
    }
}
