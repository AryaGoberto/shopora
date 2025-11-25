"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAdmin } from "../../context/AdminContext";

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

  // Real auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const [authLoaded, setAuthLoaded] = useState(false);

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

  // Subscribe to Firebase Auth state
  useEffect(() => {
    // Fast-path: if auth already has a cached user, use it immediately
    const cached = auth.currentUser;
    if (cached) {
      setIsLoggedIn(true);
      setAuthLoaded(true);
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setAuthLoaded(true);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Profile dropdown state and outside-click handler
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      // Close profile dropdown if click outside
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      // Close notifications dropdown if click outside
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);
  // Close dropdown on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // --- Komponen Aksi Pengguna (Conditional Rendering) ---

  // 1. Tampilan saat User SUDAH Login
  const UserLoggedInActions = (
    <div
      className={`flex items-center gap-1 md:gap-3 transition-all duration-150 ease-out origin-right ${
        isSearchFocused
          ? "hidden sm:flex scale-90 opacity-0 w-0 overflow-hidden"
          : "flex scale-100 opacity-100 w-auto"
      }`}
    >
      <Link href="/cart" className="hover:text-[#1230AE] text-gray-700 p-2 rounded-md transition-colors">
        <ShoppingCart size={20} />
      </Link>

      <Link
        href="/messages"
        className="hover:text-[#1230AE] text-gray-700 hidden sm:block p-2 rounded-md transition-colors"
      >
        <MessageSquare size={20} />
      </Link>

      {/* Notifications dropdown (popup bar) */}
      <div ref={notificationsRef} className="relative">
        <button
          onClick={() => setNotificationsOpen((s) => !s)}
          className="hover:text-[#1230AE] text-gray-700 p-2 rounded-md transition-colors"
          aria-expanded={notificationsOpen}
          aria-haspopup="menu"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        {notificationsOpen && (
          <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-lg z-50 ring-1 ring-black ring-opacity-10">
            <div className="px-4 py-3 text-sm text-gray-600">No notifications yet</div>
          </div>
        )}
      </div>

      {/* Profile button + dropdown */}
      <div ref={profileRef} className="relative">
        <button
          onClick={() => setProfileOpen((s) => !s)}
          className="rounded-full hover:bg-gray-100 p-1.5 transition-colors"
          aria-expanded={profileOpen}
          aria-haspopup="menu"
        >
          <UserCircle size={28} className="text-[#1230AE]" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-50 ring-1 ring-black ring-opacity-10 py-1">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
              onClick={() => setProfileOpen(false)}
            >
              Account
            </Link>
            <Link
              href="/order"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
              onClick={() => setProfileOpen(false)}
            >
              Orders
            </Link>
            {isAdmin && !isAdminLoading && (
              <Link
                href="/admin/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                onClick={() => setProfileOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <div className="border-t border-gray-200 my-1" />
            <button
              onClick={() => {
                setProfileOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // 2. Tampilan saat User BELUM Login
  const UserLoggedOutActions = (
    <div
      className={`flex items-center gap-2 md:gap-3 transition-all duration-150 ease-out origin-right ${
        isSearchFocused
          ? "hidden sm:flex scale-90 opacity-0 w-0 overflow-hidden"
          : "flex scale-100 opacity-100 w-auto"
      }`}
    >
      {/* Show Admin link only when not logged in (regular users shouldn't see it when logged in) */}
      <Link
        href="/admin/login"
        className="text-xs md:text-sm text-gray-600 hover:text-[#1230AE] transition-colors font-medium"
      >
        Admin
      </Link>
      <button
        onClick={() => router.push("/login")}
        className="px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm whitespace-nowrap border-2 border-[#1230AE] font-semibold text-[#1230AE] hover:bg-blue-50 transition-colors"
      >
        Login
      </button>
      <button
        onClick={() => router.push("/signup")}
        className="text-white px-3 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap hover:opacity-90 transition-opacity"
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
      <header className="sticky top-0 bg-white z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-3 md:gap-4">
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
              className={`flex items-center gap-2 justify-end transition-all duration-150 ease-out ${
                isSearchFocused ? "flex-1" : "flex-1 md:flex-none"
              }`}
            >
              {/* Search Bar Container (TIDAK BERUBAH) */}
              <div
                className={`relative flex items-center bg-gray-100 rounded-full px-3 md:px-4 py-2 transition-all duration-150 ease-out ${
                  isSearchFocused
                    ? "w-full shadow-md ring-2 ring-blue-100"
                    : "w-full max-w-md hidden md:flex"
                }`}
              >
                <Search
                  className={`transition-colors duration-150 flex-shrink-0 ${
                    isSearchFocused ? "text-blue-600" : "text-gray-400"
                  }`}
                  size={18}
                />

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Cari produk (contoh: jacket, ring)..."
                  className="bg-transparent border-none outline-none ml-2 w-full text-gray-800 placeholder-gray-500 text-sm"
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
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-opacity duration-150 flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                )}

                {/* Search History Dropdown */}
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden p-1 animate-in fade-in zoom-in-95 duration-150 z-10">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Riwayat Pencarian
                    </div>
                    <ul>
                      {searchHistory.map((item, index) => (
                        <li key={index}>
                          <button
                            className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-md flex items-center justify-between group transition-colors duration-100 text-sm"
                            onClick={() => handleSearch(item)}
                          >
                            <div className="flex items-center gap-2 text-gray-700 group-hover:text-blue-600">
                              <History
                                size={14}
                                className="text-gray-400 group-hover:text-blue-600"
                              />
                              <span>{item}</span>
                            </div>
                            <ArrowRight
                              size={14}
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
                  className="hover:text-gray-600 md:hidden p-2"
                  onClick={() => setIsSearchFocused(true)}
                >
                  <Search size={18} />
                </button>
              )}

              {/* 🎯 LOGIKA BERSYARAT (CONDITIONAL RENDERING) DI SINI */}
              {authLoaded ? (isLoggedIn ? UserLoggedInActions : UserLoggedOutActions) : null}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
