export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  paymentId?: string;
  email: string;
  shippingAddress: string;
  createdAt: string;
}
