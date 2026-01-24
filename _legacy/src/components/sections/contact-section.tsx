"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send
} from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Произошла ошибка при отправке");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Не удалось отправить сообщение. Проверьте соединение.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <section id="contact" className="bg-neutral-50 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
            Контакты
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
            Свяжитесь с нами
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-neutral-600">
            Готовы записаться на прием или есть вопросы? Мы всегда рады помочь!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary-500" />
                  Адрес клиники
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700">
                  Václavské náměstí 123/45
                  <br />
                  110 00 Praha 1
                  <br />
                  Česká republika
                </p>

                {/* Interactive Map */}
                <div className="mt-4 h-48 overflow-hidden rounded-lg border border-neutral-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.8201!2d14.4267!3d50.0825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b948c3e8553af%3A0x400af0f66155300!2sV%C3%A1clavsk%C3%A9%20n%C3%A1m%C4%9Bst%C3%AD%2C%20110%2000%20Praha%201!5e0!3m2!1sru!2scz!4v1642345678901!5m2!1sru!2scz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Карта стоматологической клиники"
                  />
                </div>

                <a
                  href="https://www.google.com/maps/place/V%C3%A1clavsk%C3%A9+n%C3%A1m.+123,+110+00+Praha+1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline"
                >
                  Открыть в Google Maps →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-secondary-500" />
                  Телефон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+420123456789"
                  className="text-xl font-semibold text-neutral-900 hover:text-primary-600"
                >
                  +420 123 456 789
                </a>
                <p className="mt-2 text-sm text-neutral-600">
                  Звоните в любое время!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-accent-500" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:info@vakalova-dental.cz"
                  className="text-lg font-semibold text-neutral-900 hover:text-primary-600"
                >
                  info@vakalova-dental.cz
                </a>
                <p className="mt-2 text-sm text-neutral-600">
                  Ответим в течение 24 часов
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary-500" />
                  Часы работы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Понедельник - Пятница</span>
                  <span className="font-medium text-neutral-900">9:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Суббота</span>
                  <span className="font-medium text-neutral-900">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Воскресенье</span>
                  <span className="font-medium text-neutral-900">Выходной</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Напишите нам</CardTitle>
              <p className="text-sm text-neutral-600">
                Заполните форму, и мы свяжемся с вами в ближайшее время
              </p>
            </CardHeader>
            <CardContent>
              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="mb-6 flex items-center gap-3 rounded-lg bg-accent-50 p-4 text-accent-700 animate-slide-down">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в течение 24 часов.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-700 animate-slide-down">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Имя *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Телефон *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+420 123 456 789"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Сообщение *
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Опишите, чем мы можем вам помочь..."
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Отправить сообщение
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-neutral-500">
                  Или напишите нам в{" "}
                  <a
                    href="https://wa.me/420123456789"
                    className="font-medium text-accent-600 hover:underline"
                  >
                    WhatsApp
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp Floating Button - Hidden on mobile where FloatingBookingButton is shown */}
        <a
          href="https://wa.me/420123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex fixed bottom-6 left-6 z-50 h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white shadow-large transition-transform hover:scale-110 hover:bg-accent-600"
          aria-label="WhatsApp"
        >
          <MessageSquare className="h-7 w-7" />
        </a>
      </div>
    </section>
  );
}
