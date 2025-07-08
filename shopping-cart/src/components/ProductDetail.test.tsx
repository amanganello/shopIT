import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDetail from './ProductDetail';
import { expect, describe, it } from 'vitest';

describe('ProductDetail', () => {
  const product = { id: 1, title: 'A', price: 1, description: '', category: '', image: '/test.jpg', rating: { rate: 5, count: 1 } };

  it('renders add to cart button', () => {
    render(<ProductDetail product={product} />);
    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
  });

  // Removed addToCart call test as requested
});
