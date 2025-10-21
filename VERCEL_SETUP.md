# Vercel Deployment Setup - DÜZELTİLMİŞ

## ÖNEMLİ: Vercel için PostgreSQL Gerekli

Bu proje artık **sadece PostgreSQL** kullanıyor. SQLite Vercel'de desteklenmiyor.

## 1. PostgreSQL Database Kurulumu

### Seçenek A: Vercel Postgres (Önerilen)
1. Vercel Dashboard → Projeniz → **Storage** → **Create Database** → **Postgres**
2. Database oluşturun
3. **Settings** → **Environment Variables** → `DATABASE_URL` otomatik eklenir

### Seçenek B: External PostgreSQL
- Supabase, Railway, Neon, PlanetScale gibi servisler
- Connection string'i `DATABASE_URL` olarak ekleyin

## 2. Environment Variables Ayarlama

Vercel Dashboard → **Settings** → **Environment Variables**:

```
DATABASE_URL = postgresql://username:password@host:5432/database
NEXTAUTH_URL = https://your-app.vercel.app
NEXTAUTH_SECRET = your-production-secret-key-here
NODE_ENV = production
PRISMA_GENERATE_DATAPROXY = false
```

## 3. Deploy Ayarları

- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: `npm run build` (otomatik)
- **Output Directory**: .next (otomatik)

## 4. Database Migration

Deploy sonrası:
1. Vercel CLI ile database'e bağlanın
2. `npx prisma db push` komutunu çalıştırın
3. `npx prisma db seed` ile veri ekleyin

## 5. Test Etme

Deploy sonrası:
- `/api/health` endpoint'ini test edin
- `/api/countries` endpoint'ini test edin
- Console'da hata mesajlarını kontrol edin

## Troubleshooting

### Build Error
- `npm run build` komutunu local'de test edin
- PostgreSQL connection string'in doğru olduğunu kontrol edin
- `prisma generate` komutunun çalıştığını kontrol edin

### Database Connection Error
- `DATABASE_URL` environment variable'ının doğru ayarlandığını kontrol edin
- PostgreSQL database'in erişilebilir olduğunu kontrol edin
- Firewall ayarlarını kontrol edin

### Prisma Error
- `npx prisma generate` komutunu çalıştırın
- Database schema'nın güncel olduğunu kontrol edin
