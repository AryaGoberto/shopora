"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, X, History, ArrowRight } from "lucide-react"; // Tambah icon History & ArrowRight
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false); // State baru untuk fokus search
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Data dummy untuk history pencarian
  const searchHistory = [
    "Kemeja Flanel",
    "Sepatu Sneakers Pria",
    "Jaket Denim",
    "Celana Chino",
    "Jam Tangan",
  ];

  // Fungsi untuk menutup mode pencarian
  const closeSearch = () => {
    setIsSearchFocused(false);
    if (inputRef.current) inputRef.current.blur();
  };

  return (
    <>
      {/* 1. Overlay Gelap (Muncul saat search focused) */}
      {isSearchFocused && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 backdrop-blur-sm"
          onClick={closeSearch} // Klik background untuk tutup
        />
      )}

      <header className="border-b sticky top-0 bg-white z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* LOGO & NAVIGASI KIRI */}
            {/* Jika search aktif, navigasi disembunyikan di desktop agar search bar bisa memanjang */}
            <div className={`flex items-center ${isSearchFocused ? 'w-auto' : 'gap-4 md:gap-8'}`}>
              <button
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <h1 className="text-xl md:text-2xl font-bold whitespace-nowrap">Shopora</h1>

              {/* Navigasi: Hilang jika Search Focused */}
              {!isSearchFocused && (
                <nav className="hidden lg:flex gap-6 animate-in fade-in duration-200">
                  <a
                    href="#"
                    className="hover:text-gray-600 flex items-center gap-1"
                  >
                    Shop
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-gray-600">On Sale</a>
                  <a href="#" className="hover:text-gray-600">New Arrivals</a>
                  <a href="#" className="hover:text-gray-600">Brands</a>
                </nav>
              )}
            </div>

            {/* SEARCH BAR & ACTION BUTTONS */}
            <div className={`flex items-center gap-2 md:gap-4 justify-end transition-all duration-300 ${isSearchFocused ? 'flex-1' : 'flex-1 md:flex-none'}`}>
              
              {/* Container Search Bar */}
              <div className={`relative flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 ${isSearchFocused ? 'w-full' : 'w-full max-w-md hidden md:flex'}`}>
                <Search className={`text-gray-400 transition-colors ${isSearchFocused ? 'text-blue-600' : ''}`} size={20} />
                
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Cari produk..."
                  className="bg-transparent border-none outline-none ml-2 w-full text-gray-800 placeholder-gray-500"
                  onFocus={() => setIsSearchFocused(true)}
                  // Catatan: onBlur tidak dipakai langsung agar kita bisa klik item history
                />

                {/* Tombol Close kecil di dalam search bar jika aktif */}
                {isSearchFocused && (
                  <button onClick={closeSearch} className="ml-2 text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                )}

                {/* --- DROPDOWN HISTORY PENCARIAN --- */}
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden p-2 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Riwayat Pencarian
                    </div>
                    <ul>
                      {searchHistory.map((item, index) => (
                        <li key={index}>
                          <button 
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center justify-between group transition-colors"
                            onClick={() => {
                              console.log("Mencari:", item);
                              closeSearch();
                            }}
                          >
                            <div className="flex items-center gap-3 text-gray-700 group-hover:text-blue-600">
                              <History size={16} className="text-gray-400 group-hover:text-blue-600" />
                              <span>{item}</span>
                            </div>
                            <ArrowRight size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tombol Search Mobile (Hanya muncul jika search tidak aktif) */}
              {!isSearchFocused && (
                <button 
                  className="hover:text-gray-600 md:hidden"
                  onClick={() => setIsSearchFocused(true)}
                >
                  <Search size={20} />
                </button>
              )}

              {/* Tombol Login/Signup (Tetap ada atau bisa disembunyikan juga jika mau Full Width total) */}
              {/* Disini saya biarkan tetap ada, tapi jika layar kecil mungkin akan sempit. 
                  Opsional: Anda bisa membungkus ini dengan {!isSearchFocused && (...)} jika ingin search bar benar-benar full screen.
              */}
              <div className={`flex items-center gap-2 md:gap-4 ${isSearchFocused ? 'hidden sm:flex' : 'flex'}`}>
                <button
                  onClick={() => router.push("/login")}
                  className="text-white px-4 md:px-6 py-2 rounded-full font-medium transition-colors text-sm md:text-base whitespace-nowrap"
                  style={{ backgroundColor: "#1230AE" }}
                >
                  Login
                </button>
                <Link
                  href="/signup"
                  className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800 whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Standard */}
        {mobileMenuOpen && !isSearchFocused && (
          <div className="lg:hidden border-t bg-white">
            <nav className="flex flex-col p-4 gap-4">
              <a href="#" className="hover:text-gray-600">Shop</a>
              <a href="#" className="hover:text-gray-600">On Sale</a>
              <a href="#" className="hover:text-gray-600">New Arrivals</a>
              <a href="#" className="hover:text-gray-600">Brands</a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;