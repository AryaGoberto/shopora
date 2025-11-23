'use client';

import React, { useState } from 'react';
import { ChevronLeft, MapPin, CreditCard, Wallet, Banknote, Tag, Pencil, Bell } from 'lucide-react';
import Link from 'next/link';
import PaymentPopup from '../components/Payment';

export default function CheckoutPage() {
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      
      {/* === 1. HEADER === */}
      <header className="bg-white sticky top-0 z-30 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 lg:text-xl">Checkout</h1>
        </div>
        <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition relative">
          <Bell className="w-5 h-5 text-gray-800" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* === KOLOM KIRI (Detail Utama) === */}
          {/* Mobile: Full Width | Desktop: 7/12 bagian */}
          <div className="space-y-6 lg:col-span-7 xl:col-span-8">
            
            {/* A. DELIVERY ADDRESS */}
            <section className="space-y-3">
              <div className="flex justify-between items-end">
                <h2 className="font-bold text-gray-800 text-sm lg:text-base">Delivery Address</h2>
                <button className="text-sm font-semibold text-gray-900 hover:text-blue-700 transition">Change</button>
              </div>
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 transition hover:border-blue-200">
                <div className="mt-1 bg-gray-50 p-2 rounded-full shrink-0">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm lg:text-base">Home</p>
                  <p className="text-xs lg:text-sm text-gray-500 mt-1 leading-relaxed">
                    Jl. Sudirman Kav. 5, Jakarta Pusat, 10270
                  </p>
                </div>
              </div>
            </section>

            {/* B. DELIVERY OPTIONS */}
            <section className="space-y-3">
              <div className="flex justify-between items-end">
                <h2 className="font-bold text-gray-800 text-sm lg:text-base">Delivery Options</h2>
                <button className="text-sm font-semibold text-gray-900 hover:text-blue-700 transition">Change</button>
              </div>
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-100 shadow-sm transition hover:border-blue-200">
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-gray-900 text-sm lg:text-base">JNE</p>
                  <p className="text-xs lg:text-sm text-gray-500">
                    Cargo | Rp 24.000 | est.15-17 Sept 2025
                  </p>
                </div>
              </div>
            </section>

            {/* C. PAYMENT METHOD */}
            <section className="space-y-4">
              <h2 className="font-bold text-gray-800 text-sm lg:text-base">Payment Method</h2>
              
              {/* Tabs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs lg:text-sm font-bold border transition-all active:scale-[0.98]
                    ${paymentMethod === 'card' ? 'bg-blue-800 text-white border-blue-800 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  <CreditCard className="w-4 h-4" /> Card
                </button>
                <button 
                  onClick={() => setPaymentMethod('ewallet')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs lg:text-sm font-bold border transition-all active:scale-[0.98]
                    ${paymentMethod === 'ewallet' ? 'bg-blue-800 text-white border-blue-800 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  <Wallet className="w-4 h-4" /> E-wallet
                </button>
                <button 
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs lg:text-sm font-bold border transition-all active:scale-[0.98]
                    ${paymentMethod === 'cod' ? 'bg-blue-800 text-white border-blue-800 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  <Banknote className="w-4 h-4" /> COD
                </button>
              </div>

              {/* Card Input Display */}
              {paymentMethod === 'card' && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 lg:p-5 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-4">
                    <div className="bg-white px-2 py-1 rounded border border-gray-200">
                      <span className="text-blue-700 font-black text-sm italic tracking-tighter">BCA</span>
                    </div>
                    <span className="text-sm lg:text-base font-semibold text-gray-800 tracking-widest">
                      •••• •••• •••• 2512
                    </span>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-200 text-gray-400 hover:text-blue-600 transition">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* === KOLOM KANAN (Order Summary) === */}
          {/* Mobile: Pindah ke bawah | Desktop: Sticky di kanan (5/12 bagian) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white p-5 lg:p-6 rounded-2xl border border-gray-100 shadow-sm lg:sticky lg:top-24">
              <h2 className="font-bold text-gray-800 text-sm lg:text-lg mb-4 lg:mb-6">Order Summary</h2>
              
              <div className="space-y-3 text-sm lg:text-base">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Sub-total</span>
                  <span className="font-bold text-gray-900">Rp789.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-bold text-gray-900">Rp0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Discount</span>
                  <span className="font-bold text-red-500">-Rp30.000</span>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 my-4 lg:my-6"></div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-900 text-sm lg:text-lg">Total</span>
                <span className="font-bold text-lg lg:text-2xl text-gray-900">Rp759.000</span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Enter promo code" 
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                  />
                </div>
                <button className="bg-blue-800 text-white px-6 rounded-xl text-sm font-bold hover:bg-blue-900 transition shadow-sm">
                  Add
                </button>
              </div>

              {/* Finish Button */}
              <button 
                onClick={() => setPaymentOpen(true)}
                className="w-full bg-blue-700 text-white py-3.5 lg:py-4 rounded-xl font-bold text-sm lg:text-base shadow-lg shadow-blue-200 hover:bg-blue-800 hover:shadow-blue-300 transition-all active:scale-[0.98]"
              >
                Finish Order
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                By clicking finish, you agree to our terms.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Popup Component */}
      <PaymentPopup 
        isOpen={isPaymentOpen} 
        onClose={() => setPaymentOpen(false)} 
      />

    </div>
  );
}