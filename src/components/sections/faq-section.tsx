"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "Какие виды анестезии вы используете?",
    answer: "Мы используем современные анестетики последнего поколения (Ультракаин, Убистезин), которые обеспечивают полную безболезненность процедур. Для пациентов с аллергией подбираем индивидуальные варианты.",
  },
  {
    question: "Предоставляете ли вы гарантию на лечение?",
    answer: "Да, мы предоставляем гарантию на все виды работ: от 1 года на пломбы до 5 лет на имплантацию и протезирование. Подробные условия гарантии обсуждаются индивидуально.",
  },
  {
    question: "Можно ли записаться на прием в выходные?",
    answer: "Да, наша клиника работает 6 дней в неделю, включая субботу. Воскресенье - выходной день. Запись доступна через сайт или по телефону.",
  },
  {
    question: "Какие способы оплаты вы принимаете?",
    answer: "Мы принимаем наличные, банковские карты (Visa, MasterCard), безналичный перевод. Также предлагаем рассрочку платежа на крупные суммы лечения.",
  },
  {
    question: "Как долго длится процедура имплантации?",
    answer: "Установка одного импланта занимает 30-60 минут. Полный процесс от установки импланта до протезирования обычно составляет 3-6 месяцев, в зависимости от индивидуальных особенностей.",
  },
  {
    question: "Нужна ли специальная подготовка перед приемом?",
    answer: "Специальная подготовка обычно не требуется. Рекомендуем почистить зубы перед визитом и принести медицинскую карту, если есть хронические заболевания. Перед операциями даем подробные инструкции.",
  },
];

interface FAQItemProps {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-primary dark:hover:border-primary transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left group"
      >
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-primary transition-colors duration-300">
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          {isOpen ? (
            <Minus className="h-5 w-5 text-primary" />
          ) : (
            <Plus className="h-5 w-5 text-zinc-400 group-hover:text-primary transition-colors duration-300" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-semibold mb-4 border border-purple-100 dark:border-purple-800">
            <HelpCircle className="h-3 w-3" />
            Ответы на вопросы
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Не нашли ответ на свой вопрос? Свяжитесь с нами!
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Остались вопросы?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+420123456789"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors duration-300"
            >
              Позвонить нам
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-lg font-medium hover:border-primary dark:hover:border-primary transition-colors duration-300"
            >
              Написать нам
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
