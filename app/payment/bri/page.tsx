"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Copy, CheckCircle, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatIDR } from '../../lib/format';
import { BANK_ACCOUNTS } from '../../lib/paymentMethods';
import Header from '../../components/common/Header';
import Footer from '../../components/common/footer';

export default function BriTransferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = parseInt(searchParams.get('amount') || '0');
  const { clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const bank = {
    ...BANK_ACCOUNTS.bri,
    va: '1234567890123',
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    clearCart();
    setTimeout(() => {
      router.push('/payment-success');
    }, 2000);
  };

  if (confirmed) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-12 text-center max-w-md shadow-lg">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h1>
            <p className="text-gray-600 mb-6">Terima kasih telah berbelanja di Shopora</p>
            <p className="text-sm text-gray-500">Mengalihkan ke halaman utama...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 md:px-20 py-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Transfer Bank BRI</h1>
          <p className="text-gray-600 mt-2">Pilih bank untuk melakukan transfer</p>
        </div>

        {/* Amount Summary */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <p className="text-gray-600 text-sm">Jumlah Pembayaran</p>
          <h2 className="text-4xl font-bold text-red-600 mt-2">{formatIDR(amount)}</h2>
          <div className="flex items-center gap-2 mt-4 text-orange-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>Pembayaran harus dilakukan dalam 24 jam</span>
          </div>
        </div>

        {/* Bank Options */}
        <div className="space-y-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="font-bold text-lg text-gray-900 mb-4">🏦 {bank.bank}</h3>
            
            <div className="space-y-4">
              {/* Account Info */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Atas Nama</p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900">{bank.accountName}</p>
                  <button
                    onClick={() => handleCopy(bank.accountName)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Virtual Account */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Nomor Virtual Account</p>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <p className="font-mono font-bold text-gray-900">{bank.va}</p>
                  <button
                    onClick={() => handleCopy(bank.va)}
                    className={`${
                      copied ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                    } transition`}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Jumlah Transfer</p>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <p className="font-mono font-bold text-gray-900">{formatIDR(amount)}</p>
                  <button
                    onClick={() => handleCopy(formatIDR(amount))}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-900">
                <strong>Instruksi:</strong> Buka aplikasi banking BRI Anda, transfer ke nomor Virtual Account di atas sesuai jumlah yang tertera.
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Saya telah menyelesaikan transfer pembayaran
          </p>
          <button
            onClick={handleConfirm}
            className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition"
          >
            Konfirmasi Pembayaran
          </button>
        </div>

      </div>
      <Footer />
    </>
  );
}
