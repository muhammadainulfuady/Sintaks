import api from './axios';
import { ApiResponse, LearningPath, Module, Lesson } from '../types';

export const learningApi = {
  getLearningPaths: async (): Promise<ApiResponse<LearningPath[]>> => {
    const res = await api.get<ApiResponse<LearningPath[]>>('/learning-paths');
    return res.data;
  },

  getLearningPath: async (slug: string): Promise<ApiResponse<LearningPath>> => {
    const res = await api.get<ApiResponse<LearningPath>>(`/learning-paths/${slug}`);
    return res.data;
  },

  enrollLearningPath: async (slug: string): Promise<ApiResponse<null>> => {
    const res = await api.post<ApiResponse<null>>(`/learning-paths/${slug}/enroll`);
    return res.data;
  },

  getModules: async (learningPathSlug: string): Promise<ApiResponse<Module[]>> => {
    const res = await api.get<ApiResponse<Module[]>>(`/learning-paths/${learningPathSlug}/modules`);
    return res.data;
  },

  getModule: async (slug: string): Promise<ApiResponse<Module>> => {
    const res = await api.get<ApiResponse<Module>>(`/modules/${slug}`);
    return res.data;
  },

  getModuleLessons: async (moduleSlug: string): Promise<ApiResponse<Lesson[]>> => {
    const res = await api.get<ApiResponse<Lesson[]>>(`/modules/${moduleSlug}/lessons`);
    return res.data;
  },

  getLesson: async (slug: string): Promise<ApiResponse<Lesson>> => {
    const res = await api.get<ApiResponse<Lesson>>(`/lessons/${slug}`);
    return res.data;
  },

  completeLesson: async (slug: string): Promise<ApiResponse<{ xp_awarded: number; total_xp: number }>> => {
    const res = await api.post<ApiResponse<{ xp_awarded: number; total_xp: number }>>(`/lessons/${slug}/complete`);
    return res.data;
  },
};
