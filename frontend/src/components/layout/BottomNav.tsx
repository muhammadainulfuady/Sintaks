import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Bookmark, Users, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const items = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Learning', path: '/learning-paths', icon: BookOpen },
    { label: 'Catatan', path: '/notes', icon: Bookmark },
    { label: 'Komunitas', path: '/community', icon: Users },
    { label: 'Profil', path: '/profile', icon: User },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-slate-200 flex items-center justify-around z-40 md:hidden shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full text-[11px] font-medium transition-colors ${
              active ? 'text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon size={18} className={active ? 'text-indigo-600' : 'text-slate-400'} />
            <span className="mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
