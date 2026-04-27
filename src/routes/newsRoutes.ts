import { Router } from 'express';
import { fetchNews } from '../controllers/newsController';

const router = Router();

router.get('/fetch', fetchNews);

export default router;