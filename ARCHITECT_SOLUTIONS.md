# 🏗️ ARCHITECT SOLUTIONS

**Модель**: `qwen2.5-coder` (Software Architect)
**Дата**: 2026-01-20
**Основание**: QA_ANALYSIS_REPORT.md
**Задача**: Разработать технические решения для всех найденных проблем

---

## 📋 ОБЗОР

**Входные данные**: 11 проблем от QA
**Выходные данные**: Технические решения + выбор стека

---

## 🔥 PHASE 1: КРИТИЧЕСКИЕ ПРОБЛЕМЫ (Must Fix)

### 1. **Rate Limiting Solution**

**Проблема**: DoS атака, спам, нет ограничений

#### **Архитектурное решение:**

```
Middleware-based Rate Limiting
    │
    ├─ In-memory Cache (для dev/small scale)
    │   └─ Map<IP, {count, resetTime}>
    │
    └─ Redis (для production/scale)
        └─ Key: "rate:api:contact:{IP}"
        └─ TTL: 60 seconds
        └─ Value: request count
```

#### **Выбор технологии:**

**Вариант A**: `upstash-ratelimit` (рекомендую)

- ✅ Edge-ready (Vercel Edge Functions)
- ✅ Redis-based
- ✅ Simple API
- ✅ Бесплатный tier: 10K requests/day

**Вариант B**: Custom middleware с in-memory Map

- ✅ Нет зависимостей
- ❌ Не работает в serverless (каждый request = новая инстанция)
- ❌ Не масштабируется

**Вариант C**: Vercel Edge Config

- ✅ Native integration
- ❌ Сложнее setup
- ❌ Overkill для простого rate limiting

**РЕШЕНИЕ**: **Upstash Rate Limit** для production, **in-memory fallback** для dev

#### **Лимиты:**

| Endpoint | Requests | Window | Reason |
|----------|----------|--------|--------|
| `/api/contact` | 5 | 15 min | Контактная форма (макс 5 сообщений за 15 мин) |
| `/api/bookings` | 3 | 30 min | Запись на прием (макс 3 записи за 30 мин) |
| Global (IP-based) | 50 | 15 min | Общий лимит на IP |

#### **Error Response:**

```json
{
  "error": "Too many requests",
  "message": "Пожалуйста, подождите перед следующей попыткой",
  "retryAfter": 900
}
```

---

### 2. **Booking Slot Conflict Prevention**

**Проблема**: Двойные записи, нет проверки занятости

#### **Архитектурное решение:**

```
Optimistic Locking + Database Transaction

1. Check availability (SELECT с FOR UPDATE)
2. Lock row (transaction start)
3. Validate slot is free
4. Insert booking
5. Commit transaction
```

#### **Алгоритм:**

```
Input: doctorId, date, time

Step 1: Query existing bookings
  SELECT COUNT(*) FROM Booking
  WHERE doctorId = $1
    AND date = $2
    AND time = $3
    AND status IN ('PENDING', 'CONFIRMED')

Step 2: If count > 0 → REJECT (409 Conflict)

Step 3: Else → INSERT new booking (transaction)

Step 4: Return success
```

#### **Race Condition Protection:**

**Проблема**: Два запроса одновременно проверяют и оба видят "свободно"

**Решение**: Database-level constraint

```prisma
// В Prisma schema:
model Booking {
  @@unique([doctorId, date, time])
  @@index([doctorId, date, time, status])
}
```

При попытке вставить дубликат → Prisma выбросит `PrismaClientKnownRequestError` (P2002)

#### **UX:**

- Frontend показывает занятые слоты серым цветом
- Periodical polling (каждые 30 сек) обновляет доступность
- Slot блокируется на 5 минут после выбора (soft lock)

---

### 3. **CSRF Protection**

**Проблема**: Cross-Site Request Forgery attacks

#### **Архитектурное решение:**

```
Next.js Server Actions + Origin Validation

┌─────────────┐
│   Client    │
└──────┬──────┘
       │ POST /api/bookings
       │ Origin: https://clinic.com
       ▼
┌─────────────────────┐
│  Middleware (Check) │
│  - Verify Origin    │
│  - Verify Referer   │
└──────┬──────────────┘
       │ ✅ Allowed
       ▼
┌─────────────┐
│  API Route  │
└─────────────┘
```

#### **Выбор технологии:**

**Вариант A**: Next.js Middleware с Origin check (рекомендую для simple setup)

- ✅ Простой
- ✅ Нет зависимостей
- ✅ Работает в Edge Runtime

**Вариант B**: CSRF tokens (классический подход)

