"use client";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function ProductDetailAddToCart({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg font-medium mt-4"
      onClick={() => {
        addToCart(product);
        toast.success("Added to cart!");
      }}
    >
      Add to Cart
    </button>
  );
}
