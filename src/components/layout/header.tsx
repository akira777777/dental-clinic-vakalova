"use client";

import { Button } from "@/components/ui/button";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Услуги" },
    { href: "#gallery", label: "Галерея" },
    { href: "#doctors", label: "Врачи" },
    { href: "#testimonials", label: "Отзывы" },
    { href: "#contact", label: "Контакты" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="text-lg font-bold">Т</span>
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Татьяна Вакалова
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Стоматологическая клиника
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-primary dark:hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span className="font-medium text-zinc-900 dark:text-white">
                +420 123 456 789
              </span>
            </div>
            <Link href="/booking">
              <Button size="sm" className="shadow-sm">
                Записаться
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="animate-slide-down md:hidden">
            <nav className="flex flex-col space-y-4 pb-6 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-primary dark:hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2 text-sm border-t border-zinc-100 dark:border-zinc-800">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+420123456789" className="font-medium text-zinc-900 dark:text-white hover:text-primary transition-colors">
                  +420 123 456 789
                </a>
              </div>
              <Link href="/booking" className="w-full">
                <Button className="w-full shadow-sm">
                  Записаться на прием
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
