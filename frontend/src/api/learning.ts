import api from './axios';
import { ApiResponse, LearningPath, Module, Lesson } from '../types';

export const learningApi = {
  getLearningPaths: async (): Promise<ApiResponse<{ learning_paths: LearningPath[] }>> => {
    const res = await api.get<ApiResponse<{ learning_paths: LearningPath[] }>>('/learning-paths');
    return res.data;
  },

  getLearningPath: async (slug: string): Promise<ApiResponse<{ learning_path: LearningPath }>> => {
    const res = await api.get<ApiResponse<{ learning_path: LearningPath }>>(`/learning-paths/${slug}`);
    return res.data;
  },

  enrollLearningPath: async (slug: string): Promise<ApiResponse<null>> => {
    const res = await api.post<ApiResponse<null>>(`/learning-paths/${slug}/enroll`);
    return res.data;
  },

  getModules: async (learningPathSlug: string): Promise<ApiResponse<{ modules: Module[] }>> => {
    const res = await api.get<ApiResponse<{ modules: Module[] }>>(`/learning-paths/${learningPathSlug}/modules`);
    return res.data;
  },

  getModule: async (slug: string): Promise<ApiResponse<{ module: Module }>> => {
    const res = await api.get<ApiResponse<{ module: Module }>>(`/modules/${slug}`);
    return res.data;
  },

  getModuleLessons: async (moduleSlug: string): Promise<ApiResponse<{ lessons: Lesson[] }>> => {
    const res = await api.get<ApiResponse<{ lessons: Lesson[] }>>(`/modules/${moduleSlug}/lessons`);
    return res.data;
  },

  getLesson: async (slug: string): Promise<ApiResponse<{ lesson: Lesson }>> => {
    const res = await api.get<ApiResponse<{ lesson: Lesson }>>(`/lessons/${slug}`);
    return res.data;
  },

  completeLesson: async (slug: string): Promise<ApiResponse<{ xp_earned: number }>> => {
    const res = await api.post<ApiResponse<{ xp_earned: number }>>(`/lessons/${slug}/complete`);
    return res.data;
  },
};
