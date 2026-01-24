# Dental Clinic Vakalova - Production Ready

Modern dental clinic website with booking system, built with React, Express, Prisma, and PostgreSQL.

## 🚀 Quick Deploy

### Prerequisites
- Neon PostgreSQL database ([neon.tech](https://neon.tech))
- Vercel account ([vercel.com](https://vercel.com))

### Deploy in 3 Steps

1. **Set up Neon Database**:
   ```bash
   # Get connection string from Neon dashboard
   export DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   npm run prisma:push
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variable**:
   - Vercel Dashboard → Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon connection string

**See `DEPLOY_FINAL.md` for complete deployment guide.**

## 📁 Project Structure

```
├── api/              # Vercel serverless functions
├── client/           # React frontend (Vite)
├── server/           # Express backend (local dev)
└── vercel.json       # Vercel configuration
```

## 🛠️ Development

```bash
# Install dependencies
npm run install:all

# Start development servers
npm run dev

# Generate Prisma client
npm run prisma:generate

# Push database schema
npm run prisma:push
```

## 📚 Documentation

- `DEPLOY_FINAL.md` - Complete deployment guide
- `DEPLOYMENT_POLICIES.md` - Deployment policies
- `PRODUCTION.md` - Production optimizations

## 🔧 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express + Prisma
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel (Frontend + API)
- **Database Hosting**: Neon

## ✅ Features

- ✅ Patient booking system
- ✅ Service catalog
- ✅ Doctor profiles
- ✅ Responsive design
- ✅ Production-ready security
- ✅ Serverless architecture

## 📝 License

Private project
