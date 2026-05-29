import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import { ensureDefaultAdmin } from './controllers/authController.js';
import { fail } from './utils/responseHelper.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isVercel = Boolean(process.env.VERCEL);
const defaultClientOrigins = [
  'http://localhost:5173',
  'https://bettydigitaldental.vercel.app'
];
const allowedOrigins = Array.from(new Set([
  ...defaultClientOrigins,
  ...(process.env.CLIENT_URL || '').split(',').map((origin) => origin.trim()).filter(Boolean)
]));
const adminReady = ensureDefaultAdmin().catch((error) => {
  console.error('Default admin setup failed:', error);
});

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  await adminReady;
  next();
});

app.get('/', (req, res) => res.json({ status: 'ok', service: 'Betty Digital Dental Solutions API' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/patients', patientRoutes);

app.use((req, res) => fail(res, 'Route not found', 404));
app.use((error, req, res, next) => {
  console.error(error);
  return fail(res, error.message || 'Server error', 500);
});

if (!isVercel) {
  app.listen(PORT, async () => {
    await adminReady;
    console.log(`Betty Digital Dental Solutions API running on http://localhost:${PORT}`);
  });
}

export default app;
