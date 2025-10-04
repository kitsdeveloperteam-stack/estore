const stats = [
  {
    label: 'Products curated',
    value: '320+',
    description: 'Sourced across lifestyle, home, electronics and wellness categories.'
  },
  {
    label: 'Avg. delivery time',
    value: '2.5 days',
    description: 'Pan-India fulfilment with streamlined warehousing and logistics partners.'
  },
  {
    label: 'Transactions processed',
    value: '95K+',
    description: 'Powered by PCI compliant Razorpay payment gateway integrations.'
  }
];

export default function Stats() {
  return (
    <section className="grid gap-6 sm:grid-cols-3" aria-label="Store metrics">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm font-medium uppercase tracking-wide text-accent/90">{stat.label}</p>
          <p className="mt-4 text-3xl font-semibold text-primary">{stat.value}</p>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">{stat.description}</p>
        </article>
      ))}
    </section>
  );
}
