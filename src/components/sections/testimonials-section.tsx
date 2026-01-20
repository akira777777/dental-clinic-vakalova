import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Мария Петрова",
    rating: 5,
    date: "2 недели назад",
    text: "Лучшая стоматология в Праге! Врачи профессионалы своего дела. Никакой боли, всё быстро и качественно. Особенно хочу отметить доктора Татьяну - очень внимательная и деликатная. Вылечила все зубы, результатом очень довольна!",
    service: "Лечение кариеса",
  },
  {
    name: "Ольга Ковалёва",
    rating: 5,
    date: "1 месяц назад",
    text: "Долго искала хорошего стоматолога в Праге. Очень рада, что нашла клинику Татьяны Вакаловой! Сделала профессиональную чистку и отбеливание зубов - результат превзошел все ожидания. Клиника современная, чистая, персонал приветливый.",
    service: "Отбеливание зубов",
  },
  {
    name: "Дмитрий Соколов",
    rating: 5,
    date: "3 недели назад",
    text: "Делал имплантацию у доктора Петра Новака. Очень переживал, но врач всё объяснил, успокоил. Операция прошла отлично, никаких осложнений. Через 3 месяца поставили коронку - как родной зуб! Спасибо огромное!",
    service: "Имплантация",
  },
  {
    name: "Анна Белова",
    rating: 5,
    date: "2 месяца назад",
    text: "Привела дочку (5 лет) на первый прием к стоматологу. Очень боялась, что ребенок испугается и будет плакать. Но врач нашла подход - всё объясняла в игровой форме, показывала инструменты. Дочка не испугалась, даже наоборот - теперь хочет стать стоматологом!",
    service: "Детская стоматология",
  },
  {
    name: "Сергей Новиков",
    rating: 5,
    date: "1 неделю назад",
    text: "Установил керамические виниры у доктора Анны Черны. Результат - просто WOW! Улыбка стала белоснежной и ровной. Все друзья спрашивают, где я делал. Рекомендую всем, кто хочет красивую улыбку!",
    service: "Виниры",
  },
  {
    name: "Елена Морозова",
    rating: 5,
    date: "3 дня назад",
    text: "Спасибо клинике за профессионализм! Удалили зуб мудрости - быстро и совершенно безболезненно. Анестезия подействовала отлично, после операции никакого дискомфорта. Всё зажило быстро. Рекомендую!",
    service: "Хирургия",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-accent-100 px-4 py-2 text-sm font-medium text-accent-700">
            Отзывы пациентов
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
            Что говорят о нас наши пациенты
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-lg text-neutral-600">
            Более 2000 счастливых пациентов доверяют нам своё здоровье. Читайте
            реальные отзывы людей, которые уже прошли лечение в нашей клинике.
          </p>

          {/* Overall Rating */}
          <div className="mt-8 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-neutral-900">
                4.9
              </div>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent-500 text-accent-500"
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Средний рейтинг
              </p>
            </div>
            <div className="h-16 w-px bg-neutral-200" />
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-neutral-900">
                366
              </div>
              <p className="mt-2 text-sm text-neutral-600">Отзывов</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="relative">
              <Quote className="absolute right-4 top-4 h-8 w-8 text-neutral-200" />
              <CardContent className="pt-6">
                {/* Rating & Date */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-accent-500 text-accent-500"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500">
                    {testimonial.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="mb-4 text-sm leading-relaxed text-neutral-700">
                  {testimonial.text}
                </p>

                {/* Service Tag */}
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                    {testimonial.service}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-neutral-200 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-neutral-600">
                      Проверенный пациент
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-600">
            Хотите оставить свой отзыв?{" "}
            <a
              href="#contact"
              className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
            >
              Напишите нам
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
