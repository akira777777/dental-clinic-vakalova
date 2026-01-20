"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function FloatingBookingButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="lg:hidden fixed bottom-6 right-4 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2"
          >
            {/* Quick Call Button */}
            <motion.a
              href="tel:+420123456789"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 font-semibold py-3 px-5 rounded-full shadow-xl flex items-center gap-2 hover:border-primary dark:hover:border-primary transition-colors"
            >
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-sm">Позвонить</span>
            </motion.a>

            {/* Booking Link */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/booking"
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 font-semibold py-3 px-5 rounded-full shadow-xl flex items-center gap-2 hover:border-primary dark:hover:border-primary transition-colors"
              >
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm">Записаться</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-6 rounded-full shadow-2xl flex items-center gap-2 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isExpanded
            ? "0 20px 25px -5px rgba(13, 148, 136, 0.3)"
            : [
              "0 20px 25px -5px rgba(13, 148, 136, 0.3)",
              "0 20px 25px -5px rgba(13, 148, 136, 0.5)",
              "0 20px 25px -5px rgba(13, 148, 136, 0.3)",
            ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: isExpanded ? 0 : Infinity,
            ease: [0.42, 0, 0.58, 1] as const, // easeInOut
          },
        }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <X className="h-5 w-5" />
          ) : (
            <Calendar className="h-5 w-5" />
          )}
        </motion.div>
        <span className="text-sm">{isExpanded ? "Закрыть" : "Записаться"}</span>
      </motion.button>

      {/* Pulsing ring effect when not expanded */}
      {!isExpanded && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1] as const, // easeInOut
          }}
        />
      )}
    </div>
  );
}
