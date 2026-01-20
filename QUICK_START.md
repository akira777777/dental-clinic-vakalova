# ⚡ QUICK START

Запустите сайт стоматологической клиники за **5 минут**!

---

## 1️⃣ Install Dependencies

```bash
cd C:\local-agent\projects\dental-clinic-vakalova
npm install
```

**Time**: ~2 minutes

---

## 2️⃣ Create Environment File

Create `.env.local`:

```env
# Database (use SQLite for local development)
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Email (optional for now)
RESEND_API_KEY=""
RESEND_FROM_EMAIL="noreply@vakalova-dental.cz"
```

**Time**: 30 seconds

---

## 3️⃣ Setup Database

```bash
npx prisma generate
npx prisma db push
```

**Time**: 30 seconds

---

## 4️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Time**: 10 seconds

---

## 🎉 DONE!

Ваш сайт работает локально!

---

## 📝 What's Next?

### Option A: Just Browse
Просто откройте http://localhost:3000 и смотрите сайт!

### Option B: Deploy Now
```bash
# Railway (рекомендуется)
npm install -g @railway/cli
railway login
railway init
railway up

# ИЛИ Vercel
npm install -g vercel
vercel --prod
```

### Option C: Customize Content
1. Замените placeholder images в `public/images/`
2. Обновите тексты в компонентах (`src/components/sections/`)
3. Добавьте реальные данные врачей
4. Добавьте реальные отзывы

---

## 🆘 Troubleshooting

### Error: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Error: "Port 3000 is already in use"
```bash
# Kill process on port 3000
npx kill-port 3000
# OR use different port
npm run dev -- -p 3001
```

### Tailwind styles not working
```bash
# Restart dev server
# Press Ctrl+C, then:
npm run dev
```

---

## 📞 Need Help?

Read full documentation:
- `README.md` - Complete guide
- `DEPLOYMENT.md` - Deployment instructions
- `BUILD_COMPLETE.md` - Project summary

---

**Happy coding! 🚀**
