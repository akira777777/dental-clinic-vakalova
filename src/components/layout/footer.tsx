import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500">
                <span className="text-xl font-bold text-white">Т</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Татьяна Вакалова</span>
                <span className="text-xs">Стоматология</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Современная стоматологическая клиника в центре Праги. Качественное
              лечение, опытные врачи, гарантия результата.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#services" className="hover:text-white hover:underline">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="#doctors" className="hover:text-white hover:underline">
                  Врачи
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white hover:underline">
                  О клинике
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-white hover:underline">
                  Отзывы
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white hover:underline">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Услуги</h3>
            <ul className="space-y-2 text-sm">
              <li>Лечение кариеса</li>
              <li>Имплантация зубов</li>
              <li>Протезирование</li>
              <li>Отбеливание зубов</li>
              <li>Детская стоматология</li>
              <li>Хирургия</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-primary-400" />
                <span>
                  Václavské náměstí 123/45
                  <br />
                  110 00 Praha 1
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary-400" />
                <a href="tel:+420123456789" className="hover:text-white">
                  +420 123 456 789
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary-400" />
                <a
                  href="mailto:info@vakalova-dental.cz"
                  className="hover:text-white"
                >
                  info@vakalova-dental.cz
                </a>
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 text-primary-400" />
                <span>Пн-Пт: 9:00-20:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
            <p>
              © {currentYear} Стоматология Татьяна Вакалова. Все права защищены.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white hover:underline">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-white hover:underline">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
