import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { learningApi } from '../../api/learning';
import { LearningPath } from '../../types';
import {
  BookOpen,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  Loader2,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await learningApi.getLearningPaths();
        setPaths(res.data.learning_paths || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur rounded-full text-xs font-semibold mb-4 text-indigo-100 border border-white/20">
              <Sparkles size={14} />
              <span>Platform Belajar Python Sintaks</span>
            </div>
            <h1 className="font-sans font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
              Selamat Datang Kembali, {user?.name || 'Developer'}! 👋
            </h1>
            <p className="text-indigo-100 text-sm sm:text-base mt-2 font-body leading-relaxed">
              Lanjutkan langkahmu hari ini. Setiap baris kode yang kamu ketik membawamu satu langkah lebih dekat menuju developer profesional.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/learning-paths"
                className="px-5 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-sans font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>Lanjutkan Belajar</span>
                <ArrowRight size={16} />
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-900/40 backdrop-blur rounded-xl text-xs font-semibold text-indigo-200 border border-white/10">
                <Zap size={15} className="text-amber-300 fill-amber-300" />
                <span>{user?.total_xp || 0} Total XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
            <div className="flex items-center justify-between text-indigo-600">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total XP</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Zap size={18} />
              </div>
            </div>
            <p className="font-mono font-bold text-2xl text-slate-900">{user?.total_xp || 0}</p>
            <p className="text-[11px] text-slate-400">Poin pengalaman terkumpul</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
            <div className="flex items-center justify-between text-emerald-600">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Alur</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <p className="font-mono font-bold text-2xl text-slate-900">{paths.length}</p>
            <p className="text-[11px] text-slate-400">Alur belajar Python aktif</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
            <div className="flex items-center justify-between text-purple-600">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Peringkat</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Award size={18} />
              </div>
            </div>
            <p className="font-mono font-bold text-2xl text-slate-900">#1</p>
            <p className="text-[11px] text-slate-400">Papan peringkat komunitas</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
            <div className="flex items-center justify-between text-amber-600">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Assistant</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Sparkles size={18} />
              </div>
            </div>
            <p className="font-mono font-bold text-2xl text-slate-900">NOVA 3.6</p>
            <p className="text-[11px] text-slate-400">Siap membantu 24/7</p>
          </div>
        </div>

        {/* Active Learning Paths */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-sans font-bold text-xl text-slate-900">Alur Belajar Saya</h2>
              <p className="text-slate-500 text-xs mt-0.5">Pilih alur pembelajaran untuk memulai materi baru</p>
            </div>
            <Link
              to="/learning-paths"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-slate-400">
              <Loader2 size={24} className="animate-spin text-indigo-600" />
            </div>
          ) : paths.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
              <BookOpen size={36} className="mx-auto text-slate-300" />
              <h3 className="font-sans font-bold text-base text-slate-800">Belum Ada Alur Belajar</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Mulai perjalanan kodingmu dengan mendaftar ke alur belajar Python Fundamentals.
              </p>
              <Link
                to="/learning-paths"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-sans font-semibold text-xs shadow-sm hover:bg-indigo-700 transition-colors"
              >
                <span>Jelajahi Alur Belajar</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paths.map((path) => (
                <div
                  key={path.id}
                  className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-6 transition-all hover:shadow-md group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-full border border-indigo-100">
                        {path.level || 'Beginner'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {path.total_modules || 4} Modul
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {path.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                      <BookOpen size={14} className="text-indigo-500" />
                      Python Fundamentals
                    </span>
                    <Link
                      to={`/learning-paths/${path.slug}`}
                      className="px-4 py-2 bg-indigo-600 group-hover:bg-indigo-700 text-white font-sans font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <span>Buka Alur</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-slate-900">Komunitas Belajar Sintaks</h4>
                <p className="text-xs text-slate-500">Diskusi dan bertanya dengan teman belajar lainnya</p>
              </div>
            </div>
            <Link
              to="/community"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-semibold text-xs rounded-xl transition-colors"
            >
              Gabung Chat
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-slate-900">Leaderboard Komunitas</h4>
                <p className="text-xs text-slate-500">Lihat posisi XP kamu di antara pembelajar lain</p>
              </div>
            </div>
            <Link
              to="/leaderboard"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-semibold text-xs rounded-xl transition-colors"
            >
              Lihat Ranking
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
