'use client';

import React, { useState } from 'react';
import { ChevronLeft, Bell } from 'lucide-react';
import Link from 'next/link'; // <--- Wajib di-import

// --- TYPE DEFINITION ---
type OrderItem = {
  id: number;
  name: string;
  size: string;
  price: string;
  color: string;
  estDate?: string;     
  status?: string;      
  statusColor?: string; 
  isReviewed?: boolean; 
};

// --- 1. DATA MOCKUP: ONGOING ---
const ongoingOrders: OrderItem[] = [
  {
    id: 1,
    name: "Pedro Leather Shoes",
    size: "38",
    price: "Rp1.500.000",
    estDate: "September 15 - 17, 2025",
    color: "bg-orange-100",
    status: "Track Order",
    statusColor: "text-blue-600"
  },
  {
    id: 2,
    name: "Red Blazer",
    size: "L",
    price: "Rp750.000",
    estDate: "September 15 - 17, 2025",
    color: "bg-red-100",
    status: "Track Order",
    statusColor: "text-blue-600"
  },
];

// --- 2. DATA MOCKUP: COMPLETED ---
const completedOrders: OrderItem[] = [
  {
    id: 101,
    name: "Pedro Leather Shoes",
    size: "38",
    price: "Rp1.500.000",
    color: "bg-orange-100",
    status: "Delivered",
    statusColor: "text-emerald-500"
  },
  {
    id: 102,
    name: "Red Blazer",
    size: "L",
    price: "Rp750.000",
    color: "bg-red-100",
    status: "Delivered",
    statusColor: "text-emerald-500"
  },
];

// --- 3. DATA MOCKUP: REVIEW ---
const reviewOrders: OrderItem[] = [
  {
    id: 201,
    name: "Pedro Leather Shoes",
    size: "38",
    price: "Rp1.500.000",
    color: "bg-orange-100",
    isReviewed: false 
  },
  {
    id: 202,
    name: "Red Blazer",
    size: "L",
    price: "Rp750.000",
    color: "bg-red-100",
    isReviewed: false 
  },
  {
    id: 203,
    name: "women Sunglass",
    size: "S",
    price: "Rp120.000",
    color: "bg-teal-100",
    isReviewed: true 
  },
  {
    id: 204,
    name: "Blue Diamond Guess",
    size: "S",
    price: "Rp12.000.000",
    color: "bg-gray-200",
    isReviewed: true 
  },
];

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState('Ongoing'); // Default ke Ongoing agar langsung terlihat

  // Selector Data
  const getDisplayData = () => {
    switch (activeTab) {
      case 'Ongoing': return ongoingOrders;
      case 'Complete': return completedOrders;
      case 'Review': return reviewOrders;
      default: return [];
    }
  };

  const displayData = getDisplayData();

  // --- LOGIKA TOMBOL ACTION (PERBAIKAN DI SINI) ---
  const renderAction = (item: OrderItem) => {
    // 1. Logika Tab ONGOING (Gunakan Link ke /track-order)
    if (activeTab === 'Ongoing') {
      return (
        <Link 
          href="/trackorder" 
          className="text-blue-600 font-bold text-xs sm:text-sm hover:underline cursor-pointer z-10"
        >
          Track Order
        </Link>
      );
    }

    // 2. Logika Tab REVIEW
    if (activeTab === 'Review') {
      if (item.isReviewed) {
        return <span className="text-gray-500 font-medium text-xs sm:text-sm">See Review</span>;
      } else {
        return (
          <button className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-200 transition">
            Review
          </button>
        );
      }
    }

    // 3. Logika Tab COMPLETE (Teks Status Biasa)
    return (
      <span className={`${item.statusColor} font-bold text-xs sm:text-sm`}>
        {item.status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 font-sans pb-10">
      
      {/* HEADER */}
      <header className="bg-white sticky top-0 z-20 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b border-gray-100 sm:shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 lg:text-xl">My Orders</h1>
        </div>
        <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition relative">
          <Bell className="w-5 h-5 text-gray-800" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        
        {/* TABS */}
        <div className="bg-[#F0F2F9] p-1.5 rounded-xl flex mb-8">
          {['Ongoing', 'Complete', 'Review'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200
                ${activeTab === tab 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ORDER LIST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex gap-4 items-start relative group"
            >
              {/* Image Placeholder */}
              <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl shrink-0 ${item.color} relative overflow-hidden`}>
                {/* <Image src="..." /> */}
              </div>

              {/* Content Area */}
              <div className="flex-1 flex flex-col h-full min-h-[6rem] justify-center relative">
                
                {/* Header: Nama & Action (Desktop) */}
                <div className="flex justify-between items-start mb-1">
                  <div className="pr-2">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-xs">Size : {item.size}</p>
                  </div>
                  
                  {/* Action Button (Desktop: Top Right) */}
                  <div className="hidden sm:block shrink-0">
                    {renderAction(item)}
                  </div>
                </div>

                {/* Footer: Harga & Action (Mobile) */}
                <div className="mt-2 sm:mt-auto">
                   <div className="flex justify-between items-end">
                      <p className="font-bold text-gray-900 text-sm sm:text-lg">{item.price}</p>
                      
                      {/* Action Button (Mobile: Bottom Right aligns with Price) */}
                      <div className="sm:hidden mb-0.5">
                        {renderAction(item)}
                      </div>
                   </div>
                   
                   {/* Estimasi Tanggal (Hanya Ongoing) */}
                   {item.estDate && (
                     <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                       Estimated delivery : {item.estDate}
                     </p>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayData.length === 0 && (
           <div className="text-center py-20 text-gray-400">
              <p>No orders found in {activeTab}</p>
           </div>
        )}

      </main>
    </div>
  );
}