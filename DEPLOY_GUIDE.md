# Vercel Deploy Rehberi - Polikriz Platform

## 🚀 Hızlı Deploy Adımları

### 1. Vercel Dashboard'a Git
- https://vercel.com/dashboard
- **New Project** → **Import Git Repository**
- GitHub repository'nizi seçin

### 2. Environment Variables Ayarla
Vercel Dashboard → **Settings** → **Environment Variables**:

```
DATABASE_URL = postgresql://username:password@host:5432/database
NEXTAUTH_URL = https://your-app.vercel.app
NEXTAUTH_SECRET = your-production-secret-key-here
NODE_ENV = production
PRISMA_GENERATE_DATAPROXY = false
```

### 3. PostgreSQL Database Kur
#### Seçenek A: Vercel Postgres (Önerilen)
1. Vercel Dashboard → Projeniz → **Storage** → **Create Database** → **Postgres**
2. Database oluşturun
3. `DATABASE_URL` otomatik eklenir

#### Seçenek B: External PostgreSQL
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app
- **Neon**: https://neon.tech
- **PlanetScale**: https://planetscale.com

### 4. Deploy Ayarları
- **Framework Preset**: Next.js ✅
- **Root Directory**: ./ ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: .next ✅

### 5. Deploy Sonrası Database Setup
Deploy tamamlandıktan sonra:

```bash
# Vercel CLI ile
npx vercel env pull .env.local

# Database migration
npx prisma db push

# Seed data (opsiyonel)
npx prisma db seed
```

## 🔧 Troubleshooting

### Build Error
```bash
# Local test
npm run build
```

### Database Connection Error
1. `DATABASE_URL` doğru mu kontrol et
2. PostgreSQL server erişilebilir mi?
3. Firewall ayarları doğru mu?

### Prisma Error
```bash
# Prisma client generate
npx prisma generate

# Database schema sync
npx prisma db push
```

## 📊 Test Endpoints

Deploy sonrası test edin:
- `https://your-app.vercel.app/api/health`
- `https://your-app.vercel.app/api/countries`
- `https://your-app.vercel.app/api/indicators`

## 🎯 Önemli Notlar

1. **PostgreSQL Gerekli**: SQLite Vercel'de desteklenmiyor
2. **Environment Variables**: Production'da mutlaka ayarlanmalı
3. **Database Migration**: Deploy sonrası çalıştırılmalı
4. **Build Success**: Local'de `npm run build` başarılı olmalı

## 🚨 Yaygın Hatalar

### "Can't reach database server"
- `DATABASE_URL` yanlış
- PostgreSQL server çalışmıyor
- Network erişim sorunu

### "Prisma Client not generated"
- `npx prisma generate` çalıştır
- Build process'te hata var

### "Build failed"
- TypeScript hataları
- Missing dependencies
- Environment variables eksik

## ✅ Deploy Checklist

- [ ] PostgreSQL database kurulu
- [ ] Environment variables ayarlandı
- [ ] Local build başarılı (`npm run build`)
- [ ] Vercel project oluşturuldu
- [ ] Deploy tamamlandı
- [ ] Database migration çalıştırıldı
- [ ] Test endpoints çalışıyor
- [ ] Production URL erişilebilir

## 🎉 Başarılı Deploy!

Artık projeniz Vercel'de çalışıyor! 🚀
