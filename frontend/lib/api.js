const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function fetcher(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await response.json().catch(() => ({}));
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function getProducts() {
  return fetcher('/api/products');
}

export async function getProductById(id) {
  return fetcher(`/api/products/${id}`);
}

export async function getDashboardStats() {
  return fetcher('/api/admin/dashboard');
}
