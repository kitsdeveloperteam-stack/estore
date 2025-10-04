import Razorpay from 'razorpay';
import { Request, Response } from 'express';
import { config } from '../config';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';

const createRazorpayInstance = () => {
  if (!config.razorpayKeyId || !config.razorpayKeySecret) {
    return null;
  }
  return new Razorpay({
    key_id: config.razorpayKeyId,
    key_secret: config.razorpayKeySecret
  });
};

export const orderController = {
  async create(req: Request, res: Response) {
    const { items, email, shippingAddress } = req.body as {
      items: { productId: string; quantity: number }[];
      email: string;
      shippingAddress: string;
    };

    if (!items?.length) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    const detailedItems = items
      .map((item) => {
        const product = productService.findById(item.productId);
        if (!product) {
          return null;
        }
        return {
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
          currency: product.currency
        };
      })
      .filter(Boolean);

    if (detailedItems.length !== items.length) {
      res.status(400).json({ message: 'One or more products are invalid' });
      return;
    }

    const totalAmount = detailedItems.reduce((sum, item) => sum + item!.price * item!.quantity, 0);
    const currency = detailedItems[0]!.currency;

    const order = orderService.create({
      items: detailedItems.map((item) => ({
        productId: item!.productId,
        quantity: item!.quantity,
        price: item!.price
      })),
      totalAmount,
      currency,
      status: 'created',
      email,
      shippingAddress
    });

    const razorpay = createRazorpayInstance();

    if (!razorpay) {
      res.status(201).json({
        order,
        payment: {
          gateway: 'mock',
          note: 'Configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to enable live payments.'
        }
      });
      return;
    }

    try {
      const paymentOrder = await razorpay.orders.create({
        amount: totalAmount,
        currency,
        receipt: order.id,
        notes: {
          email,
          shippingAddress
        }
      });

      res.status(201).json({
        order,
        payment: {
          gateway: 'razorpay',
          orderId: paymentOrder.id,
          amount: paymentOrder.amount,
          currency: paymentOrder.currency,
          keyId: config.razorpayKeyId
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create Razorpay order', error });
    }
  },

  list(_req: Request, res: Response) {
    res.json(orderService.all());
  }
};
