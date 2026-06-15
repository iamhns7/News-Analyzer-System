import type { Stat } from '../types';
import * as LucideIcons from 'lucide-react';

export function StatCard({ label, value, iconName }: Stat) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[iconName];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex items-center space-x-4">
      <div className="p-3 bg-teal-50 rounded-full text-teal-600">
        {Icon ? <Icon size={24} /> : null}
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
