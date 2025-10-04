import { FormEvent, useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { checkout, useProducts } from '../lib/api';
import { CheckoutResponse } from '../types';

export default function CheckoutPage() {
  const { data: products } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState<CheckoutResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedProduct = useMemo(() => products?.find((product) => product.id === selectedProductId), [
    products,
    selectedProductId
  ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProduct) {
      alert('Select a product to continue.');
      return;
    }
    setLoading(true);
    setResponse(null);
    try {
      const payload = {
        items: [
          {
            productId: selectedProduct.id,
            quantity
          }
        ],
        email,
        shippingAddress: address
      };
      const data = await checkout(payload);
      setResponse(data);
    } catch (error) {
      console.error(error);
      alert('Checkout failed. Inspect the console for more information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="grid gap-10 py-10 md:grid-cols-[1.1fr_1fr]">
        <form onSubmit={handleSubmit} className="card space-y-5">
          <div>
            <h1 className="text-3xl font-semibold text-white">Express Checkout</h1>
            <p className="text-sm text-slate-400">
              Choose a product and simulate a Razorpay order creation. Provide live keys on the API to initiate a
              real payment flow.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium text-slate-200">
              Product
            </label>
            <select
              id="product"
              value={selectedProductId}
              onChange={(event) => setSelectedProductId(event.target.value)}
              className="w-full rounded-2xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-sm text-white focus:border-brand-primary focus:outline-none"
              required
            >
              <option value="" disabled>
                Select a product
              </option>
              {products?.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium text-slate-200">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="w-full rounded-2xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-sm text-white focus:border-brand-primary focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Total</label>
              <p className="rounded-2xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-sm font-semibold text-brand-primary">
                {selectedProduct
                  ? ((selectedProduct.price * quantity) / 100).toLocaleString('en-IN', {
                      style: 'currency',
                      currency: selectedProduct.currency
                    })
                  : '—'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-200">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-sm text-white focus:border-brand-primary focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-slate-200">
              Shipping address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="h-32 w-full rounded-2xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-sm text-white focus:border-brand-primary focus:outline-none"
              required
            />
          </div>

          <button className="btn-primary w-full" type="submit" disabled={loading}>
            {loading ? 'Processing…' : 'Create Razorpay order'}
          </button>
        </form>

        <aside className="card space-y-4">
          <h2 className="text-xl font-semibold text-white">Integration status</h2>
          <p className="text-sm text-slate-400">
            {response
              ? response.payment.gateway === 'mock'
                ? response.payment.note
                : 'Razorpay order created. Use the details below to initiate the payment widget in your client.'
              : 'Complete the form to generate a mock Razorpay order. Configure API keys to enable live payments.'}
          </p>

          {response && (
            <div className="space-y-3 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 text-sm text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Order ID</p>
                <p className="font-mono text-white">{response.order.id}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Amount</p>
                <p className="font-semibold text-brand-primary">
                  {(response.order.totalAmount / 100).toLocaleString('en-IN', {
                    style: 'currency',
                    currency: response.order.currency
                  })}
                </p>
              </div>
              {response.payment.gateway === 'razorpay' && (
                <div className="space-y-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Razorpay order</p>
                    <p className="font-mono text-white">{response.payment.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Key ID</p>
                    <p className="font-mono text-white">{response.payment.keyId}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      </section>
    </Layout>
  );
}
