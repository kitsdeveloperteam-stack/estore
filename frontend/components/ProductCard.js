import Image from 'next/image';

export default function ProductCard({ product, onCheckout }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card">
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-3">{product.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <p className="text-xs uppercase text-slate-400">Price</p>
            <p className="text-xl font-semibold text-accent">₹{product.price}</p>
          </div>
          <button
            onClick={() => onCheckout(product)}
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
