import { Product } from '../models/Product';
import { products as staticProducts } from '../data/products';

const productMap = new Map<string, Product>(staticProducts.map((product) => [product.id, product]));

export const productService = {
  all(): Product[] {
    return Array.from(productMap.values());
  },

  featured(): Product[] {
    return this.all().filter((product) => product.featured);
  },

  findById(id: string): Product | undefined {
    return productMap.get(id);
  },

  create(product: Product): Product {
    productMap.set(product.id, product);
    return product;
  },

  update(id: string, data: Partial<Product>): Product | undefined {
    const current = productMap.get(id);
    if (!current) {
      return undefined;
    }
    const updated = { ...current, ...data };
    productMap.set(id, updated);
    return updated;
  },

  remove(id: string): boolean {
    return productMap.delete(id);
  }
};
