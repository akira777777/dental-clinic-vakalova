"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Phone, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-zinc-950">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                15+ лет опыта • 2000+ пациентов
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Здоровые зубы —{" "}
                <br className="hidden lg:block" />
                красивая улыбка!
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Современная стоматология в центре Праги. Опытные врачи,
                безболезненное лечение и европейское качество.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20" asChild>
                <a href="/booking">
                  <Calendar className="h-5 w-5" />
                  Записаться на прием
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                asChild
              >
                <a href="tel:+420123456789">
                  <Phone className="h-5 w-5" />
                  +420 123 456 789
                </a>
              </Button>
            </div>

            {/* Features */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-zinc-500 dark:text-zinc-500 text-sm font-medium flex-wrap">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span>Без боли</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span>Гарантия качества</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span>Опыт 15+ лет</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay"></div>
              {/* Placeholder for actual image */}
              <div className="aspect-square lg:aspect-auto lg:h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-white/50 dark:bg-zinc-700/50 backdrop-blur" />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Фото клиники / Врача
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards - Stitch style */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-700 hidden md:flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <Star className="h-5 w-5 text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">4.9 Рейтинг</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Google Reviews</p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-700 hidden md:block">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2000+</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Пациентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