- ❌ Сложнее (нужен state management)
- ❌ Не работает с stateless serverless
- ✅ Более secure

**Вариант C**: SameSite cookies

- ✅ Browser-native protection
- ❌ Требует authentication (у нас нет)
- ❌ Не защищает public API

**РЕШЕНИЕ**: **Middleware с Origin validation** + **Rate limiting** (двойная защита)

#### **Implementation Strategy:**

```typescript
// middleware.ts
const ALLOWED_ORIGINS = [
  'https://clinic.com',
  'https://www.clinic.com',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
].filter(Boolean);

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  // POST requests require valid origin
  if (request.method === 'POST') {
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}
```

---

## ⚠️ PHASE 2: ВАЖНЫЕ ПРОБЛЕМЫ (Should Fix)

### 4. **Email Notifications Architecture**

**Проблема**: Нет email уведомлений

#### **Архитектурное решение:**

```
Event-Driven Email System

┌────────────┐
│ API Route  │
└─────┬──────┘
      │ Create Booking
      ▼
┌─────────────────┐
│   Database      │
│ (Save booking)  │
└─────┬───────────┘
      │ Trigger Event
      ▼
┌─────────────────────┐
│  Email Service      │
│  (Resend API)       │
├─────────────────────┤
│ 1. Confirmation to  │
│    patient          │
│ 2. Notification to  │
│    doctor/clinic    │
└─────────────────────┘
```

#### **Выбор технологии:**

**Resend** (рекомендую)

- ✅ Modern, developer-friendly API
- ✅ React Email templates
- ✅ Бесплатный tier: 3,000 emails/month
- ✅ Отличная документация

**Альтернативы**: SendGrid, Mailgun, AWS SES (overkill)

#### **Email Templates:**

1. **Booking Confirmation (Patient)**
   - Subject: "Ваша запись подтверждена - Клиника Татьяна Вакалова"
   - Content: Дата, время, врач, услуга, адрес, отмена ссылка

2. **New Booking Alert (Clinic)**
   - Subject: "Новая запись от {Patient Name}"
   - Content: Все данные пациента, телефон, email, заметки

3. **Reminder (Patient) - 24h before**
   - Subject: "Напоминание о визите завтра"
   - Content: Не забудьте прийти

#### **Архитектура отправки:**

```typescript
// Synchronous (рекомендую для простоты)
async function createBooking(data) {
  const booking = await db.booking.create({...});

  try {
    await sendEmails(booking);
  } catch (emailError) {
    // Log error, but don't fail booking
    logger.error('Email failed', { bookingId: booking.id, error: emailError });
  }

  return booking;
}

// Asynchronous (для scale)
async function createBooking(data) {
  const booking = await db.booking.create({...});

  // Queue email job
  await emailQueue.add('send-booking-confirmation', {
    bookingId: booking.id
  });

  return booking;
}
```

**РЕШЕНИЕ**: Synchronous для MVP, Async (Bull/BullMQ) если >1000 bookings/day

---

### 5. **Phone Validation & Identifier Strategy**

**Проблема**: Телефон как unique identifier, слабая валидация

#### **Архитектурное решение:**

**Стратегия A**: OTP (One-Time Password) verification

- ✅ Проверяет владение номером
- ❌ Сложно (нужен SMS provider: Twilio ~$0.07/SMS)
- ❌ Дорого

**Стратегия B**: Email как primary, phone как secondary

- ✅ Email можно верифицировать бесплатно
- ❌ Не все дают email

**Стратегия C**: Composite key: phone + name + DOB

- ✅ Меньше шанс коллизии
- ✅ Простая реализация
- ❌ Всё равно не на 100% secure

**РЕШЕНИЕ**: **Email обязательно** + улучшенная валидация телефона

#### **Phone Validation:**

```typescript
// Используем libphonenumber-js
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

const phoneSchema = z.string()
  .refine((phone) => {
    try {
      const parsed = parsePhoneNumber(phone, 'CZ'); // Czech Republic
      return parsed.isValid();
    } catch {
      return false;
    }
  }, 'Неверный формат телефона');
```

#### **Database Strategy:**

```prisma
model Patient {
  id    String @id @default(cuid())
  email String @unique  // PRIMARY identifier
  phone String          // SECONDARY (not unique!)

  @@index([email])
  @@index([phone]) // For search, not uniqueness
}
```

---

### 6. **Monitoring & Logging Architecture**

**Проблема**: Только `console.error`, нет metrics

#### **Архитектурное решение:**

