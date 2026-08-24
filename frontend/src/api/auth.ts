import api from './axios';
import { ApiResponse, User } from '../types';

export interface LoginResponseData {
  token: string;
  user: User;
}

export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<LoginResponseData>> => {
    const res = await api.post<ApiResponse<LoginResponseData>>('/auth/login', { email, password });
    return res.data;
  },

  register: async (
    name: string,
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<ApiResponse<LoginResponseData>> => {
    const res = await api.post<ApiResponse<LoginResponseData>>('/auth/register', {
      name,
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    return res.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const res = await api.post<ApiResponse<null>>('/auth/logout');
    return res.data;
  },

  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    const res = await api.get<ApiResponse<{ user: User }>>('/profile');
    return res.data;
  },

  updateProfile: async (data: { name?: string; username?: string; avatar?: string }): Promise<ApiResponse<{ user: User }>> => {
    const res = await api.put<ApiResponse<{ user: User }>>('/profile', data);
    return res.data;
  },

  getPublicProfile: async (username: string): Promise<ApiResponse<{ user: User }>> => {
    const res = await api.get<ApiResponse<{ user: User }>>(`/profile/${username}`);
    return res.data;
  },
};
