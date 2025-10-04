import axios from 'axios';
import useSWR from 'swr';
import { CheckoutPayload, CheckoutResponse, Product } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const client = axios.create({
  baseURL: `${API_BASE}/api`
});

const fetcher = (url: string) => client.get(url).then((res) => res.data);

export const useProducts = () => useSWR<Product[]>('/products', fetcher);
export const useFeaturedProducts = () => useSWR<Product[]>('/products/featured', fetcher);
export const useProduct = (id?: string) => useSWR<Product>(id ? `/products/${id}` : null, fetcher);

export const checkout = async (payload: CheckoutPayload) => {
  const { data } = await client.post<CheckoutResponse>('/orders', payload);
  return data;
};

export const listOrders = async (adminToken: string) => {
  const { data } = await client.get('/orders', {
    headers: {
      'x-admin-token': adminToken
    }
  });
  return data;
};
