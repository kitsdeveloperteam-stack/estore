import Image from 'next/image';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { useProduct } from '../../lib/api';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const { data: product } = useProduct(id);

  if (!product) {
    return (
      <Layout>
        <p className="py-20 text-center text-slate-400">Loading product details…</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="grid gap-8 py-10 md:grid-cols-[1.1fr_1fr] md:items-start">
        <div className="relative aspect-square overflow-hidden rounded-[3rem] border border-slate-800/80 bg-slate-900/50">
          <Image
            src={`${product.images[0]}?auto=format&fit=crop&w=1000&q=80`}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary">
              {product.category}
            </span>
            <h1 className="text-3xl font-semibold text-white">{product.name}</h1>
            <p className="text-sm text-slate-400">{product.description}</p>
          </div>
          <div className="flex items-center gap-4 text-2xl font-semibold text-brand-primary">
            {(product.price / 100).toLocaleString('en-IN', { style: 'currency', currency: product.currency })}
            <span className="text-sm font-medium text-slate-400">Incl. GST</span>
          </div>
          <div className="space-y-3 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6">
            <h2 className="text-lg font-semibold text-white">Why you’ll love it</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              <li>Premium materials handpicked for durability and comfort.</li>
              <li>Optimized for mobile and desktop experiences using Next.js.</li>
              <li>Seamless Razorpay checkout and streamlined order tracking.</li>
            </ul>
            <button className="btn-primary" type="button">
              Add to cart
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
