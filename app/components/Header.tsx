"use client";

import React, { useState, useRef } from "react";
import { Search, Menu, X, History, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchHistory = [
    "Mens Casual",
    "Jewelery",
    "White Gold",
    "SanDisk",
  ];

  // --- PERBAIKAN 1: Reset text saat close ---
  const closeSearch = () => {
    setIsSearchFocused(false);
    setSearchTerm(""); // Reset text jadi kosong
    if (inputRef.current) inputRef.current.blur();
  };

  const handleSearch = (term: string) => {
    if (term.trim()) {
      router.push(`/search?q=${encodeURIComponent(term)}`);
      closeSearch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-200 ease-out ${
          isSearchFocused ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeSearch}
      />

      <header className="border-b sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            
            <div className={`flex items-center transition-all duration-150 ease-out ${isSearchFocused ? 'w-auto' : 'gap-4 md:gap-8'}`}>
              <button
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <Link href="/" className="text-xl md:text-2xl font-bold whitespace-nowrap cursor-pointer">Shopora</Link>

              <nav className={`hidden lg:flex gap-6 transition-opacity duration-100 ${isSearchFocused ? 'opacity-0 hidden' : 'opacity-100 flex'}`}>
                <Link href="/" className="hover:text-gray-600">Shop</Link>
                <Link href="/" className="hover:text-gray-600">On Sale</Link>
                <Link href="/" className="hover:text-gray-600">New Arrivals</Link>
                <Link href="/" className="hover:text-gray-600">Brands</Link>
              </nav>
            </div>

            <div className={`flex items-center gap-2 md:gap-4 justify-end transition-all duration-150 ease-out ${isSearchFocused ? 'flex-1' : 'flex-1 md:flex-none'}`}>
              
              <div className={`relative flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-150 ease-out ${isSearchFocused ? 'w-full shadow-md ring-2 ring-blue-100' : 'w-full max-w-md hidden md:flex'}`}>
                <Search className={`transition-colors duration-150 ${isSearchFocused ? 'text-blue-600' : 'text-gray-400'}`} size={20} />
                
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Cari produk (contoh: jacket, ring)..."
                  className="bg-transparent border-none outline-none ml-2 w-full text-gray-800 placeholder-gray-500"
                  onFocus={() => setIsSearchFocused(true)}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                {isSearchFocused && (
                  <button 
                    onClick={() => {
                      if (searchTerm.length > 0){
                        setSearchTerm("");
                        inputRef.current?.focus();
                      } else {
                        closeSearch();
                      }
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-opacity duration-150"
                    >
                      <X size={18} />
                    </button>
                )}

                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden p-2 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Riwayat Pencarian
                    </div>
                    <ul>
                      {searchHistory.map((item, index) => (
                        <li key={index}>
                          <button 
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center justify-between group transition-colors duration-100"
                            onClick={() => handleSearch(item)}
                          >
                            <div className="flex items-center gap-3 text-gray-700 group-hover:text-blue-600">
                              <History size={16} className="text-gray-400 group-hover:text-blue-600" />
                              <span>{item}</span>
                            </div>
                            <ArrowRight size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {!isSearchFocused && (
                <button className="hover:text-gray-600 md:hidden" onClick={() => setIsSearchFocused(true)}>
                  <Search size={20} />
                </button>
              )}
              
              <div className={`flex items-center gap-2 md:gap-4 transition-all duration-150 ease-out origin-right ${isSearchFocused ? 'hidden sm:flex scale-90 opacity-0 w-0 overflow-hidden' : 'flex scale-100 opacity-100 w-auto'}`}>
                <button onClick={() => router.push("/login")} className="text-white px-4 md:px-6 py-2 rounded-full font-medium text-sm md:text-base whitespace-nowrap" style={{ backgroundColor: "#1230AE" }}>Login</button>
                <Link href="/signup" className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800 whitespace-nowrap">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;