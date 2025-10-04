import { useEffect } from 'react';

export default function CheckoutModal({ product, onClose }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCheckout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: product.price,
        productId: product._id
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      alert('Unable to initiate payment. Please try again.');
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: 'Estore',
      description: product.name,
      order_id: data.id,
      handler: () => {
        alert('Payment simulated! Integrate Razorpay checkout to go live.');
        onClose();
      },
      prefill: {
        name: 'Estore Customer',
        email: 'customer@example.com'
      },
      theme: {
        color: '#4f46e5'
      }
    };

    if (typeof window !== 'undefined') {
      const Razorpay = window.Razorpay;
      if (Razorpay) {
        const rzp = new Razorpay(options);
        rzp.open();
      } else {
        alert('Razorpay script not loaded. Include the checkout.js script in _document or via Script component.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-primary">Checkout</h3>
            <p className="mt-1 text-sm text-slate-500">
              Complete your purchase securely via Razorpay.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close checkout" className="text-slate-400 hover:text-accent">
            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Selected product</p>
            <p className="text-lg font-semibold text-primary">{product.name}</p>
            <p className="text-sm text-slate-500">₹{product.price}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:bg-accent/90"
          >
            Proceed to Razorpay
          </button>
        </div>
      </div>
    </div>
  );
}
