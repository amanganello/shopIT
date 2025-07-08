"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [imgLoaded, setImgLoaded] = React.useState(false);

  return (
    <div className="relative shadow-lg hover:shadow-none focus-within:shadow-none rounded-xl p-0 flex flex-col transition bg-white w-80 h-[520px] overflow-hidden border border-gray-200 hover:border-transparent focus-within:border-transparent">
      <button
        className="absolute top-3 left-3 z-10 bg-white hover:bg-gray-100 text-black w-10 h-10 flex items-center justify-center text-2xl shadow border border-gray-700 transition rounded-none cursor-pointer"
        onClick={() => {
          addToCart(product);
          toast.success('Added to cart!');
        }}
        aria-label="Add to cart"
      >
        <span className="font-bold text-2xl leading-none">+</span>
      </button>
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col items-start flex-grow cursor-pointer"
        tabIndex={0}
        aria-label={`View details for ${product.title}`}
      >
        <div className="w-full h-84 flex items-center justify-center overflow-hidden relative">
          {!imgLoaded && (
            <span className="absolute top-0 left-0 w-full h-full z-0 block">
              <Skeleton width="100%" height="100%" style={{ display: 'block', width: '100%', height: '100%' }} />
            </span>
          )}
          <Image
            src={product.image}
            alt={product.title}
            width={320}
            height={320}
            className={`object-cover w-full h-full scale-110 transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            priority={false}
            onLoad={() => setImgLoaded(true)}
          />
          <span
            className="absolute right-0 bg-main-purple text-white font-bold text-base px-3 py-1 shadow"
            style={{ backgroundColor: 'var(--main-purple)', color: '#fff', borderRadius: 0, bottom: '1.5rem' }}
          >
            USD {product.price}
          </span>
        </div>
        <h2 className="font-semibold text-lg px-4 w-full text-left pt-8 pb-0 min-h-[2.75rem] truncate md:line-clamp-2 md:truncate md:text-ellipsis">
          {product.title || <Skeleton width={200} />}
        </h2>
        <div className="flex-grow"></div>
        <p className="text-gray-600 text-sm line-clamp-4 mb-4 px-4 text-left self-stretch">
          {product.description || <Skeleton count={4} />}
        </p>
      </Link>
    </div>
  );
}
