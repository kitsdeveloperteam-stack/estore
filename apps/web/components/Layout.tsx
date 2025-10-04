import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-primary text-xl font-bold">
            AE
          </span>
          Aurora E-Store
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
          <Link href="/#featured" className="hover:text-white">
            Featured
          </Link>
          <Link href="/catalog" className="hover:text-white">
            Catalog
          </Link>
          <Link href="/admin" className="btn-secondary">
            Admin Portal
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-6 pb-20">{children}</main>
      <footer className="border-t border-slate-800/60 bg-slate-950/60 py-10 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Aurora E-Store. Crafted with Next.js, Express, and Razorpay.
      </footer>
    </div>
  );
};
