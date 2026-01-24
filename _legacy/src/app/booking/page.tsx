import { db } from "@/lib/db";
import BookingForm from "./booking-form";

export const dynamic = "force-dynamic";

export default async function BookingPage() {
  const services = await db.service.findMany({
    orderBy: { name: "asc" },
  });

  const doctorsData = await db.doctor.findMany({
    include: {
      services: {
        include: {
          service: true
        }
      },
    },
    orderBy: { lastName: "asc" },
  });

  // Transform to match BookingFormProps
  const doctors = doctorsData.map(doc => ({
    id: doc.id,
    firstName: doc.firstName,
    lastName: doc.lastName,
    services: doc.services.map(ds => ds.service)
  }));

  return (
    <BookingForm services={services} doctors={doctors} />
  );
}
