import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { useFeaturedProducts } from '../lib/api';

export default function HomePage() {
  const { data: featuredProducts } = useFeaturedProducts();

  return (
    <Layout>
      <section className="grid gap-10 py-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-slate-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary">
            Aurora Collection
          </span>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Discover statement pieces engineered for a modern lifestyle.
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            Aurora E-Store merges premium design with a seamless shopping experience. Browse curated drops,
            configure secure Razorpay payments, and manage inventory with the built-in admin console.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/catalog" className="btn-primary">
              Explore catalog
            </Link>
            <Link href="/admin" className="btn-secondary">
              Manage store
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-slate-800/80 bg-slate-900/60 shadow-[0_20px_60px_-30px_rgba(14,165,233,0.7)]">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
            alt="Aurora Collection"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 text-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">New Arrival</p>
            <p className="text-xl font-semibold">Velvetline Bomber Jacket</p>
            <p className="text-sm text-slate-400">Soft-touch suede exterior with insulated lining.</p>
          </div>
        </div>
      </section>

      <section id="featured" className="space-y-6 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Featured releases</h2>
            <p className="text-sm text-slate-400">
              Curated selection of top-selling gear from the Aurora collection.
            </p>
          </div>
          <Link href="/catalog" className="btn-secondary">
            View all products
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) || <p className="text-slate-400">Loading featured products…</p>}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-10 md:grid-cols-3">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Modern storefront</h3>
          <p className="text-sm text-slate-400">
            Built with Next.js 13, SWR data fetching, and Tailwind-powered gradients to deliver a lightning-fast
            browsing experience on any device.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Express & Mongo ready</h3>
          <p className="text-sm text-slate-400">
            The API ships with Express, ready to connect to MongoDB or any persistence layer, and secured admin
            endpoints to manage inventory and orders.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">Razorpay checkout</h3>
          <p className="text-sm text-slate-400">
            Integrates with Razorpay for India-ready payments. Provide live keys to enable instant order creation
            and capture flows.
          </p>
        </div>
      </section>
    </Layout>
  );
}
