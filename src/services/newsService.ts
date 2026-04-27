import axios from 'axios';
import prisma from '../config/db';

class NewsService {
    public async fetchAndSaveNews() {
        const apiKey = process.env.NEWS_API_KEY;
        
        if (!apiKey) {
            throw new Error("NEWS_API_KEY bulunamadı!");
        }

        const response = await axios.get(`https://newsapi.org/v2/everything?q=turkey&apiKey=${apiKey}`);
        const articles = response.data.articles;

        let savedCount = 0;

        for (const item of articles) {
            if (!item.title || !item.url || item.title === "[Removed]") continue;

            const sourceName = item.source.name || "Bilinmeyen Kaynak";
            
            // Kaynağı Bul veya Oluştur
            let sourceRecord = await prisma.source.findFirst({ where: { name: sourceName } });
            
            if (!sourceRecord) {
                sourceRecord = await prisma.source.create({
                    data: { name: sourceName, url: "https://newsapi.org" }
                });
            }

            // Haberi Kaydet
            const existingArticle = await prisma.article.findUnique({ where: { url: item.url } });
            
            if (!existingArticle) {
                await prisma.article.create({
                    data: {
                        title: item.title,
                        originalContent: item.description || item.content || "İçerik yok",
                        url: item.url,
                        publishedAt: new Date(item.publishedAt),
                        sourceId: sourceRecord.id
                    }
                });
                savedCount++;
            }
        }
        return { savedCount, totalFetched: articles.length };
    }
}

export default new NewsService();