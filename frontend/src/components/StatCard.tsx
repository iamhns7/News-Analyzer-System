import type { Stat } from '../types';
import * as LucideIcons from 'lucide-react';

export function StatCard({ label, value, iconName }: Stat) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[iconName];

  return (
    <div className="group bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-100/60 flex items-center space-x-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-teal-100 transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-3.5 bg-gradient-to-br from-teal-50 to-emerald-50/50 rounded-2xl text-teal-600 shadow-inner border border-teal-100/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
        {Icon ? <Icon size={26} strokeWidth={2.5} /> : null}
      </div>
      <div className="relative z-10">
        <p className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-1">{label}</p>
        <p className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">{value}</p>
      </div>
    </div>
  );
}
