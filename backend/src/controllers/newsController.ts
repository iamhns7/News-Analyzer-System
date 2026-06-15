import { Request, Response } from 'express';
import newsService from '../services/newsService';

// Sadece NewsAPI haberleri çeker
export const fetchNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await newsService.fetchAndSaveNews();
        res.json({ success: true, ...result });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// NewsAPI + RSS kaynaklarını birlikte çalıştırır
export const syncNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await newsService.syncAllNews();
        res.json({
            success: true,
            totalSaved: result.totalSaved,
            api: result.api,
            rss: {
                savedCount: result.rss.savedCount,
                totalFetched: result.rss.totalFetched,
                errors: result.rss.errors,
            },
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};