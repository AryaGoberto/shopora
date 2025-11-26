'use client';

import React, { useState } from 'react';
import { ChevronLeft, Clock, CheckCircle2, X } from 'lucide-react';

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentPopup({ isOpen, onClose }: PaymentPopupProps) {
  const [copied, setCopied] = useState(false);
  const vaNumber = "8077 1230 4567 8900";

  const handleCopy = () => {
    navigator.clipboard.writeText(vaNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Jika isOpen false, jangan render apa-apa
  if (!isOpen) return null;

  return (
    // 1. OVERLAY HITAM (Background Dim)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
      
      {/* 2. MODAL CONTAINER */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header Modal */}
        <div className="flex items-center p-4 border-b sticky top-0 bg-white z-10">
          <button onClick={onClose} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 ml-2 flex-1 text-center">
            Payment Instruction
          </h1>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <main className="p-5 space-y-6 bg-gray-50">
          
          {/* Total Amount */}
          <section className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Total yang Harus Dibayar</p>
                <h2 className="text-3xl font-bold text-gray-900">RP759.000</h2>
              </div>
              <Clock className="text-gray-400 w-5 h-5 mt-1" />
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Batas Waktu Pembayaran</p>
              <p className="text-sm text-gray-600 font-medium">24 Jam - s/d 25 Okt 2025</p>
            </div>
          </section>

          {/* Virtual Account Card */}
          <section className="rounded-xl overflow-hidden shadow-md bg-white">
            <div className="bg-blue-800 px-5 py-3">
              <h3 className="text-white font-medium text-sm">Virtual Account - Bank BCA</h3>
            </div>
            <div className="p-5 border-x border-b border-gray-100 rounded-b-xl">
              <p className="text-xs font-bold text-gray-800 mb-2">VA Number:</p>
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
                <div className="text-blue-800 font-black italic tracking-tighter text-lg mr-2">BCA</div>
                <span className="text-2xl font-bold text-gray-800 tracking-wide text-center">{vaNumber}</span>
              </div>
              <button 
                onClick={handleCopy}
                className={`w-full px-8 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2
                  ${copied ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
              >
                {copied ? <><CheckCircle2 className="w-4 h-4" /> Tersalin!</> : "Salin Nomor"}
              </button>
            </div>
          </section>

          {/* Instructions */}
          <section className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Cara Melakukan Pembayaran</h3>
            <ol className="list-decimal list-outside ml-4 space-y-2 text-sm text-gray-600">
              <li>Buka aplikasi/ATM BCA</li>
              <li>Pilih "Transfer" &gt; "Virtual Account"</li>
              <li>Masukkan Nomor VA <span className="font-bold text-gray-800">{vaNumber}</span></li>
              <li>Konfirmasi Pembayaran</li>
              <li>Selesai!</li>
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
}
