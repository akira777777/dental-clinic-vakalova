import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Phone
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];
  
  if (!service) {
    return {
      title: "Услуга не найдена",
    };
  }
  
  return {
    title: `${service.title} - Клиника Татьяна Вакалова | ${service.price}`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [service.image],
      type: "website",
    },
  };
}

// Mock data - в production загружать из базы данных
const servicesData = {
  "lechenie-kariesa": {
    title: "Лечение кариеса",
    description: "Качественное лечение кариеса с использованием современных композитных материалов премиум-класса.",
    price: "От 1500 Kč",
    duration: "30-60 минут",
    category: "Терапия",
    image: "https://placehold.co/1200x600/0ea5e9/ffffff?text=Лечение+кариеса",
    benefits: [
      "Безболезненное лечение с современной анестезией",
      "Использование немецких материалов премиум-класса",
      "Гарантия на пломбу 5 лет",
      "Эстетический результат - пломба незаметна",
      "Лечение за один визит",
    ],
    process: [
      {
        step: 1,
        title: "Диагностика",
        description: "Осмотр полости рта, рентген при необходимости",
      },
      {
        step: 2,
        title: "Анестезия",
        description: "Безболезненная анестезия, ожидание 3-5 минут",
      },
      {
        step: 3,
        title: "Удаление кариеса",
        description: "Тщательное удаление поражённых тканей",
      },
      {
        step: 4,
        title: "Пломбирование",
        description: "Послойное нанесение композита, полировка",
      },
    ],
    faq: [
      {
        question: "Больно ли лечить кариес?",
        answer: "Нет! Мы используем современную анестезию. Вы не почувствуете боли во время процедуры.",
      },
      {
        question: "Сколько прослужит пломба?",
        answer: "При правильном уходе композитная пломба служит 5-7 лет. На наши пломбы гарантия 5 лет.",
      },
      {
        question: "Можно ли есть после лечения?",
        answer: "Через 2 часа после процедуры можно есть мягкую пищу. Полная нагрузка - через 24 часа.",
      },
    ],
  },
  "otbelivanie": {
    title: "Отбеливание зубов",
    description: "Профессиональное отбеливание зубов системой ZOOM. Белоснежная улыбка за 1 час.",
    price: "От 8000 Kč",
    duration: "60-90 минут",
    category: "Эстетика",
    image: "https://placehold.co/1200x600/06b6d4/ffffff?text=Отбеливание+зубов",
    benefits: [
      "Осветление на 8-10 тонов за 1 процедуру",
      "Система ZOOM (лидер рынка)",
      "Безопасно для эмали",
      "Результат держится 2-3 года",
      "Без боли и дискомфорта",
    ],
    process: [
      {
        step: 1,
        title: "Подготовка",
        description: "Профессиональная чистка зубов перед процедурой",
      },
      {
        step: 2,
        title: "Защита дёсен",
        description: "Нанесение защитного геля на дёсны",
      },
      {
        step: 3,
        title: "Отбеливание",
        description: "Нанесение геля, активация LED-лампой (3 сеанса по 15 мин)",
      },
      {
        step: 4,
        title: "Укрепление эмали",
        description: "Нанесение фторсодержащего геля",
      },
    ],
    faq: [
      {
        question: "Вредно ли отбеливание для зубов?",
        answer: "Нет! Система ZOOM безопасна для эмали. Мы используем защитные гели.",
      },
      {
        question: "Как долго держится результат?",
        answer: "При правильном уходе результат сохраняется 2-3 года.",
      },
      {
        question: "Есть ли противопоказания?",
        answer: "Да: беременность, множественный кариес, повышенная чувствительность зубов.",
      },
    ],
  },
  "implantatsiya": {
    title: "Имплантация зубов",
    description: "Установка зубных имплантов премиум-класса. Пожизненная гарантия.",
    price: "От 15000 Kč",
    duration: "60-120 минут",
    category: "Хирургия",
    image: "https://placehold.co/1200x600/10b981/ffffff?text=Имплантация+зубов",
    benefits: [
      "Импланты Nobel Biocare, Straumann (Швейцария)",
      "Пожизненная гарантия на имплант",
      "Компьютерное 3D планирование",
      "Одномоментная имплантация возможна",
      "Восстановление жевательной функции на 100%",
    ],
    process: [
      {
        step: 1,
        title: "Диагностика и планирование",
        description: "3D-томография, компьютерное моделирование",
      },
      {
        step: 2,
        title: "Установка импланта",
        description: "Хирургическая операция под анестезией (60-90 мин)",
      },
      {
        step: 3,
        title: "Приживление",
        description: "Остеоинтеграция 3-6 месяцев",
      },
      {
        step: 4,
        title: "Протезирование",
        description: "Установка коронки на имплант",
      },
    ],
    faq: [
      {
        question: "Больно ли ставить имплант?",
        answer: "Нет! Операция проходит под анестезией. После - возможен небольшой отёк 2-3 дня.",
      },
      {
        question: "Сколько служит имплант?",
        answer: "Качественный имплант служит всю жизнь. Мы даём пожизненную гарантию!",
      },
      {
        question: "Можно ли ставить имплант сразу после удаления?",
        answer: "Да! Одномоментная имплантация возможна в 70% случаев.",
      },
    ],
  },
};

