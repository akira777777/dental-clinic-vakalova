import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

const doctors = [
  {
    name: "Татьяна Вакалова",
    role: "Главный врач, стоматолог-терапевт",
    experience: "15 лет опыта",
    slug: "tatyana-vakalova",
    education: [
      "Карлов университет, Прага",
      "Сертификация в эндодонтии",
      "Европейская ассоциация стоматологов",
    ],
    specializations: [
      "Лечение кариеса",
      "Эндодонтия",
      "Эстетическая стоматология",
    ],
    rating: 4.9,
    reviews: 156,
  },
  {
    name: "Петр Новак",
    role: "Стоматолог-хирург, имплантолог",
    experience: "12 лет опыта",
    slug: "petr-novak",
    education: [
      "Масариков университет, Брно",
      "Сертификация Nobel Biocare",
      "Международное общество имплантологов",
    ],
    specializations: [
      "Имплантация",
      "Хирургия",
      "Костная пластика",
    ],
    rating: 4.8,
    reviews: 98,
  },
  {
    name: "Анна Черна",
    role: "Стоматолог-ортопед",
    experience: "10 лет опыта",
    slug: "anna-cherna",
    education: [
      "Карлов университет, Прага",
      "Специализация в протезировании",
      "Курсы по керамическим винирам",
    ],
    specializations: [
      "Протезирование",
      "Виниры",
      "Коронки и мосты",
    ],
    rating: 4.9,
    reviews: 112,
  },
];

export function DoctorsSection() {
  return (
    <section id="doctors" className="bg-zinc-50 dark:bg-zinc-900/50 py-24 border-y border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-secondary text-xs font-semibold border border-blue-100 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Наши специалисты
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Опытные врачи с европейским образованием
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Каждый врач нашей клиники — профессионал с многолетним опытом и
            международными сертификатами.
          </p>
        </div>

        {/* Doctors Grid - Stitch style */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="group bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-card p-6 flex flex-col items-center text-center transition-all hover:shadow-card hover:border-zinc-300 dark:hover:border-zinc-600"
            >
              {/* Doctor Photo */}
              <div className="relative mb-5">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-zinc-50 dark:ring-zinc-800">
                  <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/50 dark:bg-zinc-600/50 backdrop-blur" />
                  </div>
                </div>
                {doctor.rating >= 4.9 && (
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white dark:border-zinc-950 rounded-full flex items-center justify-center" title="Top Rated">
                    <Star className="h-3 w-3 text-white fill-white" />
                  </div>
                )}
              </div>

              {/* Doctor Info */}
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{doctor.name}</h3>
              <p className="text-secondary font-medium text-sm mb-3">{doctor.role}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 text-zinc-500 dark:text-zinc-400 text-xs">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{doctor.rating}</span>
                <span>({doctor.reviews} отзывов)</span>
                <span className="mx-1">•</span>
                <span>{doctor.experience}</span>
              </div>

              {/* Education - compact */}
              <div className="w-full mb-4">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Образование</h4>
                <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400 text-left">
                  {doctor.education.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specializations - tags */}
              <div className="w-full mb-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {doctor.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto w-full grid grid-cols-2 gap-3">
                <Link href={`/doctors/${doctor.slug}`} className="w-full">
                  <Button variant="outline" className="text-sm w-full" size="sm">
                    Профиль
                  </Button>
                </Link>
                <Link href="/booking" className="w-full">
                  <Button className="text-sm shadow-sm w-full" size="sm">
                    Записаться
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
