import express from 'express';
import { createInquiry, deleteInquiry, getInquiries, updateInquiryStatus } from '../controllers/inquiryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', protect, requireAdmin, getInquiries);
router.put('/:id/status', protect, requireAdmin, updateInquiryStatus);
router.delete('/:id', protect, requireAdmin, deleteInquiry);

export default router;
