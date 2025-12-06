"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Copy, CheckCircle, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatIDR } from '../../lib/format';
import Header from '../../components/common/Header';
import Footer from '../../components/common/footer';

export default function GoPaylPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = parseInt(searchParams.get('amount') || '0');
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const gopayNumber = '6281234567890'; // Fake GoPay number

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    setConfirmed(true);
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
          <h1 className="text-3xl font-bold text-gray-900">Pembayaran GoPay</h1>
          <p className="text-gray-600 mt-2">Gunakan aplikasi GoPay untuk melakukan pembayaran</p>
        </div>

        {/* Amount Summary */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
          <p className="text-gray-600 text-sm">Jumlah Pembayaran</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">{formatIDR(amount)}</h2>
          <div className="flex items-center gap-2 mt-4 text-orange-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>Pembayaran harus dilakukan dalam 24 jam</span>
          </div>
        </div>

        {/* GoPay Instructions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">📱 Instruksi Pembayaran GoPay</h3>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">Buka aplikasi GoPay</p>
                <p className="text-gray-600 text-sm">Pastikan saldo GoPay Anda mencukupi untuk pembayaran</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-2">Transfer ke nomor GoPay</p>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                  <p className="font-mono font-bold text-gray-900">{gopayNumber}</p>
                  <button
                    onClick={() => handleCopy(gopayNumber)}
                    className={`${
                      copied ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                    } transition`}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">Masukkan jumlah</p>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
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

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">Konfirmasi pembayaran</p>
                <p className="text-gray-600 text-sm">Klik tombol "Konfirmasi Pembayaran" setelah transaksi selesai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex gap-3">
          <div>
            <p className="text-sm font-semibold text-green-900 mb-1">💡 Tips</p>
            <p className="text-sm text-green-800">Pastikan jaringan internet stabil saat melakukan transaksi</p>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Saya telah menyelesaikan transfer pembayaran GoPay
          </p>
          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition"
          >
            Konfirmasi Pembayaran
          </button>
        </div>

      </div>
      <Footer />
    </>
  );
}
