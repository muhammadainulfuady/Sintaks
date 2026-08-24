import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { xpApi } from '../../api/xp';
import { LeaderboardEntry } from '../../types';
import { Zap, Trophy, Loader2 } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await xpApi.getLeaderboard();
        setLeaderboard(res.data.leaderboard || []);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight flex items-center gap-2">
            <Trophy size={28} className="text-amber-500" />
            <span>Leaderboard Sintaks</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Papan peringkat top pembelajar Python dengan total XP terbanyak.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200 grid grid-cols-12 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span className="col-span-2 text-center">Rank</span>
              <span className="col-span-7">Pembelajar</span>
              <span className="col-span-3 text-right pr-4">Total XP</span>
            </div>

            <div className="divide-y divide-slate-100">
              {leaderboard.map((entry, idx) => {
                const rank = idx + 1;
                const isTop3 = rank <= 3;
                return (
                  <div
                    key={entry.user_id}
                    className={`p-4 grid grid-cols-12 items-center transition-colors ${
                      isTop3 ? 'bg-amber-50/20' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="col-span-2 text-center">
                      {rank === 1 && (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-xs shadow-xs">
                          🥇 1
                        </span>
                      )}
                      {rank === 2 && (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs shadow-xs">
                          🥈 2
                        </span>
                      )}
                      {rank === 3 && (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-900/10 text-amber-900 font-bold text-xs shadow-xs">
                          🥉 3
                        </span>
                      )}
                      {rank > 3 && (
                        <span className="font-mono text-sm font-semibold text-slate-500">#{rank}</span>
                      )}
                    </div>

                    <div className="col-span-7 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-xs overflow-hidden">
                        {entry.name ? entry.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{entry.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">@{entry.username}</p>
                      </div>
                    </div>

                    <div className="col-span-3 text-right pr-4">
                      <span className="font-mono font-extrabold text-sm text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 inline-flex items-center gap-1">
                        <Zap size={13} className="fill-purple-600" />
                        {entry.total_xp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
