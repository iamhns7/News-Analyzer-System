# ⚙️ News Analyzer - Backend

Bu klasör, **News Analyzer System** (Haber Analiz Sistemi) bitirme projesinin sunucu (server), veri tabanı, yapay zeka entegrasyonu ve arka plan işlerini yürüten çekirdek kısmıdır.

## 💻 Teknolojiler ve Mimari

Sistem arka planda sağlam, güvenli ve ölçeklenebilir bir mimari üzerine kurulmuştur:

- **Node.js & Express.js**: RESTful API altyapısının temelini oluşturan hızlı ve hafif web sunucusu.
- **TypeScript**: Daha okunaklı ve tip güvenli (type-safe) kod geliştirme.
- **Prisma ORM**: Veri tabanı sorgularını kolaylaştıran modern ve güçlü ORM aracı.
- **PostgreSQL**: Kullanıcı, haber ve analiz verilerini saklamak için güvenilir ilişkisel veri tabanı.
- **AI Entegrasyonları (`@google/generative-ai`, `groq-sdk`)**: Haber metinlerini analiz eden ve özetleyen yapay zeka modelleri.
- **RSS Parser**: Belirlenen haber kaynaklarından güncel içerikleri otomatik çeken kütüphane.
- **Node-Cron**: Haber çekme ve bildirim gönderme işlemlerini otomatik ve düzenli aralıklarla (zamanlanmış) çalıştıran araç.
- **Nodemailer**: Kullanıcılara otomatik e-posta bildirimleri iletmek için.
- **Güvenlik**: Kullanıcı şifreleri `bcryptjs` ile hashlendi ve oturum yönetimleri `jsonwebtoken` (JWT) ile sağlandı.

## 🚀 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleyin
Backend klasörüne girin ve paketleri indirin:
```bash
npm install
```

### 2. Ortam Değişkenlerini (Environment Variables) Ayarlayın
Klasör içinde `.env` adında bir dosya oluşturun ve projenize ait hassas bilgileri buraya girin. Örnek bir `.env` dosyası aşağıdaki gibi olmalıdır:

```env
# Veri Tabanı Bağlantısı
DATABASE_URL="postgresql://kullanici_adi:sifre@localhost:5432/news_db?schema=public"

# Güvenlik ve JWT
JWT_SECRET="guvenli_bir_sir_kelimesi"

# Yapay Zeka API Anahtarları
GEMINI_API_KEY="google_gemini_api_anahtarınız"
GROQ_API_KEY="groq_api_anahtarınız"

# E-posta (Nodemailer) Ayarları
EMAIL_USER="mail_adresiniz@gmail.com"
EMAIL_PASS="mail_uygulama_sifreniz"
```

### 3. Veri Tabanını Hazırlayın
Prisma şemasını kullanarak veri tabanınızı senkronize edin ve istemciyi oluşturun:
```bash
npx prisma generate
npx prisma db push
```

### 4. Sunucuyu Başlatın
Geliştirme ortamında sunucuyu başlatmak için:
```bash
npm run dev
```
Sunucu başarıyla ayağa kalktığında konsolda çalıştığına dair mesajı göreceksiniz. (Varsayılan olarak `http://localhost:5000` gibi bir portta başlar).

## 🧩 Temel İşlevler

- **Veri Toplama:** `rss-parser` ve `node-cron` ikilisi ile haberler belirli periyotlarla çekilir.
- **Yapay Zeka Analizi:** Çekilen haberler, sistemdeki AI modelleri tarafından duygu durumu ve içerik özetine göre analiz edilir.
- **Veri Sunumu:** Express API'leri, analiz edilmiş haberleri ve kullanıcı verilerini Frontend'e sunar.

---
*Projenin genel mimarisi ve frontend detayları için ana dizindeki veya frontend klasöründeki README dosyalarını inceleyebilirsiniz.*
