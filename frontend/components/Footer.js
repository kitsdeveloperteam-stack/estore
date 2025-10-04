export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Estore. All rights reserved.</p>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <a href="https://razorpay.com" target="_blank" rel="noreferrer" className="hover:text-accent">
            Razorpay Integration
          </a>
          <span>•</span>
          <a href="mailto:support@estore.com" className="hover:text-accent">
            support@estore.com
          </a>
        </div>
      </div>
    </footer>
  );
}
