import express from 'express';
import { createGallery, deleteGallery, getGallery } from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import { upload } from '../utils/uploadHelper.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', protect, requireAdmin, upload.single('image'), createGallery);
router.delete('/:id', protect, requireAdmin, deleteGallery);

export default router;
