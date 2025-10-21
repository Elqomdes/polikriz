# Vercel Deployment Setup

## Environment Variables Ayarlama

Vercel dashboard'da aşağıdaki environment variables'ları ekleyin:

### 1. Vercel Dashboard'a Gidin
- https://vercel.com/dashboard
- Projenizi seçin (`polikriz`)
- **Settings** → **Environment Variables**

### 2. Gerekli Variables'ları Ekleyin

```
MONGODB_URI = mongodb+srv://mey4249:emre4249@polikrizdatabase.uekezsx.mongodb.net/?retryWrites=true&w=majority&appName=polikrizdatabase
NEXTAUTH_URL = https://your-domain.vercel.app
NEXTAUTH_SECRET = your-production-secret-key-here
NODE_ENV = production
```

### 3. Deploy Ayarları

- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: `npm run build`
- **Output Directory**: .next

### 4. MongoDB Atlas Ayarları

MongoDB Atlas'da:
1. **Network Access** → IP Whitelist'e `0.0.0.0/0` ekleyin (tüm IP'lere izin)
2. **Database Access** → Kullanıcı oluşturun
3. **Connection String**'i kopyalayın

### 5. Test Etme

Deploy sonrası:
- `/api/countries` endpoint'ini test edin
- `/api/test-db` endpoint'ini test edin
- Console'da hata mesajlarını kontrol edin

## Troubleshooting

### MongoDB Connection Error
- Environment variables'ların doğru ayarlandığını kontrol edin
- MongoDB Atlas IP whitelist'ini kontrol edin
- Connection string'in doğru olduğunu kontrol edin

### Build Error
- `npm run build` komutunu local'de test edin
- TypeScript hatalarını kontrol edin
- Dependencies'lerin güncel olduğunu kontrol edin
