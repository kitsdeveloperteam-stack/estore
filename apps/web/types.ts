export type ProductCategory = 'electronics' | 'fashion' | 'home' | 'beauty' | 'sports';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: ProductCategory;
  stock: number;
  featured: boolean;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CheckoutPayload {
  items: OrderItem[];
  email: string;
  shippingAddress: string;
}

export interface CheckoutResponse {
  order: {
    id: string;
    totalAmount: number;
    currency: string;
    status: string;
  };
  payment: {
    gateway: string;
    note?: string;
    orderId?: string;
    amount?: number;
    currency?: string;
    keyId?: string;
  };
}