type ServiceSlug = keyof typeof servicesData;

export default async function ServicePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug: slugParam } = await params;
  const slug = slugParam as ServiceSlug;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  // JSON-LD Structured Data for this service
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": service.title,
    "description": service.description,
    "procedureType": service.category,
  };

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="container absolute inset-x-0 bottom-0 mx-auto px-4 pb-12 sm:px-6 lg:px-8">
          <Link href="/#services">
            <Button variant="ghost" className="mb-4 text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад к услугам
            </Button>
          </Link>

          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="max-w-2xl text-lg text-white/90">
            {service.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Key Info */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <DollarSign className="h-8 w-8 text-primary-500" />
                  <div>
                    <div className="text-xs text-neutral-600">Цена</div>
                    <div className="font-bold text-neutral-900">{service.price}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Clock className="h-8 w-8 text-secondary-500" />
                  <div>
                    <div className="text-xs text-neutral-600">Длительность</div>
                    <div className="font-bold text-neutral-900">{service.duration}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <CheckCircle className="h-8 w-8 text-accent-500" />
                  <div>
                    <div className="text-xs text-neutral-600">Категория</div>
                    <div className="font-bold text-neutral-900">{service.category}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">
                Преимущества
              </h2>
              <div className="space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500" />
                    <p className="text-neutral-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">
                Как проходит процедура
              </h2>
              <div className="space-y-4">
                {service.process.map((item) => (
                  <Card key={item.step}>
                    <CardContent className="flex gap-4 p-6">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-neutral-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">
                Часто задаваемые вопросы
              </h2>
              <div className="space-y-4">
                {service.faq.map((item, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-semibold text-neutral-900">
                        {item.question}
                      </h3>
                      <p className="text-sm text-neutral-700">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <Card className="sticky top-24 bg-gradient-to-br from-primary-50 to-secondary-50">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-bold text-neutral-900">
                  Записаться на прием
                </h3>
                <p className="mb-6 text-sm text-neutral-700">
                  Оставьте заявку, и мы перезвоним вам в течение 15 минут
                </p>
                <div className="space-y-3">
                  <Button size="lg" className="w-full gap-2">
                    <Calendar className="h-4 w-4" />
                    Онлайн-запись
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full gap-2"
                    asChild
                  >
                    <a href="tel:+420123456789">
                      <Phone className="h-4 w-4" />
                      +420 123 456 789
                    </a>
                  </Button>
                </div>
                <p className="mt-4 text-center text-xs text-neutral-600">
                  Или напишите в{" "}
                  <a
                    href="https://wa.me/420123456789"
                    className="font-medium text-accent-600 hover:underline"
                  >
                    WhatsApp
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Guarantee Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-bold text-neutral-900">
                  Наши гарантии
                </h3>
                <ul className="space-y-3 text-sm text-neutral-700">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent-500" />
                    <span>Гарантия на все услуги</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent-500" />
                    <span>Бесплатный повторный осмотр</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent-500" />
                    <span>Страхование ответственности</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent-500" />
                    <span>Сертифицированные материалы</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}
