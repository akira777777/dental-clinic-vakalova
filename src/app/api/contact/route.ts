import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Неверный формат email"),
  phone: z.string().min(9, "Неверный формат телефона"),
  subject: z.string().optional(),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per 15 minutes
    const rateLimitResult = await rateLimit(request, {
      max: 5,
      windowSeconds: 900 // 15 minutes
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Слишком много запросов",
          message: "Пожалуйста, подождите перед следующей попыткой",
          retryAfter: rateLimitResult.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter || 900)
          }
        }
      );
    }
    const body = await request.json();

    // Validate input
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Save to database
    const contact = await db.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject || "Обращение с сайта",
        message: data.message,
        status: "NEW",
      },
    });

    // Send email notification to clinic (async, don't block response)
    try {
      const { sendContactNotification } = await import("@/lib/email");
      
      await sendContactNotification({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || "",
        subject: contact.subject || "Обращение с сайта",
        message: contact.message,
        contactId: contact.id,
      });
    } catch (emailError) {
      // Log error but don't fail the contact submission
      console.error("[Contact] Email notification failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.",
      contactId: contact.id,
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при отправке формы. Попробуйте позже." },
      { status: 500 }
    );
  }
}
