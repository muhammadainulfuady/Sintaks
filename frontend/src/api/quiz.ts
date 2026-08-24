import api from './axios';
import { ApiResponse, Quiz, QuizAttempt, CodeExecutionResult } from '../types';

export const quizApi = {
  getModuleQuiz: async (moduleSlug: string): Promise<ApiResponse<Quiz>> => {
    const res = await api.get<ApiResponse<Quiz>>(`/modules/${moduleSlug}/quiz`);
    return res.data;
  },

  startAttempt: async (quizId: number): Promise<ApiResponse<QuizAttempt>> => {
    const res = await api.post<ApiResponse<QuizAttempt>>(`/quizzes/${quizId}/attempts`);
    return res.data;
  },

  submitAnswer: async (
    quizId: number,
    attemptId: number,
    questionId: number,
    answer: number | string
  ): Promise<ApiResponse<{ is_correct: boolean; explanation?: string; xp_awarded?: number; total_xp?: number }>> => {
    const res = await api.post<ApiResponse<{ is_correct: boolean; explanation?: string; xp_awarded?: number; total_xp?: number }>>(
      `/quizzes/${quizId}/attempts/${attemptId}/answers`,
      { quiz_question_id: questionId, answer_value: String(answer) }
    );
    return res.data;
  },

  runCode: async (code: string, questionId?: number): Promise<ApiResponse<CodeExecutionResult>> => {
    const res = await api.post<ApiResponse<CodeExecutionResult>>('/code/run', {
      code,
      question_id: questionId,
    });
    return res.data;
  },
};
