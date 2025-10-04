import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '@/components/Layout';
import CheckoutModal from '@/components/CheckoutModal';
import { getProductById } from '@/lib/api';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(() => (id ? `/api/products/${id}` : null), () => getProductById(id));
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (isLoading) {
    return (
      <Layout title="Loading product...">
        <div className="h-80 animate-pulse rounded-3xl bg-white" />
      </Layout>
    );
  }

  if (!data?.product) {
    return (
      <Layout title="Product not found">
        <div className="rounded-3xl bg-white p-16 text-center shadow-card">
          <h2 className="text-2xl font-semibold text-primary">Product not found</h2>
          <p className="mt-3 text-sm text-slate-500">The product you are looking for may have been moved or removed.</p>
        </div>
      </Layout>
    );
  }

  const { product } = data;

  return (
    <Layout title={`${product.name} | Estore`}>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-card">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{product.category}</p>
            <h1 className="mt-3 text-4xl font-semibold text-primary">{product.name}</h1>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">{product.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow-card">
              <p className="text-xs uppercase text-slate-400">Price</p>
              <p className="mt-2 text-2xl font-semibold text-accent">₹{product.price}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-card">
              <p className="text-xs uppercase text-slate-400">Rating</p>
              <p className="mt-2 text-2xl font-semibold text-primary">{product.rating}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-card">
              <p className="text-xs uppercase text-slate-400">Stock</p>
              <p className="mt-2 text-2xl font-semibold text-primary">{product.stock}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedProduct(product)}
            className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Buy with Razorpay
          </button>
        </div>
      </div>
      {selectedProduct && (
        <CheckoutModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </Layout>
  );
}
