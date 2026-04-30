import axios from 'axios';
import Parser from 'rss-parser';
import prisma from '../config/db';

// RSS kaynak tanımları
const RSS_SOURCES = [
    {
        name: 'Anadolu Ajansı',
        url: 'https://www.aa.com.tr/tr/rss/default?cat=guncel',
        category: 'Güncel',
    },
    {
        name: 'TRT Haber',
        url: 'https://www.trthaber.com/sondakika.rss',
        category: 'Son Dakika',
    },
    {
        name: 'BBC Türkçe',
        url: 'https://feeds.bbci.co.uk/turkce/rss.xml',
        category: 'Dünya',
    },
];

class NewsService {
    private rssParser: Parser;

    constructor() {
        this.rssParser = new Parser({
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; NewsAnalyzer/1.0)',
            },
        });
    }

    /**
     * NewsAPI'den haber çeker ve veritabanına kaydeder.
     * Mükerrer kayıtları önlemek için upsert kullanır.
     */
    public async fetchAndSaveNews(): Promise<{ savedCount: number; totalFetched: number }> {
        const apiKey = process.env.NEWS_API_KEY;

        if (!apiKey) {
            throw new Error('NEWS_API_KEY bulunamadı!');
        }

        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=turkey&apiKey=${apiKey}`
        );
        const articles = response.data.articles;

        let savedCount = 0;

        for (const item of articles) {
            if (!item.title || !item.url || item.title === '[Removed]') continue;

            const sourceName = item.source?.name || 'Bilinmeyen Kaynak';

            // Kaynağı bul veya oluştur
            let sourceRecord = await prisma.source.findFirst({ where: { name: sourceName } });
            if (!sourceRecord) {
                sourceRecord = await prisma.source.create({
                    data: { name: sourceName, url: 'https://newsapi.org' },
                });
            }

            // Upsert: url eşleşirse güncelle, yoksa oluştur
            const result = await prisma.article.upsert({
                where: { url: item.url },
                update: {}, // Zaten varsa hiçbir şeyi değiştirme
                create: {
                    title: item.title,
                    originalContent: item.description || item.content || 'İçerik yok',
                    url: item.url,
                    publishedAt: new Date(item.publishedAt),
                    sourceId: sourceRecord.id,
                    sourceType: 'API',
                    sourceName: sourceName,
                    category: null,
                },
            });

            // Yeni kayıt oluşturulduysa sayacı artır
            if (result.id && !(await this.articleExistedBefore(item.url, result.id))) {
                savedCount++;
            }
        }

        return { savedCount, totalFetched: articles.length };
    }

    /**
     * Tanımlı RSS kaynaklarından haber çeker ve veritabanına kaydeder.
     * Her kaynak bağımsız işlenir; birinin hatası diğerlerini durdurmaz.
     */
    public async fetchAndSaveRSS(): Promise<{ savedCount: number; totalFetched: number; errors: string[] }> {
        let totalSaved = 0;
        let totalFetched = 0;
        const errors: string[] = [];

        for (const source of RSS_SOURCES) {
            try {
                const feed = await this.rssParser.parseURL(source.url);
                const items = feed.items || [];
                totalFetched += items.length;

                // Kaynağı bul veya oluştur
                let sourceRecord = await prisma.source.findFirst({ where: { name: source.name } });
                if (!sourceRecord) {
                    sourceRecord = await prisma.source.create({
                        data: { name: source.name, url: source.url, rssUrl: source.url },
                    });
                }

                for (const item of items) {
                    if (!item.title || !item.link) continue;

                    // Upsert: url eşleşirse güncelle, yoksa oluştur
                    const existing = await prisma.article.findUnique({ where: { url: item.link } });

                    await prisma.article.upsert({
                        where: { url: item.link },
                        update: {}, // Zaten varsa değiştirme
                        create: {
                            title: item.title,
                            originalContent: item.contentSnippet || item.content || item.summary || 'İçerik yok',
                            url: item.link,
                            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                            sourceId: sourceRecord.id,
                            sourceType: 'RSS',
                            sourceName: source.name,
                            category: source.category,
                        },
                    });

                    if (!existing) totalSaved++;
                }

                console.log(`✅ [RSS] ${source.name}: ${items.length} haber tarandı.`);
            } catch (err: any) {
                const message = `❌ [RSS] ${source.name} hatası: ${err.message}`;
                console.error(message);
                errors.push(message);
            }
        }

        return { savedCount: totalSaved, totalFetched, errors };
    }

    /**
     * NewsAPI ve tüm RSS kaynaklarını sırayla çalıştırır.
     * Her ikisinin sonuçlarını birleştirir.
     */
    public async syncAllNews(): Promise<{
        api: { savedCount: number; totalFetched: number };
        rss: { savedCount: number; totalFetched: number; errors: string[] };
        totalSaved: number;
    }> {
        console.log('🔄 syncAllNews başlatıldı...');

        const apiResult = await this.fetchAndSaveNews();
        console.log(`📰 [NewsAPI] ${apiResult.savedCount} yeni haber kaydedildi.`);

        const rssResult = await this.fetchAndSaveRSS();
        console.log(`📡 [RSS] ${rssResult.savedCount} yeni haber kaydedildi.`);

        return {
            api: apiResult,
            rss: rssResult,
            totalSaved: apiResult.savedCount + rssResult.savedCount,
        };
    }

    /**
     * Yardımcı: Verilen url'e sahip kaydın daha önce var olup olmadığını kontrol eder.
     * upsert yeni kayıt mı yoksa mevcut kayıt mı döndürdü bunu anlamak için kullanılır.
     */
    private async articleExistedBefore(url: string, currentId: number): Promise<boolean> {
        const count = await prisma.article.count({ where: { url, id: { not: currentId } } });
        return count === 0; // 0 ise yeni kayıt, > 0 ise eski
    }
}

export default new NewsService();