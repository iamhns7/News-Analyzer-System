import { Request, Response } from 'express';
import newsService from '../services/newsService';

export const fetchNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await newsService.fetchAndSaveNews();
        res.json({ success: true, ...result });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};