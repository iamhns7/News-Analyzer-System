import express, { Application } from 'express';
import 'dotenv/config'; 
import cors from 'cors';
import prisma from './config/db';
import newsRoutes from './routes/newsRoutes';
import { analyzePendingArticles } from './services/analysisService';
import { updateSourceScores } from './services/sourceScoringService';
import cron from 'node-cron';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotaları Bağlıyoruz
app.use('/api/news', newsRoutes);

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
    
    console.log("🚀 Zamanlayıcı aktif: Her 5 da  kikada bir analiz yapılacak.");
    console.log("🚀 Skorlayıcı aktif: Her 30 dakikada bir kaynak karneleri güncellenecek.");
    
    cron.schedule('*/5 * * * *', () => {
        console.log("⏳ [Cron Job] Yapay zeka analiz servisi tetiklendi...");
        analyzePendingArticles();
    });

    cron.schedule('*/30 * * * *', () => {
        console.log("📊 [Cron Job] Kaynak güvenilirlik skorları hesaplanıyor...");
        updateSourceScores();
    });
});