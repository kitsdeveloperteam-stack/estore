import { Router } from 'express';
import { productController } from '../controllers/productController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

router.get('/', productController.list);
router.get('/featured', productController.featured);
router.get('/:id', productController.detail);
router.post('/', adminAuth, productController.create);
router.put('/:id', adminAuth, productController.update);
router.delete('/:id', adminAuth, productController.remove);

export default router;
