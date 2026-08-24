import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { learningApi } from '../../api/learning';
import { Module, Lesson } from '../../types';
import {
  FileText,
  ArrowRight,
  Loader2,
  ChevronRight,
  ClipboardList,
  Zap,
} from 'lucide-react';

export const ModuleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [moduleData, setModuleData] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModuleDetail = async () => {
      if (!slug) return;
      try {
        const modRes = await learningApi.getModule(slug);
        setModuleData(modRes.data.module);

        const lessonsRes = await learningApi.getModuleLessons(slug);
        setLessons(lessonsRes.data.lessons || []);
      } catch (err) {
        console.error('Failed to load module detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModuleDetail();
  }, [slug]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
        </div>
      </AppLayout>
    );
  }

  if (!moduleData) {
    return (
      <AppLayout>
        <div className="text-center py-20 space-y-4">
          <h2 className="font-sans font-bold text-xl text-slate-800">Modul Tidak Ditemukan</h2>
          <Link to="/learning-paths" className="text-indigo-600 text-xs font-semibold hover:underline">
            Kembali ke Alur Belajar
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
            Alur Belajar
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-semibold">{moduleData.title}</span>
        </div>

        {/* Module Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
              Modul Pembelajaran
            </span>
          </div>
          <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            {moduleData.title}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-body max-w-3xl">
            {moduleData.description}
          </p>
        </div>

        {/* Lessons & Quiz Tree */}
        <div className="space-y-4">
          <h2 className="font-sans font-bold text-xl text-slate-900 flex items-center gap-2">
            <FileText size={20} className="text-indigo-600" />
            <span>Materi Pelajaran ({lessons.length})</span>
          </h2>

          <div className="space-y-3">
            {lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 transition-all hover:shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-slate-900">
                      {lesson.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 text-purple-600 font-medium">
                        <Zap size={13} className="fill-purple-600" />
                        +{lesson.xp_reward || 10} XP
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/lessons/${lesson.slug}`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs flex-shrink-0"
                >
                  <span>Pelajari Materi</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}

            {/* Quiz Card at the end of Module */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-purple-500/30 text-purple-200 font-semibold text-[11px] rounded-full border border-purple-400/30">
                    Evaluasi Akhir Modul
                  </span>
                </div>
                <h3 className="font-sans font-bold text-lg text-white">
                  Kuis Evaluation — {moduleData.title}
                </h3>
                <p className="text-xs text-purple-200">
                  Uji pemahamanmu tentang {moduleData.title} untuk meraih XP bonus dan membuka modul selanjutnya.
                </p>
              </div>

              <Link
                to={`/quiz/${moduleData.slug}`}
                className="px-5 py-2.5 bg-white text-purple-900 hover:bg-purple-50 font-sans font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 flex-shrink-0"
              >
                <ClipboardList size={16} />
                <span>Mulai Kuis</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
