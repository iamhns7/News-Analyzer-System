import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200/50 font-sans selection:bg-teal-200 selection:text-teal-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
