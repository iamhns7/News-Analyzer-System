import { Router } from 'express';
import { fetchNews, syncNews } from '../controllers/newsController';

const router = Router();

// Sadece NewsAPI haberleri çeker
router.get('/fetch', fetchNews);

// NewsAPI + RSS kaynaklarını birlikte çalıştırır
router.get('/sync', syncNews);

export default router;