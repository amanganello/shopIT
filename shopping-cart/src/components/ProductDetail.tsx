"use client"
import React from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function ProductDetail({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <button
      className="bg-main-purple hover:bg-purple-700 text-white px-6 py-2 rounded text-lg font-medium mt-4 transition-colors cursor-pointer"
      onClick={() => {
        addToCart(product);
        toast.success("Added to cart!");
      }}
    >
      Add to Cart
    </button>
  );
}
