"use client";

import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatIDR } from '../../lib/format';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  isFreeShipping?: boolean;
}

export default function OrderSummary({
  subtotal,
  discount,
  deliveryFee,
  total,
  isFreeShipping = false
}: OrderSummaryProps) {

  const router = useRouter();

  return (
    <div className="w-full lg:w-1/3 h-fit border rounded-2xl p-6">
      <h3 className="text-xl font-bold text-[#1230AE] mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600 text-lg">
          <span>Subtotal</span>
          <span className="font-bold text-black">{formatIDR(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-lg">
          <span>Discount (-20%)</span>
          <span className="font-bold text-red-500">-{formatIDR(discount)}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-lg">
          <span>Delivery Fee</span>
          <div className="flex items-center gap-2">
            {isFreeShipping && deliveryFee === 0 ? (
              <>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                  FREE
                </span>
                <span className="font-bold text-gray-400 line-through text-sm">{formatIDR(25000)}</span>
              </>
            ) : (
              <span className="font-bold text-black">{formatIDR(deliveryFee)}</span>
            )}
          </div>
        </div>
        <div className="border-t pt-4 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>{formatIDR(total)}</span>
        </div>
      </div>

      {/* Promo Code Input - Tampilan Tetap Sama */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center text-gray-500 gap-2">
          <Tag size={20} />
          <input
            type="text"
            placeholder="Add promo code"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
        <button className="bg-[#1230AE] text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition">
          Apply
        </button>
      </div>

      {/* Tombol Checkout - UI Sama, Fungsi Baru */}
      <button 
        onClick={() => router.push('/checkout')} 
        className="w-full bg-[#1230AE] text-white rounded-full py-4 flex items-center justify-center gap-2 font-medium hover:bg-gray-800 transition group"
      >
        Go to Checkout
        <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
      </button>
    </div>
  );
}