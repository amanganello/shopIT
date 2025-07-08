import { Product } from '@/types';


// Fetch products with optional limit (and offset for future real APIs)
export async function getProducts(limit?: number): Promise<Product[]> {
  let url = 'https://fakestoreapi.com/products';
  if (limit) url += `?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
