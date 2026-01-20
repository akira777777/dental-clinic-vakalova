import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Baby,
  Heart,
  Microscope,
  Pill,
  Scissors,
  Shield,
  Smile,
  Sparkles
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Лечение кариеса",
    description: "Качественное лечение кариеса с использованием современных материалов. Безболезненно и быстро.",
    price: "От 1500 Kč",
    color: "text-primary-600 bg-primary-100",
  },
  {
    icon: Sparkles,
    title: "Профессиональная чистка",
    description: "Ультразвуковая чистка зубов и Air Flow для удаления налета и камня. Здоровые зубы и свежее дыхание.",
    price: "От 1200 Kč",
    color: "text-secondary-600 bg-secondary-100",
  },
  {
    icon: Smile,
    title: "Отбеливание зубов",
    description: "Профессиональное отбеливание зубов системой ZOOM. Белоснежная улыбка за 1 час.",
    price: "От 8000 Kč",
    color: "text-accent-600 bg-accent-100",
  },
  {
    icon: Microscope,
    title: "Имплантация",
    description: "Установка зубных имплантов премиум-класса. Пожизненная гарантия. Возвращаем полноценную функцию зубов.",
    price: "От 15000 Kč",
    color: "text-primary-600 bg-primary-100",
  },
  {
    icon: Heart,
    title: "Протезирование",
    description: "Керамические коронки, виниры, мосты. Восстановление эстетики и функции зубного ряда.",
    price: "От 8000 Kč",
    color: "text-secondary-600 bg-secondary-100",
  },
  {
    icon: Scissors,
    title: "Хирургия",
    description: "Удаление зубов мудрости, резекция верхушки корня. Опытные хирурги, безболезненно.",
    price: "От 2000 Kč",
    color: "text-accent-600 bg-accent-100",
  },
  {
    icon: Baby,
    title: "Детская стоматология",
    description: "Заботливое лечение детских зубов. Игровая форма приема, никакого страха у ребенка.",
    price: "От 800 Kč",
    color: "text-primary-600 bg-primary-100",
  },
  {
    icon: Pill,
    title: "Пародонтология",
    description: "Лечение десен и профилактика пародонтита. Сохраняем здоровье полости рта.",
    price: "От 1500 Kč",
    color: "text-secondary-600 bg-secondary-100",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
            Наши услуги
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
            Полный спектр стоматологических услуг
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-neutral-600">
            От профилактики до сложных операций. Используем современные технологии
            и материалы премиум-класса.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="group transition-all hover:scale-105">
              <CardHeader>
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg ${service.color} transition-transform group-hover:scale-110`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-2xl font-bold text-primary-600">
                  {service.price}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`/services/${service.title === "Лечение кариеса" ? "lechenie-kariesa" : service.title === "Отбеливание зубов" ? "otbelivanie" : service.title === "Имплантация" ? "implantatsiya" : "#"}`}>
                    Подробнее
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-neutral-700">
            Не нашли нужную услугу? Свяжитесь с нами!
          </p>
          <Button size="lg">Консультация специалиста</Button>
        </div>
      </div>
    </section>
  );
}
