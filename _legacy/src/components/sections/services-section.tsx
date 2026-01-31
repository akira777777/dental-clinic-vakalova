"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Heart,
  Microscope,
  Pill,
  Scissors,
  Shield,
  Smile,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Shield,
    title: "Лечение кариеса",
    description: "Качественное лечение кариеса с использованием современных материалов. Безболезненно и быстро.",
    price: "От 1500 Kč",
    color: "text-primary-600 bg-primary-100",
    slug: "lechenie-kariesa",
  },
  {
    icon: Sparkles,
    title: "Профессиональная чистка",
    description: "Ультразвуковая чистка зубов и Air Flow для удаления налета и камня. Здоровые зубы и свежее дыхание.",
    price: "От 1200 Kč",
    color: "text-secondary-600 bg-secondary-100",
    slug: "professionalnaya-chistka",
  },
  {
    icon: Smile,
    title: "Отбеливание зубов",
    description: "Профессиональное отбеливание зубов системой ZOOM. Белоснежная улыбка за 1 час.",
    price: "От 8000 Kč",
    color: "text-accent-600 bg-accent-100",
    slug: "otbelivanie",
  },
  {
    icon: Microscope,
    title: "Имплантация",
    description: "Установка зубных имплантов премиум-класса. Пожизненная гарантия. Возвращаем полноценную функцию зубов.",
    price: "От 15000 Kč",
    color: "text-primary-600 bg-primary-100",
    slug: "implantatsiya",
  },
  {
    icon: Heart,
    title: "Протезирование",
    description: "Керамические коронки, виниры, мосты. Восстановление эстетики и функции зубного ряда.",
    price: "От 8000 Kč",
    color: "text-secondary-600 bg-secondary-100",
    slug: "protezirovanie",
  },
  {
    icon: Scissors,
    title: "Хирургия",
    description: "Удаление зубов мудрости, резекция верхушки корня. Опытные хирурги, безболезненно.",
    price: "От 2000 Kč",
    color: "text-accent-600 bg-accent-100",
    slug: "khirurgiya",
  },
  {
    icon: Baby,
    title: "Детская стоматология",
    description: "Заботливое лечение детских зубов. Игровая форма приема, никакого страха у ребенка.",
    price: "От 800 Kč",
    color: "text-primary-600 bg-primary-100",
    slug: "detskaya-stomatologiya",
  },
  {
    icon: Pill,
    title: "Пародонтология",
    description: "Лечение десен и профилактика пародонтита. Сохраняем здоровье полости рта.",
    price: "От 1500 Kč",
    color: "text-secondary-600 bg-secondary-100",
    slug: "parodontologiya",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const, // easeOut
    },
  },
};

// Map colors to Stitch palette
const iconColorMap: Record<string, string> = {
  'text-primary-600 bg-primary-100': 'bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white',
  'text-secondary-600 bg-secondary-100': 'bg-teal-50 dark:bg-teal-900/20 text-primary dark:text-teal-400 group-hover:bg-primary group-hover:text-white',
  'text-accent-600 bg-accent-100': 'bg-indigo-50 dark:bg-indigo-900/20 text-primary dark:text-indigo-400 group-hover:bg-primary group-hover:text-white',
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Stitch Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4 border border-secondary/20">
            <Sparkles className="h-3 w-3" />
            Наши услуги
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Наши специализации
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Комплексный уход, охватывающий широкий спектр стоматологических услуг,
            предоставляемый специалистами, которые заботятся о вас.
          </p>
        </motion.div>

        {/* Services Grid - Stitch Style with hover effects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => {
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-lg ${iconColorMap[service.color] || 'bg-blue-50 dark:bg-blue-900/20 text-primary'} flex items-center justify-center mb-4 transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="text-lg font-bold text-primary mb-3">
                    {service.price}
                  </div>
                  <Link href={`/services/${service.slug}`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full group/btn">
                      Подробнее
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section - Stitch Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Animated background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-0" />

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Готовы позаботиться о своем здоровье?
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto text-lg">
              Присоединяйтесь к тысячам довольных пациентов, которые доверяют нам свое здоровье.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/booking">
                <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
                  Записаться сейчас
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/#contact">
                <Button size="lg" variant="outline" className="border-zinc-200 dark:border-zinc-700 hover:border-primary dark:hover:border-primary transition-all duration-300">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
