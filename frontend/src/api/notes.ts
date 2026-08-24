import api from './axios';
import { ApiResponse, Note } from '../types';

export const notesApi = {
  getNotes: async (): Promise<ApiResponse<{ notes: Note[] }>> => {
    const res = await api.get<ApiResponse<{ notes: Note[] }>>('/notes');
    return res.data;
  },

  createNote: async (title: string, content: string, lessonId?: number): Promise<ApiResponse<{ note: Note }>> => {
    const res = await api.post<ApiResponse<{ note: Note }>>('/notes', {
      title,
      content,
      lesson_id: lessonId,
    });
    return res.data;
  },

  deleteNote: async (id: number): Promise<ApiResponse<null>> => {
    const res = await api.delete<ApiResponse<null>>(`/notes/${id}`);
    return res.data;
  },
};
