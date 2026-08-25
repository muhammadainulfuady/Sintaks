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
            'content' => 'required_without:message|string',
            'message' => 'required_without:content|string',
        ];
    }

    public function messages(): array
    {
        return [
            'content.required_without' => 'Gunakan field "content" untuk pesan.',
            'message.required_without' => 'Gunakan field "message" untuk pesan.',
        ];
    }

    public function validated($key = null, $default = null)
    {
        $data = parent::validated($key, $default);
        
        // Normalize: jika 'message' ada, gunakan sebagai 'content'
        if (is_array($data) && isset($data['message']) && !isset($data['content'])) {
            $data['content'] = $data['message'];
            unset($data['message']);
        }
        
        return $data;
    }
}
