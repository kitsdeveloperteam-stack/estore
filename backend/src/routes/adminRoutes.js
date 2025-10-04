import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { getDashboard } from '../controllers/adminController.js';

const router = Router();

router.get('/dashboard', asyncHandler(getDashboard));

export default router;
