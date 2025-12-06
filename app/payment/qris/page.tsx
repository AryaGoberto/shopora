"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Copy, CheckCircle, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatIDR } from '../../lib/format';
import Header from '../../components/common/Header';
import Footer from '../../components/common/footer';
import Image from 'next/image';

export default function QrisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = parseInt(searchParams.get('amount') || '0');
  const { clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const qrisString = '00020126360014ID.CO.BRI.BRIMO0092600088302062220208111222334455061212345678901234567890213ID.CO.QRIS.WWW011221085211234567890215ID.SHOP.123456789005SHOPORA5703360540510.005802ID5903Shopora6009Surabaya62720512QRIS ID SHOP61070627201330630436B3';

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
          <h1 className="text-3xl font-bold text-gray-900">Pembayaran QRIS</h1>
          <p className="text-gray-600 mt-2">Scan QR code dengan aplikasi e-wallet Anda</p>
        </div>

        {/* Amount Summary */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-8">
          <p className="text-gray-600 text-sm">Jumlah Pembayaran</p>
          <h2 className="text-4xl font-bold text-purple-600 mt-2">{formatIDR(amount)}</h2>
          <div className="flex items-center gap-2 mt-4 text-orange-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>Pembayaran harus dilakukan dalam 24 jam</span>
          </div>
        </div>

        {/* QRIS Section */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left: QR Code */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">📲 Scan QR Code</h3>
            
            {/* Static QR Code - Placeholder dengan gambar */}
            <div className="bg-gray-100 border-4 border-gray-300 rounded-lg p-4 mb-6">
              {/* Menggunakan placeholder QR code image */}
              <svg
                viewBox="0 0 200 200"
                width="200"
                height="200"
                xmlns="http://www.w3.org/2000/svg"
                className="bg-white"
              >
                {/* Simplified QR pattern - ini adalah QR code dummy static */}
                <rect width="200" height="200" fill="white" />
                {/* Position Detection Pattern (3 corners) */}
                {/* Top-left */}
                <rect x="10" y="10" width="40" height="40" fill="black" />
                <rect x="15" y="15" width="30" height="30" fill="white" />
                <rect x="20" y="20" width="20" height="20" fill="black" />
                
                {/* Top-right */}
                <rect x="150" y="10" width="40" height="40" fill="black" />
                <rect x="155" y="15" width="30" height="30" fill="white" />
                <rect x="160" y="20" width="20" height="20" fill="black" />
                
                {/* Bottom-left */}
                <rect x="10" y="150" width="40" height="40" fill="black" />
                <rect x="15" y="155" width="30" height="30" fill="white" />
                <rect x="20" y="160" width="20" height="20" fill="black" />
                
                {/* Random pattern untuk data area - biar terlihat seperti QR code */}
                {[...Array(10)].map((_, i) =>
                  [...Array(10)].map((_, j) => {
                    const x = 70 + i * 8;
                    const y = 70 + j * 8;
                    const isBlack = Math.random() > 0.5;
                    return isBlack ? (
                      <rect key={`${i}-${j}`} x={x} y={y} width="6" height="6" fill="black" />
                    ) : null;
                  })
                )}
              </svg>
            </div>

            <p className="text-center text-sm text-gray-600">
              Arahkan kamera ke QR code untuk scan
            </p>
          </div>

          {/* Right: Instructions */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Instruksi Pembayaran</h3>
            
            <div className="space-y-4 mb-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="bg-purple-100 text-purple-700 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Buka e-wallet Anda</p>
                  <p className="text-sm text-gray-600">GoPay, Dana, OVO, ShopeePay, atau e-wallet lainnya</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="bg-purple-100 text-purple-700 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Pilih fitur "Scan QRIS"</p>
                  <p className="text-sm text-gray-600">Cari menu pembayaran atau scan QR code</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="bg-purple-100 text-purple-700 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Arahkan ke QR code</p>
                  <p className="text-sm text-gray-600">Pastikan QR code terdeteksi dengan jelas</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="bg-purple-100 text-purple-700 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Masukkan PIN dan konfirmasi</p>
                  <p className="text-sm text-gray-600">Selesaikan pembayaran di aplikasi e-wallet</p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-purple-900 mb-2">💡 Tips</p>
              <p className="text-sm text-purple-800">Pastikan kamera perangkat Anda bersih dan jaringan internet stabil</p>
            </div>
          </div>

        </div>

        {/* Manual Entry (Alternative) */}
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">Alternatif: Input Manual</h3>
          <p className="text-sm text-gray-600 mb-4">Jika QR code tidak terbaca, Anda bisa memasukkan kode QRIS ini secara manual:</p>
          
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-mono text-xs text-gray-900 break-all line-clamp-2">{qrisString}</p>
            <button
              onClick={() => handleCopy(qrisString)}
              className={`${
                copied ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
              } transition ml-2`}
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Saya telah menyelesaikan pembayaran QRIS
          </p>
          <button
            onClick={handleConfirm}
            className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition"
          >
            Konfirmasi Pembayaran
          </button>
        </div>

      </div>
      <Footer />
    </>
  );
}
