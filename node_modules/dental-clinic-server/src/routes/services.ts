import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /services
router.get('/', async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: { category: 'asc' }
        });
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

export default router;
