import express, { Application } from 'express';
import 'dotenv/config'; 
import newsRoutes from './routes/newsRoutes';
import { analyzePendingArticles } from './services/analysisService';
import { updateSourceScores } from './services/sourceScoringService';
import cron from 'node-cron';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotaları Bağlıyoruz
app.use('/api/news', newsRoutes);

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