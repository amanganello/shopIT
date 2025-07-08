"use client";

import { useCartStore } from "@/store/cartStore";
import { Trash2 } from "lucide-react";
import { Fragment } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full flex justify-center">
        <h1 className="text-3xl font-bold mb-5 mt-8 text-left w-full md:w-2/3">Your Cart</h1>
      </div>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="w-full flex justify-center">
            <ul className="w-full md:w-2/3 bg-white rounded-xl shadow">
              {items.map((item, idx) => (
                <Fragment key={item.id}>
                  <li key={item.id} className="flex flex-col md:flex-row items-start md:items-center py-6 px-4 md:px-8">
                    <div className="flex flex-row items-center gap-4 w-full md:w-2/3 mb-2 md:mb-0 justify-center">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                          onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="font-mono text-lg">{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex-1 text-left font-semibold text-lg truncate max-w-[300px] md:max-w-none md:line-clamp-2">{item.title}</div>
                    </div>
                    <div className="flex w-full md:w-1/3 items-center justify-center gap-4 mt-2 md:mt-0">
                      <span className="font-bold text-lg">USD {(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        className="px-2 py-1 bg-white rounded hover:bg-red-100 transition flex items-center justify-center cursor-pointer"
                        style={{ minWidth: '2rem', minHeight: '2rem' }}
                        title="Remove from cart"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success('Removed from cart');
                        }}
                      >
                        <Trash2 className="w-5 h-5 text-gray-700 cursor-pointer" />
                      </button>
                    </div>
                  </li>
                  {idx < items.length - 1 && (
                    <div className="mx-8 border-t border-gray-200" style={{ width: '90%' }} />
                  )}
                </Fragment>
              ))}
            </ul>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-full md:w-2/3 flex justify-center md:justify-end mt-4 pr-4 md:pr-8">
              <div className="text-xl font-bold">Total: USD {total.toFixed(2)}</div>
            </div>
          </div>
          <div className="w-full flex justify-center pt-8">
            <button
              className="bg-main-purple text-white px-8 py-3 rounded text-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
              onClick={() => window.location.href = "/"}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}
