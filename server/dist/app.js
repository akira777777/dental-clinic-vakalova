"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Basic Express App Skeleton
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes Placeholders
// TODO: Import routes here
// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});
// Services Endpoint
app.get('/api/services', async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        res.json(services);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});
// Admin Login Placeholder
app.post('/api/admin/login', (req, res) => {
    // TODO: Implement actual JWT auth
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'admin') {
        res.json({ token: 'mock-jwt-token', user: { email } });
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});
// Booking Endpoint
app.post('/api/booking', async (req, res) => {
    try {
        const { patientName, email, phone, serviceId, date, time } = req.body;
        // Simplistic handling - create patient if not exists
        // In production, validate input with Zod
        // Mock response for now as we might need to seed data first
        res.json({
            message: 'Booking received',
            bookingId: 'mock-id-' + Date.now(),
            status: 'PENDING'
        });
        // Uncomment when Database is migrated/seeded
        /*
        const booking = await prisma.booking.create({
            data: {
                 // ... map fields
            }
        });
        res.json(booking);
        */
    }
    catch (error) {
        res.status(500).json({ error: 'Booking failed' });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
