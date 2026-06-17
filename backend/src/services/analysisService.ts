import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import prisma from '../config/db';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Circuit Breaker: Gemini kota aşımı verdiğinde şalter iner, kalan makaleler doğrudan Groq'a gider
let isGeminiExhausted = false;

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
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    for (const article of pendingArticles) {
      console.log(`[Article ID: ${article.id}] Analiz ediliyor...`);

      const prompt = `Aşağıdaki haberi analiz et ve istenen bilgileri JSON formatında döndür.
İstenen JSON yapısı:
{
  "summary": "Haberin en fazla 3 cümlelik özeti",
  "trustScore": 85, // 0-100 arası sayısal güvenilirlik puanı
  "category": "Haberin kategorisi (örneğin: Teknoloji, Sağlık, Ekonomi vb.)"
}

Haber Başlığı: ${article.title}
Haber İçeriği: ${article.originalContent}`;

      let analysisData: any = null;
      let usedEngine = '';

      // 1. ADIM: Circuit Breaker kontrolü – Gemini hâlâ aktif mi?
      if (!isGeminiExhausted) {
        try {
          console.log(`[Article ID: ${article.id}] Gemini 2.5 Flash ile analiz deneniyor...`);
          const result = await model.generateContent(prompt);
          const responseText = result.response.text();
          analysisData = JSON.parse(responseText);
          usedEngine = 'Gemini 2.5 Flash';
          console.log(`[Article ID: ${article.id}] Gemini başarılı.`);
        } catch (geminiErr: any) {
          const is429 =
            geminiErr?.status === 429 ||
            geminiErr?.message?.includes('429');

          if (is429) {
            // Kalıcı kota hatası – şalteri indir
            isGeminiExhausted = true;
            console.error(
              `[Article ID: ${article.id}] Kalıcı kota hatası (429) alındı. Şalter indirildi, kalan tüm makaleler doğrudan Groq'a gidecek.`
            );
          } else {
            // Geçici sunucu hatası (503 vb.) – şalteri İNDİRME
            console.warn(
              `[Article ID: ${article.id}] Geçici sunucu hatası alındı. Sadece bu makale için Groq'a geçiliyor, sonrakilerde Gemini tekrar denenecek.`,
              geminiErr
            );
          }
        }
      } else {
        console.log(`[Article ID: ${article.id}] Circuit Breaker aktif – Gemini atlanıyor, doğrudan Groq kullanılacak.`);
      }

      // 2. ADIM: Gemini başarısız olduysa veya şalter zaten inikteyse → Groq (Llama 3.3)
      if (!analysisData) {
        try {
          console.log(`[Article ID: ${article.id}] Groq (Llama 3.3 70B) ile analiz deneniyor...`);
          const groqResponse = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
          });

          const groqText = groqResponse.choices[0]?.message?.content || '{}';
          analysisData = JSON.parse(groqText);
          usedEngine = 'Groq (Llama 3.3 70B)';
          console.log(`[Article ID: ${article.id}] Groq başarılı.`);
        } catch (groqErr) {
          console.error(`[Article ID: ${article.id}] Groq da başarısız oldu:`, groqErr);

          // Her iki API de başarısız – hata kaydı oluştur
          await prisma.analysis.create({
            data: {
              articleId: article.id,
              aiSummary: 'Her iki API de hata verdi. Analiz tamamlanamadı.',
              isFake: false,
            },
          });
          console.log(`[Article ID: ${article.id}] Her iki motor da başarısız; hata kaydı oluşturuldu.`);

          // Rate Limit koruması
          console.log('Rate Limit koruması: 8 saniye bekleniyor...');
          await new Promise(r => setTimeout(r, 8000));
          continue; // Bu makaleyi atla, sonraki makaleye geç
        }
      }

      // Başarılı analiz sonucunu veritabanına kaydet
      await prisma.analysis.create({
        data: {
          articleId: article.id,
          aiSummary: analysisData.summary || 'Özet alınamadı.',
          trustScore: typeof analysisData.trustScore === 'number' ? analysisData.trustScore : 0,
          isFake: typeof analysisData.trustScore === 'number' ? analysisData.trustScore < 50 : false,
          fakeNewsReason: (typeof analysisData.trustScore === 'number' && analysisData.trustScore < 50)
            ? 'Yapay zeka tarafından düşük güvenilirlik puanı tespit edildi.'
            : null,
        },
      });

      // Eğer category verisi döndüyse Article tablosunu güncelle
      if (analysisData.category) {
        await prisma.article.update({
          where: { id: article.id },
          data: { category: analysisData.category },
        });
      }

      console.log(`[Article ID: ${article.id}] Analiz başarıyla kaydedildi. (Motor: ${usedEngine})`);

      // API Rate Limit önlemi: Döngüdeki her istekten sonra 8 saniye bekle
      console.log('Rate Limit koruması: 8 saniye bekleniyor...');
      await new Promise(r => setTimeout(r, 8000));
    }

    console.log('Tüm makale analiz işlemleri tamamlandı.');
  } catch (error) {
    console.error('Analiz süreci başlatılırken genel bir hata oluştu:', error);
  }
};
