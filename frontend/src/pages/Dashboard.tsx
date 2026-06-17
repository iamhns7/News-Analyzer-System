import { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { NewsCard } from '../components/NewsCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Article, Stat } from '../types';
import { fetchArticles } from '../services/api';

const ITEMS_PER_PAGE = 16;

export function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<Stat[]>([
    { label: 'İncelenen Haberler', value: 0, iconName: 'BarChart3' },
    { label: 'Genel Güvenilirlik', value: '%0', iconName: 'ShieldCheck' },
    { label: 'Yanıltıcı İçerik', value: 0, iconName: 'AlertTriangle' },
  ]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedArticles: Article[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          originalContent: item.originalContent || "",
          imageUrl: item.imageUrl || null,
          url: item.url || "",
          source: {
            name: item.source?.name || "Bilinmiyor",
          },
          analysis: {
            aiSummary: item.analysis?.aiSummary || "Analiz yok",
            trustScore: item.analysis?.trustScore || 0,
            isFake: item.analysis?.isFake || false,
          }
        }));

        setArticles(mappedArticles);

        const total = mappedArticles.length;
        const fakeCount = mappedArticles.filter(a => a.analysis.isFake).length;
        const avgTrust = total > 0
          ? Math.round(mappedArticles.reduce((acc, a) => acc + a.analysis.trustScore, 0) / total)
          : 0;

        setStats([
          { label: 'İncelenen Haberler', value: total, iconName: 'BarChart3' },
          { label: 'Genel Güvenilirlik', value: `%${avgTrust}`, iconName: 'ShieldCheck' },
          { label: 'Yanıltıcı İçerik', value: fakeCount, iconName: 'AlertTriangle' },
        ]);
      } catch (error) {
        console.error("Haberleri çekerken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-8 max-w-[1600px] w-full mx-auto space-y-8">
      <header className="mb-6 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">Sistem Özeti</h1>
            <p className="text-slate-500 font-medium">Platformumuzdaki en güncel haber analizlerini ve istatistikleri sizin için özenle derledik.</p>
      </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Tüm Haberler</h2>
              {!loading && articles.length > 0 && (
                <span className="text-sm text-slate-500">
                  {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, articles.length)} / {articles.length} haber
                </span>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border border-slate-100 flex flex-col overflow-hidden animate-pulse">
                    <div className="w-full h-44 bg-slate-200"></div>
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex justify-between items-start gap-3">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-6 bg-slate-200 rounded-full w-12"></div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                        <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                      </div>
                      <div className="mt-auto pt-4">
                        <div className="h-9 bg-slate-200 rounded-lg w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-slate-500 flex items-center justify-center py-10">Henüz haber yok.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {paginatedArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4 pb-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2.5 rounded-full border border-slate-200/80 bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {getPageNumbers()[0] > 1 && (
                      <>
                        <button onClick={() => goToPage(1)} className="w-10 h-10 rounded-full border border-slate-200/80 bg-white text-sm font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 hover:shadow-sm transition-all cursor-pointer shadow-sm">1</button>
                        {getPageNumbers()[0] > 2 && <span className="text-slate-400 px-1">...</span>}
                      </>
                    )}

                    {getPageNumbers().map(page => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 ${
                          page === currentPage
                            ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/20 cursor-default scale-105'
                            : 'border border-slate-200/80 bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 hover:shadow-sm cursor-pointer shadow-sm'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                      <>
                        {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && <span className="text-slate-400 px-1">...</span>}
                        <button onClick={() => goToPage(totalPages)} className="w-10 h-10 rounded-full border border-slate-200/80 bg-white text-sm font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 hover:shadow-sm transition-all cursor-pointer shadow-sm">{totalPages}</button>
                      </>
                    )}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2.5 rounded-full border border-slate-200/80 bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
    </div>
  );
}
