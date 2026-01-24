# Quick Deployment Guide

## Prerequisites
1. Neon PostgreSQL database (get connection string from [neon.tech](https://neon.tech))
2. Vercel account ([vercel.com](https://vercel.com))

## Step 1: Set up Neon Database

1. Go to [console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy the connection string (format: `postgresql://user:password@host/dbname?sslmode=require`)

## Step 2: Deploy to Vercel

### Option A: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Set your database URL
export DATABASE_URL="your-neon-connection-string"

# Run deployment script (or manually):
npm run install:all
npm run prisma:generate
npm run prisma:push
vercel --prod
```

### Option B: Via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. **IMPORTANT**: Add environment variable in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon connection string
5. Click "Deploy"

## Step 3: Verify Deployment

1. Check health endpoint: `https://your-app.vercel.app/api/health`
2. Test booking: Submit a booking through the frontend
3. Check Vercel function logs for any errors

## Environment Variables Required

- `DATABASE_URL`: Your Neon PostgreSQL connection string
- `GEMINI_API_KEY`: (Optional) For chat assistant features

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly in Vercel
- Check Neon dashboard for connection limits
- Ensure SSL mode is enabled (`?sslmode=require`)

### Prisma Client Not Found
- The `postinstall` script should generate it automatically
- Check build logs in Vercel dashboard
- Manually run `npm run prisma:generate` if needed

### API Routes Not Working
- Verify `vercel.json` configuration
- Check that `/api/index.ts` exists
- Review Vercel function logs

## Post-Deployment

After deployment, you may want to:
1. Seed initial data (doctors, services) via Prisma Studio or a migration
2. Set up monitoring/alerts in Vercel
3. Configure custom domain if needed
