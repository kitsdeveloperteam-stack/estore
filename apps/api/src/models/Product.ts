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
