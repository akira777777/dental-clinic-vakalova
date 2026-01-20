import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, GraduationCap, Star } from "lucide-react";

const doctors = [
  {
    name: "Татьяна Вакалова",
    role: "Главный врач, стоматолог-терапевт",
    experience: "15 лет опыта",
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
    <section id="doctors" className="bg-neutral-50 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-700">
            Наши врачи
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
            Опытные специалисты с европейским образованием
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-neutral-600">
            Каждый врач нашей клиники — профессионал с многолетним опытом и
            международными сертификатами.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.name} className="overflow-hidden">
              {/* Doctor Photo Placeholder */}
              <div className="h-64 bg-gradient-to-br from-primary-100 to-secondary-100">
                <div className="flex h-full items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-white/50 backdrop-blur" />
                </div>
              </div>

              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm font-medium text-accent-600">
                    <Star className="h-4 w-4 fill-accent-500" />
                    <span>{doctor.rating}</span>
                    <span className="text-neutral-400">
                      ({doctor.reviews})
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Award className="h-4 w-4 text-primary-500" />
                    <GraduationCap className="h-4 w-4 text-secondary-500" />
                  </div>
                </div>

                <CardTitle className="text-2xl">{doctor.name}</CardTitle>
                <CardDescription className="text-base">
                  {doctor.role}
                </CardDescription>
                <p className="pt-2 text-sm font-medium text-neutral-700">
                  {doctor.experience}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Education */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-neutral-900">
                    Образование
                  </h4>
                  <ul className="space-y-1 text-sm text-neutral-600">
                    {doctor.education.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specializations */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-neutral-900">
                    Специализация
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Записаться к врачу
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
