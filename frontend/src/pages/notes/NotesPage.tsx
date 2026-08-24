import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { notesApi } from '../../api/notes';
import { Note } from '../../types';
import { Bookmark, Trash2, Plus, Loader2, BookOpen, Clock } from 'lucide-react';

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await notesApi.getNotes();
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await notesApi.createNote(title, content);
      setShowModal(false);
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err) {
      console.error('Failed to create note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (!confirm('Apakah kamu yakin ingin menghapus catatan ini?')) return;
    try {
      await notesApi.deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Catatan Saya
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Kumpulan ringkasan dan rumus penting yang kamu tulis selama belajar.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Tambah Catatan Baru</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
            <Bookmark size={40} className="mx-auto text-slate-300" />
            <h3 className="font-sans font-bold text-lg text-slate-800">Belum Ada Catatan</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Simpan poin penting atau rumus Python saat belajar materi untuk membantumu mengingat kembali.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-sans font-semibold text-xs shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <Plus size={14} />
              <span>Buat Catatan Pertama</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-6 transition-all hover:shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded flex items-center gap-1">
                      <BookOpen size={12} />
                      {note.lesson?.title || 'Catatan Umum'}
                    </span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                      title="Hapus Catatan"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <h3 className="font-sans font-bold text-base text-slate-900">{note.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(note.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal New Note */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <h3 className="font-sans font-bold text-lg text-slate-900 flex items-center gap-2">
              <Bookmark size={18} className="text-indigo-600" />
              <span>Tambah Catatan Baru</span>
            </h3>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Catatan</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Rumus Sintaks For Loop"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Isi Catatan</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tulis ringkasan atau penjelasan kamu di sini..."
                  className="w-full text-xs p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Catatan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
};
