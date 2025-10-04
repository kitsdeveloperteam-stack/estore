import { Router } from 'express';
import { orderController } from '../controllers/orderController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

router.post('/', orderController.create);
router.get('/', adminAuth, orderController.list);

export default router;
