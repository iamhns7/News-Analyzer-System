import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '../config/db';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const analyzePendingArticles = async () => {
  try {
    console.log('Bekleyen makaleler analiz için getiriliyor...');
    
    // Analysis kaydı olmayan ilk 5 makaleyi çek
    const pendingArticles = await prisma.article.findMany({
      where: {
        analysis: null,
      },
      take: 5,
    });

    if (pendingArticles.length === 0) {
      console.log('Analiz edilecek yeni makale bulunamadı.');
      return;
    }

    // Modeli JSON çıktısı verecek şekilde ayarla
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    for (const article of pendingArticles) {
      console.log(`[Article ID: ${article.id}] Analiz ediliyor...`);

      try {
        const prompt = `Aşağıdaki haberi analiz et ve istenen bilgileri JSON formatında döndür.
İstenen JSON yapısı:
{
  "summary": "Haberin en fazla 3 cümlelik özeti",
  "trustScore": 85, // 0-100 arası sayısal güvenilirlik puanı
  "category": "Haberin kategorisi (örneğin: Teknoloji, Sağlık, Ekonomi vb.)"
}

Haber Başlığı: ${article.title}
Haber İçeriği: ${article.originalContent}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const analysisData = JSON.parse(responseText);

        // Analysis tablosuna kaydet
        await prisma.analysis.create({
          data: {
            articleId: article.id,
            aiSummary: analysisData.summary || 'Özet alınamadı.',
            // Prisma şemasında trustScore olmadığı için, trustScore'u isFake tespitinde kullanıyoruz
            isFake: typeof analysisData.trustScore === 'number' ? analysisData.trustScore < 50 : false,
            fakeNewsReason: (typeof analysisData.trustScore === 'number' && analysisData.trustScore < 50) 
              ? 'Yapay zeka tarafından düşük güvenilirlik puanı tespit edildi.' 
              : null,
          },
        });

        // Eğer category verisi döndüyse ve Prisma Article modelinde category alanı varsa onu da güncelleyelim
        if (analysisData.category) {
          await prisma.article.update({
            where: { id: article.id },
            data: { category: analysisData.category },
          });
        }

        console.log(`[Article ID: ${article.id}] Analiz başarıyla kaydedildi.`);
      } catch (err) {
        console.error(`[Article ID: ${article.id}] Analiz sırasında hata oluştu:`, err);
      }

      // API Rate Limit önlemi: Döngüdeki her istekten sonra 4 saniye bekle
      console.log('Rate Limit koruması: 4 saniye bekleniyor...');
      await new Promise(r => setTimeout(r, 4000));
    }

    console.log('Tüm makale analiz işlemleri tamamlandı.');
  } catch (error) {
    console.error('Analiz süreci başlatılırken genel bir hata oluştu:', error);
  }
};
