import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/auth';
import logoSintaks from '../../assets/logosintaks.png';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setGeneralError(null);
    setFieldErrors({});
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setFieldErrors(err.response?.data?.errors || {});
      setGeneralError(err.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-300/60 lg:grid-cols-[1fr_1.05fr]">
        <section className="order-2 px-7 py-10 sm:px-12 lg:order-1 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-sm">
            <h1 className="font-sans text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Masuk</h1>
            <p className="mt-2 text-sm text-slate-500">Gunakan email dan password akun Sintaks Anda.</p>
            {generalError && <div className="mt-6 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"><AlertCircle size={16} className="shrink-0" />{generalError}</div>}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block text-xs font-semibold text-slate-700">Email
                <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" className={`mt-1.5 w-full rounded-xl border bg-slate-100 px-4 py-3 text-sm outline-none transition focus:ring-2 ${fieldErrors.email ? 'border-red-400 focus:ring-red-100' : 'border-transparent focus:border-indigo-500 focus:ring-indigo-100'}`} />
                {fieldErrors.email && <span className="mt-1 block text-xs text-red-600">{fieldErrors.email[0]}</span>}
              </label>
              <label className="block text-xs font-semibold text-slate-700">Password
                <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Masukkan password" className={`mt-1.5 w-full rounded-xl border bg-slate-100 px-4 py-3 text-sm outline-none transition focus:ring-2 ${fieldErrors.password ? 'border-red-400 focus:ring-red-100' : 'border-transparent focus:border-indigo-500 focus:ring-indigo-100'}`} />
                {fieldErrors.password && <span className="mt-1 block text-xs text-red-600">{fieldErrors.password[0]}</span>}
              </label>
              <button type="submit" disabled={isLoading} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-800 disabled:opacity-60">
                {isLoading ? <><Loader2 size={17} className="animate-spin" />Memproses...</> : <>Masuk <ArrowRight size={17} /></>}
              </button>
            </form>
          </div>
        </section>

        <aside className="order-1 flex min-h-72 flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-700 px-8 py-10 text-center text-white lg:order-2 lg:min-h-full lg:rounded-bl-[9rem]">
          <img src={logoSintaks} alt="Logo Sintaks" className="h-16 w-16 rounded-2xl object-contain shadow-lg" />
          <h2 className="mt-6 font-sans text-3xl font-extrabold sm:text-4xl">Halo, Teman!</h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-indigo-100">Buat akun untuk mulai menjelajahi materi dan fitur Sintaks.</p>
          <Link to="/register" className="mt-8 rounded-xl border border-white/70 px-9 py-3 text-xs font-bold tracking-wide text-white transition hover:bg-white hover:text-indigo-700">DAFTAR</Link>
        </aside>
      </div>
    </main>
  );
};
