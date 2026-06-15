import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Newspaper, X, } from 'lucide-react';
import type { Article } from '../types';

export function NewsCard({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isTrusted = article.analysis.trustScore >= 50;

  const handleOpen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpanded(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpanded(false);
  };

  return (
    <>
      <div 
        className="group bg-white/90 backdrop-blur-sm cursor-pointer rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_20px_40px_-12px_rgba(20,184,166,0.15)] hover:-translate-y-1.5 hover:border-teal-200"
        onClick={handleOpen}
      >
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
            <Newspaper size={44} className="text-teal-200/70 animate-pulse" />
          </div>
        </div>

        <div className="p-6 flex flex-col gap-4 flex-1 relative">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col flex-1 gap-1">
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{article.source.name}</span>
              <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-teal-800 transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>
            </div>
            <span
              className={`shrink-0 px-3 py-1.5 text-xs font-bold rounded-xl shadow-sm border ${
                isTrusted
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100/60'
                  : 'bg-rose-50 text-rose-600 border-rose-100/60'
              }`}
            >
              {article.analysis.trustScore} Puan
            </span>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
            {article.analysis.aiSummary}
          </p>

          <button
            onClick={handleOpen}
            className="mt-auto pt-4 flex items-center justify-center gap-1.5 w-full text-sm font-bold text-slate-400 group-hover:text-teal-600 transition-all duration-300 cursor-pointer bg-gradient-to-t from-white via-white to-transparent"
          >
            <ExternalLink size={16} />
            İncele
          </button>
        </div>
      </div>

      {expanded && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md transition-all duration-300" 
          onClick={handleClose}
        >
          <div 
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-teal-900/20 border border-white/50 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 pr-4 line-clamp-1">{article.title}</h2>
              <button 
                onClick={handleClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto min-h-[300px] flex flex-col">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-20 bg-slate-200 rounded-xl animate-pulse"></div>
                    <div className="h-8 w-32 bg-slate-200 rounded-lg animate-pulse"></div>
                  </div>
                  
                  <div>
                    <div className="h-5 w-32 bg-slate-200 rounded mb-3 animate-pulse"></div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded w-4/6 animate-pulse"></div>
                    </div>
                  </div>

                  <div>
                    <div className="h-5 w-48 bg-slate-200 rounded mb-3 animate-pulse"></div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-4">
                     <span
                      className={`shrink-0 px-3 py-1.5 text-sm font-bold rounded-xl shadow-sm border ${
                        isTrusted
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100/60'
                          : 'bg-rose-50 text-rose-600 border-rose-100/60'
                      }`}
                    >
                      {article.analysis.trustScore} Puan
                    </span>
                    {article.url && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 px-5 py-2 rounded-xl transition-all duration-300 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/40 hover:-translate-y-0.5"
                      >
                        Kaynağa Git <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-2">Yapay Zeka Özeti</h3>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {article.analysis.aiSummary}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Newspaper size={14} />
                      Orijinal Haber İçeriği
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {article.originalContent}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

