"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock
} from "lucide-react";
import { useState } from "react";

const services = [
  { id: "1", name: "Лечение кариеса", duration: 60, price: 1500 },
  { id: "2", name: "Профессиональная чистка", duration: 45, price: 1200 },
  { id: "3", name: "Отбеливание зубов", duration: 90, price: 8000 },
  { id: "4", name: "Имплантация", duration: 120, price: 15000 },
  { id: "5", name: "Протезирование", duration: 90, price: 8000 },
  { id: "6", name: "Хирургия", duration: 60, price: 2000 },
  { id: "7", name: "Детская стоматология", duration: 30, price: 800 },
  { id: "8", name: "Пародонтология", duration: 60, price: 1500 },
];

const doctors = [
  { id: "1", name: "Татьяна Вакалова", specialization: "Терапевт, главный врач" },
  { id: "2", name: "Петр Новак", specialization: "Хирург, имплантолог" },
  { id: "3", name: "Анна Черна", specialization: "Ортопед" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceId: "",
    doctorId: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const selectedService = services.find(s => s.id === bookingData.serviceId);
  const selectedDoctor = doctors.find(d => d.id === bookingData.doctorId);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-accent-50 to-primary-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="mx-auto max-w-2xl text-center">
              <CardContent className="p-12">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-100">
                  <CheckCircle className="h-10 w-10 text-accent-600" />
                </div>
                <h1 className="mb-4 text-3xl font-bold text-neutral-900">
                  Запись подтверждена!
                </h1>
                <p className="mb-2 text-lg text-neutral-700">
                  Ваша запись на <span className="font-semibold">{bookingData.date}</span> в{" "}
                  <span className="font-semibold">{bookingData.time}</span>
                </p>
                <p className="mb-8 text-neutral-600">
                  Мы отправили подтверждение на {bookingData.email}
                </p>
                <div className="space-y-3">
                  <Button size="lg" asChild>
                    <Link href="/">Вернуться на главную</Link>
                  </Button>
                  <p className="text-sm text-neutral-600">
                    Вопросы? Позвоните нам:{" "}
                    <a href="tel:+420123456789" className="font-medium text-primary-600">
                      +420 123 456 789
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-neutral-900">
              Онлайн-запись на прием
            </h1>
            <p className="text-neutral-600">
              Заполните форму, и мы подтвердим вашу запись
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${step >= num
                        ? "bg-primary-500 text-white"
                        : "bg-neutral-200 text-neutral-500"
                      }`}
                  >
                    {num}
                  </div>
                  {num < 4 && (
                    <div
                      className={`h-0.5 w-12 ${step > num ? "bg-primary-500" : "bg-neutral-200"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <CardTitle className="text-2xl">
                {step === 1 && "Выберите услугу"}
                {step === 2 && "Выберите врача"}
                {step === 3 && "Выберите дату и время"}
                {step === 4 && "Ваши контактные данные"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="space-y-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setBookingData({ ...bookingData, serviceId: service.id })}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-primary-500 ${bookingData.serviceId === service.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-neutral-200"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-neutral-900">
                            {service.name}
                          </div>
                          <div className="mt-1 flex gap-4 text-sm text-neutral-600">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {service.duration} мин
                            </span>
                            <span className="font-medium text-primary-600">
                              От {service.price} Kč
                            </span>
                          </div>
                        </div>
                        {bookingData.serviceId === service.id && (
                          <CheckCircle className="h-6 w-6 text-primary-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2: Doctor Selection */}
              {step === 2 && (
                <div className="space-y-3">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => setBookingData({ ...bookingData, doctorId: doctor.id })}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-primary-500 ${bookingData.doctorId === doctor.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-neutral-200"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-neutral-900">
                            {doctor.name}
                          </div>
                          <div className="mt-1 text-sm text-neutral-600">
                            {doctor.specialization}
                          </div>
                        </div>
                        {bookingData.doctorId === doctor.id && (
                          <CheckCircle className="h-6 w-6 text-primary-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3: Date & Time Selection */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Дата приема *
                    </label>
                    <Input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {bookingData.date && (
                    <div>
                      <label className="mb-3 block text-sm font-medium text-neutral-700">
                        Время приема *
                      </label>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setBookingData({ ...bookingData, time })}
                            className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all hover:border-primary-500 ${bookingData.time === time
                                ? "border-primary-500 bg-primary-500 text-white"
                                : "border-neutral-200 text-neutral-700"
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Personal Info */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-neutral-700">
                        Имя *
                      </label>
                      <Input
                        type="text"
                        required
                        value={bookingData.firstName}
                        onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-neutral-700">
                        Фамилия *
                      </label>
                      <Input
                        type="text"
                        required
                        value={bookingData.lastName}
                        onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                        placeholder="Ваша фамилия"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Телефон *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      placeholder="+420 123 456 789"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Комментарий
                    </label>
                    <Textarea
                      rows={3}
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      placeholder="Дополнительная информация (опционально)"
                    />
                  </div>

                  {/* Summary */}
                  <Card className="bg-primary-50">
                    <CardContent className="p-4">
                      <h3 className="mb-3 font-semibold text-neutral-900">
                        Детали записи:
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Услуга:</span>
                          <span className="font-medium text-neutral-900">
                            {selectedService?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Врач:</span>
                          <span className="font-medium text-neutral-900">
                            {selectedDoctor?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Дата:</span>
                          <span className="font-medium text-neutral-900">
                            {bookingData.date}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Время:</span>
                          <span className="font-medium text-neutral-900">
                            {bookingData.time}
                          </span>
                        </div>
                        <div className="mt-3 border-t border-primary-200 pt-3 flex justify-between">
                          <span className="font-semibold text-neutral-900">Цена:</span>
                          <span className="text-lg font-bold text-primary-600">
                            {selectedService?.price} Kč
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between gap-4">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Назад
                  </Button>
                )}

                {step < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={
                      (step === 1 && !bookingData.serviceId) ||
                      (step === 2 && !bookingData.doctorId) ||
                      (step === 3 && (!bookingData.date || !bookingData.time))
                    }
                    className="ml-auto gap-2"
                  >
                    Далее
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      isSubmitting ||
                      !bookingData.firstName ||
                      !bookingData.lastName ||
                      !bookingData.phone
                    }
                    className="ml-auto gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Подтвердить запись
                      </>
                    )}
                  </Button>
                )}
              </div>

              {submitStatus === "error" && (
                <div className="mt-6 flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-700">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">
                    Произошла ошибка. Попробуйте позже или позвоните нам.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
