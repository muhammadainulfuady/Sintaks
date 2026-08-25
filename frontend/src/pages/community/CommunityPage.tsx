import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { communityApi } from '../../api/community';
import { Community } from '../../types';
import { Users, MessageSquare, Loader2, UserPlus, Check, Plus, X, AlertCircle } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchCommunities = async () => {
    try {
      const res = await communityApi.getCommunities();
      setCommunities(res.data || []);
    } catch (err) {
      console.error('Failed to fetch communities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCommunity = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || isCreating) return;
    setIsCreating(true);
    setError(null);
    try {
      await communityApi.createCommunity(name.trim(), description.trim());
      setName('');
      setDescription('');
      setIsCreateOpen(false);
      await fetchCommunities();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Komunitas belum dapat dibuat. Coba lagi.');
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleJoinLeave = async (comm: Community) => {
    if (comm.is_owner) {
      setActionMessage('Pemilik komunitas tidak dapat keluar dari komunitasnya sendiri.');
      return;
    }

    if (comm.is_member && !window.confirm(`Keluar dari ${comm.name}?`)) return;

    try {
      setActionMessage(null);
      if (comm.is_member) {
        await communityApi.leaveCommunity(comm.id);
        setActionMessage(`Kamu telah keluar dari ${comm.name}.`);
      } else {
        await communityApi.joinCommunity(comm.id);
        setActionMessage(`Kamu telah bergabung dengan ${comm.name}.`);
      }
      fetchCommunities();
    } catch (err: any) {
      console.error('Failed to join/leave community:', err);
      setActionMessage(err.response?.data?.message || 'Aksi komunitas belum berhasil. Coba lagi.');
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Komunitas Belajar
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Temukan komunitas rekomendasi, bergabung, atau buat ruang diskusimu sendiri.
            </p>
          </div>
          <button
            onClick={() => { setError(null); setIsCreateOpen(true); }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-100 transition-colors hover:bg-indigo-700"
          >
            <Plus size={16} /> Buat Komunitas
          </button>
        </div>

        {isCreateOpen && (
          <form onSubmit={handleCreateCommunity} className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div><h2 className="font-bold text-base text-slate-900">Buat Komunitas Baru</h2><p className="mt-0.5 text-xs text-slate-500">Ajak pembelajar lain berdiskusi bersama.</p></div>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-700" aria-label="Tutup form"><X size={18} /></button>
            </div>
            {error && <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"><AlertCircle size={15} />{error}</div>}
            <input value={name} onChange={(event) => setName(event.target.value)} maxLength={100} required placeholder="Contoh: Python Pemula Jakarta" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500" />
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} placeholder="Deskripsi singkat komunitas (opsional)" className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500" />
            <div className="flex justify-end gap-2"><button type="button" onClick={() => setIsCreateOpen(false)} className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-white">Batal</button><button type="submit" disabled={!name.trim() || isCreating} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50">{isCreating ? 'Membuat...' : 'Buat Komunitas'}</button></div>
          </form>
        )}

        {actionMessage && <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-xs font-medium text-indigo-700">{actionMessage}</div>}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-indigo-600" />
          </div>
        ) : (
          communities.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <Users size={34} className="mx-auto text-slate-300" />
              <h2 className="mt-3 font-bold text-slate-800">Belum ada komunitas</h2>
              <p className="mt-1 text-xs text-slate-500">Jadilah yang pertama membuat komunitas belajar.</p>
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
                    disabled={comm.is_owner}
                    className={`px-3 py-1.5 rounded-xl font-sans font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                      comm.is_owner
                        ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed'
                        : comm.is_member
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100'
                    }`}
                  >
                    {comm.is_owner ? (
                      <><Check size={14} /><span>Pemilik</span></>
                    ) : comm.is_member ? (
                      <>
                        <Check size={14} />
                        <span>Keluar</span>
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
          )
        )}
      </div>
    </AppLayout>
  );
};
