import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { vi, expect, describe, it } from 'vitest';
import { useCartStore } from '@/store/cartStore';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

describe('Header', () => {
  it('renders shop title', () => {
    vi.spyOn(useCartStore, 'getState').mockReturnValue({
      items: [{ id: 1, title: 'A', price: 1, description: '', category: '', image: '', rating: { rate: 5, count: 1 }, quantity: 2 }],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateItemQuantity: vi.fn(),
    });
    render(<Header />);
    expect(screen.getByText('ShopIT')).toBeInTheDocument();
  });
});
