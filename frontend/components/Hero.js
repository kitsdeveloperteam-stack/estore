import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-slate-900 to-black text-white">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1600&q=80"
          alt="Lifestyle banner"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative px-6 py-24 sm:px-16 lg:px-24">
        <p className="text-sm uppercase tracking-[0.35em] text-accent font-medium">New arrivals</p>
        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl">
          Discover futuristic products carefully curated for a next generation shopping experience.
        </h1>
        <p className="mt-4 text-lg text-slate-200 max-w-2xl">
          Estore blends a blazing fast Next.js storefront with a secure Express + Mongo backend and Razorpay payments.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/#catalogue"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/40 transition hover:translate-y-0.5"
          >
            Explore catalogue
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-white"
          >
            Visit admin dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
