import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { learningApi } from '../../api/learning';
import { LearningPath, Module } from '../../types';
import {
  BookOpen,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ChevronRight,
  Layers,
} from 'lucide-react';

export const LearningPathDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [path, setPath] = useState<LearningPath | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    const fetchPathDetail = async () => {
      if (!slug) return;
      try {
        const pathRes = await learningApi.getLearningPath(slug);
        setPath(pathRes.data.learning_path);

        const modulesRes = await learningApi.getModules(slug);
        setModules(modulesRes.data.modules || []);
      } catch (err) {
        console.error('Failed to load learning path detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPathDetail();
  }, [slug]);

  const handleEnroll = async () => {
    if (!slug || isEnrolling) return;
    setIsEnrolling(true);
    try {
      await learningApi.enrollLearningPath(slug);
      if (path) {
        setPath({ ...path, is_enrolled: true });
      }
    } catch (err) {
      console.error('Failed to enroll:', err);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
        </div>
      </AppLayout>
    );
  }

  if (!path) {
    return (
      <AppLayout>
        <div className="text-center py-20 space-y-4">
          <h2 className="font-sans font-bold text-xl text-slate-800">Alur Belajar Tidak Ditemukan</h2>
          <Link to="/learning-paths" className="text-indigo-600 text-xs font-semibold hover:underline">
            Kembali ke Daftar Alur
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/learning-paths" className="hover:text-indigo-600">
            Alur Pembelajaran
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-semibold">{path.title}</span>
        </div>

        {/* Hero Path Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-full border border-indigo-100">
              {path.level || 'Beginner'}
            </span>
            <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {path.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed font-body">
              {path.description}
            </p>
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-3 w-full sm:w-auto flex-shrink-0">
            {path.is_enrolled ? (
              <span className="px-5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-sans font-semibold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>Terdaftar dalam Alur Ini</span>
              </span>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isEnrolling ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Mendaftarkan...</span>
                  </>
                ) : (
                  <>
                    <span>Daftar Alur Ini Gratis</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Modules Section Tree */}
        <div className="space-y-4">
          <div>
            <h2 className="font-sans font-bold text-xl text-slate-900 flex items-center gap-2">
              <Layers size={20} className="text-indigo-600" />
              <span>Daftar Modul Pembelajaran</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Selesaikan modul secara berurutan untuk membuka materi berikutnya.
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((mod, idx) => (
              <div
                key={mod.id}
                className={`bg-white border rounded-2xl p-6 transition-all ${
                  mod.is_locked
                    ? 'border-slate-200 opacity-75 bg-slate-50/50'
                    : 'border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                        Modul {idx + 1}
                      </span>
                      {mod.is_locked && (
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 font-semibold text-[11px] rounded-full flex items-center gap-1">
                          <Lock size={12} /> terkunci
                        </span>
                      )}
                    </div>

                    <h3 className="font-sans font-bold text-lg text-slate-900">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                      {mod.description}
                    </p>
                  </div>

                  <div>
                    {mod.is_locked ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-slate-100 text-slate-400 font-sans font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-not-allowed"
                      >
                        <Lock size={14} />
                        <span>Terkunci</span>
                      </button>
                    ) : (
                      <Link
                        to={`/modules/${mod.slug}`}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Mulai Modul</span>
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
