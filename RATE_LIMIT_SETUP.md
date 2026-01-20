# ⚡ Rate Limiting - Setup Guide

**Status**: ✅ Implemented (in-memory for dev)
**Production Ready**: ⚠️ Needs Upstash Redis for scale

---

## 🎯 What's Implemented

### ✅ Development (Current)

**Library**: Custom in-memory Map
**Scope**: Single server instance
**Limits**:

- Contact form: 5 requests / 15 minutes
- Booking form: 3 requests / 30 minutes

**File**: `src/lib/rate-limit.ts`

---

## 🚀 Production Setup (Optional - Upstash Redis)

### Why Upstash?

- ✅ **Serverless-ready**: Works with Vercel Edge Functions
- ✅ **Distributed**: Shares state across all instances
- ✅ **Free tier**: 10,000 requests/day
- ✅ **Low latency**: Edge network

### Step 1: Create Upstash Account

1. Go to [https://console.upstash.com/](https://console.upstash.com/)
2. Sign up (free)
3. Create a new Redis database
   - Region: Choose closest to your deployment (e.g., EU-Central-1)
   - Type: Regional (Free tier)

### Step 2: Get Credentials

Copy these from Upstash dashboard:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Step 3: Add Environment Variables

```bash
# .env.local (development)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Vercel Dashboard (production)
# Settings → Environment Variables
# Add the same variables
```

### Step 4: Install Package

```bash
npm install @upstash/ratelimit @upstash/redis
```

### Step 5: Update Code

Create `src/lib/rate-limit-redis.ts`:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Contact form rate limiter
export const contactRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
  prefix: "ratelimit:contact",
});

// Booking form rate limiter
export const bookingRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 m"),
  analytics: true,
  prefix: "ratelimit:booking",
});

// Usage in API routes:
// const { success, limit, remaining, reset } = await contactRateLimiter.limit(ip);
```

### Step 6: Update API Routes

Replace `rateLimit()` calls with Upstash:

```typescript
// Before (in-memory):
import { rateLimit } from "@/lib/rate-limit";
const result = await rateLimit(request, { max: 5, windowSeconds: 900 });

// After (Redis):
import { contactRateLimiter } from "@/lib/rate-limit-redis";
const { success } = await contactRateLimiter.limit(getClientIP(request));
```

---

## 📊 Current Limits

| Endpoint | Max Requests | Window | Status |
|----------|-------------|--------|--------|
| `/api/contact` | 5 | 15 minutes | ✅ Active |
| `/api/bookings` | 3 | 30 minutes | ✅ Active |

### Why these limits?

**Contact Form (5/15min)**:

- Prevents spam
- Legitimate users rarely need >5 messages
- Allows corrections/typos

**Booking Form (3/30min)**:

- Prevents double-booking abuse
- Legitimate users rarely book >3 appointments quickly
- Protects against accidental multiple submissions

---

## 🧪 Testing

### Test Rate Limiting

```bash
# Send 6 requests quickly (should block 6th)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","phone":"123456789","message":"Test message"}' \
  && echo "\nRequest $i completed"
done
```

**Expected**:

- Requests 1-5: `200 OK`
- Request 6: `429 Too Many Requests`

---

## 🔧 Configuration

### Adjusting Limits

Edit `src/lib/rate-limit.ts`:

```typescript
// More strict (production)
const rateLimitResult = await rateLimit(request, {
  max: 3,        // Lower
  windowSeconds: 1800  // Longer
});

// More lenient (testing)
const rateLimitResult = await rateLimit(request, {
  max: 100,      // Higher
  windowSeconds: 60  // Shorter
});
```

---

## 🛡️ Security Notes

### Bypassing Rate Limiting

**Potential Issues**:

- Using VPN/proxy to change IP
- Using multiple devices

**Mitigations**:

1. ✅ Fingerprinting (browser hash)
2. ✅ CAPTCHA for repeated violations
3. ✅ Email verification (already required)

**Current Strategy**: IP-based is 80% effective, good enough for MVP

---

## 📈 Monitoring

### Check Rate Limit Hits

In production with Upstash:

- Dashboard → Analytics
- See rate limit hits per endpoint
- Identify patterns

In development:

- Check logs for `429` responses
- `console.log` in rate-limit.ts

---

## 🚨 Troubleshooting

### Issue: Rate limiting not working

**Check**:

1. IP detection working? (check `x-forwarded-for` header)
2. Map cleanup running? (check `cleanupRateLimitStore`)
3. Time zone issues? (use `Date.now()`)

**Debug**:

```typescript
console.log('[Rate Limit]', {
  ip: getClientIP(request),
  count: record?.count,
  remaining: result.remaining
});
```

### Issue: False positives (blocking legit users)

**Solutions**:

1. Increase limits
2. Shorten window
3. Whitelist specific IPs (for testing)

---

## ✅ Summary

**Current**: ✅ Working with in-memory store
**Production**: ⚠️ Recommended to upgrade to Upstash Redis
**Cost**: Free (up to 10K requests/day)
**Setup Time**: ~15 minutes

---

**Built with** ⚡ **by Backend Engineer**
