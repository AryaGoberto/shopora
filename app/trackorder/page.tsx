'use client';

import React from 'react';
import { ChevronLeft, Bell, Phone, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Data Mockup Timeline
const trackingSteps = [
  {
    status: "Packing",
    date: "12 Aug 2025",
    desc: "Suite 756 031 Ines Riverway, Rhiannon...",
    isCompleted: true,
    isLast: false
  },
  {
    status: "Picked",
    date: "12 Aug 2025",
    desc: "3 / 621 Juvenal Ridge, Port Vestaches...",
    isCompleted: true,
    isLast: false
  },
  {
    status: "In Transit",
    date: "14 Aug 2025",
    desc: "0 / 77 Purdy Crescent, West Arthur",
    isCompleted: true, // Status saat ini
    isLast: false
  },
  {
    status: "Delivered",
    date: "est. 16 Aug 2025",
    desc: "Jl. Sudirman Kav. 5, Jakarta Pusat, 10...",
    isCompleted: false, 
    isLast: true
  }
];

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* 1. HEADER */}
      <header className="bg-white sticky top-0 z-30 px-4 h-16 flex items-center justify-between shadow-sm border-b border-gray-100">
        {/* PERUBAHAN DI SINI: href mengarah ke /orders */}
        <Link href="/order" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Track Order</h1>
        <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition relative">
          <Bell className="w-5 h-5 text-gray-800" />
        </button>
      </header>

      {/* 2. MAIN CONTENT (MAP & SHEET) */}
      <main className="flex-1 flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto lg:w-full lg:p-6 lg:gap-8 overflow-hidden">
        
        {/* === AREA PETA (MAP) === */}
        <div className="relative w-full h-[45vh] lg:h-auto lg:flex-1 lg:rounded-3xl lg:overflow-hidden bg-gray-200">
          {/* Gambar Peta Placeholder */}
          <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/img/osm-intl,12,23.8103,90.4125,1000x1000.png')] bg-cover bg-center opacity-80"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none"></div>

          {/* Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="relative">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-ping absolute"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg relative z-10"></div>
                <div className="bg-white px-3 py-1 rounded-lg shadow-md text-xs font-bold absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  Dhaka
                </div>
             </div>
          </div>
        </div>

        {/* === AREA STATUS (SHEET) === */}
        <div className="flex-1 bg-white relative -mt-6 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] lg:mt-0 lg:rounded-3xl lg:shadow-sm lg:border lg:border-gray-100 flex flex-col">
          
          {/* Drag Handle (Mobile Only) */}
          <div className="w-full flex justify-center pt-3 pb-1 lg:hidden">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
          </div>

          <div className="p-6 pt-2 lg:p-8 flex flex-col h-full">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-gray-800 text-lg">Order Status</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TIMELINE */}
            <div className="flex-1">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex gap-4 relative pb-8 last:pb-0">
                  
                  {!step.isLast && (
                    <div 
                      className={`absolute left-[11px] top-8 bottom-0 w-[2px] 
                      ${step.isCompleted ? 'bg-emerald-500' : 'border-l-2 border-dashed border-gray-300'}`} 
                    />
                  )}

                  <div className="relative z-10 shrink-0 mt-1">
                    {step.isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-[3px] border-white shadow-sm ring-1 ring-emerald-500">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300"></div>
                    )}
                  </div>

                  <div className="-mt-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="font-bold text-gray-900 text-sm">{step.status}</h3>
                      <span className="text-gray-400 text-xs">({step.date})</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 my-6"></div>

            {/* COURIER INFO */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-gray-200">
                   <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Driver" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Mami Papi</h4>
                  <p className="text-gray-500 text-xs">Delivery Guy</p>
                </div>
              </div>

              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition text-gray-700">
                <Phone className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}