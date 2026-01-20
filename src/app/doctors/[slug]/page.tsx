import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  GraduationCap,
  Phone,
  Star,
  Users
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctorsData[slug as keyof typeof doctorsData];

  if (!doctor) {
    return {
      title: "Врач не найден",
    };
  }

  return {
    title: `${doctor.name} - ${doctor.role} | Клиника Татьяна Вакалова`,
    description: `${doctor.name} - ${doctor.role}. ${doctor.experience}. Запись на прием.`,
    openGraph: {
      title: `${doctor.name} - ${doctor.role}`,
      description: `${doctor.experience}. Запись на прием в стоматологическую клинику.`,
      images: [doctor.image],
      type: "profile",
    },
  };
}

// Данные врачей
const doctorsData = {
  "tatyana-vakalova": {
    name: "Татьяна Вакалова",
    role: "Главный врач, стоматолог-терапевт",
    experience: "15 лет опыта",
    image: "https://placehold.co/800x800/0ea5e9/ffffff?text=Татьяна+Вакалова",
    rating: 4.9,
    reviews: 156,
    education: [
      "Карлов университет, Прага - стоматология (2008)",
      "Сертификация в эндодонтии (2012)",
      "Член Европейской ассоциации стоматологов (2015)",
      "Курсы повышения квалификации в Германии (2020)",
    ],
    specializations: [
      "Лечение кариеса",
      "Эндодонтия (лечение каналов)",
      "Эстетическая стоматология",
      "Художественные реставрации",
    ],
    about: "Татьяна Вакалова - главный врач клиники с 15-летним опытом работы. Окончила престижный Карлов университет в Праге. Специализируется на терапевтической стоматологии и эстетических реставрациях. Регулярно проходит обучение в ведущих европейских клиниках. Индивидуальный подход к каждому пациенту и внимание к деталям - основа её работы.",
    philosophy: "Моя главная цель - не просто вылечить зубы, а подарить пациенту уверенность в себе и красивую улыбку. Я верю в безболезненное лечение и комфорт на каждом этапе.",
    achievements: [
      "Более 5000 успешных лечений",
      "Сертифицированный специалист по эндодонтии",
      "Победитель конкурса 'Лучший стоматолог Праги' (2022)",
      "Автор статей в профессиональных журналах",
    ],
    languages: ["Русский", "Чешский", "Английский"],
  },
  "petr-novak": {
    name: "Петр Новак",
    role: "Стоматолог-хирург, имплантолог",
    experience: "12 лет опыта",
    image: "https://placehold.co/800x800/06b6d4/ffffff?text=Петр+Новак",
    rating: 4.8,
    reviews: 98,
    education: [
      "Масариков университет, Брно - стоматология (2011)",
      "Сертификация Nobel Biocare (2014)",
      "Член Международного общества имплантологов (2016)",
      "Курсы по костной пластике в Швейцарии (2019)",
    ],
    specializations: [
      "Имплантация зубов",
      "Хирургическая стоматология",
      "Костная пластика",
      "Синус-лифтинг",
    ],
    about: "Петр Новак - ведущий хирург-имплантолог клиники. Специализируется на сложных случаях имплантации с использованием современных систем Nobel Biocare и Straumann. Прошел специализированное обучение в Швейцарии по костной пластике и синус-лифтингу. Выполнил более 800 успешных имплантаций.",
    philosophy: "Каждая операция - это искусство. Я использую только проверенные импланты премиум-класса и компьютерное планирование для достижения идеального результата.",
    achievements: [
      "Более 800 установленных имплантов",
      "Сертифицированный специалист Nobel Biocare",
      "Эксперт по сложным случаям имплантации",
      "Спикер на международных конференциях",
    ],
    languages: ["Чешский", "Русский", "Немецкий"],
  },
  "anna-cherna": {
    name: "Анна Черна",
    role: "Стоматолог-ортопед",
    experience: "10 лет опыта",
    image: "https://placehold.co/800x800/10b981/ffffff?text=Анна+Черна",
    rating: 4.9,
    reviews: 112,
    education: [
      "Карлов университет, Прага - стоматология (2013)",
      "Специализация в ортопедической стоматологии (2015)",
      "Курсы по керамическим винирам E-max (2017)",
      "Обучение цифровому моделированию улыбки (2021)",
    ],
    specializations: [
      "Протезирование",
      "Керамические виниры",
      "Коронки и мосты",
      "Цифровое моделирование улыбки",
    ],
    about: "Анна Черна - специалист по эстетическому протезированию. Работает с керамикой E-max и создает виниры, которые невозможно отличить от настоящих зубов. Использует цифровое моделирование улыбки для визуализации результата до начала лечения. Каждая работа - это произведение искусства.",
    philosophy: "Красивая улыбка меняет жизнь. Я помогаю людям обрести уверенность через безупречную эстетику и функциональность.",
    achievements: [
      "Более 600 керамических виниров",
      "Специалист по цифровой стоматологии",
      "Победитель конкурса 'Лучшая эстетическая работа' (2023)",
      "Преподаватель на курсах по винирам",
    ],
    languages: ["Чешский", "Русский", "Английский"],
  },
};

