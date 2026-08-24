import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/auth';
import { Code2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});
    setIsLoading(true);

    try {
      const res = await authApi.login(email, password);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
        setGeneralError(err.response.data.message || 'Validasi gagal. Periksa kembali input Anda.');
      } else {
        setGeneralError(err.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-200">
            <Code2 size={26} className="stroke-[2.5]" />
          </div>
          <h1 className="font-sans font-bold text-3xl text-slate-900 tracking-tight">
            Selamat Datang Kembali
          </h1>
          <p className="text-slate-500 text-sm mt-1.5 font-body">
            Masuk ke akun Sintaks untuk melanjutkan belajar Python
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {generalError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2.5">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className={`w-full text-sm px-3.5 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.email
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full text-sm px-3.5 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.password
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
              {fieldErrors.password && (
                <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-100 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Memproses Login...</span>
                </>
              ) : (
                <>
                  <span>Masuk Akun</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Account Footer */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Belum punya akun?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 underline">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
