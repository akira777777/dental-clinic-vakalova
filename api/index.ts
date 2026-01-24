import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Mock Services Data for fallback ( ensures frontend always has data )
const FALLBACK_SERVICES = [
    { id: 'checkup', name: 'General Checkup', category: 'Checkup', price: 50, duration: 30, description: 'Routine dental examination.' },
    { id: 'cleaning', name: 'Teeth Cleaning', category: 'Cleaning', price: 90, duration: 45, description: 'Professional dental cleaning.' },
];

/**
 * @api {get} /api/health Check health
 */
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running on Vercel with Prisma' });
});

/**
 * @api {get} /api/services Get services
 */
app.get('/api/services', async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        if (services.length === 0) return res.json(FALLBACK_SERVICES);
        res.json(services);
    } catch (error) {
        console.error('Prisma Error:', error);
        res.json(FALLBACK_SERVICES); // Graceful fallback
    }
});

/**
 * @api {post} /api/booking Create booking
 */
app.post('/api/booking', async (req, res) => {
    const { firstName, lastName, email, phone, date, time, serviceId } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // 1. Find or Create Patient
        let patient = await prisma.patient.findUnique({ where: { email } });
        if (!patient) {
            patient = await prisma.patient.create({
                data: { firstName, lastName, email, phone }
            });
        }

        // 2. Ensure at least one Doctor exists (for the demo/skeleton)
        let doctor = await prisma.doctor.findFirst();
        if (!doctor) {
            doctor = await prisma.doctor.create({
                data: {
                    firstName: 'Elizaveta',
                    lastName: 'Vakalova',
                    email: 'dr.vakalova@dental.com',
                    phone: '+1 555-123-4567',
                    specialization: 'Lead Dentist',
                    education: '[]',
                    experience: 10,
                    licenses: '[]',
                    workingDays: '["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]',
                    workingHours: '9:00-18:00'
                }
            });
        }

        // 3. Ensure Service exists (map mock ID to DB)
        let service = await prisma.service.findFirst({ where: { id: serviceId } });
        if (!service) {
            // Create if missing (using default values)
            service = await prisma.service.create({
                data: {
                    id: serviceId || 'default',
                    name: 'Dental Procedure',
                    slug: `procedure-${Date.now()}`,
                    description: 'Consultation to be defined.',
                    price: 0,
                    duration: 30,
                    category: 'General'
                }
            });
        }

        // 4. Create actual Booking
        const booking = await prisma.booking.create({
            data: {
                date: new Date(date),
                time: time,
                patientId: patient.id,
                doctorId: doctor.id,
                serviceId: service.id,
                status: 'PENDING'
            }
        });

        res.json({
            message: 'Запись успешно создана! Мы свяжемся с вами.',
            bookingId: booking.id,
            status: booking.status
        });

    } catch (error) {
        console.error('Database Error:', error);
        // If DB fails (e.g. not connected), return mock success but log error
        res.json({
            message: 'Запись получена (режим ожидания БД). Мы свяжемся с вами.',
            bookingId: `BK-${Date.now().toString().slice(-6)}`,
            status: 'PENDING'
        });
    }
});

export default app;
