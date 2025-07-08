
"use client"
import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();

  const hideSearch = pathname === "/cart" || pathname.startsWith("/products/");

  return (
    <header className="w-full bg-black shadow-md sticky top-0 z-50 py-2 px-3 sm:px-6">
      <div className="relative flex flex-row items-center w-full min-h-[4rem]">
        {/* Center: Search bar (if not hidden) */}
        {!hideSearch && (
          <form
            className="flex items-center w-full max-w-xs md:max-w-[50vw] md:w-1/2 bg-white rounded-full shadow px-4 py-2 mr-14 justify-start md:mr-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:justify-center"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 text-base min-w-0"
              onChange={e => {
                const event = new CustomEvent('search-products', { detail: e.target.value });
                window.dispatchEvent(event);
              }}
            />
            <Search className="w-5 h-5 text-gray-500 ml-2" />
          </form>
        )}

        {/* Right: Cart icon */}
        <Link
          href="/cart"
          className="relative flex items-center justify-center ml-auto h-12 w-12 min-h-[3rem] min-w-[3rem] max-h-12 max-w-12 sm:h-16 sm:w-16 sm:min-h-[4rem] sm:min-w-[4rem] sm:max-h-16 sm:max-w-16"
          style={{ height: '3rem', width: '3rem' }}
        >
          <ShoppingCart className="w-full h-full text-white" fill="white" />
          {totalCount > 0 && (
            <span
              className="absolute -left-6 -bottom-2 bg-main-purple text-white text-sm font-extrabold rounded-full px-2 py-0.5 z-50 sm:-left-8 sm:-bottom-3 sm:text-base sm:px-3 sm:py-1"
              style={{ fontWeight: 800, fontSize: '0.95rem', minWidth: '1.9rem', minHeight: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
            >
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
