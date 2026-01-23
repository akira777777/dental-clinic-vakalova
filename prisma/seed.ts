
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import path from "path";

// Setup adapter
const dbPath = path.join(process.cwd(), "prisma", "dev.db");
// Note: PrismaBetterSqlite3 constructor signature might depend on version.
// src/lib/db.ts uses { url: ... }, but better-sqlite3 usually needs a Database instance or path.
// Let's rely on what works in src/lib/db.ts or standard usage.
// Actually, let's just use datasourceUrl with standard provider if possible,
// but since we use adapter in app, better stick to it or just point to file.
// Prisma 7 with adapter requires 'adapter' property.

// However, for seeding script, we can just use the standard connection if we don't need the adapter features.
// But the schema is generated for the adapter? (generator client { ... }) doesn't specify adapter.
// The client instantiation does.

// Let's try to mimic src/lib/db.ts
const adapter = new PrismaBetterSqlite3({ url: "file:" + dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // Clean up existing data
  try {
      await prisma.booking.deleteMany();
      await prisma.doctorService.deleteMany();
      await prisma.service.deleteMany();
      await prisma.doctor.deleteMany();
      await prisma.patient.deleteMany();
  } catch (e) {
      console.log("Error clearing data, maybe tables don't exist yet?", e);
  }

  // Create Doctors
  const docTatyana = await prisma.doctor.create({
    data: {
      id: "doc-tatyana",
      firstName: "Татьяна",
      lastName: "Вакалова",
      email: "tatyana@example.com",
      phone: "+420 111 222 333",
      specialization: "Терапевт",
      experience: 15,
      education: JSON.stringify(["Medical University"]),
      workingDays: JSON.stringify(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
      workingHours: "09:00-18:00",
      licenses: JSON.stringify(["LIC-001"]),
      bio: "Главный врач клиники",
    },
  });

  const docElizaveta = await prisma.doctor.create({
    data: {
      id: "doc-elizaveta",
      firstName: "Елизавета",
      lastName: "Вакалова",
      email: "elizaveta@example.com",
      phone: "+420 444 555 666",
      specialization: "Хирург",
      experience: 5,
      education: JSON.stringify(["Medical University"]),
      workingDays: JSON.stringify(["Monday", "Wednesday", "Friday"]),
      workingHours: "10:00-16:00",
      licenses: JSON.stringify(["LIC-002"]),
      bio: "К ней на свой страх и риск",
    },
  });

  const docAnna = await prisma.doctor.create({
    data: {
      id: "doc-anna",
      firstName: "Анна",
      lastName: "Черна",
      email: "anna@example.com",
      phone: "+420 777 888 999",
      specialization: "Ортопед",
      experience: 10,
      education: JSON.stringify(["Medical University"]),
      workingDays: JSON.stringify(["Tuesday", "Thursday"]),
      workingHours: "09:00-17:00",
      licenses: JSON.stringify(["LIC-003"]),
      bio: "Специалист по протезированию",
    },
  });

  console.log("Doctors created.");

  // Create Services
  const srvTherapy = await prisma.service.create({
    data: {
      id: "srv-therapy",
      name: "Терапевтическая стоматология",
      slug: "therapy",
      description: "Лечение кариеса, пломбы",
      price: 1500,
      duration: 60,
      category: "therapy",
    },
  });

  const srvSurgery = await prisma.service.create({
    data: {
      id: "srv-surgery",
      name: "Хирургия и имплантология",
      slug: "surgery",
      description: "Удаление зубов, имплантация",
      price: 5000,
      duration: 90,
      category: "surgery",
    },
  });

  const srvOrtho = await prisma.service.create({
    data: {
      id: "srv-ortho",
      name: "Ортопедия",
      slug: "orthopedics",
      description: "Протезирование, коронки",
      price: 8000,
      duration: 90,
      category: "orthopedics",
    },
  });

  const srvKids = await prisma.service.create({
    data: {
      id: "srv-kids",
      name: "Детская стоматология",
      slug: "kids",
      description: "Лечение зубов у детей",
      price: 1200,
      duration: 45,
      category: "kids",
    },
  });

  console.log("Services created.");

  // Link Doctors to Services
  await prisma.doctorService.create({
    data: { doctorId: docTatyana.id, serviceId: srvTherapy.id },
  });
  await prisma.doctorService.create({
    data: { doctorId: docTatyana.id, serviceId: srvKids.id },
  });

  await prisma.doctorService.create({
    data: { doctorId: docElizaveta.id, serviceId: srvSurgery.id },
  });

  await prisma.doctorService.create({
    data: { doctorId: docAnna.id, serviceId: srvOrtho.id },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
