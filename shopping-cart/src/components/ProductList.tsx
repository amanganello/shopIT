
"use client"
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import ViewMoreButton from "./ViewMoreButton";
import { getProducts } from "@/services/api";

const PAGE_SIZE = 3;

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // page = how many PAGE_SIZEs to show
  const [hasMore, setHasMore] = useState(true);

  // Fetch all products once
  useEffect(() => {
    let ignore = false;
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const allProducts = await getProducts();
        if (!ignore) {
          setProducts(allProducts);
          setHasMore(allProducts.length > PAGE_SIZE);
        }
      } catch {
        if (!ignore) setError("Failed to load products. Please try again later.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchProducts();
    return () => { ignore = true; };
  }, []);

  // Search filter
  const filtered = search
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search)
      )
    : products;

  // Pagination: show only up to page * PAGE_SIZE
  const paginated = filtered.slice(0, page * PAGE_SIZE);
  useEffect(() => {
    setHasMore(filtered.length > page * PAGE_SIZE);
  }, [filtered, page]);

  useEffect(() => {
    const handler = (e: Event) => {
      const value = (e as CustomEvent).detail?.toLowerCase?.() || "";
      setSearch(value);
    };
    window.addEventListener("search-products", handler as EventListener);
    return () => window.removeEventListener("search-products", handler as EventListener);
  }, []);

  return (
    <div>
      {error && (
        <div className="w-full text-center py-8 text-red-600 bg-red-50 border border-red-200 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-8">
        {loading || products.length === 0 ? (
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="w-80 h-[520px]">
              <Skeleton height={520} width={320} style={{ borderRadius: 16 }} />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="w-full text-center py-12 text-gray-500 text-lg" role="status">
            No products found.
          </div>
        ) : (
          paginated.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      {!loading && hasMore && !search && !error && products.length > 0 && (
        <div className="flex justify-center mt-8">
          <ViewMoreButton
            onClick={() => setPage((p) => p + 1)}
          />
        </div>
      )}
    </div>
  );
}
