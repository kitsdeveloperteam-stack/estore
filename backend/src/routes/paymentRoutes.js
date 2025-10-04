import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { createOrder } from '../controllers/paymentController.js';

const router = Router();

router.post('/create-order', asyncHandler(createOrder));

export default router;
