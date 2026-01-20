# 🚀 Deployment Guide

Пошаговая инструкция по развертыванию сайта стоматологической клиники.

---

## 📋 Pre-Deployment Checklist

- [ ] PostgreSQL database готова (Neon, Supabase, или Railway)
- [ ] Environment variables настроены
- [ ] `package.json` и `package-lock.json` обновлены
- [ ] Prisma schema проверена
- [ ] Тесты пройдены (`npm test`)
- [ ] Build работает локально (`npm run build`)
- [ ] GitHub repository создан

---

## 🐘 Step 1: Setup PostgreSQL Database

### Option A: Neon (Recommended)

1. Перейти на [neon.tech](https://neon.tech/)
2. Создать аккаунт (GitHub OAuth)
3. Создать новый проект: `dental-clinic-vakalova`
4. Скопировать `DATABASE_URL` из Connection String
5. Добавить в `.env.local` и на платформе deployment

### Option B: Supabase

1. Перейти на [supabase.com](https://supabase.com/)
2. Создать проект
3. Получить `DATABASE_URL` из Project Settings → Database
4. Добавить в environment variables

### Option C: Railway (Database + Hosting)

```bash
railway add
# Select: PostgreSQL
# DATABASE_URL будет автоматически установлен
```

---

## 🔨 Step 2: Build & Test Locally

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Build application
npm run build

# Test production build
npm start
```

Откройте `http://localhost:3000` и проверьте:
- ✅ Все страницы загружаются
- ✅ Формы работают
- ✅ Изображения отображаются
- ✅ Нет console errors

---

## 🚂 Option 1: Deploy to Railway

### Advantages
- PostgreSQL included
- Easy setup
- Free tier: $5/month credit
- No cold starts

### Steps

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
railway init

# 4. Link to GitHub (optional)
railway link

# 5. Add PostgreSQL
railway add
# Select: PostgreSQL

# 6. Set environment variables
railway variables set NEXTAUTH_SECRET=$(openssl rand -base64 32)
railway variables set NEXTAUTH_URL=$(railway domain)
railway variables set RESEND_API_KEY=re_xxxxx
railway variables set WHATSAPP_PHONE_NUMBER=+420123456789

# 7. Deploy
railway up

# 8. Run migrations
railway run npx prisma db push

# 9. Get your URL
railway domain
```

Your site will be available at: `https://dental-clinic-vakalova.up.railway.app`

---

## ▲ Option 2: Deploy to Vercel

### Advantages
- Fastest deployment
- Excellent DX
- Free tier generous
- Automatic previews

### Steps

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

### Environment Variables (Vercel Dashboard)

1. Go to project settings
2. Environment Variables
3. Add:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-site.vercel.app
RESEND_API_KEY=...
```

4. Redeploy

---

## 🌐 Option 3: Deploy to Netlify

### Advantages
- Simple UI
- Good free tier
- CDN included

### Steps

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Initialize
netlify init

# 4. Build settings
# Build command: npm run build
# Publish directory: .next

# 5. Deploy
netlify deploy --prod
```

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
```

---

## 🔒 Step 3: Setup Custom Domain (Optional)

### For Railway

```bash
# Add custom domain
railway domain add vakalova-dental.cz

# Add DNS records (in your domain provider):
# Type: CNAME
# Name: @
# Value: your-project.up.railway.app
```

### For Vercel

1. Go to Project Settings → Domains
2. Add Domain: `vakalova-dental.cz`
3. Configure DNS (A record or CNAME)
4. Wait for SSL certificate (~24h)

### For Netlify

1. Domain Settings → Add Custom Domain
2. Configure DNS (Netlify DNS recommended)
3. SSL certificate auto-provisioned

---

## 📧 Step 4: Setup Email (Resend)

```bash
# 1. Go to resend.com
# 2. Create account
# 3. Add domain: vakalova-dental.cz
# 4. Add DNS records (provided by Resend)
# 5. Get API key
# 6. Add to environment variables:
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@vakalova-dental.cz
```

---

## 📱 Step 5: Setup WhatsApp Business API

### Option A: Official WhatsApp Business API

1. Go to [developers.facebook.com](https://developers.facebook.com/)
2. Create App → Business → WhatsApp
3. Get API credentials
4. Add to environment variables

### Option B: Simple WhatsApp Link (Faster)

```tsx
// Just use direct WhatsApp link
<a href="https://wa.me/420123456789?text=Hello">
  Contact via WhatsApp
</a>
```

No API key needed!

---

## 📊 Step 6: Setup Analytics

### Google Analytics 4

```bash
# 1. Go to analytics.google.com
# 2. Create property
# 3. Get Measurement ID (G-XXXXXXXXXX)
# 4. Add to environment:
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Yandex.Metrika

```bash
# 1. Go to metrika.yandex.com
# 2. Create counter
# 3. Get Counter ID
# 4. Add to environment:
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

---

## 🔍 Step 7: Submit to Search Engines

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `vakalova-dental.cz`
3. Verify ownership (DNS или HTML file)
4. Submit `sitemap.xml`: `https://vakalova-dental.cz/sitemap.xml`

### Yandex.Webmaster

1. Go to [webmaster.yandex.com](https://webmaster.yandex.com/)
2. Add site
3. Verify
4. Submit sitemap

---

## 🏪 Step 8: Google Business Profile

1. Go to [business.google.com](https://business.google.com/)
2. Create business profile
3. Add clinic info:
   - Name: Стоматология Татьяна Вакалова
   - Address: Václavské náměstí 123/45, Praha
   - Phone: +420 123 456 789
   - Website: https://vakalova-dental.cz
   - Category: Dentist
   - Hours: Mo-Fr 9:00-20:00, Sa 10:00-16:00
4. Verify (postcard или phone)
5. Add photos
6. Respond to reviews

---

## 🎯 Step 9: Set up CI/CD (GitHub Actions)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npx prisma generate
      - run: npx prisma db push
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 📈 Step 10: Monitoring

### Sentry (Error Tracking)

```bash
# 1. Go to sentry.io
# 2. Create project (Next.js)
# 3. Get DSN
# 4. Add to environment:
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### UptimeRobot (Uptime Monitoring)

```bash
# 1. Go to uptimerobot.com
# 2. Add Monitor
# 3. Type: HTTPS
# 4. URL: https://vakalova-dental.cz
# 5. Interval: 5 minutes
# 6. Alert contacts: your-email@example.com
```

---

## ✅ Post-Deployment Checklist

- [ ] Site доступен по URL
- [ ] SSL certificate активен (https://)
- [ ] Все страницы загружаются
- [ ] Формы отправляются
- [ ] Email notifications работают
- [ ] WhatsApp link работает
- [ ] Google Analytics отслеживает визиты
- [ ] Sitemap submitted to search engines
- [ ] Google Business Profile создан
- [ ] Uptime monitoring настроен
- [ ] Backup strategy настроена

---

## 🐛 Troubleshooting

### Build fails

```bash
# Check logs
railway logs
# or
vercel logs

# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Prisma client not generated
```

### Database connection error

```bash
# Test connection
npx prisma db push

# Check DATABASE_URL format:
# postgresql://user:password@host:5432/database
```

### Images not loading

```bash
# Check next.config.ts:
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",
    },
  ],
}
```

---

## 📞 Support

Need help? Contact us:
- **Email**: dev@vakalova-dental.cz
- **GitHub Issues**: Create an issue in the repository

---

**Good luck with your deployment! 🚀**
