"use client";

import { motion } from "framer-motion";
import {
  Award,
  CheckCircle,
  Clock,
  CreditCard,
  Globe,
  Heart,
  Shield,
  Smile,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Безопасность и стерильность",
    description: "Используем европейские стандарты стерилизации и безопасности",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Пунктуальность",
    description: "Прием строго по времени, ценим ваше время",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "Европейские сертификаты",
    description: "Все врачи имеют международную сертификацию",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Индивидуальный подход",
    description: "Персональный план лечения для каждого пациента",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Heart,
    title: "Безболезненное лечение",
    description: "Современная анестезия и щадящие методы лечения",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Новейшее оборудование",
    description: "Используем последние достижения стоматологии",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    icon: CheckCircle,
    title: "Гарантия качества",
    description: "Предоставляем гарантию на все виды работ",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Многоязычный персонал",
    description: "Говорим на русском, чешском, английском",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: CreditCard,
    title: "Гибкая оплата",
    description: "Принимаем все виды оплаты, рассрочка",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Smile,
    title: "Комфортная атмосфера",
    description: "Уютная клиника в центре Праги",
    gradient: "from-pink-500 to-rose-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const, // easeOut
    },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Почему выбирают нас
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Преимущества нашей клиники
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Мы создали все условия для вашего комфорта и здоровья
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-transparent transition-all duration-300 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Animated icon */}
              <motion.div
                className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center">
                  <feature.icon className={`h-6 w-6 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }} />
                </div>
              </motion.div>

              {/* Content */}
              <h3 className={`text-base font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-br group-hover:bg-clip-text transition-all duration-300 ${feature.gradient}`}>
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative element */}
              <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 rounded-tl-full transition-opacity duration-300`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
