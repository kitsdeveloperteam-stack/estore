import { Product } from '../models/Product';

export const products: Product[] = [
  {
    id: 'p-aurora-headphones',
    name: 'Aurora Noise Cancelling Headphones',
    slug: 'aurora-noise-cancelling-headphones',
    description: 'Immersive audio with adaptive noise cancellation and 30-hour battery life.',
    price: 15999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1512314889357-e157c22f938d',
      'https://images.unsplash.com/photo-1580894906472-0ef3c08e1038'
    ],
    category: 'electronics',
    stock: 35,
    featured: true
  },
  {
    id: 'p-lumina-smartwatch',
    name: 'Lumina Smartwatch Pro',
    slug: 'lumina-smartwatch-pro',
    description: 'Premium smartwatch with AMOLED display, ECG tracking, and 7-day battery.',
    price: 12999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314'
    ],
    category: 'electronics',
    stock: 42,
    featured: true
  },
  {
    id: 'p-velvet-jacket',
    name: 'Velvetline Bomber Jacket',
    slug: 'velvetline-bomber-jacket',
    description: 'Soft-touch bomber jacket with insulated lining for all-day comfort.',
    price: 5499,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b'
    ],
    category: 'fashion',
    stock: 18,
    featured: false
  },
  {
    id: 'p-zen-lamp',
    name: 'Zen Ambient Floor Lamp',
    slug: 'zen-ambient-floor-lamp',
    description: 'Minimalist LED floor lamp with adjustable warmth and smart home integration.',
    price: 7999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36'
    ],
    category: 'home',
    stock: 27,
    featured: true
  },
  {
    id: 'p-glide-sneakers',
    name: 'GlideRunner Sneakers',
    slug: 'gliderunner-sneakers',
    description: 'Lightweight sneakers with responsive cushioning for everyday movement.',
    price: 3899,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b'
    ],
    category: 'sports',
    stock: 50,
    featured: false
  }
];
