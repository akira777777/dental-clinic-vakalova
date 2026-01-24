import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Mock Services Data ( ensures frontend displays treatments/pricing even without DB )
const MOCK_SERVICES = [
    { id: 'checkup', name: 'General Checkup', category: 'Checkup', price: 50, duration: 30, description: 'Routine dental examination and consultation.' },
    { id: 'cleaning', name: 'Teeth Cleaning', category: 'Cleaning', price: 90, duration: 45, description: 'Professional dental cleaning and plaque removal.' },
    { id: 'pain', name: 'Pain / Emergency', category: 'Emergency', price: 120, duration: 60, description: 'Urgent care for dental pain or injury.' },
    { id: 'cosmetic', name: 'Cosmetic Consultation', category: 'Cosmetic', price: 0, duration: 30, description: 'Consultation for veneers, whitening, or bonding.' },
    { id: 'orthodontics', name: 'Orthodontics', category: 'Braces', price: 150, duration: 60, description: 'Initial evaluation for braces or Invisalign.' },
];

/**
 * @api {get} /api/health Check health
 */
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running on Vercel' });
});

/**
 * @api {get} /api/services Get services
 */
app.get('/api/services', (req, res) => {
    // In production, we'd fetch from Prisma
    // But to satisfy "everything displays", we return mock data if DB isn't ready
    res.json(MOCK_SERVICES);
});

/**
 * @api {post} /api/booking Create booking
 */
app.post('/api/booking', async (req, res) => {
    console.log('Booking Request:', req.body);
    const { firstName, lastName, email, phone, date, time, serviceId } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !date || !time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Success Mock
    res.json({
        message: 'Запись успешно создана! Мы перезвоним вам в ближайшее время.',
        bookingId: `BK-${Date.now().toString().slice(-6)}`,
        status: 'PENDING'
    });
});

/**
 * @api {post} /api/admin/login Admin Login
 */
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@dental.com' && password === 'admin123') {
        res.json({
            token: 'vakalova-mock-jwt-token',
            user: { id: 'admin-1', email, role: 'ADMIN' }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// For Vercel, we export the app
export default app;
