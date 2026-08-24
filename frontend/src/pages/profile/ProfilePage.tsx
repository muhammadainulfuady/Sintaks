import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/auth';
import { Zap, Check, AlertCircle, Loader2 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'avatar_1');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const presetAvatars = [
    { id: 'avatar_1', name: 'Developer Default' },
    { id: 'avatar_2', name: 'Python Explorer' },
    { id: 'avatar_3', name: 'Code Wizard' },
    { id: 'avatar_4', name: 'Cyber Learner' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setGeneralError(null);
    setFieldErrors({});

    try {
      const res = await authApi.updateProfile({
        name,
        username,
        avatar: selectedAvatar,
      });
      const userObj = (res.data as any)?.user || res.data;
      updateUser(userObj);
      setMessage('Profil berhasil diperbarui!');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
        setGeneralError(err.response.data.message || 'Validasi gagal. Periksa input Anda.');
      } else {
        setGeneralError(err.response?.data?.message || 'Gagal memperbarui profil.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Pengaturan Profil
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Kelola informasi akun dan pilih avatar favoritmu.
          </p>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-2xl overflow-hidden flex-shrink-0 shadow-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="font-sans font-bold text-xl text-slate-900">{user?.name}</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">@{user?.username}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-full font-bold text-xs">
              <Zap size={14} className="fill-purple-600" />
              <span>{user?.total_xp || 0} XP Gained</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          {message && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <Check size={16} className="text-emerald-600 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {generalError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Pilih Preset Avatar
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presetAvatars.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatar(av.id)}
                    className={`p-3 rounded-2xl border text-center font-medium text-xs transition-all flex flex-col items-center gap-2 ${
                      selectedAvatar === av.id
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold shadow-xs'
                        : 'border-slate-200 hover:border-indigo-200 text-slate-700'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {av.name.charAt(0)}
                    </div>
                    <span className="text-[11px] truncate w-full">{av.name}</span>
                  </button>
                ))}
              </div>
              {fieldErrors.avatar && (
                <p className="text-red-600 text-xs mt-1.5 font-medium">{fieldErrors.avatar[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full text-sm px-3.5 py-2.5 bg-slate-50 border rounded-xl focus:outline-none transition-all ${
                  fieldErrors.name
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-slate-200 focus:border-indigo-500'
                }`}
              />
              {fieldErrors.name && (
                <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.name[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full text-sm px-3.5 py-2.5 bg-slate-50 border rounded-xl focus:outline-none font-mono transition-all ${
                  fieldErrors.username
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-slate-200 focus:border-indigo-500'
                }`}
              />
              {fieldErrors.username && (
                <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.username[0]}</p>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-100 disabled:opacity-60 flex items-center gap-2"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
