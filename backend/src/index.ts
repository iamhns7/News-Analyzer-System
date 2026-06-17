import express, { Application } from 'express';
import 'dotenv/config'; 
import cors from 'cors';
import prisma from './config/db';
import newsRoutes from './routes/newsRoutes';
import { analyzePendingArticles } from './services/analysisService';
import { sendDailyNewsletter } from './services/newsletterService';
import cron from 'node-cron';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes';

// Rotaları Bağlıyoruz
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);

// Bülten testi için endpoint
app.get('/api/test-newsletter', async (req, res) => {
    try {
        await sendDailyNewsletter();
        res.json({ message: 'Bülten gönderme isteği arka planda başlatıldı.' });
    } catch (error) {
        res.status(500).json({ error: 'Bülten gönderilemedi.' });
    }
});

app.get('/api/articles', async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            where: {
                analysis: {
                    isNot: null
                }
            },
            orderBy: {
                publishedAt: 'desc'
            },
            include: {
                analysis: true,
                source: true
            }
        });
        res.json(articles);
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ error: "İç sunucu hatası" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Profesyonel TS Sunucu http://localhost:${PORT} adresinde çalışıyor`);
    
    console.log("🚀 Zamanlayıcı aktif: Her 5 dakikada bir analiz yapılacak.");
    
    cron.schedule('*/5 * * * *', () => {
        console.log("⏳ [Cron Job] Yapay zeka analiz servisi tetiklendi...");
        analyzePendingArticles();
    });

    console.log("📬 Zamanlayıcı aktif: Günlük Haber Bülteni her gün 20:00'de gönderilecek.");
    cron.schedule('0 20 * * *', () => {
        console.log("📧 [Cron Job] Günlük Haber Bülteni zamanı geldi...");
        sendDailyNewsletter();
    });
});