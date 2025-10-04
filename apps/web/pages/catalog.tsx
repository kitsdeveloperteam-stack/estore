import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../lib/api';

export default function CatalogPage() {
  const { data: products } = useProducts();

  return (
    <Layout>
      <section className="py-10">
        <div className="flex flex-col gap-2 pb-6">
          <h1 className="text-3xl font-semibold text-white">Catalog</h1>
          <p className="text-sm text-slate-400">
            Browse the full Aurora inventory. Each product is available to manage through the admin portal.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) || <p className="text-slate-400">Loading catalog…</p>}
        </div>
      </section>
    </Layout>
  );
}
