import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Bookmark,
  Users,
  LogOut,
  Zap,
  Code2,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Learning Paths', path: '/learning-paths', icon: BookOpen },
    { label: 'Catatan Saya', path: '/notes', icon: Bookmark },
    { label: 'Komunitas', path: '/community', icon: Users },
    { label: 'Leaderboard', path: '/leaderboard', icon: Zap },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-60 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-30 hidden md:flex">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
          <Code2 size={20} className="stroke-[2.5]" />
        </div>
        <div>
          <span className="font-sans font-bold text-xl tracking-tight text-slate-900 block leading-tight">
            Sintaks
          </span>
          <span className="text-[11px] font-medium text-indigo-600 block">Python Learning</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Menu Utama
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={18} className={active ? 'text-indigo-600' : 'text-slate-400'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer Profile & XP */}
      {user && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
          {/* XP Widget */}
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center">
                <Zap size={14} className="fill-white" />
              </div>
              <div>
                <span className="text-xs font-semibold text-purple-900 block leading-tight">Total XP</span>
                <span className="text-[11px] text-purple-600 font-medium">{user.total_xp || 0} XP Gained</span>
              </div>
            </div>
            <span className="font-mono text-sm font-bold text-purple-700">{user.total_xp || 0}</span>
          </div>

          {/* User Account Tile */}
          <div className="flex items-center justify-between pt-1">
            <Link to="/profile" className="flex items-center gap-2.5 min-w-0 group flex-1">
              <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-sm overflow-hidden flex-shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">@{user.username}</p>
              </div>
            </Link>

            <button
              onClick={logout}
              title="Keluar"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
