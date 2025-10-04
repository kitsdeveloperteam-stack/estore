import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-admin-token'];
  if (token !== config.adminPassword) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
};