type DoctorSlug = keyof typeof doctorsData;

export default async function DoctorPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: slugParam } = await params;
  const slug = slugParam as DoctorSlug;
  const doctor = doctorsData[slug];

  if (!doctor) {
    notFound();
  }

  // JSON-LD Structured Data for doctor
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": doctor.name,
    "jobTitle": doctor.role,
    "description": doctor.about,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": doctor.rating,
      "reviewCount": doctor.reviews,
    },
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

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 dark:from-zinc-900 dark:to-zinc-800 py-16 border-b border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/#doctors">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад к специалистам
              </Button>
            </Link>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Doctor Photo */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <div className="aspect-square w-full max-w-sm mx-auto rounded-2xl overflow-hidden ring-4 ring-white dark:ring-zinc-800 shadow-xl">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {doctor.rating >= 4.9 && (
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-zinc-800">
                      <div className="text-center text-white">
                        <Star className="h-6 w-6 fill-white mx-auto" />
                        <div className="text-xs font-bold">Top</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="lg:col-span-2">
                <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-white">
                  {doctor.name}
                </h1>
                <p className="text-xl text-primary font-medium mb-4">{doctor.role}</p>

                {/* Rating and Experience */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-zinc-900 dark:text-white">{doctor.rating}</span>
                    <span>({doctor.reviews} отзывов)</span>
                  </div>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-medium">{doctor.experience}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Языки общения
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm font-medium text-primary dark:text-blue-400"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                  <Link href="/booking">
                    <Button size="lg" className="gap-2 shadow-lg">
                      <Calendar className="h-5 w-5" />
                      Записаться на прием
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <a href="tel:+420123456789">
                      <Phone className="h-5 w-5" />
                      Позвонить
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  О враче
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {doctor.about}
                </p>
              </div>

              {/* Philosophy */}
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-6 border border-blue-100 dark:border-zinc-700">
                <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white">
                  Философия работы
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 italic">
                  &ldquo;{doctor.philosophy}&rdquo;
                </p>
              </div>

              {/* Education */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  Образование и сертификаты
                </h2>
                <div className="space-y-3">
                  {doctor.education.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <p className="text-zinc-700 dark:text-zinc-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
                  Специализации
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {doctor.specializations.map((spec) => (
                    <Card key={spec}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-zinc-900 dark:text-white">{spec}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Достижения
                </h2>
                <div className="space-y-3">
                  {doctor.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Star className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400 fill-yellow-400" />
                      <p className="text-zinc-700 dark:text-zinc-300">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <Card className="sticky top-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-zinc-900 dark:to-zinc-800">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
                    Записаться к {doctor.name.split(' ')[0]}
                  </h3>
                  <p className="mb-6 text-sm text-zinc-700 dark:text-zinc-300">
                    Выберите удобное время для консультации или лечения
                  </p>
                  <div className="space-y-3">
                    <Link href="/booking" className="block">
                      <Button size="lg" className="w-full gap-2">
                        <Calendar className="h-5 w-5" />
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
                        <Phone className="h-5 w-5" />
                        +420 123 456 789
                      </a>
                    </Button>
                  </div>
                  <p className="mt-4 text-center text-xs text-zinc-600 dark:text-zinc-400">
                    Или напишите в{" "}
                    <a
                      href="https://wa.me/420123456789"
                      className="font-medium text-primary hover:underline"
                    >
                      WhatsApp
                    </a>
                  </p>
                </CardContent>
              </Card>

              {/* Patient Reviews Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
                    Отзывы пациентов
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                          {doctor.rating}
                        </span>
                      </div>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {doctor.reviews} отзывов
                      </span>
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex justify-between mb-1">
                        <span>5 звезд</span>
                        <span className="font-medium">{Math.round((doctor.reviews * 85) / 100)}</span>
                      </div>
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400" style={{ width: '85%' }} />
                      </div>
                    </div>
                  </div>
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
  return Object.keys(doctorsData).map((slug) => ({
    slug,
  }));
}
