import nodemailer from 'nodemailer';
import prisma from '../config/db';

/**
 * Gönderim yapacak E-posta taşıyıcısını (Transporter) oluşturur.
 * Ethereal test servisi kullanılır. Test için üretilen hesap ile 
 * gönderilen maillerin test linki terminalde görünür.
 */
async function createTransporter() {
    // Gerçek kullanım için .env dosyasındaki SMTP ayarları kullanılabilir.
    // Şimdilik test amaçlı ethereal.email kullanıyoruz.
    const testAccount = await nodemailer.createTestAccount();
    
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
}

/**
 * Günlük e-posta bültenini hazırlar ve abonelere gönderir.
 */
export async function sendDailyNewsletter() {
    console.log('📰 Günlük Haber Bülteni gönderimi başlatılıyor...');

    try {
        // 1. Bültene abone olan kullanıcıları getir
        const subscribers = await prisma.user.findMany({
            where: { isSubscribed: true },
        });

        if (subscribers.length === 0) {
            console.log('Abonelik listesi boş, gönderilecek kimse bulunamadı.');
            return;
        }

        // 2. Son 24 saatteki en iyi haberleri getir
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const topArticles = await prisma.article.findMany({
            where: {
                publishedAt: { gte: oneDayAgo },
                analysis: {
                    is: {
                        isFake: false,
                        trustScore: { gte: 60 }
                    }
                }
            },
            include: {
                analysis: true,
                source: true
            },
            orderBy: {
                analysis: { trustScore: 'desc' }
            },
            take: 5 // Sadece en iyi 5 haber
        });

        if (topArticles.length === 0) {
            console.log('Son 24 saat içinde yeterince kaliteli haber bulunamadı. Bülten gönderilmiyor.');
            return;
        }

        // 3. HTML Mail Şablonunu oluştur
        let articlesHtml = topArticles.map(article => `
            <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
                ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}" style="max-width: 100%; border-radius: 8px; margin-bottom: 15px;">` : ''}
                <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">
                    <a href="${article.url}" style="color: #0d9488; text-decoration: none;">${article.title}</a>
                </h2>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <span style="background-color: #ccfbf1; color: #0f766e; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                        Güvenilirlik: ${article.analysis?.trustScore} Puan
                    </span>
                    <span style="color: #64748b; font-size: 12px;">Kaynak: ${article.sourceName}</span>
                </div>
                <p style="color: #334155; line-height: 1.6; font-size: 14px;">
                    ${article.analysis?.aiSummary || 'Özet bulunamadı.'}
                </p>
            </div>
        `).join('');

        const htmlTemplate = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <div style="background: linear-gradient(to right, #0d9488, #10b981); padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
                    <h1 style="color: white; margin: 0;">Günlük Haber Özeti</h1>
                    <p style="color: #ccfbf1; margin-top: 10px; font-size: 14px;">Sizin için derlediğimiz en güvenilir haberler.</p>
                </div>
                <div style="padding: 30px; background-color: #ffffff; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    ${articlesHtml}
                </div>
                <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-radius: 0 0 16px 16px; border: 1px solid #e2e8f0; border-top: none;">
                    <p style="color: #64748b; font-size: 12px; margin: 0;">Bu e-postayı News Analyzer abonesi olduğunuz için aldınız.</p>
                </div>
            </div>
        `;

        // 4. Mailleri Gönder
        const transporter = await createTransporter();
        const recipientEmails = subscribers.map(s => s.email);

        const info = await transporter.sendMail({
            from: '"News Analyzer" <noreply@newsanalyzer.com>',
            to: recipientEmails.join(', '), // Bcc de kullanılabilir
            subject: `Günün Güvenilir Haber Özeti - ${new Date().toLocaleDateString('tr-TR')}`,
            html: htmlTemplate,
        });

        console.log(`✅ Bülten ${subscribers.length} kullanıcıya başarıyla gönderildi.`);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.error('❌ Bülten gönderilirken hata oluştu:', error);
    }
}
