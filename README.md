# Estore – MERN commerce starter

This repository contains a full-stack ecommerce starter built with a **Next.js** storefront and an **Express + MongoDB** API layer. It demonstrates Razorpay payment integration, an admin analytics view, and a responsive, modern UI powered by Tailwind CSS.

## Features

- ⚡️ **Next.js 13** front-end with SWR data fetching, immersive hero section, product catalogue, product detail pages, and modals.
- 🛠️ **Express.js REST API** exposing product, admin and payment routes.
- 🗄️ **MongoDB + Mongoose** models with automatic demo seeding for rapid local development.
- 💳 **Razorpay** order creation endpoint wired to the storefront checkout modal.
- 🧑‍💼 **Admin dashboard** featuring KPIs and recent order summaries ready to connect to real data.
- 🎨 **Responsive Tailwind UI** optimised for both desktop and mobile shoppers.

## Getting started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or hosted). The server defaults to `mongodb://127.0.0.1:27017/estore`.
- Razorpay account credentials for order creation.

### Backend API

```bash
cd backend
npm install
cp .env.example .env # create env file and fill values
npm run dev
```

Environment variables (`.env`):

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/estore
MONGO_DB_NAME=estore
CORS_ORIGIN=http://localhost:3000
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

The server seeds demo products on the first boot. Visit `http://localhost:5000/api/products` to confirm.

### Frontend storefront

```bash
cd frontend
npm install
cp .env.local.example .env.local # add API + Razorpay public key
npm run dev
```

Frontend environment variables (`.env.local`):

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
```

Open `http://localhost:3000` to explore the storefront, purchase flow, and admin dashboard.

## Project structure

```
.
├── backend             # Express API + MongoDB models
│   ├── src/config      # Database connection
│   ├── src/controllers # Route handlers
│   ├── src/models      # Mongoose models
│   ├── src/routes      # Express routers
│   └── src/utils       # Helpers and seed data
└── frontend            # Next.js storefront with Tailwind CSS
    ├── components
    ├── lib
    ├── pages
    └── styles
```

## Next steps

- Secure admin routes with authentication middleware (JWT or NextAuth).
- Replace mocked analytics with aggregation data from MongoDB.
- Extend checkout handler to verify payment signatures and persist orders.
- Containerise services using Docker Compose for one-command local bootstrapping.

Enjoy building with Estore!
