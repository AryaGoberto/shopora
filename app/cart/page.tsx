"use client";

import React, { useState } from "react";
import CartItem from "../components/checkout/CartItem";
import OrderSummary from "../components/checkout/OrderSummary";
import Header from "../components/common/Header";
import Footer from "../components/common/footer";
import Newsletter from "../components/common/NewsLetter";
import { CartItemType } from "../lib/types";

// Data Awal (Mocking)
const initialCartItems: CartItemType[] = [
  {
    id: "1",
    name: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    image: "https://placehold.co/120x120/png?text=T-Shirt",
    quantity: 1,
  },
  {
    id: "2",
    name: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    image: "https://placehold.co/120x120/png?text=Shirt",
    quantity: 1,
  },
  {
    id: "3",
    name: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    image: "https://placehold.co/120x120/png?text=Jeans",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

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
                  key={item.id}
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
