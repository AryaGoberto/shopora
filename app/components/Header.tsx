"use client";

import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl md:text-2xl font-bold">Shopora</h1>
            <nav className="hidden lg:flex gap-6">
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
              <a href="#" className="hover:text-gray-600">
                On Sale
              </a>
              <a href="#" className="hover:text-gray-600">
                New Arrivals
              </a>
              <a href="#" className="hover:text-gray-600">
                Brands
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-md w-full">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari produk..."
                className="bg-transparent border-none outline-none ml-2 w-full"
              />
            </div>
            <button className="hover:text-gray-600">
              <Search size={20} className="md:hidden" />
            </button>
            <button
              onClick={() => router.push("/login")}
              className="text-white px-4 md:px-6 py-2 rounded-full font-medium transition-colors text-sm md:text-base"
              style={{ backgroundColor: "#1230AE" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#0f2890")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1230AE")
              }
            >
              Login
            </button>
            <Link
              href="/signup"
              className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <nav className="flex flex-col p-4 gap-4">
            <a href="#" className="hover:text-gray-600">
              Shop
            </a>
            <a href="#" className="hover:text-gray-600">
              On Sale
            </a>
            <a href="#" className="hover:text-gray-600">
              New Arrivals
            </a>
            <a href="#" className="hover:text-gray-600">
              Brands
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
