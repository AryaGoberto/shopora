"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Bell, Building2, Smartphone, CheckCircle2, Truck, CreditCard, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';

// Import Logic & Database
import { useCart } from '../context/CartContext'; // Pastikan path benar
import { db } from '../lib/firebase';

// --- DATA DUMMY DELIVERY ---
const deliveryOptionsData = [
  { id: 'jne', name: 'JNE Regular', price: 24000, est: '2-3 Hari' },
  { id: 'sicepat', name: 'SiCepat BEST', price: 35000, est: '1 Hari' },
  { id: 'gosend', name: 'GoSend Instant', price: 50000, est: '2 Jam' },
];

export default function CheckoutPage() {
  const router = useRouter();
  
  // 1. AMBIL DATA KERANJANG ASLI
  const { cart, totalPrice } = useCart(); 

  // STATE: ALAMAT
  const [address, setAddress] = useState({
    label: "Home",
    detail: "Jl. Sudirman Kav. 5, Jakarta Pusat, 10270"
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState(address.detail); 

  // STATE: PILIHAN USER
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptionsData[0]); 
  const [loading, setLoading] = useState(false);

  // 2. HITUNG HARGA DINAMIS (Bukan Hardcode lagi)
  const subTotal = totalPrice; // Ambil dari CartContext
  const discount = subTotal > 0 ? subTotal * 0.1 : 0; // Contoh diskon 10%
  const total = subTotal + selectedDelivery.price - discount;

  // HANDLE SIMPAN ALAMAT
  const handleSaveAddress = () => {
    setAddress({ ...address, detail: tempAddress });
    setIsAddressModalOpen(false);
  };

  // 3. HANDLE FINISH ORDER (LOGIKA MIDTRANS)
  const handleFinishOrder = async () => {
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    setLoading(true);

    try {
      // Siapkan data order
      const orderData = {
        items: cart,
        customer: {
          name: "Guest User", // Nanti bisa ambil dari Auth
          address: address.detail,
          phone: "08123456789" // Nanti bisa ambil dari inputan
        },
        delivery: selectedDelivery,
        subtotal: subTotal,
        discount: discount,
        deliveryFee: selectedDelivery.price,
        totalAmount: total, // PENTING: Ini yang dibayar
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Simpan ke Firebase
      const docRef = await addDoc(collection(db, "orders"), orderData);
      
      // Redirect ke Halaman Payment (yang ada Midtrans-nya)
      router.push(`/payment?orderId=${docRef.id}`);

    } catch (error) {
      console.error("Gagal checkout:", error);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  // Kalau keranjang kosong, redirect balik (Opsional)
  useEffect(() => {
    if (cart.length === 0) {
      // router.push('/'); // Uncomment kalau mau maksa balik
    }
  }, [cart, router]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10 relative">
      
      {/* HEADER */}
      <header className="bg-white sticky top-0 z-30 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 lg:text-xl">
            Checkout
          </h1>
        </div>
        <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition relative">
          <Bell className="w-5 h-5 text-gray-800" />
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI */}
          <div className="space-y-8 lg:col-span-7 xl:col-span-8">
            
            {/* 1. DELIVERY ADDRESS */}
            <section className="space-y-3">
              <div className="flex justify-between items-end">
                <h2 className="font-bold text-gray-800 text-sm lg:text-base">Delivery Address</h2>
                <button 
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  Change Address
                </button>
              </div>
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 transition hover:border-blue-200">
                <div className="mt-1 bg-gray-50 p-2 rounded-full shrink-0">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm lg:text-base">{address.label}</p>
                  <p className="text-xs lg:text-sm text-gray-500 mt-1 leading-relaxed">
                    {address.detail}
                  </p>
                </div>
              </div>
            </section>

            {/* 2. DELIVERY OPTIONS */}
            <section className="space-y-4">
              <h2 className="font-bold text-gray-800 text-sm lg:text-base">Delivery Options</h2>
              <div className="grid grid-cols-1 gap-4">
                {deliveryOptionsData.map((option) => (
                  <div 
                    key={option.id}
                    onClick={() => setSelectedDelivery(option)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center group
                      ${selectedDelivery.id === option.id 
                        ? 'border-blue-600 bg-blue-50 shadow-sm' 
                        : 'border-gray-100 bg-white hover:border-blue-200'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${selectedDelivery.id === option.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{option.name}</p>
                        <p className="text-xs text-gray-500">Est. {option.est}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm">Rp{option.price.toLocaleString('id-ID')}</p>
                      {selectedDelivery.id === option.id && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600 ml-auto mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. PAYMENT METHOD DIHAPUS (Karena akan pilih di Midtrans) */}
            <section className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-center">
               <CreditCard className="text-blue-600 w-5 h-5" />
               <p className="text-sm text-blue-800 font-medium">
                 Metode pembayaran akan dipilih di langkah selanjutnya (via Midtrans).
               </p>
            </section>

          </div>

          {/* KOLOM KANAN (SUMMARY) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white p-5 lg:p-6 rounded-2xl border border-gray-100 shadow-sm lg:sticky lg:top-24">
              <h2 className="font-bold text-gray-800 text-sm lg:text-lg mb-4 lg:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm lg:text-base">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Sub-total ({cart.length} items)</span>
                  <span className="font-bold text-gray-900">Rp{subTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-bold text-gray-900">Rp{selectedDelivery.price.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Discount (10%)</span>
                  <span className="font-bold text-red-500">-Rp{discount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 my-4 lg:my-6"></div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-900 text-sm lg:text-lg">Total</span>
                <span className="font-bold text-lg lg:text-2xl text-gray-900">Rp{total.toLocaleString('id-ID')}</span>
              </div>

              {/* TOMBOL FINISH ORDER */}
              <button 
                onClick={handleFinishOrder}
                disabled={loading || cart.length === 0}
                className={`w-full py-3.5 lg:py-4 rounded-xl font-bold text-sm lg:text-base shadow-lg transition-all active:scale-[0.98] flex justify-center items-center gap-2
                  ${loading || cart.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                    : 'bg-blue-700 text-white hover:bg-blue-800 shadow-blue-200'
                  }`}
              >
                {loading ? (
                  <> <Loader2 className="animate-spin" /> Processing... </>
                ) : (
                  "Finish Order & Pay"
                )}
              </button>

              <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                By clicking finish, you agree to our terms. Secure payment by Midtrans.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAL EDIT ALAMAT (TETAP SAMA) --- */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Change Address</h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label Alamat</label>
                <input 
                  type="text" 
                  value={address.label} 
                  disabled 
                  className="w-full p-3 bg-gray-100 rounded-lg text-sm text-gray-500 border border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detail Alamat</label>
                <textarea 
                  rows={3}
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Masukkan alamat lengkap..."
                />
              </div>
              <button 
                onClick={handleSaveAddress}
                className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition"
              >
                Simpan Alamat
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}