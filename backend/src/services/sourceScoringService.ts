import prisma from '../config/db';

export const updateSourceScores = async () => {
  try {
    console.log('Kaynak güven skorları hesaplanıyor...');

    // 1. Tüm kaynakları (Source) veritabanından çekiyoruz
    const sources = await prisma.source.findMany();

    // 2. Akademik kural: Kesinlikle forEach değil, geleneksel for...of kullanıyoruz
    for (const source of sources) {
      try {
        // O kaynağa ait, Analysis kaydı olan (analizi tamamlanmış) makaleleri getiriyoruz
        const analyzedArticles = await prisma.article.findMany({
          where: {
            sourceId: source.id,
            analysis: {
              isNot: null, // Sadece analizi yapılmış olanlar
            },
          },
          include: {
            analysis: true, // isFake değerini okuyabilmek için
          },
        });

        // Eğer kaynağın hiç analiz edilmiş haberi yoksa, hesaplama yapmadan sıradakine geç (continue)
        const totalAnalyzed = analyzedArticles.length;
        if (totalAnalyzed === 0) {
          continue;
        }

        // Yalan olmayan (isFake === false) haber sayısını hesapla
        let nonFakeCount = 0;
        for (const article of analyzedArticles) {
          if (article.analysis && article.analysis.isFake === false) {
            nonFakeCount++;
          }
        }

        // Güven skoru: (Yalan Olmayan Haber Sayısı / Toplam Analiz Edilen Haber Sayısı) * 100
        const rawScore = (nonFakeCount / totalAnalyzed) * 100;
        
        // Puanı yuvarlayarak tam sayı (Int) haline getiriyoruz
        const newTrustScore = Math.round(rawScore);

        // Veritabanındaki Source kaydını yeni güven skoru ile güncelliyoruz
        await prisma.source.update({
          where: { id: source.id },
          data: { trustScore: newTrustScore },
        });

        console.log(`🎯 [Kaynak: ${source.name}] Güven skoru güncellendi: ${newTrustScore}`);
      } catch (innerError) {
        console.error(`[Kaynak: ${source.name}] skoru güncellenirken hata oluştu:`, innerError);
      }
    }

    console.log('Tüm kaynakların skor güncelleme işlemi tamamlandı.');
  } catch (error) {
    console.error('Kaynak skorları güncellenirken genel bir hata oluştu:', error);
  }
};
