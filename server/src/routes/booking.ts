import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

// Validation schema
const bookingSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    serviceId: z.string().optional(),
    date: z.string().datetime(), // ISO string
    time: z.string(), // "HH:mm"
    notes: z.string().optional(),
});

// POST /booking
router.post('/', async (req, res) => {
    try {
        const data = bookingSchema.parse(req.body);

        // Check if time is in the past
        const bookingDate = new Date(data.date);
        if (bookingDate < new Date()) {
            return res.status(400).json({ error: 'Cannot book in the past' });
        }

        // Check availability (mock logic for now - check if doctor is booked)
        // In real app, we'd query existing bookings for overlap

        // Find or create patient
        let patient = await prisma.patient.findUnique({
            where: { email: data.email }
        });

        if (!patient) {
            patient = await prisma.patient.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone
                }
            });
        }

        // Ensure at least one Doctor exists
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

        // Ensure Service exists (create if missing)
        let service = await prisma.service.findFirst({ where: { id: data.serviceId } });
        if (!service && data.serviceId) {
            // Map common service IDs to proper service data
            const serviceMap: Record<string, { name: string; slug: string; description: string; price: number; duration: number; category: string }> = {
                'checkup': { name: 'General Checkup', slug: 'general-checkup', description: 'Routine dental examination and consultation.', price: 50, duration: 30, category: 'Checkup' },
                'cleaning': { name: 'Teeth Cleaning', slug: 'teeth-cleaning', description: 'Professional dental cleaning and polishing.', price: 90, duration: 45, category: 'Cleaning' },
                'pain': { name: 'Pain / Emergency', slug: 'pain-emergency', description: 'Emergency dental consultation for pain relief.', price: 100, duration: 30, category: 'Emergency' },
                'cosmetic': { name: 'Cosmetic Consultation', slug: 'cosmetic-consultation', description: 'Consultation for cosmetic dental procedures.', price: 75, duration: 45, category: 'Cosmetic' },
                'orthodontics': { name: 'Orthodontics', slug: 'orthodontics', description: 'Orthodontic consultation and treatment planning.', price: 120, duration: 60, category: 'Orthodontics' }
            };

            const serviceData = serviceMap[data.serviceId] || {
                name: 'Dental Consultation',
                slug: `consultation-${Date.now()}`,
                description: 'General dental consultation.',
                price: 50,
                duration: 30,
                category: 'General'
            };

            service = await prisma.service.create({
                data: {
                    id: data.serviceId,
                    ...serviceData
                }
            });
        } else if (!data.serviceId) {
            // If no serviceId provided, create a default service
            service = await prisma.service.findFirst() || await prisma.service.create({
                data: {
                    name: 'General Consultation',
                    slug: 'general-consultation',
                    description: 'General dental consultation.',
                    price: 50,
                    duration: 30,
                    category: 'General'
                }
            });
        }

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                date: bookingDate,
                time: data.time,
                notes: data.notes,
                patientId: patient.id,
                doctorId: doctor.id,
                serviceId: service.id,
                status: 'PENDING'
            }
        });

        res.json({
            message: 'Booking created successfully',
            bookingId: booking.id,
            status: booking.status
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
