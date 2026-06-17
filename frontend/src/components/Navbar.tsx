import { Newspaper, Info, LogIn, LogOut, UserPlus, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
      <div className="max-w-[1600px] w-full mx-auto px-6 xl:px-12 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-teal-700 to-emerald-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          News Analyzer
        </Link>
        <div className="flex items-center space-x-6 text-slate-600">
          <Link to="/" className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all duration-300 text-sm font-semibold">
            <Newspaper size={18} />
            <span>Haberler</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all duration-300 text-sm font-semibold">
            <Info size={18} />
            <span>Hakkında</span>
          </Link>

          {isAuthenticated && user ? (
            <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                <div className="bg-teal-100 text-teal-700 p-1.5 rounded-full">
                  <User size={16} />
                </div>
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-all duration-300 text-sm font-bold cursor-pointer"
              >
                <LogOut size={18} />
                <span>Çıkış Yap</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <Link to="/login" className="flex items-center space-x-1.5 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-300 text-sm font-bold">
                <LogIn size={18} />
                <span>Giriş Yap</span>
              </Link>
              <Link to="/register" className="flex items-center space-x-1.5 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm font-bold">
                <UserPlus size={18} />
                <span>Kayıt Ol</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
