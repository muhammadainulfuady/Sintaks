import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { NOVAPanel } from '../../components/nova/NOVAPanel';
import { learningApi } from '../../api/learning';
import { notesApi } from '../../api/notes';
import { useAuth } from '../../context/AuthContext';
import { Lesson } from '../../types';
import {
  CheckCircle2,
  ChevronRight,
  Zap,
  Bookmark,
  Code2,
  Sparkles,
  Loader2,
  Lightbulb,
} from 'lucide-react';

export const LessonDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, updateUser } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null);

  // Note Modal state
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  useEffect(() => {
    const fetchLessonDetail = async () => {
      if (!slug) return;
      try {
        const res = await learningApi.getLesson(slug);
        setLesson(res.data);
        setIsCompleted(!!res.data.is_completed);
      } catch (err) {
        console.error('Failed to load lesson:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessonDetail();
  }, [slug]);

  const handleComplete = async () => {
    if (!slug || isCompleting) return;
    setIsCompleting(true);
    try {
      const res = await learningApi.completeLesson(slug);
      setIsCompleted(true);
      setXpGained(res.data.xp_awarded || 10);
      if (user) {
        updateUser({ ...user, total_xp: res.data.total_xp });
      }
    } catch (err) {
      console.error('Failed to complete lesson:', err);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteContent || isSavingNote) return;
    setIsSavingNote(true);
    try {
      await notesApi.createNote(noteTitle, noteContent, lesson?.id);
      setShowNoteModal(false);
      setNoteTitle('');
      setNoteContent('');
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      setIsSavingNote(false);
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

  if (!lesson) {
    return (
      <AppLayout>
        <div className="text-center py-20 space-y-4">
          <h2 className="font-sans font-bold text-xl text-slate-800">Materi Pelajaran Tidak Ditemukan</h2>
          <Link to="/learning-paths" className="text-indigo-600 text-xs font-semibold hover:underline">
            Kembali ke Alur Belajar
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/learning-paths" className="hover:text-indigo-600">
              Alur Belajar
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">{lesson.title}</span>
          </div>

          <button
            onClick={() => {
              setNoteTitle(`Catatan: ${lesson.title}`);
              setShowNoteModal(true);
            }}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-sans font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Bookmark size={14} className="text-indigo-600" />
            <span>Buat Catatan</span>
          </button>
        </div>

        {/* 3-Column Layout: Lesson Reading (left/middle) + NOVA Panel (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Lesson Content Area (Max 680px reading width) */}
          <div className="lg:col-span-2 space-y-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            {/* Header */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-full border border-indigo-100">
                  Materi Pembelajaran
                </span>
                <div className="flex items-center gap-1 text-purple-600 font-bold text-xs bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                  <Zap size={14} className="fill-purple-600" />
                  <span>+{lesson.xp_reward || 10} XP</span>
                </div>
              </div>

              <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {lesson.title}
              </h1>
            </div>

            {/* Explanation / Content */}
            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <div className="whitespace-pre-line">{lesson.explanation}</div>
            </div>

            {/* Code Example Block */}
            {lesson.code_example && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1.5 text-indigo-600">
                    <Code2 size={15} />
                    <span>Contoh Kode:</span>
                  </span>
                </div>
                <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-4 rounded-2xl border border-slate-800 shadow-md overflow-x-auto whitespace-pre">
                  {lesson.code_example}
                </div>
              </div>
            )}

            {/* Output Example */}
            {lesson.output_example && (
              <div className="space-y-2">
                <span className="text-xs text-slate-500 font-semibold block">Hasil Output:</span>
                <div className="bg-slate-950 text-slate-200 font-mono text-xs p-3.5 rounded-xl border border-slate-800 whitespace-pre">
                  {lesson.output_example}
                </div>
              </div>
            )}

            {/* Key Points */}
            {lesson.key_points && lesson.key_points.length > 0 && (
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 space-y-2.5">
                <h4 className="font-sans font-bold text-sm text-indigo-950 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" />
                  <span>Poin-Poin Penting:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-indigo-900 pl-5 list-disc font-body leading-relaxed">
                  {lesson.key_points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips & Common Mistakes */}
            {lesson.tips && lesson.tips.length > 0 && (
              <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5 space-y-2">
                <h4 className="font-sans font-bold text-sm text-amber-950 flex items-center gap-2">
                  <Lightbulb size={16} className="text-amber-600" />
                  <span>Tips & Trik:</span>
                </h4>
                <ul className="space-y-1 text-xs text-amber-900 pl-5 list-disc font-body">
                  {lesson.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Complete Lesson Action */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {isCompleted ? (
                <div className="px-5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-sans font-semibold text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Materi Selesai Dipelajari</span>
                </div>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={isCompleting}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center gap-2 disabled:opacity-60"
                >
                  {isCompleting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Menandai Selesai...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Tandai Selesai & Klaim XP</span>
                    </>
                  )}
                </button>
              )}

              {xpGained && (
                <span className="text-xs font-bold text-purple-600 animate-bounce flex items-center gap-1">
                  <Zap size={14} className="fill-purple-600" />
                  +{xpGained} XP Berhasil Ditambahkan!
                </span>
              )}
            </div>
          </div>

          {/* Right Column: NOVA AI Panel */}
          <div className="lg:sticky lg:top-6">
            <NOVAPanel
              lessonId={lesson.id}
              lessonTitle={lesson.title}
            />
          </div>
        </div>
      </div>

      {/* Save Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <h3 className="font-sans font-bold text-lg text-slate-900 flex items-center gap-2">
              <Bookmark size={18} className="text-indigo-600" />
              <span>Simpan Catatan Pelajaran</span>
            </h3>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Catatan</label>
                <input
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Isi Catatan</label>
                <textarea
                  required
                  rows={4}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Tuliskan pemahaman atau rumus yang ingin kamu ingat..."
                  className="w-full text-xs p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingNote}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50"
                >
                  {isSavingNote ? 'Menyimpan...' : 'Simpan Catatan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
};
