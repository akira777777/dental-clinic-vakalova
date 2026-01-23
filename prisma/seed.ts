import { db as prisma } from '../src/lib/db'

async function main() {
  console.log('Start seeding ...')

  // --- Services ---
  const servicesData = [
    {
      name: "Лечение кариеса",
      slug: "lechenie-kariesa",
      description: "Качественное лечение кариеса с использованием современных композитных материалов премиум-класса.",
      price: 1500,
      duration: 60,
      category: "Терапия",
    },
    {
      name: "Отбеливание зубов",
      slug: "otbelivanie",
      description: "Профессиональное отбеливание зубов системой ZOOM. Белоснежная улыбка за 1 час.",
      price: 8000,
      duration: 90,
      category: "Эстетика",
    },
    {
      name: "Имплантация зубов",
      slug: "implantatsiya",
      description: "Установка зубных имплантов премиум-класса. Пожизненная гарантия.",
      price: 15000,
      duration: 120,
      category: "Хирургия",
    },
    {
      name: "Профессиональная чистка",
      slug: "professionalnaya-chistka",
      description: "Ультразвуковая чистка зубов и Air Flow для удаления налета и камня.",
      price: 1200,
      duration: 60,
      category: "Профилактика",
    },
    {
      name: "Протезирование",
      slug: "protezirovanie",
      description: "Керамические коронки, виниры, мосты. Восстановление эстетики и функции зубного ряда.",
      price: 8000,
      duration: 90,
      category: "Ортопедия",
    },
    {
      name: "Хирургия",
      slug: "khirurgiya",
      description: "Удаление зубов мудрости, резекция верхушки корня. Опытные хирурги, безболезненно.",
      price: 2000,
      duration: 60,
      category: "Хирургия",
    },
    {
      name: "Детская стоматология",
      slug: "detskaya-stomatologiya",
      description: "Заботливое лечение детских зубов. Игровая форма приема, никакого страха у ребенка.",
      price: 800,
      duration: 45,
      category: "Детская",
    },
    {
      name: "Пародонтология",
      slug: "parodontologiya",
      description: "Лечение десен и профилактика пародонтита. Сохраняем здоровье полости рта.",
      price: 1500,
      duration: 90,
      category: "Пародонтология",
    },
  ]

  const createdServices = []
  for (const s of servicesData) {
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    })
    createdServices.push(service)
    console.log(`Created service with id: ${service.id}`)
  }

  // --- Doctors ---
  const doctorsData = [
    {
      firstName: "Татьяна",
      lastName: "Вакалова",
      slug: "tatyana-vakalova",
      specialization: "Терапевт",
      email: "tatyana@vakalova.cz",
      phone: "+420123456789",
      photo: "/images/doctors/tatyana-vakalova.jpg",
      experience: 15,
      education: JSON.stringify([
        "Карлов университет, Прага",
        "Сертификация в эндодонтии",
        "Европейская ассоциация стоматологов",
      ]),
      bio: "Главный врач, стоматолог-терапевт",
      workingDays: JSON.stringify(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
      workingHours: "09:00-18:00",
      licenses: JSON.stringify([]),
      // Mapped services slugs
      serviceSlugs: ["lechenie-kariesa", "detskaya-stomatologiya", "parodontologiya", "professionalnaya-chistka", "otbelivanie"],
    },
    {
      firstName: "Елизавета",
      lastName: "Вакалова",
      slug: "elizaveta-vakalova",
      specialization: "Хирург",
      email: "elizaveta@vakalova.cz",
      phone: "+420123456788",
      photo: "/images/doctors/elizaveta-vakalova.jpg",
      experience: 8,
      education: JSON.stringify([
        "Масариков университет, Брно",
        "Сертификация Nobel Biocare",
        "Международное общество имплантологов",
      ]),
      bio: "Стоматолог-хирург, имплантолог",
      workingDays: JSON.stringify(["Tuesday", "Thursday", "Friday"]),
      workingHours: "10:00-19:00",
      licenses: JSON.stringify([]),
      serviceSlugs: ["implantatsiya", "khirurgiya"],
    },
    {
      firstName: "Анна",
      lastName: "Черна",
      slug: "anna-cherna",
      specialization: "Ортопед",
      email: "anna@vakalova.cz",
      phone: "+420123456787",
      photo: "/images/doctors/anna-cherna.jpg",
      experience: 10,
      education: JSON.stringify([
        "Карлов университет, Прага",
        "Специализация в протезировании",
        "Курсы по керамическим винирам",
      ]),
      bio: "Стоматолог-ортопед",
      workingDays: JSON.stringify(["Monday", "Wednesday"]),
      workingHours: "09:00-17:00",
      licenses: JSON.stringify([]),
      serviceSlugs: ["protezirovanie"],
    },
  ]

  for (const d of doctorsData) {
    const { serviceSlugs, slug, ...doctorData } = d

    // Check if doctor exists to avoid unique constraint error on email if we change slug logic, but here email is unique.
    // We use email as unique identifier for upsert if slug is not on Doctor model (Wait, Doctor model doesn't have slug!)
    // Let me check schema again. Doctor model does NOT have slug. But it has email unique.

    const doctor = await prisma.doctor.upsert({
      where: { email: doctorData.email },
      update: {},
      create: doctorData,
    })
    console.log(`Created doctor with id: ${doctor.id}`)

    // Link services
    for (const serviceSlug of serviceSlugs) {
      const service = createdServices.find(s => s.slug === serviceSlug)
      if (service) {
        // Check if relation exists
        const existing = await prisma.doctorService.findUnique({
          where: {
            doctorId_serviceId: {
              doctorId: doctor.id,
              serviceId: service.id
            }
          }
        })

        if (!existing) {
          await prisma.doctorService.create({
            data: {
              doctorId: doctor.id,
              serviceId: service.id
            }
          })
          console.log(`Linked doctor ${doctor.lastName} to service ${service.name}`)
        }
      }
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
