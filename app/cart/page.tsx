"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

// --- PENTING: IMPORT DARI CONTEXT ---
import { useCart } from "../context/CartContext";

// Import Komponen UI (Pastikan path benar)
import CartItem from "../components/checkout/CartItem";
import OrderSummary from "../components/checkout/OrderSummary";
import Header from "../components/common/Header";
import Footer from "../components/common/footer";
import Newsletter from "../components/common/NewsLetter";

export default function CartPage() {
  // 1. PANGGIL DATA & FUNGSI DARI CONTEXT
  // Tidak perlu lagi pakai useState manual atau useEffect ribet
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  // 2. HITUNG BIAYA (Logika disamakan dengan Checkout)
  const subtotal = totalPrice;
  const discount = subtotal > 0 ? subtotal * 0.2 : 0; // Diskon 20%
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50 font-sans text-black px-4 md:px-20 py-10 max-w-7xl mx-auto">
        
        {/* Judul Halaman */}
        <h2 className="text-3xl md:text-4xl text-[#1230AE] font-black mb-8 uppercase flex items-center gap-3">
          Your Cart 
          <span className="text-sm bg-white text-gray-500 px-3 py-1 rounded-full border shadow-sm normal-case font-normal">
            {cart.length} items
          </span>
        </h2>

        {/* --- KONDISI JIKA KERANJANG KOSONG --- */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you haven't added anything to your cart yet. Go ahead and explore top categories.
            </p>
            <Link 
              href="/" 
              className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* --- KONDISI JIKA ADA BARANG --- */
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* KIRI: DAFTAR BARANG */}
            <div className="flex-1 w-full space-y-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                {cart.map((item) => (
                  <CartItem
                    key={item.id} // ID Unik
                    item={item}   // Data Barang
                    
                    // Hubungkan fungsi Context ke komponen CartItem
                    onUpdateQuantity={updateQuantity} 
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              <Link href="/" className="inline-flex items-center text-gray-500 hover:text-black font-medium mt-4 transition">
                <ArrowLeft size={18} className="mr-2" /> Continue Shopping
              </Link>
            </div>

            {/* KANAN: ORDER SUMMARY */}
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={deliveryFee}
              total={total}
            />
          </div>
        )}
      </div>

      <Newsletter />
      <Footer />
    </>
  );
}