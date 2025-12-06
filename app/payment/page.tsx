"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { calculateOrderTotal } from '../lib/config';
import { formatIDR } from '../lib/format';
import { PaymentMethodType } from '../lib/paymentMethods';
import Header from '../components/common/Header';
import Footer from '../components/common/footer';
import PaymentMethodSelector from '../components/checkout/PaymentMethodSelector';

export default function PaymentPage() {
  const router = useRouter();
  const { cart, totalPrice } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  
  const { total } = calculateOrderTotal(totalPrice);

  const handleBack = () => {
    router.back();
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 md:px-20 py-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Pilih Metode Pembayaran</h1>
          <p className="text-gray-600 mt-2">Pilih cara pembayaran yang paling sesuai untuk Anda</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content - Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <PaymentMethodSelector
                selectedMethod={selectedMethod}
                onSelectMethod={setSelectedMethod}
                totalAmount={total}
              />
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Pembayaran</h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Total Produk</span>
                  <span className="font-bold text-gray-900">{formatIDR(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Diskon (-20%)</span>
                  <span className="font-bold text-red-500">-{formatIDR(totalPrice * 0.2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Ongkir</span>
                  <span className="font-bold text-green-600">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                <span>Total Bayar</span>
                <span className="text-[#1230AE]">{formatIDR(total)}</span>
              </div>

              {/* Info Box */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3">
                <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="text-sm text-orange-800">
                  <p className="font-semibold mb-1">Waktu Terbatas</p>
                  <p>Selesaikan pembayaran dalam 24 jam</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </>
  );
}