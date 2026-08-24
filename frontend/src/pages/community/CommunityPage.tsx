import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { communityApi } from '../../api/community';
import { Community } from '../../types';
import { Users, MessageSquare, Loader2, UserPlus, Check } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCommunities = async () => {
    try {
      const res = await communityApi.getCommunities();
      setCommunities(res.data.communities || []);
    } catch (err) {
      console.error('Failed to fetch communities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleJoinLeave = async (comm: Community) => {
    try {
      if (comm.is_member) {
        await communityApi.leaveCommunity(comm.id);
      } else {
        await communityApi.joinCommunity(comm.id);
      }
      fetchCommunities();
    } catch (err) {
      console.error('Failed to join/leave community:', err);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Komunitas Belajar
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Bergabung dengan grup diskusi, bertukar ide, dan belajar Python bersama sesama pembelajar.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((comm) => (
              <div
                key={comm.id}
                className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-6 transition-all hover:shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      <Users size={24} />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {comm.members_count || 1} Anggota
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg text-slate-900">{comm.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {comm.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleJoinLeave(comm)}
                    className={`px-3 py-1.5 rounded-xl font-sans font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                      comm.is_member
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100'
                    }`}
                  >
                    {comm.is_member ? (
                      <>
                        <Check size={14} />
                        <span>Tergabung</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} />
                        <span>Gabung</span>
                      </>
                    )}
                  </button>

                  <Link
                    to={`/community/${comm.id}`}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <MessageSquare size={14} />
                    <span>Buka Chat</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};
