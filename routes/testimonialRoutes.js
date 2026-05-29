import express from 'express';
import { createTestimonial, deleteTestimonial, getTestimonials, updateTestimonial } from '../controllers/testimonialController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, requireAdmin, createTestimonial);
router.put('/:id', protect, requireAdmin, updateTestimonial);
router.delete('/:id', protect, requireAdmin, deleteTestimonial);

export default router;
