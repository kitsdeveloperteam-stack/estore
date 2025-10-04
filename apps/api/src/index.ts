import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', exposedHeaders: ['x-admin-token'] }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.path} not found` });
});

app.listen(config.port, () => {
  console.log(`API server listening on port ${config.port}`);
});
