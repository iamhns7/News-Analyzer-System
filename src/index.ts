import express, { Application } from 'express';
import 'dotenv/config'; // require('dotenv').config() yerine TS'de bu kullanılır
import newsRoutes from './routes/newsRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotaları Bağlıyoruz
app.use('/api/news', newsRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Profesyonel TS Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});