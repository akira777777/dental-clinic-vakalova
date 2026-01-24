"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// Validation schema
const bookingSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2),
    lastName: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(10),
    serviceId: zod_1.z.string().optional(),
    date: zod_1.z.string().datetime(), // ISO string
    time: zod_1.z.string(), // "HH:mm"
    notes: zod_1.z.string().optional(),
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
        // Create booking
        // For now we need a doctorId and serviceId. If not provided, we might need a default or error.
        // For this skeleton, we will use placeholders if not provided, or fail if strictly required.
        // We'll assume frontend sends a valid serviceId. If mock, we might need to seed a service.
        // MOCK: Sending success without DB write if no serviceId provided (to avoid crash on empty DB)
        if (!data.serviceId) {
            return res.json({
                message: 'Booking request validated (Mock)',
                bookingId: 'mock-' + Date.now(),
                status: 'PENDING'
            });
        }
        // If we have IDs:
        /*
        const booking = await prisma.booking.create({
          data: {
            date: bookingDate,
            time: data.time,
            notes: data.notes,
            patientId: patient.id,
            doctorId: "placeholder-doctor-id", // Needs to be fetched/selected
            serviceId: data.serviceId
          }
        });
        res.json(booking);
        */
        res.json({ message: 'Booking processed', status: 'PENDING' });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