```
3-Layer Monitoring Stack

┌──────────────────────────────────┐
│  1. Application Logs             │
│  (Vercel Logs / Winston)         │
└──────────────┬───────────────────┘
               │
┌──────────────▼───────────────────┐
│  2. Error Tracking               │
│  (Sentry)                        │
│  - JS errors                     │
│  - API errors                    │
│  - Performance issues            │
└──────────────┬───────────────────┘
               │
┌──────────────▼───────────────────┐
│  3. Business Metrics             │
│  (Vercel Analytics / Plausible)  │
│  - Conversions                   │
│  - Bounce rate                   │
│  - Booking funnel                │
└──────────────────────────────────┘
```

#### **Выбор технологий:**

**Error Tracking**: Sentry (рекомендую)

- ✅ Бесплатный tier: 5K errors/month
- ✅ Source maps support
- ✅ Performance monitoring
- ✅ Release tracking

**Logging**: Vercel Logs (built-in) + Axiom (для search/alerts)

- ✅ Vercel Logs: бесплатно, но нет search
- ✅ Axiom: 0.5GB/month free, отличный search

**Analytics**: Vercel Analytics (рекомендую для простоты)

- ✅ Privacy-first (no cookies)
- ✅ Real user metrics
- ✅ $10/month (или бесплатно в Pro plan)

#### **Structured Logging:**

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'dental-clinic-api' },
  transports: [
    new winston.transports.Console(),
    // В production: Axiom transport
  ]
});

// Usage:
logger.info('Booking created', {
  bookingId: booking.id,
  patientId: patient.id,
  doctorId: doctor.id,
  date: booking.date,
  service: service.name
});
```

---

### 7. **Temporary Email Issue**

**Проблема**: `@temp.local` не валиден

#### **Решение:**

**Вариант A**: Требовать email обязательно ✅ (рекомендую)

- Email нужен для подтверждения
- Email нужен для напоминаний
- Без email = плохой UX

**Вариант B**: Allow NULL email

- Prisma: `email String?`
- Skip email notifications

**РЕШЕНИЕ**: **Email обязательно** (update Zod schema)

```typescript
const bookingSchema = z.object({
  email: z.string().email("Введите корректный email"),
  // Убираем .optional()
});
```

---

## 📊 PHASE 3: ОПТИМИЗАЦИЯ (Nice to Have)

### 8. **Caching Strategy**

**Проблема**: Нет кеширования, каждый request = DB query

#### **Архитектурное решение:**

```
Multi-Layer Cache

┌─────────────────────────────────┐
│  1. Static Generation (Next.js) │
│  - Services pages                │
│  - Doctors pages                 │
│  ISR: revalidate every 1 hour    │
└─────────────────────────────────┘
                 │
┌────────────────▼────────────────┐
│  2. CDN Cache (Vercel Edge)     │
│  - Images                        │
│  - Static assets                 │
│  Cache-Control: max-age=31536000│
└─────────────────────────────────┘
                 │
┌────────────────▼────────────────┐
│  3. API Response Cache (Redis)  │
│  - Available slots               │
│  TTL: 60 seconds                 │
└─────────────────────────────────┘
```

#### **Implementation:**

**Services/Doctors (Static):**

```typescript
// app/services/[slug]/page.tsx
export const revalidate = 3600; // 1 hour ISR

export async function generateStaticParams() {
  const services = await db.service.findMany();
  return services.map((s) => ({ slug: s.slug }));
}
```

**Available Slots (Redis):**

```typescript
// GET /api/slots?doctorId=1&date=2026-01-25
import { redis } from '@/lib/redis';

const cacheKey = `slots:${doctorId}:${date}`;
const cached = await redis.get(cacheKey);

if (cached) return JSON.parse(cached);

const slots = await getAvailableSlots(doctorId, date);
await redis.set(cacheKey, JSON.stringify(slots), 'EX', 60);
```

---

### 9. **SEO Architecture**

**Проблема**: Нет structured data, sitemap

#### **Архитектурное решение:**

```
SEO Stack

1. Metadata (Next.js 15)
   - generateMetadata() per page
   - Open Graph images

2. Structured Data (JSON-LD)
   - LocalBusiness schema
   - MedicalBusiness schema
   - Service schema

3. Sitemap (next-sitemap)
   - Автогенерация из routes
   - Priority & changefreq

4. robots.txt
   - Allow all
   - Sitemap reference
```

#### **JSON-LD Schema:**

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Стоматологическая клиника Татьяна Вакалова",
  "image": "https://clinic.com/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Václavské náměstí 123/45",
    "addressLocality": "Praha",
    "addressRegion": "Prague",
    "postalCode": "110 00",
    "addressCountry": "CZ"
  },
  "telephone": "+420-XXX-XXX-XXX",
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$"
};
```

