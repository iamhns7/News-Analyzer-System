import { Newspaper, Info, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="w-full bg-teal-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold tracking-tight hover:text-teal-300 transition-colors">
          News Analyzer
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-teal-800 transition-colors text-sm font-medium">
            <Newspaper size={18} />
            <span>News</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-teal-800 transition-colors text-sm font-medium">
            <Info size={18} />
            <span>Hakkında</span>
          </Link>
          <Link to="/login" className="flex items-center space-x-2 px-4 py-2 bg-teal-700 rounded-lg hover:bg-teal-600 transition-colors text-sm font-bold">
            <LogIn size={18} />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
