import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { authApi } from '../../api/auth';
import logoSintaks from '../../assets/logosintaks.png';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setGeneralError(null);
    setSuccessMessage(null);
    setFieldErrors({});
    if (password !== passwordConfirmation) {
      setFieldErrors({ password_confirmation: ['Konfirmasi password tidak sesuai.'] });
      return;
    }
    setIsLoading(true);
    try {
      await authApi.register(name, username, email, password, passwordConfirmation);
      // Registration successful, show success message then redirect to login
      setSuccessMessage('Akun berhasil dibuat! Silakan login dengan email dan password Anda.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setFieldErrors(err.response?.data?.errors || {});
      setGeneralError(err.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-300/60 lg:grid-cols-[1.05fr_1fr]">
        <aside className="flex min-h-72 flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-700 px-8 py-10 text-center text-white lg:min-h-full lg:rounded-br-[9rem]">
          <img src={logoSintaks} alt="Logo Sintaks" className="h-16 w-16 rounded-2xl object-contain shadow-lg" />
          <h1 className="mt-6 font-sans text-3xl font-extrabold sm:text-4xl">Selamat Datang!</h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-indigo-100">Sudah punya akun? Masuk untuk melanjutkan perjalanan belajarmu.</p>
          <Link to="/login" className="mt-8 rounded-xl border border-white/70 px-9 py-3 text-xs font-bold tracking-wide text-white transition hover:bg-white hover:text-indigo-700">MASUK</Link>
        </aside>

        <section className="px-7 py-10 sm:px-12 lg:px-16 lg:py-14">
          <div className="mx-auto max-w-sm">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Buat Akun</h2>
            <p className="mt-2 text-sm text-slate-500">Daftar menggunakan email dan password.</p>
            {generalError && <div className="mt-6 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"><AlertCircle size={16} className="shrink-0" />{generalError}</div>}
            {successMessage && <div className="mt-6 flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700"><AlertCircle size={16} className="shrink-0" />{successMessage}</div>}
            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <label className="block text-xs font-semibold text-slate-700">Nama
                <input type="text" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama lengkap" className={`mt-1.5 w-full rounded-xl border bg-slate-100 px-4 py-3 text-sm outline-none transition focus:ring-2 ${fieldErrors.name ? 'border-red-400 focus:ring-red-100' : 'border-transparent focus:border-indigo-500 focus:ring-indigo-100'}`} />
                {fieldErrors.name && <span className="mt-1 block text-xs text-red-600">{fieldErrors.name[0]}</span>}
              </label>
              <label className="block text-xs font-semibold text-slate-700">Username
                <input type="text" required value={username} onChange={(event) => setUsername(event.target.value)} placeholder="nama_pengguna" className={`mt-1.5 w-full rounded-xl border bg-slate-100 px-4 py-3 text-sm outline-none transition focus:ring-2 ${fieldErrors.username ? 'border-red-400 focus:ring-red-100' : 'border-transparent focus:border-indigo-500 focus:ring-indigo-100'}`} />
                {fieldErrors.username && <span className="mt-1 block text-xs text-red-600">{fieldErrors.username[0]}</span>}
              </label>
              <label className="block text-xs font-semibold text-slate-700">Email
                <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" className={`mt-1.5 w-full rounded-xl border bg-slate-100 px-4 py-3 text-sm outline-none transition focus:ring-2 ${fieldErrors.email ? 'border-red-400 focus:ring-red-100' : 'border-transparent focus:border-indigo-500 focus:ring-indigo-100'}`} />
                {fieldErrors.email && <span className="mt-1 block text-xs text-red-600">{fieldErrors.email[0]}</span>}
              </label>
              <label className="block text-xs font-semibold text-slate-700">Password
                <input type="password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 8 karakter" className={`mt-1.5 w-full rounded-xl border bg-slate-100 px-4 py-3 text-sm outline-none transition focus:ring-2 ${fieldErrors.password ? 'border-red-400 focus:ring-red-100' : 'border-transparent focus:border-indigo-500 focus:ring-indigo-100'}`} />
                {fieldErrors.password && <span className="mt-1 block text-xs text-red-600">{fieldErrors.password[0]}</span>}
              </label>
              <label className="block text-xs font-semibold text-slate-700">Konfirmasi Password
                <input type="password" required minLength={8} value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} placeholder="Ulangi password" className={`mt-1.5 w-full rounded-xl border bg-slate-100 px-4 py-3 text-sm outline-none transition focus:ring-2 ${fieldErrors.password_confirmation ? 'border-red-400 focus:ring-red-100' : 'border-transparent focus:border-indigo-500 focus:ring-indigo-100'}`} />
                {fieldErrors.password_confirmation && <span className="mt-1 block text-xs text-red-600">{fieldErrors.password_confirmation[0]}</span>}
              </label>
              <button type="submit" disabled={isLoading} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-800 disabled:opacity-60">
                {isLoading ? <><Loader2 size={17} className="animate-spin" />Membuat akun...</> : <>Daftar <ArrowRight size={17} /></>}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};
