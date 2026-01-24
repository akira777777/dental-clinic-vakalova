import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = express();

// Initialize Prisma Client with production optimizations
// For Vercel serverless functions, use connection pooling
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Optimize for serverless: reduce connection pool size
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.ALLOWED_ORIGINS?.split(',') || '*' 
        : '*',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
});

// Validation schema
const bookingSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    serviceId: z.string().optional(),
    date: z.string(), // ISO datetime string from frontend
    time: z.string(), // "HH:mm"
    notes: z.string().optional(),
});

// Mock Services Data for fallback ( ensures frontend always has data )
const FALLBACK_SERVICES = [
    { id: 'checkup', name: 'General Checkup', category: 'Checkup', price: 50, duration: 30, description: 'Routine dental examination.', slug: 'general-checkup' },
    { id: 'cleaning', name: 'Teeth Cleaning', category: 'Cleaning', price: 90, duration: 45, description: 'Professional dental cleaning.', slug: 'teeth-cleaning' },
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
        const services = await prisma.service.findMany({
            orderBy: { category: 'asc' }
        });
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
    try {
        const data = bookingSchema.parse(req.body);

        // Check if time is in the past
        const bookingDate = new Date(data.date);
        if (bookingDate < new Date()) {
            return res.status(400).json({ error: 'Cannot book in the past' });
        }

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
        console.error('Database Error:', error);
        // Don't expose internal errors in production
        const errorMessage = process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : error instanceof Error ? error.message : 'Internal server error';
        res.status(500).json({ error: errorMessage });
    }
});

// Graceful shutdown for Prisma in serverless
if (typeof process !== 'undefined') {
    process.on('beforeExit', async () => {
        await prisma.$disconnect();
    });
}

// Vercel serverless function handler
// Vercel automatically handles Express apps when exported as default
export default app;

// Also export as named export for compatibility
export { app };
