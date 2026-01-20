import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
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
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  "professionalnaya-chistka": {
    title: "Профессиональная чистка",
    description: "Ультразвуковая чистка зубов и Air Flow для удаления налета и камня. Здоровые зубы и свежее дыхание.",
    price: "От 1200 Kč",
    duration: "45-60 минут",
    category: "Профилактика",
    image: "https://placehold.co/1200x600/06b6d4/ffffff?text=Профессиональная+чистка",
    benefits: [
      "Удаление зубного камня и налета",
      "Полировка зубов пастами премиум-класса",
      "Профилактика кариеса и воспаления десен",
      "Свежее дыхание на долгое время",
      "Безболезненно и комфортно",
    ],
    process: [
      {
        step: 1,
        title: "Осмотр",
        description: "Оценка состояния полости рта",
      },
      {
        step: 2,
        title: "Ультразвуковая чистка",
        description: "Удаление зубного камня ультразвуком",
      },
      {
        step: 3,
        title: "Air Flow",
        description: "Удаление налета и пигментации аппаратом Air Flow",
      },
      {
        step: 4,
        title: "Полировка и фторирование",
        description: "Полировка зубов и укрепление эмали фтором",
      },
    ],
    faq: [
      {
        question: "Как часто нужно делать чистку?",
        answer: "Рекомендуется проводить профессиональную чистку каждые 6 месяцев для поддержания здоровья зубов и десен.",
      },
      {
        question: "Больно ли делать чистку?",
        answer: "Процедура практически безболезненна. При повышенной чувствительности возможна местная анестезия.",
      },
      {
        question: "Можно ли есть после чистки?",
        answer: "Рекомендуется воздержаться от еды и напитков в течение 30 минут после процедуры.",
      },
    ],
  },
  "protezirovanie": {
    title: "Протезирование",
    description: "Керамические коронки, виниры, мосты. Восстановление эстетики и функции зубного ряда.",
    price: "От 8000 Kč",
    duration: "2-3 визита",
    category: "Ортопедия",
    image: "https://placehold.co/1200x600/0ea5e9/ffffff?text=Протезирование",
    benefits: [
      "Керамика E-max - максимальная эстетика",
      "Компьютерное моделирование улыбки",
      "Точная посадка протезов",
      "Гарантия 5 лет на коронки",
      "Индивидуальный подбор цвета",
    ],
    process: [
      {
        step: 1,
        title: "Консультация и план лечения",
        description: "3D-моделирование будущей улыбки",
      },
      {
        step: 2,
        title: "Подготовка зубов",
        description: "Обточка зубов, снятие слепков",
      },
      {
        step: 3,
        title: "Временные протезы",
        description: "Установка временных коронок/виниров",
      },
      {
        step: 4,
        title: "Установка постоянных протезов",
        description: "Примерка и фиксация керамических протезов",
      },
    ],
    faq: [
      {
        question: "Чем керамика лучше металлокерамики?",
        answer: "Керамика E-max не содержит металла, выглядит естественно, не вызывает аллергии и служит дольше.",
      },
      {
        question: "Сколько служат керамические коронки?",
        answer: "При правильном уходе керамические коронки служат 15-20 лет. Гарантия 5 лет.",
      },
      {
        question: "Можно ли ставить коронки на передние зубы?",
        answer: "Да! Керамические коронки идеальны для передних зубов - они неотличимы от настоящих зубов.",
      },
    ],
  },
  "khirurgiya": {
    title: "Хирургия",
    description: "Удаление зубов мудрости, резекция верхушки корня. Опытные хирурги, безболезненно.",
    price: "От 2000 Kč",
    duration: "30-90 минут",
    category: "Хирургия",
    image: "https://placehold.co/1200x600/10b981/ffffff?text=Хирургия",
    benefits: [
      "Опытные хирурги с европейским образованием",
      "Современная анестезия - без боли",
      "3D-томография для точной диагностики",
      "Минимальная травматичность",
      "Быстрое восстановление",
    ],
    process: [
      {
        step: 1,
        title: "Диагностика",
        description: "Осмотр, рентген или 3D-томография",
      },
      {
        step: 2,
        title: "Анестезия",
        description: "Современная безболезненная анестезия",
      },
      {
        step: 3,
        title: "Операция",
        description: "Атравматичное удаление зуба или хирургическое вмешательство",
      },
      {
        step: 4,
        title: "Рекомендации",
        description: "Назначение препаратов, контрольный осмотр",
      },
    ],
    faq: [
      {
        question: "Больно ли удалять зуб мудрости?",
        answer: "Нет! Современная анестезия полностью исключает боль во время операции.",
      },
      {
        question: "Сколько длится восстановление?",
        answer: "Обычно 3-7 дней. Мы даём подробные рекомендации для быстрого заживления.",
      },
      {
        question: "Когда можно ставить имплант после удаления?",
        answer: "Одномоментная имплантация возможна сразу. В остальных случаях - через 2-3 месяца.",
      },
    ],
  },
  "detskaya-stomatologiya": {
    title: "Детская стоматология",
    description: "Заботливое лечение детских зубов. Игровая форма приема, никакого страха у ребенка.",
    price: "От 800 Kč",
    duration: "30-45 минут",
    category: "Детская",
    image: "https://placehold.co/1200x600/06b6d4/ffffff?text=Детская+стоматология",
    benefits: [
      "Игровая форма приема - ребенку интересно",
      "Опытные детские стоматологи",
      "Безопасные материалы для детей",
      "Формирование правильного отношения к зубам",
      "Подарки для маленьких пациентов",
    ],
    process: [
      {
        step: 1,
        title: "Знакомство",
        description: "Знакомство с врачом в игровой форме",
      },
      {
        step: 2,
        title: "Осмотр",
        description: "Бережный осмотр полости рта",
      },
      {
        step: 3,
        title: "Лечение",
        description: "Лечение кариеса с мультфильмами и игрушками",
      },
      {
        step: 4,
        title: "Награда",
        description: "Подарок за храбрость и рекомендации родителям",
      },
    ],
    faq: [
      {
        question: "С какого возраста принимаете детей?",
        answer: "Мы принимаем детей с первого зуба! Рекомендуется первый визит в 1 год.",
      },
      {
        question: "Ребенок боится стоматолога. Что делать?",
        answer: "Наши врачи умеют находить подход к детям. Первый визит - знакомство без лечения.",
      },
      {
        question: "Нужно ли лечить молочные зубы?",
        answer: "Да! Кариес молочных зубов влияет на постоянные зубы и общее здоровье ребенка.",
      },
    ],
  },
  "parodontologiya": {
    title: "Пародонтология",
    description: "Лечение десен и профилактика пародонтита. Сохраняем здоровье полости рта.",
    price: "От 1500 Kč",
    duration: "60-90 минут",
    category: "Пародонтология",
    image: "https://placehold.co/1200x600/0ea5e9/ffffff?text=Пародонтология",
    benefits: [
      "Комплексное лечение заболеваний десен",
      "Современные методы лечения пародонтита",
      "Профилактика потери зубов",
      "Устранение кровоточивости десен",
      "Долгосрочный результат",
    ],
    process: [
      {
        step: 1,
        title: "Диагностика",
        description: "Оценка состояния десен и пародонта",
      },
      {
        step: 2,
        title: "Профессиональная чистка",
        description: "Удаление поддесневых отложений",
      },
      {
        step: 3,
        title: "Лечение",
        description: "Медикаментозная терапия, кюретаж пародонтальных карманов",
      },
      {
        step: 4,
        title: "Поддерживающая терапия",
        description: "Регулярные профилактические осмотры",
      },
    ],
    faq: [
      {
        question: "Почему кровоточат десны?",
        answer: "Основная причина - зубной налет и камень. Это начальная стадия пародонтита.",
      },
      {
        question: "Можно ли вылечить пародонтит?",
        answer: "На ранних стадиях - да, полностью. На поздних - можно остановить развитие болезни.",
      },
      {
        question: "Как часто нужно ходить к пародонтологу?",
        answer: "Рекомендуется посещение каждые 3-6 месяцев для профилактики и поддержания здоровья десен.",
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
    <>
      <Header />
      <div className="min-h-screen">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Hero Image */}
        <div className="relative h-96 overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-80"
            priority
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
                    <Link href="/booking" className="block">
                      <Button size="lg" className="w-full gap-2">
                        <Calendar className="h-4 w-4" />
                        Онлайн-запись
                      </Button>
                    </Link>
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
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}
