import { Button } from "@/components/ui/button";
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
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Stitch Style */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Наши специализации
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Комплексный уход, охватывающий широкий спектр стоматологических услуг,
            предоставляемый специалистами, которые заботятся о вас.
          </p>
        </div>

        {/* Services Grid - Stitch Style with hover effects */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            // Map colors to Stitch palette
            const iconColorMap: Record<string, string> = {
              'text-primary-600 bg-primary-100': 'bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white',
              'text-secondary-600 bg-secondary-100': 'bg-teal-50 dark:bg-teal-900/20 text-primary dark:text-teal-400 group-hover:bg-primary group-hover:text-white',
              'text-accent-600 bg-accent-100': 'bg-indigo-50 dark:bg-indigo-900/20 text-primary dark:text-indigo-400 group-hover:bg-primary group-hover:text-white',
            };

            return (
              <div
                key={service.title}
                className="group bg-white dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-lg ${iconColorMap[service.color] || 'bg-blue-50 dark:bg-blue-900/20 text-primary'} flex items-center justify-center mb-4 transition-colors`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  {service.description}
                </p>
                <div className="text-lg font-bold text-primary mb-3">
                  {service.price}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Подробнее
                </Button>
              </div>
            );
          })}
        </div>

        {/* CTA Section - Stitch Style */}
        <div className="mt-20 text-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Готовы позаботиться о своем здоровье?
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам довольных пациентов, которые доверяют нам свое здоровье.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="shadow-lg shadow-primary/20">
              Записаться сейчас
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-200 dark:border-zinc-700">
              Связаться с нами
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
