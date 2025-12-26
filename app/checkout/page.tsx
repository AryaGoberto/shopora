// app/checkout/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { calculateOrderTotal } from "../lib/config";
import { formatIDR } from "../lib/format";
import Header from "../components/common/Header";
import Footer from "../components/common/footer";
import CartItem from "../components/checkout/CartItem";
import { ShoppingBag } from "lucide-react";

// --- TIPE DATA MIDTRANS AGAR TIDAK ERROR TYPESCRIPT ---
declare global {
  interface Window {
    snap: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const { subtotal, discount, deliveryFee, total, isFreeShipping } = calculateOrderTotal(totalPrice);
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  if (cart.length === 0) {
    return null; 
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold text-[#1230AE] mb-6">Ringkasan Pesanan</h2>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} readOnly={true} />
                ))}
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold">{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount (-20%)</span>
                  <span className="font-semibold text-red-500">-{formatIDR(discount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <div className="flex items-center gap-2">
                    {isFreeShipping && deliveryFee === 0 ? (
                      <>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                          FREE
                        </span>
                        <span className="font-semibold text-gray-400 line-through text-sm">{formatIDR(25000)}</span>
                      </>
                    ) : (
                      <span className="font-semibold">{formatIDR(deliveryFee)}</span>
                    )}
                  </div>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[#1230AE]">{formatIDR(total)}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border h-fit">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Konfirmasi Pembayaran</h1>
                <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 text-center mb-6 bg-blue-50/50">
                <p className="text-gray-500 text-sm mb-1">Total Tagihan</p>
                <h2 className="text-3xl font-bold text-blue-700">{formatIDR(total)}</h2>
                <div className="mt-4 bg-orange-100 text-orange-600 text-xs px-4 py-2 rounded-full inline-flex items-center gap-2">
                  <span>🕒</span> Selesaikan pembayaran dalam 24 jam
                </div>
              </div>

              {/* Info Keamanan */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">🛡️</div>
                  <h3 className="font-semibold">Pilih Metode Pembayaran</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  Pilih metode pembayaran yang tersedia untuk melanjutkan transaksi.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="bg-white p-2 rounded border">✅ BCA / Mandiri / BRI</div>
                  <div className="bg-white p-2 rounded border">✅ GoPay</div>
                  <div className="bg-white p-2 rounded border">✅ QRIS</div>
                  <div className="bg-white p-2 rounded border">✅ ShopeePay</div>
                </div>
              </div>

              {/* TOMBOL BAYAR UTAMA */}
              <button
                onClick={() => router.push('/payment')}
                disabled={loading}
                className="w-full bg-[#1230AE] hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "Pilih Metode Pembayaran"}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Sistem pembayaran aman dan terpercaya
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}