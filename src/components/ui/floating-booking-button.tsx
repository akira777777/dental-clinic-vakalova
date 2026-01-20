"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";

export function FloatingBookingButton() {
  return (
    <Link
      href="/booking"
      className="lg:hidden fixed bottom-6 right-4 z-50 bg-primary hover:opacity-90 text-white font-semibold py-4 px-6 rounded-full shadow-2xl flex items-center gap-2 transition-all active:scale-95 animate-pulse hover:animate-none"
    >
      <Calendar className="h-5 w-5" />
      <span className="text-sm">Записаться</span>
    </Link>
  );
}
