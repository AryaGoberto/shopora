// app/search/page.tsx
"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, X } from 'lucide-react';

// Data tiruan (mock) dari screenshot Anda
const dummyPopularSearches = [
  "Raket padel",
  "Monitor gaming",
  "Kemeja putih wanita",
  "Sepatu kanvas pria",
  "Casing Iphone 15 pro max",
  "Jam tangan olahraga",
  "Sandal Jepit",
];

export default function SearchPage() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useState(dummyPopularSearches);

  // Fungsi untuk menghapus satu item dari riwayat
  const handleRemoveItem = (itemToRemove: string) => {
    setSearchHistory(prevHistory => 
      prevHistory.filter(item => item !== itemToRemove)
    );
  };

  // Fungsi untuk menghapus semua riwayat
  const handleClearAll = () => {
    setSearchHistory([]);
  };

  return (
    // --- DIV YANG SUDAH DIPERBAIKI (TANPA KOMENTAR) ---
    <div className="h-screen bg-white text-gray-900 flex flex-col
                    md:h-auto
                    md:max-w-2xl
                    md:mx-auto
                    md:mt-12
                    md:rounded-xl
                    md:border
                    md:border-gray-200
                    md:shadow-lg"
    >
      
      {/* 1. Header: Tombol Kembali & Search Bar */}
      <header className="flex items-center gap-2 p-4 border-b border-gray-200">
        <button
          onClick={() => router.back()} // Menggunakan router untuk kembali
          className="p-2 text-gray-600 hover:text-gray-900 rounded-full"
          aria-label="Kembali"
        >
          <ArrowLeft size={24} />
        </button>
        
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2.5">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Find your favorite items"
            className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
          />
        </div>
      </header>

      {/* 2. Konten: Popular Searches */}
      <main className="p-4 md:pb-6">
        {/* Judul dan Tombol Clear All */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-base text-gray-800">
            Popular Searches
          </h2>
          <button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Daftar Riwayat Pencarian */}
        <div className="space-y-2">
          {searchHistory.map((item) => (
            <div 
              key={item} 
              className="flex justify-between items-center py-2"
            >
              <span className="text-sm text-gray-700">{item}</span>
              <button
                onClick={() => handleRemoveItem(item)}
                className="p-1 text-gray-500 hover:text-gray-800 rounded-full"
                aria-label={`Hapus ${item}`}
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}