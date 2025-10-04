# Aurora E-Store

A full-stack ecommerce starter built with a MERN-inspired stack featuring a Next.js storefront and Express API with Razorpay checkout scaffolding. The project ships as a monorepo with npm workspaces, delivering a responsive UI, mocked inventory, and admin portal to manage orders.

## Tech stack

- **Frontend:** Next.js 13, React 18, SWR, Tailwind CSS, Headless UI utilities
- **Backend:** Express.js, TypeScript, Helmet, CORS, Razorpay SDK (mock fallback), in-memory persistence (Mongo-ready)
- **Payments:** Razorpay integration scaffold with environment-based configuration

## Getting started

1. Install dependencies using npm workspaces:

   ```bash
   npm install
   ```

2. Run the Express API (defaults to port `5000`):

   ```bash
   npm run dev:api
   ```

3. In a separate terminal, run the Next.js storefront (defaults to port `3000`):

   ```bash
   npm run dev:web
   ```

4. Visit `http://localhost:3000` to explore the storefront. The frontend expects the API at `http://localhost:5000`; override by setting `NEXT_PUBLIC_API_URL`.

## Environment variables

Create an `.env` file inside `apps/api` to configure Razorpay and admin credentials:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/aurora
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
ADMIN_PASSWORD=admin123
```

- Without Razorpay keys the API returns a mock payment response, allowing you to test the checkout journey end-to-end.
- Configure `ADMIN_PASSWORD` to secure product/order management routes. Use the value via the `x-admin-token` header in the admin portal.

## Features

- Responsive, gradient-rich storefront with featured products, catalog, detail, checkout, and admin views.
- Express API exposes `/api/products` and `/api/orders` endpoints with admin authentication middleware.
- Razorpay order creation is automatically invoked when keys are supplied; otherwise a helpful mock payload is returned.
- In-memory stores keep the demo self-contained, while TypeScript interfaces keep the project Mongo-ready.

## Project structure

```
apps/
  api/      # Express + TypeScript server (orders, products, Razorpay)
  web/      # Next.js storefront with Tailwind UI and Razorpay checkout form
```

Happy building!
