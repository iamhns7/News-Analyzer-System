import { Newspaper, Info, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
      <div className="max-w-[1600px] w-full mx-auto px-6 xl:px-12 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-teal-700 to-emerald-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          News Analyzer
        </Link>
        <div className="flex items-center space-x-6 text-slate-600">
          <Link to="/" className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all duration-300 text-sm font-semibold">
            <Newspaper size={18} />
            <span>News</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all duration-300 text-sm font-semibold">
            <Info size={18} />
            <span>Hakkında</span>
          </Link>
          <Link to="/login" className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm font-bold">
            <LogIn size={18} />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
