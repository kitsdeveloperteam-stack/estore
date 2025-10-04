import { Order } from '../models/Order';
import { nanoid } from '../utils/nanoid';

const orders = new Map<string, Order>();

export const orderService = {
  create(order: Omit<Order, 'id' | 'createdAt'>): Order {
    const newOrder: Order = {
      ...order,
      id: nanoid(),
      createdAt: new Date().toISOString()
    };
    orders.set(newOrder.id, newOrder);
    return newOrder;
  },
  findById(id: string): Order | undefined {
    return orders.get(id);
  },
  all(): Order[] {
    return Array.from(orders.values()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }
};
