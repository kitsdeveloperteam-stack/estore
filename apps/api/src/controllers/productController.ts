import { Request, Response } from 'express';
import { productService } from '../services/productService';

export const productController = {
  list(_req: Request, res: Response) {
    res.json(productService.all());
  },
  featured(_req: Request, res: Response) {
    res.json(productService.featured());
  },
  detail(req: Request, res: Response) {
    const product = productService.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  },
  create(req: Request, res: Response) {
    const product = productService.create(req.body);
    res.status(201).json(product);
  },
  update(req: Request, res: Response) {
    const updated = productService.update(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(updated);
  },
  remove(req: Request, res: Response) {
    const success = productService.remove(req.params.id);
    if (!success) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(204).send();
  }
};
