"use client";

import React, { useState, useEffect, useRef } from "react";
import CartItem from "../components/checkout/CartItem";
import OrderSummary from "../components/checkout/OrderSummary";
import Header from "../components/common/Header";
import Footer from "../components/common/footer";
import Newsletter from "../components/common/NewsLetter";
import { CartItemType } from "../lib/types";
import { getCart, saveCart } from "../lib/cart";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = getCart();
    // mark as external load so we don't immediately re-save and cause event loop
    skipSaveRef.current = true;
    setCartItems(stored);
  }, []);

  // Listen for cart changes (other tabs or saveCart dispatch)
  useEffect(() => {
    const handleUpdate = () => {
      const stored = getCart();
      // mark to skip saving since this came from external source
      skipSaveRef.current = true;
      setCartItems(stored);
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === "shopora_cart") {
        skipSaveRef.current = true;
        handleUpdate();
      }
    };

    window.addEventListener("cart_updated", handleUpdate as EventListener);
    window.addEventListener("storage", onStorage as EventListener);

    return () => {
      window.removeEventListener("cart_updated", handleUpdate as EventListener);
      window.removeEventListener("storage", onStorage as EventListener);
    };
  }, []);

  // Persist changes to localStorage
  // If the cart was just updated from an external source, skip the immediate save
  const skipSaveRef = useRef(false);

  useEffect(() => {
    if (skipSaveRef.current) {
      // reset flag and do not save (prevents loop)
      skipSaveRef.current = false;
      return;
    }
    saveCart(cartItems);
  }, [cartItems]);

  // --- CRUD LOGIC ---

  // 1. UPDATE: Increase Quantity
  const handleIncreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 2. UPDATE: Decrease Quantity (Min 1)
  const handleDecreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 3. DELETE: Remove Item
  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // --- CALCULATION LOGIC ---
  // Hitung total secara dinamis berdasarkan quantity
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2; // 20%
  const deliveryFee = cartItems.length > 0 ? 15 : 0; // Jika kosong, fee 0
  const total = subtotal - discount + deliveryFee;

  return (
    <>
      <Header></Header>
      <div className="min-h-screen bg-white font-sans text-black px-6 md:px-20 py-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-[#1230AE] font-extrabold mb-6 uppercase">
          Your Cart
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: List Items */}
          <div className="flex-1 border rounded-2xl p-4 md:p-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={`${item.id}-${item.size || ""}-${item.color || ""}`}
                  item={item}
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                  onRemove={handleRemoveItem}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">
                Your cart is empty.
              </p>
            )}
          </div>

          {/* Right Column: Order Summary */}
          {/* Komponen ini hanya muncul jika ada barang */}
          {cartItems.length > 0 && (
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={deliveryFee}
              total={total}
            />
          )}
        </div>
      </div>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </>
  );
}
