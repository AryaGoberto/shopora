"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Components / Icons
import {
  Search,
  Menu,
  X,
  History,
  ArrowRight,
  ShoppingCart, // Tambahan: Icon Keranjang
  MessageSquare, // Tambahan: Icon Pesan
  Bell, // Tambahan: Icon Notifikasi
  UserCircle, // Tambahan: Icon Profil
} from "lucide-react";

// Local Imports
import { playfair } from "../../lib/font";

const Header: React.FC = () => {
  // --- State Hooks ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ⚡ Tambahan: State untuk status autentikasi (Mock/Contoh)
  // Dalam proyek nyata, ini harus diganti dengan Context atau data Autentikasi yang sebenarnya.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- Router & Refs ---
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // --- Data ---
  const searchHistory = ["Mens Casual", "Jewelery", "White Gold", "SanDisk"];

  // --- Handlers ---
  const closeSearch = () => {
    setIsSearchFocused(false);
    setSearchTerm("");
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

  // --- Komponen Aksi Pengguna (Conditional Rendering) ---

  // 1. Tampilan saat User SUDAH Login
  const UserLoggedInActions = (
    <div
      className={`flex items-center gap-2 md:gap-4 transition-all duration-150 ease-out origin-right ${
        isSearchFocused
          ? "hidden sm:flex scale-90 opacity-0 w-0 overflow-hidden"
          : "flex scale-100 opacity-100 w-auto"
      }`}
    >
      <Link href="/cart" className="hover:text-[#1230AE] text-gray-700">
        <ShoppingCart size={24} />
      </Link>
      <Link
        href="/messages"
        className="hover:text-[#1230AE] text-gray-700 hidden sm:block"
      >
        <MessageSquare size={24} />
      </Link>
      <Link
        href="/notifications"
        className="hover:text-[#1230AE] text-gray-700"
      >
        <Bell size={24} />
      </Link>
      <Link
        href="/profile"
        className="rounded-full hover:bg-gray-100 p-1 transition-colors"
      >
        <UserCircle size={30} className="text-[#1230AE]" />
      </Link>

      {/* 💡 Opsional: Tombol Logout untuk demo. Hapus atau pindahkan ke menu profil di produksi */}
      {/* <button onClick={() => setIsLoggedIn(false)} className="text-sm text-red-500 underline">
        Logout
      </button> */}
    </div>
  );

  // 2. Tampilan saat User BELUM Login
  const UserLoggedOutActions = (
    <div
      className={`flex items-center gap-2 md:gap-4 transition-all duration-150 ease-out origin-right ${
        isSearchFocused
          ? "hidden sm:flex scale-90 opacity-0 w-0 overflow-hidden"
          : "flex scale-100 opacity-100 w-auto"
      }`}
    >
      <button
        onClick={() => router.push("/login")}
        className=" px-4 md:px-5 py-2 rounded-xl  text-sm md:text-base whitespace-nowrap border-[#1230AE] font-bold text-[#1230AE] border-2"
      >
        Login
      </button>
      <button
        onClick={() => router.push("/signup")}
        className="text-white px-4 md:px-5 py-2 rounded-xl font-medium text-sm md:text-base whitespace-nowrap"
        style={{ backgroundColor: "#1230AE" }}
      >
        Sign Up
      </button>
    </div>
  );

  // --- JSX Render ---
  return (
    <>
      {/* 1. Backdrop Overlay untuk Search Focus */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-200 ease-out ${
          isSearchFocused
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeSearch}
      />

      {/* 2. Header Utama */}
      <header className="sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 py-5 md:py-6">
          <div className="flex items-center justify-between gap-4">
            {/* A. Logo & Navigation (Kiri) - TIDAK BERUBAH */}
            <div
              className={`flex items-center transition-all duration-150 ease-out ${
                isSearchFocused ? "w-auto" : "gap-4 md:gap-8"
              }`}
            >
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <div className="flex items-start gap-3">
                <Image
                  src="/logo_shopora.svg"
                  alt="Shopora Logo"
                  width={30}
                  height={30}
                />
                <Link
                  href="/"
                  className={`text-2xl font-bold text-[#1230AE] ${playfair.className}`}
                >
                  Shopora
                </Link>
              </div>

              {/* Desktop Navigation Links */}
              <nav
                className={`hidden lg:flex gap-6 transition-opacity duration-100 ${
                  isSearchFocused ? "opacity-0 hidden" : "opacity-100 flex"
                }`}
              >
                <Link
                  href="/onsale"
                  className="hover:text-[#1230AE] hover:underline transition-all duration-150"
                >
                  On Sale
                </Link>
                <Link
                  href="/new_arrivals"
                  className="hover:text-[#1230AE] hover:underline transition-all duration-150"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/brands"
                  className="hover:text-[#1230AE] hover:underline transition-all duration-150"
                >
                  Brands
                </Link>
              </nav>
            </div>

            {/* B. Search & User Actions (Kanan) */}
            <div
              className={`flex items-center gap-2 md:gap-4 justify-end transition-all duration-150 ease-out ${
                isSearchFocused ? "flex-1" : "flex-1 md:flex-none"
              }`}
            >
              {/* Search Bar Container (TIDAK BERUBAH) */}
              <div
                className={`relative flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-150 ease-out ${
                  isSearchFocused
                    ? "w-full shadow-md ring-2 ring-blue-100"
                    : "w-full max-w-md hidden md:flex"
                }`}
              >
                <Search
                  className={`transition-colors duration-150 ${
                    isSearchFocused ? "text-blue-600" : "text-gray-400"
                  }`}
                  size={20}
                />

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

                {/* Clear/Close Search Button */}
                {isSearchFocused && (
                  <button
                    onClick={() => {
                      if (searchTerm.length > 0) {
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

                {/* Search History Dropdown */}
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
                              <History
                                size={16}
                                className="text-gray-400 group-hover:text-blue-600"
                              />
                              <span>{item}</span>
                            </div>
                            <ArrowRight
                              size={16}
                              className="text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Mobile Search Icon (muncul saat tidak focus) */}
              {!isSearchFocused && (
                <button
                  className="hover:text-gray-600 md:hidden"
                  onClick={() => setIsSearchFocused(true)}
                >
                  <Search size={20} />
                </button>
              )}

              {/* 🎯 LOGIKA BERSYARAT (CONDITIONAL RENDERING) DI SINI */}
              {isLoggedIn ? UserLoggedInActions : UserLoggedOutActions}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
