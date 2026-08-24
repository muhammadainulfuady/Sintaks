import api from './axios';
import { ApiResponse, Community, CommunityMessage } from '../types';

export const communityApi = {
  getCommunities: async (): Promise<ApiResponse<{ communities: Community[] }>> => {
    const res = await api.get<ApiResponse<{ communities: Community[] }>>('/communities');
    return res.data;
  },

  getCommunity: async (id: number): Promise<ApiResponse<{ community: Community }>> => {
    const res = await api.get<ApiResponse<{ community: Community }>>(`/communities/${id}`);
    return res.data;
  },

  joinCommunity: async (id: number): Promise<ApiResponse<null>> => {
    const res = await api.post<ApiResponse<null>>(`/communities/${id}/join`);
    return res.data;
  },

  leaveCommunity: async (id: number): Promise<ApiResponse<null>> => {
    const res = await api.post<ApiResponse<null>>(`/communities/${id}/leave`);
    return res.data;
  },

  getMessages: async (id: number): Promise<ApiResponse<{ messages: CommunityMessage[] }>> => {
    const res = await api.get<ApiResponse<{ messages: CommunityMessage[] }>>(`/communities/${id}/messages`);
    return res.data;
  },

  postMessage: async (id: number, content: string): Promise<ApiResponse<{ message: CommunityMessage }>> => {
    const res = await api.post<ApiResponse<{ message: CommunityMessage }>>(`/communities/${id}/messages`, { content });
    return res.data;
  },
};
