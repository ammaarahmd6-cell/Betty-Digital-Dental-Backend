import express from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import { upload } from '../utils/uploadHelper.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlog);
router.post('/', protect, requireAdmin, upload.single('image'), createBlog);
router.put('/:id', protect, requireAdmin, upload.single('image'), updateBlog);
router.delete('/:id', protect, requireAdmin, deleteBlog);

export default router;
