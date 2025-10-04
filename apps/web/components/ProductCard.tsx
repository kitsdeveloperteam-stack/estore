import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="card group flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={`${product.images[0]}?auto=format&fit=crop&w=600&q=80`}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-950">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-400">
          <span>{product.category}</span>
          <span className="font-semibold text-brand-primary">
            {(product.price / 100).toLocaleString('en-IN', { style: 'currency', currency: product.currency })}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm leading-relaxed text-slate-400">
          {product.description.length > 120
            ? `${product.description.slice(0, 117)}...`
            : product.description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-2">
        <Link href={`/product/${product.id}`} className="btn-secondary text-xs">
          View details
        </Link>
        <button className="btn-primary text-xs" type="button">
          <ShoppingBagIcon className="mr-2 h-4 w-4" /> Add to cart
        </button>
      </div>
    </div>
  );
};
