"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { calculateOrderTotal } from '../lib/config';
import { saveOrder } from '../lib/firestoreService';
import { auth } from '../lib/firebase';
import Header from '../components/common/Header';
import Footer from '../components/common/footer';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [hasOrderBeenSaved, setHasOrderBeenSaved] = useState(false);
  const [invoiceNumber] = useState(`INV-${Date.now()}`);

  const { subtotal, discount, deliveryFee, total } = calculateOrderTotal(totalPrice);

  // Save order to Firestore - only once
  useEffect(() => {
    const saveOrderToFirestore = async () => {
      // Only save if cart has items and order hasn't been saved yet
      if (cart.length === 0 || hasOrderBeenSaved) {
        console.log('⏭️ Skipping save - cart empty or already saved');
        return;
      }

      try {
        console.log('📝 Saving order to Firestore...');
        console.log('Cart items:', cart.length);
        
        // Get current user - might need to wait a bit for auth to initialize
        const user = auth.currentUser;
        if (!user) {
          console.error('❌ User not authenticated. Waiting for auth...');
          // Retry after 1 second
          setTimeout(() => saveOrderToFirestore(), 1000);
          return;
        }
        
        console.log('✅ User authenticated:', user.uid);
        
        // Prepare order data
        const orderData = {
          userId: user.uid,
          items: cart,
          totalPrice: total,
          subtotal: subtotal,
          discount: discount,
          deliveryFee: deliveryFee,
          paymentMethod: 'fake-payment',
          invoiceNumber: invoiceNumber,
          status: 'confirmed',
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID'),
        };

        console.log('Order data:', orderData);

        // Save to Firestore
        const orderId = await saveOrder(orderData);
        console.log('✅ Order saved successfully with ID:', orderId);
        
        // Mark as saved to prevent duplicate saves
        setHasOrderBeenSaved(true);
        
        // Clear cart after successful save
        clearCart();
        
      } catch (error) {
        console.error('❌ Error saving order:', error);
      }
    };

    saveOrderToFirestore();
  }, [cart, hasOrderBeenSaved, total, subtotal, discount, deliveryFee, invoiceNumber, clearCart]);

  // Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-b from-green-50 to-gray-50 flex items-center justify-center px-4 py-20">
        
        <div className="bg-white rounded-3xl p-12 max-w-lg shadow-2xl border border-green-100 text-center">
          
          {/* Success Icon */}
          <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>

          {/* Main Text */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pembayaran Berhasil!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Terima kasih telah berbelanja di Shopora. Pesanan Anda akan segera diproses.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Status Pesanan</span>
                <span className="font-bold text-green-600">Dikonfirmasi ✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Waktu Transaksi</span>
                <span className="font-bold text-gray-900">{new Date().toLocaleString('id-ID')}</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="text-gray-600">Nomor Invoice</span>
                <span className="font-mono font-bold text-gray-900">INV-{Date.now()}</span>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <p className="text-sm text-gray-600 mb-8">
            Email konfirmasi telah dikirim ke alamat Anda. Anda dapat melacak pesanan di halaman Order.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/order')}
              className="w-full bg-[#1230AE] text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition flex items-center justify-center gap-2"
            >
              Lihat Pesanan Saya
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-100 text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-200 transition"
            >
              Lanjut Belanja
            </button>
          </div>

          {/* Auto Redirect Info */}
          <p className="text-xs text-gray-500 mt-8">
            Halaman akan diarahkan ke beranda dalam beberapa detik...
          </p>

        </div>

      </div>
      <Footer />
    </>
  );
}
