export async function getDashboard(req, res) {
  res.json({
    metrics: {
      mtdRevenue: 875000,
      conversionRate: 3.9,
      ordersPending: 42,
      inventoryAlerts: 7
    },
    orders: [
      { id: 'ORD-1001', customer: 'Arjun Patel', product: 'Aurora Smart Lamp', amount: 12999, status: 'Shipped' },
      { id: 'ORD-1002', customer: 'Maya Dsouza', product: 'Nimbus Noise Cancelling Headphones', amount: 18999, status: 'Processing' },
      { id: 'ORD-1003', customer: 'Kabir Shah', product: 'Pulse Health Tracker', amount: 9999, status: 'Delivered' }
    ]
  });
}
