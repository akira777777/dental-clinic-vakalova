"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Shield,
  ThumbsUp,
  User
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const departments = [
  { id: "1", name: "Терапевтическая стоматология", desc: "Лечение кариеса, пломбы", doctor: "Татьяна Вакалова", doctorId: "doc-tatyana", serviceId: "srv-therapy" },
  { id: "2", name: "Хирургия и имплантология", desc: "Удаление, имплантаты", doctor: "Елизавета Вакалова", doctorId: "doc-elizaveta", serviceId: "srv-surgery" },
  { id: "3", name: "Ортопедия", desc: "Протезирование, коронки", doctor: "Анна Черна", doctorId: "doc-anna", serviceId: "srv-ortho" },
  { id: "4", name: "Детская стоматология", desc: "Лечение детей", doctor: "Татьяна Вакалова", doctorId: "doc-tatyana", serviceId: "srv-kids" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
];

export default function BookingPage() {
  const [bookingData, setBookingData] = useState({
    departmentId: "1",
    doctorId: "doc-tatyana",
    serviceId: "srv-therapy",
    date: "",
    time: "09:30",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const selectedDepartment = departments.find(d => d.id === bookingData.departmentId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-12 shadow-card">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
                Запись подтверждена!
              </h1>
              <p className="mb-2 text-lg text-zinc-700 dark:text-zinc-300">
                Ваша запись на <span className="font-semibold">{bookingData.date}</span> в{" "}
                <span className="font-semibold">{bookingData.time}</span>
              </p>
              <p className="mb-8 text-zinc-600 dark:text-zinc-400">
                Мы отправили подтверждение на {bookingData.email}
              </p>
              <div className="space-y-3">
                <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                  <Link href="/">Вернуться на главную</Link>
                </Button>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Вопросы? Позвоните нам:{" "}
                  <a href="tel:+420123456789" className="font-medium text-primary">
                    +420 123 456 789
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow bg-white dark:bg-zinc-950 pt-20 pb-28 lg:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Записаться на прием
            </h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Выберите удобное время для визита к нашим специалистам
            </p>
          </header>

          {/* Mobile Summary Bar - Compact view on small screens */}
          <div className="lg:hidden mb-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {selectedDepartment?.name || "Выберите отделение"}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {bookingData.date || "Дата не выбрана"} • {bookingData.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">1500 Kč</p>
                <p className="text-xs text-zinc-400">Итого</p>
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              {/* Step 1: Select Department */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                    Выберите отделение
                  </h2>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    В процессе
                  </span>
                </div>

                <div className="relative mb-6">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                  <input
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/30 text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
                    placeholder="Поиск специалиста или услуги..."
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {departments.map((dept) => (
                    <label
                      key={dept.id}
                      className={`relative flex items-start p-4 cursor-pointer rounded-lg border transition-all ${bookingData.departmentId === dept.id
                          ? "border-primary bg-blue-50/50 dark:bg-blue-900/20 dark:border-primary"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600"
                        }`}
                    >
                      <input
                        type="radio"
                        name="department"
                        checked={bookingData.departmentId === dept.id}
                        onChange={() => setBookingData({ ...bookingData, departmentId: dept.id, doctorId: dept.doctorId, serviceId: dept.serviceId })}
                        className="mt-1 h-4 w-4 text-primary border-zinc-300 focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-zinc-900 dark:text-white">
                          {dept.name}
                        </span>
                        <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          {dept.desc}
                        </span>
                        <div className="mt-2 flex items-center gap-2">
                          <User className="h-4 w-4 text-zinc-400" />
                          <span className="text-xs text-zinc-600 dark:text-zinc-300">
                            {dept.doctor}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 2: Date & Time */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                    Дата и время
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                      </span>
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                          <ChevronLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                        </button>
                        <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                          <ChevronRight className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-zinc-400">
                      <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="p-2"></div>
                      ))}
                      {[...Array(31)].map((_, i) => {
                        const day = i + 1;
                        const date = new Date();
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const dayStr = String(day).padStart(2, '0');
                        const dateString = `${year}-${month}-${dayStr}`;
                        const isSelected = bookingData.date === dateString;
                        const isToday = day === 6;

                        return (
                          <button
                            key={day}
                            onClick={() => setBookingData({ ...bookingData, date: dateString })}
                            className={`p-2 text-sm rounded-lg transition-colors ${isSelected
                                ? "bg-primary text-white shadow-sm"
                                : isToday ? "border border-primary text-primary" : "text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white mb-3">
                      Доступное время
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setBookingData({ ...bookingData, time })}
                          className={`px-4 py-2 text-sm rounded-md transition-colors ${bookingData.time === time
                              ? "bg-primary text-white border border-primary shadow-sm"
                              : "border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary"
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Patient Details */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                    Контактные данные
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Имя *
                      </label>
                      <Input
                        type="text"
                        required
                        value={bookingData.firstName}
                        onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                        placeholder="Иван"
                        className="dark:bg-black/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Фамилия *
                      </label>
                      <Input
                        type="text"
                        required
                        value={bookingData.lastName}
                        onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                        placeholder="Иванов"
                        className="dark:bg-black/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        placeholder="ivan@example.com"
                        className="dark:bg-black/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Телефон *
                      </label>
                      <Input
                        type="tel"
                        required
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        placeholder="+420 123 456 789"
                        className="dark:bg-black/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Причина визита
                    </label>
                    <Textarea
                      rows={3}
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      placeholder="Кратко опишите ваши симптомы или причину записи..."
                      className="dark:bg-black/30"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar - Booking Summary - Hidden on mobile, shown in compact bar instead */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg overflow-hidden">
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Детали записи</h3>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-primary">
                          <User className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {selectedDepartment?.name}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {selectedDepartment?.doctor}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                          <Calendar className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {bookingData.date || "Выберите дату"}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {bookingData.time} - {bookingData.time &&
                            `${parseInt(bookingData.time.split(':')[0]) + 1}:${bookingData.time.split(':')[1]}`
                          }
                        </p>
                      </div>
                    </div>

                    <hr className="border-zinc-200 dark:border-zinc-800" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500 dark:text-zinc-400">Консультация</span>
                        <span className="text-zinc-900 dark:text-white font-medium">1500 Kč</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-500 dark:text-zinc-400">Запись</span>
                        <span className="text-zinc-900 dark:text-white font-medium">0 Kč</span>
                      </div>
                      <div className="flex justify-between text-base font-semibold pt-2">
                        <span className="text-zinc-900 dark:text-white">Итого</span>
                        <span className="text-primary">1500 Kč</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 hidden lg:block">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !bookingData.firstName || !bookingData.lastName || !bookingData.phone || !bookingData.email || !bookingData.date}
                      className="w-full bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                    >
                      <CheckCircle className="h-5 w-5" />
                      Подтвердить запись
                    </button>
                    <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-3">
                      Оплата производится в клинике после приема
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 justify-center p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Защищено</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <ThumbsUp className="h-5 w-5 text-blue-500" />
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Рейтинг 4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Bottom Bar - Confirm Button */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl z-40">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !bookingData.firstName || !bookingData.lastName || !bookingData.phone || !bookingData.email || !bookingData.date}
              className="w-full bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <CheckCircle className="h-5 w-5" />
              Подтвердить запись за 1500 Kč
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
