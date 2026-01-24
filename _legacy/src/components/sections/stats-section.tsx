"use client";

import { motion } from "framer-motion";
import { Award, Calendar, Heart, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: Users,
    value: 2000,
    suffix: "+",
    label: "Довольных пациентов",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Лет опыта",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Calendar,
    value: 5000,
    suffix: "+",
    label: "Успешных процедур",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Heart,
    value: 98,
    suffix: "%",
    label: "Удовлетворенность",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

function CountUpNumber({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold">
      {count}
      {suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Цифры, которые говорят за нас
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Результаты нашей работы и доверие пациентов — наша главная гордость
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl"
            >
              {/* Icon */}
              <div className={`${stat.bgColor} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.color}`} />
              </div>

              {/* Number */}
              <div className={`${stat.color} mb-2`}>
                <CountUpNumber end={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium">
                {stat.label}
              </p>

              {/* Hover effect background */}
              <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10 blur-xl`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
