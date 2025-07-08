import { describe, it, expect, vi, afterEach } from "vitest";
import { getProducts, getProductById } from "./api";

// Mock fetch globally
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalAny: any = global;

// Helper: reset fetch after each test
const restoreFetch = () => {
  if (globalAny.fetch && globalAny.fetch.mockRestore) {
    globalAny.fetch.mockRestore();
  }
};

describe("api", () => {
  afterEach(() => {
    restoreFetch();
  });

  it("getProducts returns products on success", async () => {
    const mockProducts = [
      { id: 1, title: "A", price: 1, description: "", category: "", image: "", rating: { rate: 5, count: 1 } },
      { id: 2, title: "B", price: 2, description: "", category: "", image: "", rating: { rate: 4, count: 2 } },
    ];
    globalAny.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(mockProducts) });
    const products = await getProducts();
    expect(products).toEqual(mockProducts);
  });

  it("getProducts throws on error", async () => {
    globalAny.fetch = vi.fn().mockResolvedValue({ ok: false });
    await expect(getProducts()).rejects.toThrow("Failed to fetch products");
  });

  it("getProductById returns product on success", async () => {
    const mockProduct = { id: 1, title: "A", price: 1, description: "", category: "", image: "", rating: { rate: 5, count: 1 } };
    globalAny.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(mockProduct) });
    const product = await getProductById("1");
    expect(product).toEqual(mockProduct);
  });

  it("getProductById throws on error", async () => {
    globalAny.fetch = vi.fn().mockResolvedValue({ ok: false });
    await expect(getProductById("1")).rejects.toThrow("Failed to fetch product");
  });

  it("getProductById throws on invalid id (404)", async () => {
    globalAny.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });
    await expect(getProductById("9999")).rejects.toThrow("Failed to fetch product");
  });
});
