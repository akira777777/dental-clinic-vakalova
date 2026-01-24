# Production Deployment Guide

## Production Checklist ✅

### Pre-Deployment

- [x] ✅ Code optimized for production
- [x] ✅ Security headers configured
- [x] ✅ Error handling implemented
- [x] ✅ CORS configured properly
- [x] ✅ Prisma client optimized for serverless
- [x] ✅ Build process configured
- [x] ✅ Environment variables documented

### Environment Variables Required

**Required:**
- `DATABASE_URL` - Neon PostgreSQL connection string
  - Format: `postgresql://user:password@host/dbname?sslmode=require`
  - Get from: [Neon Console](https://console.neon.tech)

**Optional:**
- `GEMINI_API_KEY` - For chat assistant features
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins (defaults to `*` if not set)
- `NODE_ENV` - Automatically set to `production` by Vercel

### Production Optimizations Applied

1. **Prisma Client**
   - Optimized for serverless environments
   - Connection pooling configured
   - Graceful shutdown handling

2. **Security Headers**
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block
   - Strict-Transport-Security (HSTS)
   - Referrer-Policy

3. **Error Handling**
   - Internal errors hidden in production
   - Detailed errors only in development
   - Proper error logging

4. **CORS Configuration**
   - Configurable allowed origins
   - Credentials support
   - Production-safe defaults

5. **API Configuration**
   - Request size limits (10MB)
   - Function timeout: 30 seconds
   - Cache headers for API routes

## Deployment Steps

### 1. Set Up Neon Database

```bash
# Create project at neon.tech
# Copy connection string
# Format: postgresql://user:password@host/dbname?sslmode=require

# Set locally for testing
export DATABASE_URL="your-neon-connection-string"

# Push schema
npm run prisma:push
```

### 2. Deploy to Vercel

#### Via CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Set production environment
export NODE_ENV=production

# Deploy
vercel --prod
```

#### Via GitHub:
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import repository
4. **Set Environment Variables:**
   - `DATABASE_URL` = Your Neon connection string
   - `NODE_ENV` = `production` (auto-set by Vercel)
   - `ALLOWED_ORIGINS` = Your domain(s) (optional)
5. Deploy

### 3. Post-Deployment

1. **Verify Health Endpoint:**
   ```bash
   curl https://your-app.vercel.app/api/health
   ```

2. **Test API Endpoints:**
   - GET `/api/services`
   - POST `/api/booking`

3. **Check Logs:**
   - Vercel Dashboard → Functions → View Logs
   - Monitor for any errors

4. **Database Verification:**
   - Check Neon dashboard for connections
   - Verify tables created correctly
   - Run `npm run prisma:studio` locally to view data

## Production Monitoring

### Vercel Analytics
- Enable in Vercel dashboard
- Monitor function performance
- Track errors and usage

### Database Monitoring
- Neon dashboard provides query analytics
- Monitor connection pool usage
- Set up alerts for high usage

### Error Tracking (Optional)
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Datadog for APM

## Performance Optimization

### Already Implemented:
- ✅ Prisma connection pooling
- ✅ Serverless function optimization
- ✅ Security headers
- ✅ CORS optimization
- ✅ Error handling

### Additional Recommendations:
1. **CDN Caching**: Vercel automatically handles this
2. **Image Optimization**: Consider using Vercel Image Optimization
3. **Database Indexing**: Already configured in Prisma schema
4. **Rate Limiting**: Consider adding for production (not implemented yet)

## Security Considerations

### Implemented:
- ✅ Security headers
- ✅ CORS configuration
- ✅ Input validation (Zod)
- ✅ SQL injection prevention (Prisma)
- ✅ Error message sanitization

### Recommended:
1. **Rate Limiting**: Add rate limiting middleware
2. **Authentication**: Implement JWT for admin routes
3. **HTTPS**: Automatically handled by Vercel
4. **Environment Variables**: Never commit secrets

## Troubleshooting Production Issues

### Database Connection Errors
- Verify `DATABASE_URL` is set correctly
- Check Neon connection limits
- Ensure SSL mode enabled (`?sslmode=require`)

### Function Timeouts
- Current limit: 30 seconds
- Optimize database queries if needed
- Consider breaking down large operations

### CORS Errors
- Set `ALLOWED_ORIGINS` environment variable
- Verify frontend domain is included
- Check browser console for specific errors

### Prisma Client Errors
- Ensure `postinstall` script runs during build
- Check build logs in Vercel
- Verify schema is pushed to database

## Rollback Procedure

If issues occur:

1. **Via Vercel CLI:**
   ```bash
   vercel rollback
   ```

2. **Via Dashboard:**
   - Go to Deployments
   - Select previous working deployment
   - Click "Promote to Production"

## Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
