import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /admin/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // TODO: Implement real hash comparison (bcrypt) and JWT
    if (email === 'admin@dental.com' && password === 'admin123') {
        res.json({
            token: 'mock-admin-jwt-token',
            user: {
                id: 'admin-1',
                email,
                role: 'ADMIN'
            }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// PATCH /admin/appointments/:id (Drag and drop status update)
router.patch('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { status, date, time } = req.body; // status: PENDING, CONFIRMED...

    try {
        const updateData: any = {};
        if (status) updateData.status = status;
        if (date) updateData.date = new Date(date);
        if (time) updateData.time = time;

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: updateData
        });

        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking' });
    }
});

export default router;
