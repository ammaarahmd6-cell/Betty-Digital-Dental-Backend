import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import { upload } from '../utils/uploadHelper.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, requireAdmin, upload.single('image'), createProduct);
router.put('/:id', protect, requireAdmin, upload.single('image'), updateProduct);
router.delete('/:id', protect, requireAdmin, deleteProduct);

export default router;
