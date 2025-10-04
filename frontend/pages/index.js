import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import { getProducts } from '@/lib/api';

export default function Home() {
  const { data, isLoading } = useSWR('/api/products', getProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const sortedProducts = useMemo(() => {
    if (!data?.products) return [];
    return [...data.products].sort((a, b) => b.rating - a.rating);
  }, [data]);

  return (
    <Layout>
      <div className="space-y-16">
        <Hero />
        <section id="catalogue" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-primary">Featured catalogue</h2>
              <p className="mt-2 text-sm text-slate-500">
                Explore a curated assortment powered by our Express + MongoDB backend.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 shadow-card">
              {sortedProducts.length} products
            </span>
          </div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-72 animate-pulse rounded-3xl bg-white" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} onCheckout={setSelectedProduct} />
              ))}
            </div>
          )}
        </section>
        <Stats />
      </div>
      {selectedProduct && (
        <CheckoutModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </Layout>
  );
}
