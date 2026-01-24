# Deployment Policies & Configuration

## Environment Variables Policy

### Required Variables

| Variable | Description | Where to Set |
|----------|-------------|--------------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Vercel Dashboard → Settings → Environment Variables |

**Format:** `postgresql://user:password@host/dbname?sslmode=require`

### Optional Variables

| Variable | Description | Default | Where to Set |
|----------|-------------|---------|--------------|
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | `*` | Vercel Dashboard |
| `GEMINI_API_KEY` | Google Gemini API key for chat | Not set | Vercel Dashboard |
| `NODE_ENV` | Node environment | `production` (auto-set) | Auto-set by Vercel |

## Security Policies

### 1. Database Connection
- ✅ **SSL Required**: All connections must use SSL (`?sslmode=require`)
- ✅ **Connection Pooling**: Optimized for serverless (automatic)
- ✅ **Credentials**: Never commit `DATABASE_URL` to git

### 2. CORS Policy
- **Development**: Allows all origins (`*`)
- **Production**: Configurable via `ALLOWED_ORIGINS`
- **Credentials**: Enabled for authenticated requests

### 3. Security Headers
All responses include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 4. API Security
- ✅ Input validation (Zod schemas)
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Error message sanitization (production)
- ✅ Request size limits (10MB)

## Deployment Policies

### 1. Build Process
- **Build Command**: `npm run install:all && npm run prisma:generate && npm run build --workspace=client`
- **Output Directory**: `client/dist`
- **Node Version**: 20.x (configured in vercel.json)

### 2. Function Configuration
- **Runtime**: `nodejs20.x`
- **Timeout**: 30 seconds
- **Includes**: `server/prisma/**` (for Prisma schema)

### 3. Database Migration Policy
- **Initial Setup**: Use `prisma db push` for initial schema
- **Production Changes**: Use `prisma migrate` for schema changes
- **Backup**: Always backup before migrations

### 4. Rollback Policy
- **Via CLI**: `vercel rollback`
- **Via Dashboard**: Deployments → Select previous → Promote to Production
- **Database**: Neon provides automatic backups

## Monitoring Policies

### 1. Health Checks
- **Endpoint**: `/api/health`
- **Frequency**: Monitor every 5 minutes
- **Expected Response**: `{"status":"ok","message":"Backend is running on Vercel with Prisma"}`

### 2. Error Tracking
- **Logs**: Vercel Dashboard → Functions → Logs
- **Database**: Neon Dashboard → Query Analytics
- **Alerts**: Set up for function errors and database connection issues

### 3. Performance Monitoring
- **Response Time**: Target < 500ms (cold start: ~1-2s)
- **Database Queries**: Monitor slow queries in Neon dashboard
- **Function Invocations**: Track in Vercel Analytics

## Backup & Recovery

### Database Backups
- **Automatic**: Neon provides automatic backups
- **Retention**: Check Neon dashboard for retention policy
- **Restore**: Via Neon dashboard → Backups

### Code Backups
- **Version Control**: All code in Git repository
- **Deployments**: Vercel keeps deployment history
- **Rollback**: Available via Vercel dashboard

## Compliance & Best Practices

### 1. Data Privacy
- ✅ No sensitive data in logs
- ✅ Error messages sanitized in production
- ✅ Database credentials secured

### 2. Performance
- ✅ Code splitting implemented
- ✅ CDN caching (automatic via Vercel)
- ✅ Database indexes configured

### 3. Scalability
- ✅ Serverless architecture (auto-scaling)
- ✅ Connection pooling optimized
- ✅ Stateless API design

## Deployment Checklist

Before each deployment:
- [ ] Database schema up to date
- [ ] Environment variables set in Vercel
- [ ] Build passes locally
- [ ] Tests pass (if applicable)
- [ ] Documentation updated

After deployment:
- [ ] Health endpoint verified
- [ ] API endpoints tested
- [ ] Database connection verified
- [ ] Error logs checked
- [ ] Performance metrics reviewed

## Support & Escalation

### Issues
1. Check Vercel function logs
2. Check Neon database dashboard
3. Review error messages
4. Check environment variables

### Resources
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Prisma Docs: https://www.prisma.io/docs

---

**Last Updated**: $(date)
**Version**: 1.0.0
