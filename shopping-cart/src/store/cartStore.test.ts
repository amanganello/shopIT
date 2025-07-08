
import { act } from "react-dom/test-utils";
import { Product } from "@/types";
import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "./cartStore";

const sampleProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 10,
  description: "A test product",
  category: "test",
  image: "test.jpg",
  rating: { rate: 5, count: 1 },
};

describe("cartStore", () => {
  beforeEach(() => {
    // Clear localStorage and reset store before each test
    localStorage.clear();
    useCartStore.setState({ items: [] });
  });

  it("adds a product to the cart", () => {
    act(() => {
      useCartStore.getState().addToCart(sampleProduct);
    });
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("increments quantity if product already in cart", () => {
    act(() => {
      useCartStore.getState().addToCart(sampleProduct);
      useCartStore.getState().addToCart(sampleProduct);
    });
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("removes a product from the cart", () => {
    act(() => {
      useCartStore.getState().addToCart(sampleProduct);
      useCartStore.getState().removeFromCart(sampleProduct.id);
    });
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("updates product quantity", () => {
    act(() => {
      useCartStore.getState().addToCart(sampleProduct);
      useCartStore.getState().updateItemQuantity(sampleProduct.id, 5);
    });
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });



  });
