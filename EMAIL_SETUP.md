# 📧 Email Integration Setup

**Status**: ✅ Implemented  
**Service**: Resend  
**Free Tier**: 3,000 emails/month

---

## ✅ What's Implemented

### Email Types

1. **Booking Confirmation** (to patient)
   - Subject: "Ваша запись подтверждена"
   - Contains: Date, time, doctor, service, address

2. **Booking Notification** (to clinic)
   - Subject: "Новая запись: {Name}"
   - Contains: All patient details + booking info

3. **Contact Form Notification** (to clinic)
   - Subject: "Новое сообщение: {Subject}"
   - Contains: Message + reply-to email

### Files Created

- `src/lib/email.ts` - Email service with HTML templates
- API routes updated:
  - `src/app/api/bookings/route.ts` (lines 66-93)
  - `src/app/api/contact/route.ts` (lines 42-54)

---

## 🚀 Quick Start

### Step 1: Sign Up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Sign up (free)
3. Verify your email

### Step 2: Get API Key

1. Dashboard → API Keys
2. Create API Key
3. Copy the key (starts with `re_`)

### Step 3: Add Environment Variables

Create `.env.local` in project root:

```bash
# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="Клиника Татьяна Вакалова <noreply@resend.dev>"
CLINIC_EMAIL="your-clinic@example.com"

# Other vars
DATABASE_URL="file:./prisma/dev.db"
```

**Important Notes:**
- `EMAIL_FROM`: Use `onboarding@resend.dev` for testing (no domain verification needed)
- `CLINIC_EMAIL`: Where to receive notifications (your real email)

### Step 4: Install Resend (Optional for testing)

```bash
npm install resend
```

**Note:** Code works without Resend installed (fails gracefully with console warning)

### Step 5: Test

```bash
# Start dev server
npm run dev

# Test booking form
# Go to: http://localhost:3000/booking
# Complete all steps
# Submit

# Check console for:
# "[Email] Booking confirmation sent to patient@example.com"
# "[Email] Booking notification sent to clinic"
```

---

## 🔧 Configuration

### Use Custom Domain (Production)

To use your own domain (e.g., `@clinic.com` instead of `@resend.dev`):

1. Resend Dashboard → Domains
2. Add domain: `clinic.com`
3. Add DNS records (provided by Resend)
4. Verify domain
5. Update `.env`:

```bash
EMAIL_FROM="Клиника Татьяна Вакалова <noreply@clinic.com>"
```

---

## 📧 Email Templates

### Customizing Templates

Edit `src/lib/email.ts`:

```typescript
function generateBookingConfirmationHTML(data: BookingEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <!-- Your custom HTML here -->
    </html>
  `;
}
```

### Using React Email (Advanced)

For more complex templates:

```bash
npm install react-email @react-email/components
```

Create `emails/booking-confirmation.tsx`:

```typescript
import { Html, Text, Button } from '@react-email/components';

export default function BookingConfirmation({ data }) {
  return (
    <Html>
      <Text>Здравствуйте, {data.patientName}!</Text>
      <Button href="https://clinic.com">Открыть запись</Button>
    </Html>
  );
}
```

---

## 🧪 Testing Without Resend

### Development Mode

Emails will fail gracefully with console warning:

```
[Email] Resend API key not configured, skipping email
```

Booking/contact forms still work, just no emails sent.

### Testing with Resend (Free Tier)

1. Add `RESEND_API_KEY` to `.env.local`
2. Use `onboarding@resend.dev` as `EMAIL_FROM`
3. Emails will be sent to your `CLINIC_EMAIL`

**Limits**: 3,000 emails/month (free)

---

## 📊 Monitoring

### Check Email Delivery

Resend Dashboard:
- Logs → See all sent emails
- Delivery status (delivered, bounced, opened)
- Click tracking (if enabled)

### Common Issues

**Issue 1: "Invalid API key"**
```
Solution: Check RESEND_API_KEY in .env.local
```

**Issue 2: "Domain not verified"**
```
Solution: Use onboarding@resend.dev for testing
Or: Verify your domain in Resend dashboard
```

**Issue 3: Emails not received**
```
Check:
1. Spam folder
2. CLINIC_EMAIL is correct
3. Resend dashboard shows delivery status
```

---

## 🚀 Production Checklist

Before deploying:

- [ ] Add `RESEND_API_KEY` to Vercel/Railway environment variables
- [ ] Add `CLINIC_EMAIL` (where to receive notifications)
- [ ] (Optional) Verify custom domain
- [ ] Test email delivery in staging
- [ ] Check spam folder
- [ ] Monitor Resend dashboard for issues

---

## 💰 Pricing

### Resend Free Tier:
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ Unlimited domains
- ✅ Email API
- ✅ Logs & Analytics

### When to Upgrade:
- If >3,000 emails/month (unlikely for single clinic)
- Need advanced features (webhooks, dedicated IP)

**Cost**: $20/month for 50K emails (only if needed)

---

## 🔐 Security

### Environment Variables

**NEVER commit to git:**
```
# .gitignore should include:
.env
.env.local
.env*.local
```

**In production:**
- Store in Vercel/Railway environment variables
- Use different keys for staging/production
- Rotate keys if compromised

---

## ✅ Summary

**Current Status**: ✅ Fully implemented  
**Installation**: Optional (works without `resend` package)  
**Setup Time**: ~10 minutes  
**Cost**: Free (up to 3K emails/month)

**Next Steps**:
1. Sign up for Resend
2. Add API key to `.env.local`
3. Test booking/contact forms
4. Check emails received

---

**Built with** 📧 **by Backend Engineer**
