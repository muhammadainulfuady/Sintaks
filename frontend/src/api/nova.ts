import api from './axios';
import { ApiResponse } from '../types';

export interface NovaChatResponse {
  response: string;
  context_used?: {
    learning_path?: string;
    module?: string;
    lesson?: string;
  };
}

export const novaApi = {
  chat: async (
    message: string,
    context?: { lesson_id?: number; module_id?: number },
    conversationHistory?: { role: 'user' | 'assistant'; content: string }[]
  ): Promise<ApiResponse<NovaChatResponse>> => {
    const res = await api.post<ApiResponse<NovaChatResponse>>('/nova/chat', {
      message,
      context,
      conversation_history: conversationHistory,
    });
    return res.data;
  },
};
