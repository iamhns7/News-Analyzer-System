export function About() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Hakkında</h1>
        <p className="text-slate-500 mt-1">News Analyzer projesi hakkında detaylı bilgi.</p>
      </header>
      <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Proje Amacı</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          News Analyzer, internette yayılan haberleri toplayıp yapay zeka yardımıyla analiz eden,
          kullanıcılara haberin güvenilirliği ve dezenformasyon içerip içermediği hakkında
          hızlı bir özet sunan modern bir platformdur.
        </p>
        <h2 className="text-xl font-bold text-slate-800 mb-4 mt-6">Nasıl Çalışır?</h2>
        <ul className="list-disc pl-5 text-slate-600 space-y-2">
          <li><strong>Haber Toplama:</strong> NewsAPI ve RSS kaynaklarından sürekli olarak güncel haberleri çeker.</li>
          <li><strong>AI Analizi:</strong> Çekilen haberler, Google Gemini AI modeli kullanılarak özetlenir ve analiz edilir.</li>
          <li><strong>Güvenilirlik Skoru:</strong> Kaynağın geçmiş verilerine ve haberin içeriğine göre otomatik bir güven skoru oluşturulur.</li>
        </ul>
      </section>
    </div>
  );
}
