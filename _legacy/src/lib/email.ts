/**
 * Email Service using Resend
 * 
 * Setup:
 * 1. Sign up at https://resend.com (free tier: 3000 emails/month)
 * 2. Get API key from dashboard
 * 3. Add to .env: RESEND_API_KEY=re_xxxxx
 * 4. Verify domain (optional, can use onboarding@resend.dev for testing)
 */

interface BookingEmailData {
  patientName: string;
  doctorName: string;
  serviceName: string;
  date: string;
  time: string;
  clinicAddress: string;
  clinicPhone: string;
  bookingId: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  contactId: string;
}

/**
 * Send booking confirmation email to patient
 */
export async function sendBookingConfirmation(
  to: string,
  data: BookingEmailData
): Promise<{ success: boolean; error?: string }> {
  // Check if Resend is configured
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] Resend API key not configured, skipping email');
    return { success: false, error: 'Email not configured' };
  }

  try {
    // Dynamic import to avoid errors if resend is not installed
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Клиника Татьяна Вакалова <noreply@resend.dev>',
      to,
      subject: 'Ваша запись подтверждена - Клиника Татьяна Вакалова',
      html: generateBookingConfirmationHTML(data),
    });

    console.log('[Email] Booking confirmation sent to', to);
    return { success: true };
  } catch (error) {
    console.error('[Email] Failed to send booking confirmation:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send new booking notification to clinic
 */
export async function sendBookingNotification(
  data: BookingEmailData & { patientEmail: string; patientPhone: string; notes?: string }
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] Resend API key not configured, skipping email');
    return { success: false, error: 'Email not configured' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const clinicEmail = process.env.CLINIC_EMAIL || 'clinic@example.com';

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Система записи <noreply@resend.dev>',
      to: clinicEmail,
      subject: `Новая запись: ${data.patientName} - ${data.date} ${data.time}`,
      html: generateBookingNotificationHTML(data),
    });

    console.log('[Email] Booking notification sent to clinic');
    return { success: true };
  } catch (error) {
    console.error('[Email] Failed to send booking notification:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send contact form notification to clinic
 */
export async function sendContactNotification(
  data: ContactEmailData
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] Resend API key not configured, skipping email');
    return { success: false, error: 'Email not configured' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const clinicEmail = process.env.CLINIC_EMAIL || 'clinic@example.com';

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Контактная форма <noreply@resend.dev>',
      to: clinicEmail,
      replyTo: data.email,
      subject: `Новое сообщение: ${data.subject}`,
      html: generateContactNotificationHTML(data),
    });

    console.log('[Email] Contact notification sent to clinic');
    return { success: true };
  } catch (error) {
    console.error('[Email] Failed to send contact notification:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Generate HTML for booking confirmation email
 */
function generateBookingConfirmationHTML(data: BookingEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0EA5E9; color: white; padding: 30px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; }
    .booking-details { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #0EA5E9; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    .button { display: inline-block; background: #0EA5E9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Ваша запись подтверждена!</h1>
    </div>
    
    <div class="content">
      <p>Здравствуйте, <strong>${data.patientName}</strong>!</p>
      
      <p>Ваша запись успешно создана. Мы ждём вас в нашей клинике.</p>
      
      <div class="booking-details">
        <h3>Детали записи:</h3>
        <p><strong>📅 Дата:</strong> ${data.date}</p>
        <p><strong>🕐 Время:</strong> ${data.time}</p>
        <p><strong>👨‍⚕️ Врач:</strong> ${data.doctorName}</p>
        <p><strong>🦷 Услуга:</strong> ${data.serviceName}</p>
        <p><strong>📍 Адрес:</strong> ${data.clinicAddress}</p>
        <p><strong>📞 Телефон:</strong> ${data.clinicPhone}</p>
      </div>
      
      <p><strong>Важно:</strong></p>
      <ul>
        <li>Приходите за 10 минут до приёма</li>
        <li>Принесите паспорт и мед. карту (если есть)</li>
        <li>Если не сможете прийти, позвоните нам заранее</li>
      </ul>
      
      <p>Если у вас есть вопросы, свяжитесь с нами:</p>
      <p>📞 ${data.clinicPhone}</p>
    </div>
    
    <div class="footer">
      <p>Стоматологическая клиника "Татьяна Вакалова"</p>
      <p>${data.clinicAddress}</p>
      <p>ID записи: ${data.bookingId}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate HTML for booking notification to clinic
 */
function generateBookingNotificationHTML(
  data: BookingEmailData & { patientEmail: string; patientPhone: string; notes?: string }
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10B981; color: white; padding: 20px; }
    .content { background: #f9f9f9; padding: 20px; }
    .info-block { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🔔 Новая запись на приём</h2>
    </div>
    
    <div class="content">
      <div class="info-block">
        <h3>Пациент:</h3>
        <p><strong>Имя:</strong> ${data.patientName}</p>
        <p><strong>Email:</strong> ${data.patientEmail}</p>
        <p><strong>Телефон:</strong> ${data.patientPhone}</p>
      </div>
      
      <div class="info-block">
        <h3>Детали записи:</h3>
        <p><strong>Дата:</strong> ${data.date}</p>
        <p><strong>Время:</strong> ${data.time}</p>
        <p><strong>Врач:</strong> ${data.doctorName}</p>
        <p><strong>Услуга:</strong> ${data.serviceName}</p>
      </div>
      
      ${data.notes ? `
      <div class="info-block">
        <h3>Примечания:</h3>
        <p>${data.notes}</p>
      </div>
      ` : ''}
      
      <p><small>ID записи: ${data.bookingId}</small></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate HTML for contact form notification
 */
function generateContactNotificationHTML(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #3B82F6; color: white; padding: 20px; }
    .content { background: #f9f9f9; padding: 20px; }
    .info-block { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
    .message { background: #FEF3C7; padding: 15px; border-left: 4px solid #F59E0B; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📨 Новое сообщение с сайта</h2>
    </div>
    
    <div class="content">
      <div class="info-block">
        <h3>От кого:</h3>
        <p><strong>Имя:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Телефон:</strong> ${data.phone}</p>
      </div>
      
      <div class="info-block">
        <h3>Тема:</h3>
        <p>${data.subject}</p>
      </div>
      
      <div class="message">
        <h3>Сообщение:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <p><small>ID контакта: ${data.contactId}</small></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
