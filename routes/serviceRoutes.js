import express from 'express';
import { createService, deleteService, getServices, updateService } from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import { upload } from '../utils/uploadHelper.js';

const router = express.Router();

router.get('/', getServices);
router.post('/', protect, requireAdmin, upload.single('image'), createService);
router.put('/:id', protect, requireAdmin, upload.single('image'), updateService);
router.delete('/:id', protect, requireAdmin, deleteService);

export default router;
