import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Newspaper } from 'lucide-react';
import type { Article } from '../types';

export function NewsCard({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false);
  const isTrusted = article.trustScore >= 50;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-teal-200">
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-44 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            (target.nextElementSibling as HTMLElement)?.classList.remove('hidden');
          }}
        />
      ) : null}
      {/* Placeholder when no image or image fails to load */}
      <div className={`w-full h-36 bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center ${article.imageUrl ? 'hidden' : ''}`}>
        <Newspaper size={40} className="text-teal-300" />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1 relative">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-base font-bold text-slate-800 leading-tight flex-1">
            {article.title}
          </h3>
          <span
            className={`shrink-0 px-3 py-1 text-xs font-bold rounded-full ${
              isTrusted
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-rose-100 text-rose-700'
            }`}
          >
            {article.trustScore}
          </span>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {article.aiSummary}
        </p>

        {expanded && (
          <div className="mt-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs font-semibold text-teal-700 uppercase mb-2">Orijinal Haber</p>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {article.originalContent}
            </p>
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs text-teal-600 hover:text-teal-800 font-medium transition-colors"
              >
                <ExternalLink size={14} />
                Kaynağa Git
              </a>
            )}
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-auto flex items-center justify-center gap-1.5 w-full py-2 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
        >
          {expanded ? (
            <>
              <ChevronUp size={16} />
              Kapat
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Haberin Tamamı
            </>
          )}
        </button>
      </div>
    </div>
  );
}
