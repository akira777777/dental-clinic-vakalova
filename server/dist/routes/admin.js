"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
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
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});
// PATCH /admin/appointments/:id (Drag and drop status update)
router.patch('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { status, date, time } = req.body; // status: PENDING, CONFIRMED...
    try {
        const updateData = {};
        if (status)
            updateData.status = status;
        if (date)
            updateData.date = new Date(date);
        if (time)
            updateData.time = time;
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: updateData
        });
        res.json(updatedBooking);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update booking' });
    }
});
exports.default = router;
