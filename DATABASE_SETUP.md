# Database Setup Guide

Bu proje hem MongoDB hem de PostgreSQL (Prisma) veritabanlarını destekler. Her iki veritabanı da aynı anda kullanılabilir ve birbirlerine yedek olarak çalışır.

## 🗄️ Desteklenen Veritabanları

### 1. MongoDB
- **Kullanım**: Ana veritabanı olarak
- **Bağlantı**: `MONGODB_URI` environment variable
- **Avantajlar**: Esnek şema, hızlı geliştirme

### 2. PostgreSQL (Prisma)
- **Kullanım**: Yedek veritabanı olarak
- **Bağlantı**: `DATABASE_URL` environment variable
- **Avantajlar**: Güçlü tip güvenliği, ilişkisel veri

## 🚀 Hızlı Kurulum

### 1. Environment Variables Ayarla

`.env.local` dosyasını oluşturun:

```bash
# MongoDB
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/polikriz_platform?retryWrites=true&w=majority"

# PostgreSQL (Prisma)
DATABASE_URL="postgresql://username:password@localhost:5432/polikriz_platform"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
NODE_ENV="development"
```

### 2. Veritabanı Kurulumu

```bash
# Tüm veritabanı bağlantılarını kur
npm run db:setup

# Prisma client oluştur
npm run db:generate

# Veritabanı şemasını push et
npm run db:push

# Geliştirme sunucusunu başlat
npm run dev
```

### 3. Veritabanı Test Et

```bash
# Bağlantıları test et
npm run db:test

# Sağlık durumunu kontrol et
npm run db:health

# Veritabanını seed et
curl -X POST http://localhost:3000/api/seed
```

## 🔧 API Endpoints

### Test Endpoints
- `GET /api/test-db` - Veritabanı bağlantılarını test et
- `GET /api/health` - Sistem sağlık durumu
- `POST /api/seed` - Veritabanını örnek verilerle doldur

### Data Endpoints
- `GET /api/countries` - Ülkeleri listele
- `GET /api/indicators` - Göstergeleri listele
- `GET /api/data` - Veri noktalarını getir

## 🏗️ Mimari

### Fallback Sistemi
1. **MongoDB** - İlk tercih
2. **Prisma/PostgreSQL** - İkinci tercih
3. **Mock Data** - Son çare

### Veri Akışı
```
API Request → MongoDB → Prisma → Mock Data → Response
```

## 🐛 Sorun Giderme

### MongoDB Bağlantı Sorunları
```bash
# MongoDB URI'yi kontrol et
echo $MONGODB_URI

# Bağlantıyı test et
npm run db:test
```

### Prisma Sorunları
```bash
# Prisma client'ı yeniden oluştur
npm run db:generate

# Veritabanı şemasını reset et
npx prisma db push --force-reset
```

### Genel Sorunlar
```bash
# Tüm bağımlılıkları yeniden yükle
rm -rf node_modules package-lock.json
npm install

# Veritabanı kurulumunu yeniden yap
npm run db:setup
```

## 📊 Veritabanı Şeması

### MongoDB Collections
- `countries` - Ülke bilgileri
- `indicators` - Gösterge tanımları
- `data_points` - Veri noktaları
- `categories` - Gösterge kategorileri

### Prisma Models
- `Country` - Ülke modeli
- `Indicator` - Gösterge modeli
- `DataPoint` - Veri noktası modeli
- `Category` - Kategori modeli

## 🔒 Güvenlik

- Environment variables'ları asla commit etmeyin
- Production'da güçlü şifreler kullanın
- Veritabanı bağlantılarını SSL ile koruyun

## 📈 Performans

- MongoDB: Hızlı okuma/yazma işlemleri
- PostgreSQL: Karmaşık sorgular ve ilişkisel veri
- Her iki veritabanı da aynı anda çalışabilir

## 🆘 Yardım

Sorun yaşıyorsanız:
1. `npm run db:health` ile sistem durumunu kontrol edin
2. Console loglarını inceleyin
3. Environment variables'ları doğrulayın
4. Veritabanı bağlantılarını test edin
