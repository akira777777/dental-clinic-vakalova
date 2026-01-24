// Basic Express App Skeleton
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bookingRouter from './routes/booking';
import servicesRouter from './routes/services';
import adminRouter from './routes/admin';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/booking', bookingRouter);
app.use('/api/services', servicesRouter);
app.use('/api/admin', adminRouter);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
 
