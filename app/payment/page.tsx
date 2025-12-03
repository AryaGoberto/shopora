// app/payment/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2 } from 'lucide-react';
import PaymentPopup from '../components/checkout/Payment'; // Import komponen popup kita

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-10">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Kontrol Popup

  // Ambil data order dari Firebase
  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrderData({ id: docSnap.id, ...docSnap.data() });
          setIsPopupOpen(true); // Langsung buka popup otomatis biar praktis
        } else {
          alert("Order tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetch order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader2 className="animate-spin" /></div>;
  if (!orderData) return <div className="text-center p-10">Data tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Tampilan Background (Ringkasan Dikit) */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Menunggu Pembayaran</h1>
        <p className="text-gray-500">Order ID: #{orderId}</p>
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="mt-4 text-blue-600 font-bold hover:underline"
        >
          Buka Ulang Popup Pembayaran
        </button>
      </div>

      {/* PANGGIL KOMPONEN POPUP YANG SUDAH KITA BIKIN TADI */}
      <PaymentPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        orderData={orderData} 
      />
    </div>
  );
}