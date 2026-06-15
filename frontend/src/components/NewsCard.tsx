import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Newspaper } from 'lucide-react';
import type { Article } from '../types';

export function NewsCard({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false);
  const isTrusted = article.trustScore >= 50;

  return (
    <div className="group bg-white/90 backdrop-blur-sm cursor-pointer rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_20px_40px_-12px_rgba(20,184,166,0.15)] hover:-translate-y-1.5 hover:border-teal-200">
      <div className="w-full h-48 overflow-hidden relative bg-slate-50">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              (target.nextElementSibling as HTMLElement)?.classList.remove('hidden');
            }}
          />
        ) : null}
        {/* Placeholder when no image or image fails to load */}
        <div className={`absolute inset-0 bg-gradient-to-br from-slate-100 to-teal-50/50 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 ${article.imageUrl ? 'hidden' : ''}`}>
          <Newspaper size={44} className="text-teal-200" />
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1 relative">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-bold text-slate-800 leading-tight flex-1 group-hover:text-teal-800 transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
          <span
            className={`shrink-0 px-3 py-1.5 text-xs font-bold rounded-xl shadow-sm border ${
              isTrusted
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100/60'
                : 'bg-rose-50 text-rose-600 border-rose-100/60'
            }`}
          >
            {article.trustScore} Puan
          </span>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {article.aiSummary}
        </p>

        {expanded && (
          <div className="mt-2 p-5 bg-slate-50/80 rounded-xl border border-slate-100/60">
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Newspaper size={14} />
              Orijinal Haber
            </p>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {article.originalContent}
            </p>
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-teal-700 hover:text-white bg-teal-50 hover:bg-teal-600 px-4 py-2.5 rounded-lg transition-all duration-300 shadow-sm"
              >
                Kaynağa Git <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="mt-auto pt-4 flex items-center justify-center gap-1.5 w-full text-sm font-semibold text-slate-400 group-hover:text-teal-600 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp size={16} />
              Daralt
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              İncele
            </>
          )}
        </button>
      </div>
    </div>
  );
}
