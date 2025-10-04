import { useState } from 'react';
import { Layout } from '../components/Layout';
import { listOrders, useProducts } from '../lib/api';

interface Order {
  id: string;
  email: string;
  totalAmount: number;
  currency: string;
  status: string;
  createdAt: string;
  shippingAddress: string;
}

export default function AdminPage() {
  const { data: products } = useProducts();
  const [adminToken, setAdminToken] = useState('');
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchOrders = async () => {
    setLoading(true);
    try {
      const data = await listOrders(adminToken);
      setOrders(data as Order[]);
    } catch (error) {
      console.error(error);
      setOrders(null);
      alert('Failed to fetch orders. Ensure the admin token matches the API configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-10">
        <div className="flex flex-col gap-4 pb-8">
          <div>
            <h1 className="text-3xl font-semibold text-white">Admin Control Center</h1>
            <p className="text-sm text-slate-400">
              Manage inventory, review orders, and connect Razorpay credentials. Authenticate using the
              <code className="mx-1 rounded bg-slate-800 px-2 py-1">x-admin-token</code> header.
            </p>
          </div>
          <div className="card flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <label htmlFor="adminToken" className="text-sm font-medium text-slate-200">
                Admin token
              </label>
              <input
                id="adminToken"
                type="password"
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-sm text-white focus:border-brand-primary focus:outline-none"
                placeholder="Enter ADMIN_PASSWORD configured on the API server"
              />
            </div>
            <button className="btn-primary" type="button" onClick={handleFetchOrders} disabled={loading}>
              {loading ? 'Loading orders…' : 'Load orders'}
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="card space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Inventory overview</h2>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{products?.length ?? 0} products</p>
            </div>
            <div className="space-y-4">
              {products?.map((product) => (
                <div key={product.id} className="flex items-start justify-between gap-4 rounded-2xl bg-slate-900/40 p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{product.name}</h3>
                    <p className="text-xs text-slate-400">{product.category}</p>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <p>Stock: {product.stock}</p>
                    <p>
                      Price:{' '}
                      {(product.price / 100).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: product.currency
                      })}
                    </p>
                  </div>
                </div>
              )) || <p className="text-slate-400">Loading inventory…</p>}
            </div>
          </div>

          <div className="card space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Orders</h2>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {orders ? `${orders.length} recent orders` : 'Authenticate to view orders'}
              </p>
            </div>
            <div className="space-y-4">
              {orders?.map((order) => (
                <div key={order.id} className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 text-sm text-slate-300">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                    <span>{order.status}</span>
                  </div>
                  <p className="mt-2 font-semibold text-white">{order.email}</p>
                  <p className="text-xs text-slate-400">{order.shippingAddress}</p>
                  <p className="mt-2 text-sm font-semibold text-brand-primary">
                    {(order.totalAmount / 100).toLocaleString('en-IN', {
                      style: 'currency',
                      currency: order.currency
                    })}
                  </p>
                </div>
              )) || <p className="text-slate-400">Orders will appear once authenticated.</p>}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
