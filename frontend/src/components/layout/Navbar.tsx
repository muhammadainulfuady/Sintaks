import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LayoutDashboard, LogOut, Menu, NotebookPen, Trophy, Users, X, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoTripleC from '../../assets/Salinan LOGO TRIPLE-C.png';
import logoTcc from '../../assets/Salinan LOGO TCC.png';
import logoJack from '../../assets/JACK 3.png';
import logoSintaks from '../../assets/logosintaks.png';

const navigationItems = [
  { label: 'Beranda', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Pembelajaran', path: '/learning-paths', icon: BookOpen },
  { label: 'Catatan', path: '/notes', icon: NotebookPen },
  { label: 'Komunitas', path: '/community', icon: Users },
  { label: 'Peringkat', path: '/leaderboard', icon: Trophy },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path: string) => path === '/dashboard' ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex shrink-0 items-center gap-2.5" aria-label="Sintaks beranda">
          <div className="flex items-center gap-1.5" aria-label="Logo partner">
            <img src={logoTripleC} alt="Logo Triple-C" className="h-7 w-auto object-contain" />
            <img src={logoTcc} alt="Logo TCC" className="h-7 w-auto object-contain" />
            <img src={logoJack} alt="Logo JACK" className="h-7 w-auto object-contain" />
          </div>
          <img src={logoSintaks} alt="Logo Sintaks" className="h-9 w-9 rounded-xl object-contain" />
          <span className="font-sans text-xl font-extrabold tracking-tight text-slate-900">Sintaks</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {navigationItems.map(({ label, path }) => (
            <Link key={path} to={path} className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive(path) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <div className="hidden items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 md:flex">
            <Zap size={14} className="fill-violet-600" /> {user?.total_xp || 0} XP
          </div>
          <Link to="/profile" className="flex items-center gap-2 text-right">
            <div className="hidden md:block"><p className="max-w-28 truncate text-xs font-bold text-slate-800">{user?.name}</p><p className="max-w-28 truncate text-[11px] text-slate-500">@{user?.username}</p></div>
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-indigo-200 bg-indigo-100 text-sm font-bold text-indigo-700">
              {user?.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" /> : user?.name?.charAt(0).toUpperCase()}
            </div>
          </Link>
          <button onClick={logout} title="Keluar" className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"><LogOut size={18} /></button>
        </div>

        <button type="button" onClick={() => setIsOpen((open) => !open)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden" aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'} aria-expanded={isOpen}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden" aria-label="Navigasi seluler">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navigationItems.map(({ label, path, icon: Icon }) => (
              <Link key={path} to={path} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive(path) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Icon size={18} />{label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-slate-100 px-3 pt-3 sm:hidden"><Link to="/profile" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-700">Profil Saya</Link><button onClick={logout} className="text-sm font-semibold text-red-600">Keluar</button></div>
          </div>
        </nav>
      )}
    </header>
  );
};