---

### 10. **Admin Dashboard Architecture**

**Проблема**: Нет способа просмотра записей и контактов

#### **Архитектурное решение:**

```
Simple Admin Panel (SSR)

┌──────────────────────────┐
│  /admin (Protected)      │
├──────────────────────────┤
│  - Login (basic auth)    │
│  - Dashboard             │
│    ├─ Today's bookings   │
│    ├─ Pending contacts   │
│    └─ Statistics         │
│  - Bookings list         │
│  - Contacts list         │
│  - Export CSV            │
└──────────────────────────┘
```

#### **Выбор технологии:**

**Вариант A**: Custom React pages (рекомендую для простоты)

- ✅ Полный контроль
- ✅ Tailwind CSS (уже есть)
- ❌ Нужно писать всё

**Вариант B**: Admin framework (Refine, React-Admin)

- ✅ Out-of-the-box CRUD
- ❌ Overkill для 3 модели
- ❌ Дополнительные зависимости

**РЕШЕНИЕ**: Custom pages с shadcn/ui (Table, Dialog components)

#### **Authentication:**

```typescript
// Простой HTTP Basic Auth для MVP
export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');

  if (!auth || !verifyBasicAuth(auth)) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Panel"'
      }
    });
  }

  // Show admin data
}

function verifyBasicAuth(auth: string): boolean {
  const [username, password] = Buffer
    .from(auth.split(' ')[1], 'base64')
    .toString()
    .split(':');

  return username === process.env.ADMIN_USER &&
         password === process.env.ADMIN_PASSWORD;
}
```

Для production: NextAuth.js с proper session management

---

### 11. **Analytics Integration**

**Выбор**: Vercel Analytics (рекомендую)

- ✅ Privacy-first
- ✅ No config needed
- ✅ Real user metrics

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🗺️ TECHNOLOGY STACK SUMMARY

### **Core:**

- ✅ Next.js 15 (уже есть)
- ✅ TypeScript (уже есть)
- ✅ Prisma (уже есть)
- ✅ Tailwind CSS (уже есть)

### **NEW Dependencies:**

| Категория | Library | Reason |
|-----------|---------|--------|
| Rate Limiting | `@upstash/ratelimit` | Edge-ready, Redis-based |
| Email | `resend` + `react-email` | Modern email API |
| Phone Validation | `libphonenumber-js` | International phone validation |
| Logging | `winston` | Structured logging |
| Error Tracking | `@sentry/nextjs` | Error monitoring |
| Analytics | `@vercel/analytics` | Privacy-first analytics |
| Caching (opt) | `@upstash/redis` | Edge Redis (если нужен scale) |

### **Total new packages:** 7 (все легковесные)

---

## 📐 DATABASE SCHEMA CHANGES

### **Booking Model:**

```prisma
model Booking {
  // ... existing fields

  @@unique([doctorId, date, time])  // NEW: Prevent double-booking
  @@index([doctorId, date, time, status])  // NEW: Query optimization
}
```

### **Patient Model:**

```prisma
model Patient {
  email String @unique  // CHANGED: was nullable, now required unique
  phone String          // CHANGED: remove @unique

  @@index([email])      // NEW
  @@index([phone])      // NEW (for search)
}
```

---

## 🚀 IMPLEMENTATION PLAN

### **Order of Implementation:**

1. ✅ **Rate Limiting** (блокирует DoS)
2. ✅ **Booking conflict check** (критично для бизнеса)
3. ✅ **CSRF protection** (безопасность)
4. ✅ **Email notifications** (UX)
5. ✅ **Improved validation** (data quality)
6. ✅ **Monitoring** (observability)
7. ✅ **SEO** (business growth)
8. ✅ **Admin panel** (operations)
9. ✅ **Caching** (performance)
10. ✅ **Analytics** (insights)

### **Estimated Time:**

- Phase 1 (Critical): 4-6 hours
- Phase 2 (Important): 4-6 hours
- Phase 3 (Nice to have): 4-6 hours
- **Total**: 12-18 hours

---

## ✅ ARCHITECT APPROVAL

Все решения:

- ✅ Production-ready
- ✅ Scalable
- ✅ Maintainable
- ✅ Cost-effective (бесплатные tiers)
- ✅ Modern best practices

**Передаю реализацию Backend/Frontend Engineer** (`qwen2.5-coder-7b-exl2`)

---

**Software Architect**: `qwen2.5-coder`
**Дата**: 2026-01-20
**Статус**: ✅ COMPLETE
**Следующий шаг**: Реализация (Backend/Frontend)

---

**Built with** 🏗️ **by Software Architect v1.0**
