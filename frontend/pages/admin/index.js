import useSWR from 'swr';
import Layout from '@/components/Layout';
import { getDashboardStats } from '@/lib/api';

export default function AdminDashboard() {
  const { data, isLoading, error } = useSWR('/api/admin/dashboard', getDashboardStats);

  return (
    <Layout title="Admin dashboard | Estore">
      <div className="space-y-10">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Admin</p>
          <h1 className="text-4xl font-semibold text-primary">Commerce control centre</h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Monitor KPIs, orders, and catalogue performance. Plug into the Express REST API or extend with your
            preferred headless CMS.
          </p>
        </header>

        {isLoading && <div className="h-40 animate-pulse rounded-3xl bg-white" />}
        {error && (
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <p className="text-sm font-semibold text-red-500">Unable to load dashboard</p>
            <p className="mt-2 text-sm text-slate-500">{error.message}</p>
          </div>
        )}

        {data && (
          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl bg-white p-8 shadow-card">
              <h2 className="text-xl font-semibold text-primary">Revenue snapshots</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase text-slate-400">MTD revenue</p>
                  <p className="mt-2 text-2xl font-semibold text-primary">₹{data.metrics.mtdRevenue}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase text-slate-400">Conversion rate</p>
                  <p className="mt-2 text-2xl font-semibold text-primary">{data.metrics.conversionRate}%</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase text-slate-400">Orders pending</p>
                  <p className="mt-2 text-2xl font-semibold text-primary">{data.metrics.ordersPending}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase text-slate-400">Inventory alerts</p>
                  <p className="mt-2 text-2xl font-semibold text-primary">{data.metrics.inventoryAlerts}</p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl bg-white p-8 shadow-card">
              <h2 className="text-xl font-semibold text-primary">Recent orders</h2>
              <div className="mt-6 space-y-4">
                {data.orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">{order.customer}</p>
                      <p className="text-xs text-slate-400">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-accent">₹{order.amount}</p>
                      <p className="text-xs text-slate-400">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        )}
      </div>
    </Layout>
  );
}
