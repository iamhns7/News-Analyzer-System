import { Newspaper, Brain, ShieldCheck, Rss, BarChart3, Zap, Database, Globe, Cpu, ArrowRight } from 'lucide-react';

export function About() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      {/* Hero Header */}
      <header className="text-center space-y-4 pb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-bold border border-teal-100/60 mb-2">
          <Newspaper size={16} />
          Proje Hakkında
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent inline-block">
          News Analyzer
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
          Yapay zeka destekli haber analiz platformu. Haberleri toplar, özetler, güvenilirliğini ölçer ve
          dezenformasyonu tespit eder.
        </p>
      </header>

      {/* Proje Amacı */}
      <section className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-100/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-full blur-3xl opacity-60" />
        <h2 className="text-2xl font-extrabold text-slate-800 mb-4 relative z-10">🎯 Proje Amacı</h2>
        <p className="text-slate-600 leading-relaxed relative z-10">
          News Analyzer, günümüzde hızla yayılan dezenformasyona karşı mücadele etmek amacıyla geliştirilmiş
          kapsamlı bir haber analiz platformudur. Sistem, farklı haber kaynaklarından otomatik olarak haberleri
          toplayarak yapay zeka modelleri aracılığıyla her bir haberi detaylı şekilde analiz eder. Kullanıcılara
          haberlerin güvenilirlik düzeyini, içerik özetlerini ve olası sahte haber uyarılarını tek bir panelden
          sunar. Böylece okuyucular, bir haberi paylaşmadan veya inanmadan önce hızlı ve güvenilir bir
          değerlendirme yapma imkânına kavuşur.
        </p>
      </section>

      {/* Nasıl Çalışır - Adımlar */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-800">⚙️ Nasıl Çalışır?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Adım 1 */}
          <div className="group bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-100/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-teal-100 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="p-2.5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl text-blue-600 border border-blue-100/50 group-hover:scale-110 transition-transform duration-500">
                <Rss size={22} strokeWidth={2.5} />
              </div>
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Adım 1</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 relative z-10">Haber Toplama</h3>
            <p className="text-sm text-slate-500 leading-relaxed relative z-10">
              Sistem, NewsAPI ve çeşitli RSS kaynaklarına düzenli aralıklarla bağlanarak
              güncel haberleri otomatik olarak çeker ve veritabanına kaydeder. Zamanlayıcı (Cron Job)
              sayesinde bu işlem sürekli ve kesintisiz şekilde gerçekleşir.
            </p>
          </div>

          {/* Adım 2 */}
          <div className="group bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-100/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-teal-100 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-purple-50 to-violet-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="p-2.5 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl text-purple-600 border border-purple-100/50 group-hover:scale-110 transition-transform duration-500">
                <Brain size={22} strokeWidth={2.5} />
              </div>
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Adım 2</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 relative z-10">Yapay Zeka Analizi</h3>
            <p className="text-sm text-slate-500 leading-relaxed relative z-10">
              Toplanan haberler Google Gemini AI modeline gönderilerek detaylı bir analize
              tabi tutulur. Yapay zeka, haberin içeriğini özetler, tutarlılığını değerlendirir ve
              sahte haber olup olmadığına dair bir sonuç üretir.
            </p>
          </div>

          {/* Adım 3 */}
          <div className="group bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-100/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-teal-100 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="p-2.5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl text-emerald-600 border border-emerald-100/50 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={22} strokeWidth={2.5} />
              </div>
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Adım 3</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 relative z-10">Skorlama & Raporlama</h3>
            <p className="text-sm text-slate-500 leading-relaxed relative z-10">
              Her haber kaynağı için geçmiş performansına dayalı bir güvenilirlik skoru hesaplanır.
              Analiz sonuçları, özetler ve skorlar kullanıcı dostu bir panelde listelenir.
              Dezenformasyon tespit edilen haberler açıkça işaretlenir.
            </p>
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-800">✨ Temel Özellikler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Rss, color: 'blue', title: 'Çoklu Kaynak Desteği', desc: 'NewsAPI ve RSS beslemeleri üzerinden farklı haber kaynaklarından eşzamanlı veri toplama.' },
            { icon: Brain, color: 'purple', title: 'AI Destekli Özetleme', desc: 'Google Gemini yapay zeka modeli ile her haberin otomatik olarak özetlenmesi ve analiz edilmesi.' },
            { icon: ShieldCheck, color: 'emerald', title: 'Dezenformasyon Tespiti', desc: 'Haberlerin içerik tutarlılığını değerlendirerek sahte haber olasılığını belirleme.' },
            { icon: BarChart3, color: 'teal', title: 'Kaynak Güvenilirlik Skoru', desc: 'Her haber kaynağı için geçmişe dayalı otomatik güvenilirlik puanı hesaplama.' },
            { icon: Zap, color: 'amber', title: 'Otomatik Zamanlayıcı', desc: 'Cron Job tabanlı zamanlayıcı ile haberlerin düzenli aralıklarla toplanması ve analiz edilmesi.' },
            { icon: Globe, color: 'cyan', title: 'Gerçek Zamanlı Dashboard', desc: 'İstatistikler, trendler ve haber listesinin tek bir modern panelden takip edilmesi.' },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="group flex items-start gap-4 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-100/60 hover:border-teal-100 hover:shadow-sm transition-all duration-300">
              <div className={`shrink-0 p-2.5 bg-gradient-to-br from-${color}-50 to-${color}-100/50 rounded-xl text-${color}-600 border border-${color}-100/50 group-hover:scale-110 transition-transform duration-500`}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teknoloji Yığını */}
      <section className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-slate-100/60 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-full blur-3xl opacity-60" />
        <h2 className="text-2xl font-extrabold text-slate-800 mb-6 relative z-10">🛠️ Kullanılan Teknolojiler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div>
            <h3 className="text-sm font-extrabold text-teal-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Cpu size={16} /> Backend
            </h3>
            <ul className="space-y-2.5">
              {[
                ['Node.js & Express', 'Sunucu tarafı çatı (framework)'],
                ['TypeScript', 'Tip güvenli geliştirme ortamı'],
                ['Prisma ORM', 'Veritabanı yönetimi ve sorgulama'],
                ['PostgreSQL', 'İlişkisel veritabanı'],
                ['Google Gemini AI', 'Yapay zeka analiz motoru'],
                ['node-cron', 'Zamanlayıcı (Cron Job) yönetimi'],
              ].map(([tech, desc]) => (
                <li key={tech} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <ArrowRight size={14} className="text-teal-400 shrink-0" />
                  <span><strong className="text-slate-800">{tech}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Database size={16} /> Frontend
            </h3>
            <ul className="space-y-2.5">
              {[
                ['React', 'Kullanıcı arayüzü kütüphanesi'],
                ['TypeScript', 'Tip güvenli bileşen geliştirme'],
                ['Tailwind CSS', 'Modern ve hızlı stil yönetimi'],
                ['React Router', 'Sayfa yönlendirme (routing)'],
                ['Axios', 'HTTP istek yönetimi (API bağlantısı)'],
                ['Lucide Icons', 'Şık ve modern ikon kütüphanesi'],
              ].map(([tech, desc]) => (
                <li key={tech} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <ArrowRight size={14} className="text-emerald-400 shrink-0" />
                  <span><strong className="text-slate-800">{tech}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Alt Bilgi */}
      <div className="text-center py-4">
        <p className="text-sm text-slate-400 font-medium">
          News Analyzer — Yapay zeka ile haberleri analiz eden açık kaynaklı bir proje.
        </p>
      </div>
    </div>
  );
}
