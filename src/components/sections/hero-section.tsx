"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Phone, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-300 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-secondary-300 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-medium text-accent-700">
              <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
              <span>15+ лет опыта • 2000+ счастливых пациентов</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Здоровые зубы —{" "}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  красивая улыбка!
                </span>
              </h1>
              <p className="text-balance text-lg text-neutral-600 sm:text-xl">
                Современная стоматология в центре Праги. Опытные врачи,
                безболезненное лечение, гарантия качества.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="/booking">
                  <Calendar className="h-5 w-5" />
                  Записаться на бесплатный осмотр
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="tel:+420123456789">
                  <Phone className="h-5 w-5" />
                  +420 123 456 789
                </a>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
              {[
                "Без боли",
                "Гарантия",
                "Опыт 15+ лет",
                "Современное оборудование",
                "Доступные цены",
                "Рассрочка 0%",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-700"
                >
                  <div className="h-2 w-2 rounded-full bg-accent-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 shadow-2xl lg:aspect-auto lg:h-full">
              {/* Placeholder for actual image */}
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-white/50 backdrop-blur" />
                  <p className="text-sm text-neutral-600">
                    Фото клиники / Врача
                  </p>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute bottom-4 left-4 rounded-lg bg-white p-4 shadow-large">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100">
                    <Star className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">
                      4.9
                    </div>
                    <div className="text-xs text-neutral-600">
                      Рейтинг Google
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute right-4 top-4 rounded-lg bg-white p-4 shadow-large">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">
                    2000+
                  </div>
                  <div className="text-xs text-neutral-600">Пациентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
