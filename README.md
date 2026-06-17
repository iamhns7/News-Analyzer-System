# 📰 News Analyzer System (Haber Analiz Sistemi)

**News Analyzer System**, kullanıcıların çeşitli kaynaklardan gelen haberleri takip etmesini, bu haberlerin yapay zeka destekli analizlerini görüntülemesini ve kişiselleştirilmiş bildirimler almasını sağlayan kapsamlı bir bitirme projesidir.

## 🚀 Proje Tanımı

Bu proje, günümüzdeki yoğun bilgi akışını yönetmeyi ve kullanıcıların sadece ilgilendikleri, doğrulanmış ve analiz edilmiş haber içeriklerine ulaşmalarını hedeflemektedir. Sistem; haberleri RSS kaynaklarından otomatik olarak çeker, içeriklerini Google Gemini ve Groq gibi güçlü yapay zeka modelleriyle analiz eder, özetler ve kullanıcılara sunar. Ayrıca kullanıcılar kendi ilgi alanlarına göre kategorileri takip edebilir ve e-posta bildirimleri alabilirler.

## 💻 Kullanılan Teknolojiler

Proje, modern web geliştirme standartlarına uygun olarak en güncel teknolojilerle geliştirilmiştir:

**Frontend (Kullanıcı Arayüzü):**
- **React (v19)** & **Vite**: Hızlı, modern ve dinamik kullanıcı arayüzü geliştirme.
- **TypeScript**: Güvenli ve ölçeklenebilir kod yazımı.
- **Tailwind CSS (v4)**: Esnek, şık ve duyarlı (responsive) tasarım.
- **React Router DOM**: Sayfalar arası akıcı yönlendirme.
- **Lucide React**: Modern ve şık ikon setleri.
- **Axios**: Backend ile API iletişimi.

**Backend (Sunucu ve API):**
- **Node.js** & **Express.js**: Hızlı ve güvenilir REST API mimarisi.
- **TypeScript**: Uçtan uca tip güvenliği.
- **Prisma ORM** & **PostgreSQL**: Güçlü, ilişkisel veri tabanı yönetimi.
- **Yapay Zeka Entegrasyonları**: `@google/generative-ai` ve `groq-sdk` ile gelişmiş haber analizi.
- **RSS Parser**: Haber kaynaklarından otomatik veri çekme.
- **JWT & Bcrypt**: Güvenli kullanıcı kimlik doğrulama ve şifreleme.
- **Node-Cron**: Zamanlanmış arka plan görevleri (otomatik haber çekme vb.).
- **Nodemailer**: Kullanıcılara otomatik e-posta bildirimleri gönderimi.

## 🏗 Sistem Mimarisi

Proje, istemci-sunucu (client-server) mimarisine dayanmaktadır. 

1. **Frontend Katmanı:** Kullanıcıların sistemle etkileşime girdiği, verilerin görselleştirildiği modern web arayüzüdür.
2. **Backend Katmanı:** İstekleri karşılayan, iş mantığını çalıştıran, yapay zeka API'leriyle haber analizlerini gerçekleştiren ve veri tabanı işlemlerini yürüten ana merkezdir.
3. **Veri Tabanı Katmanı:** PostgreSQL, kullanıcı bilgilerini, haber kaynaklarını ve analiz sonuçlarını güvenle saklar.
4. **Arka Plan Görevleri:** Cron job'lar belirli aralıklarla RSS üzerinden haberleri çeker ve e-posta bildirimlerini tetikler.

## ⚙️ Kurulum Talimatı

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

### 1. Gereksinimler
- Node.js (v18 veya üzeri)
- PostgreSQL veri tabanı

### 2. Backend Kurulumu
```bash
cd backend
npm install
```
`.env` dosyasını oluşturun ve gerekli değişkenleri (Veri tabanı bağlantısı, JWT Secret, AI API Key'leri vb.) tanımlayın.
```bash
npx prisma generate
npx prisma db push
npm run dev
```

### 3. Frontend Kurulumu
```bash
cd frontend
npm install
npm run dev
```
Uygulama başarıyla başlatıldıktan sonra `http://localhost:5173` (veya Vite'in sağladığı port) üzerinden erişebilirsiniz.

## 🎯 Demo Açıklaması

Uygulamaya giriş yaptığınızda sizi özet analizlerin ve güncel haberlerin bulunduğu kullanıcı dostu bir "Dashboard (Kontrol Paneli)" karşılar. 
- **Haber Akışı:** RSS ile çekilen ve yapay zeka ile duygu analizi/özeti çıkarılan haberler listelenir.
- **Kişiselleştirme:** İlgi alanlarınıza göre filtreleme yapabilirsiniz.
- **Detaylı Analiz:** Herhangi bir habere tıkladığınızda, haberin AI tarafından üretilmiş detaylı değerlendirmesine ulaşabilirsiniz.
- **Bildirimler:** Sistem, önemli haberleri sizin yerinize takip edip periyodik olarak e-posta yoluyla size ulaştırır.

---
*Bu bitirme projesi, modern web teknolojilerinin ve yapay zeka araçlarının günlük hayatı nasıl kolaylaştırabileceğini göstermek amacıyla büyük bir özenle hazırlanmıştır.*
