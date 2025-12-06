"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Check } from 'lucide-react';
import { PAYMENT_METHODS, PaymentMethodType } from '../../lib/paymentMethods';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType | null;
  onSelectMethod: (method: PaymentMethodType) => void;
  totalAmount: number;
}

export default function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
  totalAmount,
}: PaymentMethodSelectorProps) {
  const router = useRouter();

  const handleConfirm = () => {
    if (selectedMethod) {
      // Redirect ke payment page berdasarkan metode
      // Special case untuk mandiri dan bri yang tidak ada folder terpisah
      let path = selectedMethod;
      if (selectedMethod === 'mandiri') {
        path = 'mandiri';
      } else if (selectedMethod === 'bri') {
        path = 'bri';
      }
      router.push(`/payment/${path}?amount=${totalAmount}`);
    }
  };

  const bankMethods = Object.values(PAYMENT_METHODS).filter((m) => m.type === 'bank');
  const ewalletMethods = Object.values(PAYMENT_METHODS).filter((m) => m.type === 'ewallet');
  const qrMethods = Object.values(PAYMENT_METHODS).filter((m) => m.type === 'qr');

  const methodGroups = [
    { title: 'Transfer Bank', methods: bankMethods },
    { title: 'E-Wallet', methods: ewalletMethods },
    { title: 'QR Code', methods: qrMethods },
  ];

  return (
    <div className="w-full space-y-6">
      {methodGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
            {group.title}
          </h3>
          <div className="grid gap-3">
            {group.methods.map((method) => (
              <button
                key={method.id}
                onClick={() => onSelectMethod(method.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between group ${
                  selectedMethod === method.id
                    ? 'border-[#1230AE] bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{method.icon}</div>
                  <div>
                    <p className="font-bold text-gray-900">{method.displayName}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <div className="bg-[#1230AE] rounded-full p-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Tombol Lanjut */}
      <button
        onClick={handleConfirm}
        disabled={!selectedMethod}
        className={`w-full mt-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
          selectedMethod
            ? 'bg-[#1230AE] text-white hover:bg-blue-800'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Lanjutkan Pembayaran
        {selectedMethod && <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  );
}
