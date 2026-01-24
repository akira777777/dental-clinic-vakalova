"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle, ClipboardList, Stethoscope, UserCheck } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Запись онлайн",
    description: "Выберите удобное время через наш сайт или позвоните нам",
    color: "from-blue-500 to-cyan-500",
    delay: 0.1,
  },
  {
    icon: UserCheck,
    title: "Консультация",
    description: "Врач проведет осмотр и составит индивидуальный план лечения",
    color: "from-purple-500 to-pink-500",
    delay: 0.2,
  },
  {
    icon: ClipboardList,
    title: "План лечения",
    description: "Получите детальный план с ценами и сроками",
    color: "from-amber-500 to-orange-500",
    delay: 0.3,
  },
  {
    icon: Stethoscope,
    title: "Лечение",
    description: "Профессиональное лечение с современным оборудованием",
    color: "from-green-500 to-emerald-500",
    delay: 0.4,
  },
  {
    icon: CheckCircle,
    title: "Результат",
    description: "Здоровые зубы и красивая улыбка. Гарантия на все работы",
    color: "from-teal-500 to-cyan-500",
    delay: 0.5,
  },
];

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4 border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Простой процесс
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Как мы работаем
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Всего 5 простых шагов от записи до здоровой улыбки
          </p>
        </motion.div>

        {/* Steps - Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connection line */}
          <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-zinc-200 via-primary/30 to-zinc-200 dark:from-zinc-800 dark:via-primary/50 dark:to-zinc-800" />

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step.delay }}
                className="relative"
              >
                {/* Icon Circle */}
                <motion.div
                  className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative z-10 mb-6"
                  whileHover={{ scale: 1.1, borderColor: "rgb(13, 148, 136)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${step.color} p-0.5`}>
                    <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
                      <step.icon className={`h-6 w-6 sm:h-7 sm:w-7 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}
                        style={{
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      />
                    </div>
                  </div>

                  {/* Step number */}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-bold flex items-center justify-center`}>
                    {index + 1}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile Vertical */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.delay }}
              className="flex gap-4 items-start relative"
            >
              {/* Connecting line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-zinc-200 dark:to-zinc-800" />
              )}

              {/* Icon */}
              <motion.div
                className="flex-shrink-0 w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} p-0.5`}>
                  <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
                    <step.icon className={`h-6 w-6 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}
                      style={{
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    />
                  </div>
                </div>

                {/* Step number */}
                <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-bold flex items-center justify-center`}>
                  {index + 1}
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
