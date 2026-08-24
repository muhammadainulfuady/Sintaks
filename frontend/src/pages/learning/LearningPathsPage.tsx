import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { learningApi } from '../../api/learning';
import { LearningPath } from '../../types';
import { BookOpen, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export const LearningPathsPage: React.FC = () => {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const res = await learningApi.getLearningPaths();
        setPaths(res.data.learning_paths || []);
      } catch (err) {
        console.error('Failed to load learning paths:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaths();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Alur Pembelajaran
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Pilih alur belajar terstruktur yang dirancang untuk membimbingmu dari dasar hingga mahir.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paths.map((path) => (
              <div
                key={path.id}
                className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-6 sm:p-8 transition-all hover:shadow-md group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                      <BookOpen size={24} />
                    </div>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-full border border-indigo-100">
                      {path.level || 'Beginner'}
                    </span>
                  </div>

                  <h2 className="font-sans font-bold text-xl text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {path.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {path.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-500" />
                      Interaktif & Praktis
                    </span>
                    <span>•</span>
                    <span>Modul Lengkap</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Bahasa: Python 3.x
                  </span>
                  <Link
                    to={`/learning-paths/${path.slug}`}
                    className="px-5 py-2.5 bg-indigo-600 group-hover:bg-indigo-700 text-white font-sans font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Lihat Detail Alur</span>
                    <ArrowRight size={16} />
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
