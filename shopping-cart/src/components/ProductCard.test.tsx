import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { expect, describe, it } from 'vitest';

describe('ProductCard', () => {
  const product = { id: 1, title: 'A', price: 1, description: '', category: '', image: '/test.jpg', rating: { rate: 5, count: 1 } };

  it('renders product info', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByLabelText(/add to cart/i)).toBeInTheDocument();
  });

  // Removed addToCart call test as requested
});
