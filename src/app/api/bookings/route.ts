import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  doctorId: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email("Введите корректный email"),  // Now required!
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 bookings per 30 minutes
    const rateLimitResult = await rateLimit(request, {
      max: 3,
      windowSeconds: 1800 // 30 minutes
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Слишком много запросов",
          message: "Вы уже создали несколько записей. Пожалуйста, подождите",
          retryAfter: rateLimitResult.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter || 1800)
          }
        }
      );
    }

    const body = await request.json();

    // Validate input
    const validation = bookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;

    // ✅ CRITICAL: Check for slot conflicts
    const existingBooking = await db.booking.findFirst({
      where: {
        doctorId: data.doctorId,
        date: new Date(data.date),
        time: data.time,
        status: {
          in: ["PENDING", "CONFIRMED"]
        }
      }
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          error: "Это время уже занято",
          message: "Выберите другое время или врача",
        },
        { status: 409 } // Conflict
      );
    }

    // Check if patient exists by email (primary identifier)
    let patient = await db.patient.findUnique({
      where: { email: data.email },
    });

    if (!patient) {
      patient = await db.patient.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,  // Now required, no temp email!
          phone: data.phone,
        },
      });
    }

    // Create booking
    const booking = await db.booking.create({
      data: {
        date: new Date(data.date),
        time: data.time,
        notes: data.notes || "",
        status: "PENDING",
        patientId: patient.id,
        doctorId: data.doctorId,
        serviceId: data.serviceId,
      },
      include: {
        patient: true,
        doctor: true,
        service: true,
      },
    });

    // Send email notifications (async, don't block response)
    try {
      const { sendBookingConfirmation, sendBookingNotification } = await import("@/lib/email");
      
      // Send confirmation to patient
      await sendBookingConfirmation(patient.email, {
        patientName: `${patient.firstName} ${patient.lastName}`,
        doctorName: `${booking.doctor.firstName} ${booking.doctor.lastName}`,
        serviceName: booking.service.name,
        date: data.date,
        time: data.time,
        clinicAddress: "Václavské náměstí 123/45, Praha 1, 110 00",
        clinicPhone: "+420 XXX XXX XXX",
        bookingId: booking.id,
      });
      
      // Send notification to clinic
      await sendBookingNotification({
        patientName: `${patient.firstName} ${patient.lastName}`,
        patientEmail: patient.email,
        patientPhone: patient.phone,
        doctorName: `${booking.doctor.firstName} ${booking.doctor.lastName}`,
        serviceName: booking.service.name,
        date: data.date,
        time: data.time,
        notes: data.notes,
        clinicAddress: "Václavské náměstí 123/45, Praha 1, 110 00",
        clinicPhone: "+420 XXX XXX XXX",
        bookingId: booking.id,
      });
    } catch (emailError) {
      // Log error but don't fail the booking
      console.error("[Booking] Email notification failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Запись успешно создана!",
      booking: {
        id: booking.id,
        date: data.date,
        time: data.time,
        service: booking.service.name,
        doctor: `${booking.doctor.firstName} ${booking.doctor.lastName}`,
      },
    });

  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при создании записи" },
      { status: 500 }
    );
  }
}
