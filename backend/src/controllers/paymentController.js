import Razorpay from 'razorpay';

function createRazorpayInstance() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET');
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

export async function createOrder(req, res) {
  const { amount, productId } = req.body;

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }

  try {
    const instance = createRazorpayInstance();
    const order = await instance.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `ESTORE-${productId || Date.now()}`,
      notes: {
        productId: productId || 'unknown'
      }
    });

    res.json(order);
  } catch (error) {
    console.error('Razorpay order creation failed', error);
    res.status(500).json({
      message: 'Unable to create Razorpay order',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
