import api from './axios';
import { ApiResponse, LeaderboardEntry } from '../types';

export const xpApi = {
  getLeaderboard: async (): Promise<ApiResponse<{ leaderboard: LeaderboardEntry[] }>> => {
    const res = await api.get<ApiResponse<{ leaderboard: LeaderboardEntry[] }>>('/leaderboard');
    return res.data;
  },
};
