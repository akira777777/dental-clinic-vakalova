# 🚀 Complete Deployment Guide - All Policies Included

## Quick Start Deployment

### Prerequisites
- ✅ Neon PostgreSQL database account
- ✅ Vercel account
- ✅ Node.js 20.x installed locally (for setup)

### Step-by-Step Deployment

#### 1. Set Up Neon Database

```bash
# Get connection string from Neon dashboard
# Format: postgresql://user:password@host/dbname?sslmode=require

# Set environment variable
export DATABASE_URL="your-neon-connection-string"  # Linux/Mac
# OR
$env:DATABASE_URL="your-neon-connection-string"    # Windows PowerShell
```

#### 2. Push Database Schema

```bash
# Install dependencies
npm run install:all

# Generate Prisma client
npm run prisma:generate

# Push schema to Neon
npm run prisma:push
```

#### 3. Deploy to Vercel

**Option A: Automated Script (Recommended)**

**Linux/Mac:**
```bash
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

**Windows PowerShell:**
```powershell
.\deploy-vercel.ps1
```

**Option B: Manual Deployment**

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**Option C: GitHub Integration**

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import repository
4. **CRITICAL**: Add environment variables:
   - Go to Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon connection string
5. Click "Deploy"

#### 4. Configure Environment Variables in Vercel

**Required:**
- `DATABASE_URL` - Your Neon PostgreSQL connection string

**Optional:**
- `ALLOWED_ORIGINS` - Comma-separated CORS origins (e.g., `https://yourdomain.com,https://www.yourdomain.com`)
- `GEMINI_API_KEY` - For chat assistant features

**How to Set:**
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable
5. Select environments (Production, Preview, Development)
6. Redeploy if needed

## Post-Deployment Verification

### 1. Health Check
```bash
curl https://your-app.vercel.app/api/health
```
**Expected:** `{"status":"ok","message":"Backend is running on Vercel with Prisma"}`

### 2. Services Endpoint
```bash
curl https://your-app.vercel.app/api/services
```
**Expected:** Array of services or fallback data

### 3. Test Booking
- Open your deployed site
- Click "Book Appointment"
- Fill out the form
- Submit and verify success

### 4. Check Logs
- Vercel Dashboard → Functions → Logs
- Look for any errors
- Verify database connections

## Configuration Files

### vercel.json
- ✅ Build command configured
- ✅ Function runtime set (nodejs20.x)
- ✅ Security headers configured
- ✅ Rewrites for SPA routing

### Environment Variables
- ✅ `.env.example` created as template
- ✅ All required variables documented
- ✅ Security policies applied

## Security Policies Applied

### ✅ Implemented
1. **Security Headers**: All responses include security headers
2. **CORS**: Production-safe CORS configuration
3. **Input Validation**: Zod schemas for all inputs
4. **Error Handling**: Production-safe error messages
5. **Database Security**: SSL required, connection pooling

### 📋 Policies Document
See `DEPLOYMENT_POLICIES.md` for complete policy documentation.

## Monitoring & Maintenance

### Health Monitoring
- **Endpoint**: `/api/health`
- **Frequency**: Monitor every 5 minutes
- **Alert**: Set up alerts for failures

### Log Monitoring
- **Vercel**: Dashboard → Functions → Logs
- **Neon**: Dashboard → Query Analytics
- **Errors**: Set up error tracking (optional: Sentry)

### Performance Monitoring
- **Response Time**: Target < 500ms
- **Cold Start**: ~1-2 seconds (acceptable for serverless)
- **Database**: Monitor query performance in Neon

## Troubleshooting

### Build Fails
1. Check Vercel build logs
2. Verify `package.json` scripts
3. Ensure Node.js 20.x is used
4. Check for missing dependencies

### Database Connection Fails
1. Verify `DATABASE_URL` is set correctly
2. Check Neon dashboard for connection status
3. Ensure SSL mode enabled (`?sslmode=require`)
4. Check Neon connection limits

### API Returns 404
1. Verify `vercel.json` rewrites
2. Check `/api/index.ts` exists
3. Review Vercel function logs
4. Ensure function deployed correctly

### Prisma Client Not Found
1. Check build logs for Prisma generation
2. Verify `postinstall` script runs
3. Manually run: `npm run prisma:generate`
4. Check `server/prisma/schema.prisma` exists

## Rollback Procedure

### Via Vercel CLI
```bash
vercel rollback
```

### Via Dashboard
1. Go to Deployments
2. Select previous working deployment
3. Click "Promote to Production"

### Database Rollback
- Neon provides automatic backups
- Restore via Neon dashboard → Backups

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Deployment Policies**: See `DEPLOYMENT_POLICIES.md`

## Quick Reference

### Essential Commands
```bash
# Generate Prisma client
npm run prisma:generate

# Push database schema
npm run prisma:push

# Build client
npm run build --workspace=client

# Deploy to Vercel
vercel --prod

# View logs
vercel logs

# Rollback
vercel rollback
```

### Environment Variables Template
```bash
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
GEMINI_API_KEY=your-api-key
```

---

## ✅ Ready to Deploy!

All policies, configurations, and scripts are ready. Follow the steps above to deploy.

**Status**: 🟢 **PRODUCTION READY**
