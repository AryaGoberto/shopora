'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, ShieldCheck, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Sesuaikan path firebase kamu

// Deklarasi Global untuk Window Snap
declare global {
  interface Window {
    snap: any;
  }
}

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: any; // Kita butuh data order (totalAmount, id, dll)
}

export default function PaymentPopup({ isOpen, onClose, orderData }: PaymentPopupProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Jika modal tertutup atau data order belum ada, jangan render
  if (!isOpen || !orderData) return null;

  // Format Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(orderData.totalAmount);

  // --- FUNGSI TRIGGER MIDTRANS ---
  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Minta Token ke Backend API kita sendiri
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.id || "TEST-ORDER", // Pastikan order ID ada
          totalAmount: orderData.totalAmount,
          customerName: orderData.customer?.firstName,
          customerEmail: orderData.customer?.email,
        }),
      });

      const data = await response.json();

      if (!data.token) throw new Error("Gagal mendapatkan token pembayaran");

      // 2. Munculkan Popup Midtrans
      window.snap.pay(data.token, {
        onSuccess: async function (result: any) {
          console.log("Payment Success:", result);
          // Update Firebase jadi PAID
          try {
            await updateDoc(doc(db, "orders", orderData.id), {
              status: "paid",
              paymentMethod: result.payment_type,
              paidAt: new Date().toISOString(),
              midtransInfo: result
            });
            // Redirect ke halaman sukses
            router.push(`/payment-success?orderId=${orderData.id}`);
          } catch (err) {
            console.error("Gagal update database", err);
          }
        },
        onPending: function (result: any) {
          console.log("Payment Pending:", result);
          alert("Menunggu pembayaran...");
          onClose(); // Tutup modal kita, biarkan user bayar nanti
        },
        onError: function (result: any) {
          console.log("Payment Error:", result);
          alert("Pembayaran gagal!");
          setLoading(false);
        },
        onClose: function () {
          console.log("Customer closed the popup without finishing the payment");
          setLoading(false);
        },
      });

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem pembayaran.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Load Script Midtrans (Wajib ada di sini atau di Layout) */}
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      {/* 1. OVERLAY HITAM */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
        
        {/* 2. MODAL CONTAINER */}
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 relative">
          
          {/* Header Modal */}
          <div className="flex items-center p-4 border-b bg-white z-10">
            <button onClick={onClose} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 ml-2 flex-1 text-center">
              Konfirmasi Pembayaran
            </h1>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <main className="p-5 space-y-6 bg-gray-50">
            
            {/* Total Amount Card */}
            <section className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm text-center">
              <p className="text-sm text-gray-500 font-medium mb-1">Total Tagihan</p>
              <h2 className="text-3xl font-black text-blue-700 mb-2">{formattedPrice}</h2>
              
              <div className="flex items-center justify-center gap-2 text-xs text-orange-600 bg-orange-50 py-2 rounded-lg">
                <Clock className="w-4 h-4" />
                <span>Selesaikan pembayaran dalam 24 jam</span>
              </div>
            </section>

            {/* Info Midtrans */}
            <section className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Metode Pembayaran Aman</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Anda akan diarahkan ke sistem pembayaran otomatis Midtrans. Anda dapat memilih metode pembayaran:
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500 font-medium">
                <li className="bg-gray-100 px-3 py-1 rounded">✅ BCA / Mandiri / BRI</li>
                <li className="bg-gray-100 px-3 py-1 rounded">✅ GoPay / QRIS</li>
                <li className="bg-gray-100 px-3 py-1 rounded">✅ ShopeePay</li>
                <li className="bg-gray-100 px-3 py-1 rounded">✅ Indomaret / Alfa</li>
              </ul>
            </section>

            {/* Tombol Bayar */}
            <button 
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#1230AE] hover:bg-blue-800 hover:scale-[1.02]'
                }`}
            >
              {loading ? (
                <> <Loader2 className="animate-spin w-5 h-5" /> Memproses... </>
              ) : (
                "Pilih Metode Pembayaran"
              )}
            </button>

            <p className="text-center text-[10px] text-gray-400">
              Powered by Midtrans Payment Gateway
            </p>

          </main>
        </div>
      </div>
    </>
  );
}