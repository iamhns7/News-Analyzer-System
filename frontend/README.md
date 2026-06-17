# 🎨 News Analyzer - Frontend

Bu klasör, **News Analyzer System** (Haber Analiz Sistemi) bitirme projesinin istemci (client) tarafını barındırır. Modern ve şık bir arayüz ile kullanıcılara haberleri, AI analizlerini ve kişiselleştirilmiş bildirimleri sunar.

## 💻 Teknolojiler ve Araçlar

Bu projede kullanıcı deneyimini en üst düzeye çıkarmak için aşağıdaki güncel teknolojiler tercih edilmiştir:

- **React (v19)**: Kullanıcı arayüzünü oluşturmak için kullanılan popüler JavaScript kütüphanesi.
- **Vite**: Ultra hızlı geliştirme ortamı ve modern derleyici.
- **TypeScript**: Hata riskini en aza indiren, güvenli kod yazımını sağlayan dil.
- **Tailwind CSS (v4)**: Özel stilleri hızlı ve tutarlı bir şekilde uygulamak için utility-first CSS framework'ü.
- **React Router DOM**: Sayfalar (Dashboard, Login vb.) arasında kesintisiz ve hızlı geçişler için.
- **Lucide React**: Modern, temiz ve duyarlı (responsive) SVG ikon seti.
- **Axios**: Backend servisleriyle (API) iletişim kurmak için HTTP istemcisi.

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Bağımlılıkları Yükleyin
Klasör dizinindeyken gerekli kütüphaneleri indirin:
```bash
npm install
```

### 2. Ortam Değişkenleri (Gerekirse)
Eğer backend sunucunuz farklı bir portta çalışıyorsa veya özel API anahtarları gerekiyorsa ana dizine bir `.env` dosyası oluşturun:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Geliştirme Sunucusunu Başlatın
Aşağıdaki komut ile Vite geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama başarıyla başlatıldığında terminalde beliren adrese (genellikle `http://localhost:5173`) tarayıcınızdan giderek projeyi görüntüleyebilirsiniz.

## 📂 Dizin Yapısı

- `src/components/`: Tekrar kullanılabilir UI bileşenleri (Navbar, Footer, NewsCard vb.).
- `src/pages/`: Uygulamanın ana sayfaları (Dashboard, Login vb.).
- `src/assets/`: Görseller, ikonlar veya statik dosyalar.

---
*Projenin ana yapısı ve backend detayları için ana dizindeki veya backend klasöründeki README dosyalarını inceleyebilirsiniz.*
