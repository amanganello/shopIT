import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ProductList from './ProductList';
import * as api from '@/services/api';
import { vi, expect, describe, it, beforeEach, afterEach } from 'vitest';

describe('ProductList', () => {
  beforeEach(() => {
    vi.spyOn(api, 'getProducts').mockResolvedValue([
      { id: 1, title: 'A', price: 1, description: '', category: '', image: '/test.jpg', rating: { rate: 5, count: 1 } },
      { id: 2, title: 'B', price: 2, description: '', category: '', image: '/test2.jpg', rating: { rate: 4, count: 2 } },
    ]);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders products', async () => {
    render(<ProductList />);
    expect(await screen.findByText('A')).toBeInTheDocument();
    expect(await screen.findByText('B')).toBeInTheDocument();
  });

  it('shows error on fetch fail', async () => {
    vi.spyOn(api, 'getProducts').mockRejectedValue(new Error('fail'));
    render(<ProductList />);
    expect(await screen.findByText(/failed to load/i)).toBeInTheDocument();
  });

  it('filters by search', async () => {
    render(<ProductList />);
    // Simulate the custom search event dispatched by Header
    act(() => {
      window.dispatchEvent(new CustomEvent('search-products', { detail: 'A' }));
    });
    expect(await screen.findByText('A')).toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
  });
});
