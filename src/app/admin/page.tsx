import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import type { Booking, Contact, Doctor, Patient, Service } from "@prisma/client";
import { Calendar, CheckCircle, Clock, Mail, Phone, User } from "lucide-react";

// Force dynamic rendering (admin requires auth and database)
export const dynamic = 'force-dynamic';

type BookingWithRelations = Booking & {
  patient: Patient;
  doctor: Doctor;
  service: Service;
};

export default async function AdminDashboard() {
  // Authentication is handled by middleware.ts

  // Fetch data
  const [bookings, contacts, stats] = await Promise.all([
    // Recent bookings (last 30 days)
    db.booking.findMany({
      where: {
        date: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        patient: true,
        doctor: true,
        service: true,
      },
      orderBy: {
        date: "desc",
      },
      take: 20,
    }),

    // Recent contacts
    db.contact.findMany({
      where: {
        status: "NEW",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    }),

    // Statistics
    Promise.resolve({
      totalBookings: await db.booking.count(),
      pendingBookings: await db.booking.count({
        where: { status: "PENDING" },
      }),
      totalContacts: await db.contact.count(),
      newContacts: await db.contact.count({
        where: { status: "NEW" },
      }),
      totalPatients: await db.patient.count(),
    }),
  ]);

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Панель администратора
          </h1>
          <p className="text-neutral-600">
            Стоматологическая клиника Татьяна Вакалова
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-primary-500" />
                <div>
                  <p className="text-xs text-neutral-600">Всего записей</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-xs text-neutral-600">В ожидании</p>
                  <p className="text-2xl font-bold">{stats.pendingBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-xs text-neutral-600">Всего обращений</p>
                  <p className="text-2xl font-bold">{stats.totalContacts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-xs text-neutral-600">Новые обращения</p>
                  <p className="text-2xl font-bold">{stats.newContacts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-xs text-neutral-600">Всего пациентов</p>
                  <p className="text-2xl font-bold">{stats.totalPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bookings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Последние записи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-neutral-500">Нет записей</p>
                ) : (
                  bookings.map((booking: BookingWithRelations) => (
                    <div
                      key={booking.id}
                      className="flex items-start justify-between border-b pb-4 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900">
                          {booking.patient.firstName} {booking.patient.lastName}
                        </p>
                        <p className="text-sm text-neutral-600">
                          <strong>{booking.service.name}</strong>
                        </p>
                        <p className="text-sm text-neutral-600">
                          Врач: {booking.doctor.firstName} {booking.doctor.lastName}
                        </p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(booking.date).toLocaleDateString("ru")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {booking.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {booking.patient.phone}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${booking.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.status === "COMPLETED"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Новые обращения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <p className="text-neutral-500">Нет новых обращений</p>
                ) : (
                  contacts.map((contact: Contact) => (
                    <div
                      key={contact.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-neutral-900">
                            {contact.name}
                          </p>
                          {contact.subject && (
                            <p className="text-sm font-medium text-neutral-700">
                              {contact.subject}
                            </p>
                          )}
                          <p className="mt-1 text-sm text-neutral-600">
                            {contact.message.length > 100
                              ? `${contact.message.substring(0, 100)}...`
                              : contact.message}
                          </p>
                          <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {contact.email}
                            </span>
                            {contact.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {contact.phone}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-neutral-400">
                            {new Date(contact.createdAt).toLocaleString("ru")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Appointments */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Сегодняшние записи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TodaysAppointments />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Today's appointments component
async function TodaysAppointments() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayBookings = await db.booking.findMany({
    where: {
      date: {
        gte: today,
        lt: tomorrow,
      },
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
    include: {
      patient: true,
      doctor: true,
      service: true,
    },
    orderBy: {
      time: "asc",
    },
  });

  if (todayBookings.length === 0) {
    return <p className="text-neutral-500">Сегодня нет запланированных приёмов</p>;
  }

  return (
    <div className="space-y-3">
      {todayBookings.map((booking) => (
        <div
          key={booking.id}
          className="flex items-center gap-4 rounded-lg border bg-white p-4"
        >
          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary-50">
            <span className="text-xs font-medium text-primary-600">
              {booking.time}
            </span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-neutral-900">
              {booking.patient.firstName} {booking.patient.lastName}
            </p>
            <p className="text-sm text-neutral-600">{booking.service.name}</p>
            <p className="text-xs text-neutral-500">
              Врач: {booking.doctor.firstName} {booking.doctor.lastName}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <a
              href={`tel:${booking.patient.phone}`}
              className="text-sm text-primary-600 hover:underline"
            >
              {booking.patient.phone}
            </a>
            <a
              href={`mailto:${booking.patient.email}`}
              className="text-xs text-neutral-500 hover:underline"
            >
              {booking.patient.email}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
