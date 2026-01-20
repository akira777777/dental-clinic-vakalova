"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, Calendar, Heart, Phone, Shield, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOut
    },
  },
};

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1], // easeInOut
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-zinc-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1], // easeInOut
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1], // easeInOut
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="lg:col-span-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge with pulse animation */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                15+ лет опыта • 2000+ пациентов
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                Здоровые зубы —{" "}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  красивая улыбка!
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Современная стоматология в центре Праги. Опытные врачи,
                безболезненное лечение и европейское качество.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8"
            >
              <Link href="/booking">
                <Button
                  size="lg"
                  className="gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="h-5 w-5" />
                  Записаться на прием
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-primary dark:hover:border-primary transition-all duration-300"
                asChild
              >
                <a href="tel:+420123456789">
                  <Phone className="h-5 w-5" />
                  +420 123 456 789
                </a>
              </Button>
            </motion.div>

            {/* Features with icons */}
            <motion.div
              variants={containerVariants}
              className="mt-8 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-start justify-center lg:justify-start gap-4 sm:gap-6"
            >
              {[
                { icon: Shield, text: "Без боли", color: "text-primary" },
                { icon: Award, text: "Гарантия качества", color: "text-secondary" },
                { icon: Heart, text: "Забота о пациентах", color: "text-accent" },
                { icon: Sparkles, text: "15+ лет опыта", color: "text-primary" },
              ].map((feature) => (
                <motion.div
                  key={feature.text}
                  variants={itemVariants}
                  className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 ${feature.color}`}>
                    <feature.icon className="h-3.5 w-3.5" />
                  </div>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image/Visual */}
          <motion.div
            className="lg:col-span-6 relative mt-8 sm:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-3xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay z-10"></div>
              {/* Real clinic interior photo */}
              <div className="aspect-[4/3] sm:aspect-square lg:aspect-[4/3] relative">
                <Image
                  src="/images/clinic/interior-reception-treatment.jpg"
                  alt="Современный интерьер стоматологической клиники Татьяна Вакалова"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Stats Cards - Stitch style with animations */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-700 hidden md:flex items-center gap-4"
                variants={floatVariants}
                initial="initial"
                animate="animate"
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <Star className="h-5 w-5 text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">4.9 Рейтинг</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Google Reviews</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-700 hidden md:block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-bold text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    2000+
                  </motion.div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Пациентов</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
