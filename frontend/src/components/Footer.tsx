import { ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-teal-900 text-teal-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">News Analyzer</h3>
            <p className="text-sm leading-relaxed">
              Yapay zeka destekli haber analiz platformu. Haberlerin güvenilirliğini analiz eder,
              dezenformasyonu tespit eder ve kullanıcılara doğru bilgi sunmayı amaçlar.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Veri Kaynakları</h4>
            <ul className="space-y-1 text-sm">
              <li>• NewsAPI — Küresel haber verileri</li>
              <li>• Anadolu Ajansı — RSS</li>
              <li>• TRT Haber — RSS</li>
              <li>• BBC Türkçe — RSS</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Teknolojiler</h4>
            <ul className="space-y-1 text-sm">
              <li>• React + TypeScript (Vite)</li>
              <li>• Express.js + Prisma ORM</li>
              <li>• PostgreSQL (Neon)</li>
              <li>• Google Gemini AI</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-800 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-teal-400">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} News Analyzer. Created by <span className="font-bold text-white">Hasan Sido</span> with <Heart size={12} className="text-rose-400" />
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/iamhns7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hasan-sido-a1822a25a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
