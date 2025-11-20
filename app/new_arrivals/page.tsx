"use client";

import React, { useState } from 'react';
import { Search, ShoppingCart, User, Star, Mail, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Header from '../components/Header'; 

// --- TIPE DATA & MOCK DATA ---
interface Product {
  id: number;
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
}

const products: Product[] = [
    // Data produk sesuai dengan screenshot
  { id: 1, title: "Vertical Striped Shirt", rating: 5.0, price: 212, originalPrice: 232, discount: 20, image: "/api/placeholder/300/300" },
  { id: 2, title: "Courage Graphic T-shirt", rating: 4.8, price: 145, image: "/api/placeholder/300/300" },
  { id: 3, title: "Loose Fit Bermuda Shorts", rating: 3.6, price: 80, image: "/api/placeholder/300/300" },
  { id: 4, title: "Slim Fit Sweater", rating: 4.2, price: 180, originalPrice: 200, discount: 10, image: "/api/placeholder/300/300" },
];

// --- KOMPONEN HELPER (STAR RATING DENGAN DESIMAL) ---
const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const fractionalPart = rating % 1;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />);
    }

    if (fractionalPart > 0) {
        stars.push(
            <div key="partial" className="relative">
                <Star size={16} className="text-gray-300" /> 
                <Star 
                    size={16} 
                    className="fill-yellow-400 text-yellow-400 absolute top-0 left-0 overflow-hidden" 
                    style={{ width: `${fractionalPart * 100}%` }}
                />
            </div>
        );
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }

    return (
      <div className="flex items-center space-x-1">
        {stars}
        <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}/5</span>
      </div>
    );
};


// --- KOMPONEN BANNER KHUSUS UNTUK NEW ARRIVALS (DIPERBAIKI) ---
const NewArrivalsBanner = () => (
    <section className="mt-6">
        {/* Banner Utama: SATU blok abu-abu besar dengan dua bagian vertikal, tanpa grid 5 kolom */}
        <div className="rounded-xl overflow-hidden bg-[#F0EEED] shadow-sm">
            
            {/* Bagian Atas: Abu-abu muda dengan Teks */}
            <div className="h-48 flex items-center justify-center bg-gray-200">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    New Arrivals
                </h2>
            </div>

            {/* Bagian Bawah: Abu-abu kosong */}
            <div className="h-48 bg-[#F0EEED]">
                {/* Kosong */}
            </div>
        </div>
    </section>
);


// --- KOMPONEN PRODUCT GRID (Diambil dari kode Anda) ---
const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => (
    <section className="py-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-12">
            {products.map((product) => (
                <div key={product.id} className="flex flex-col group cursor-pointer">
                    {/* Placeholder Image */}
                    <div className="bg-[#F0EEED] rounded-2xl aspect-square mb-4 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                           [Product Image]
                        </div>
                    </div>
                    
                    {/* Rating dan Detail Produk */}
                    <div className="mb-1">
                        <StarRating rating={product.rating} />
                    </div>
                    <h4 className="font-bold text-lg mb-1 truncate">{product.title}</h4>
                    
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                        {product.discount && (
                            <span className="bg-red-100 text-red-500 text-xs font-medium px-2 py-1 rounded-full">
                                -{product.discount}%
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center mt-12">
            <button className="border border-gray-300 rounded-full px-12 py-3 font-medium hover:bg-gray-100 transition">
                View All
            </button>
        </div>
    </section>
);


// --- KOMPONEN NEWSLETTER (Diambil dari kode Anda) ---
const NewsletterSection = () => (
    <section className="relative mt-20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="bg-blue-800 rounded-3xl px-6 py-10 md:px-16 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6" style={{ backgroundColor: '#1230AE' }}>
                <h2 className="text-3xl md:text-4xl font-black text-white max-w-lg uppercase leading-tight">
                    Stay upto date about our latest offers
                </h2>
                <div className="w-full md:w-auto flex flex-col gap-3 w-full max-w-sm">
                    <div className="bg-white rounded-full px-4 py-3 flex items-center">
                        <Mail className="text-gray-400 w-5 h-5 mr-2" />
                        <input type="email" placeholder="Enter your email address" className="outline-none w-full text-sm" />
                    </div>
                    <button className="bg-white text-black font-medium rounded-full px-4 py-3 w-full hover:bg-gray-100 transition">
                        Subscribe to Newsletter
                    </button>
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#F0F0F0] -z-0"></div>
    </section>
);


// --- DUMMY HEADER (Disertakan di sini karena Anda menggunakan import) ---
const HeaderComponent: React.FC<any> = ({ mobileMenuOpen, setMobileMenuOpen }) => (
    <header className="border-b sticky top-0 bg-white z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8">
                <div className="flex items-center"><h1 className="text-2xl font-bold text-blue-900" style={{ color: '#1230AE' }}>Shopora</h1><ShoppingCart size={24} className="text-blue-900" style={{ color: '#1230AE' }} /></div>
                <nav className="hidden lg:flex gap-6">
                    <a href="/on-sale">On Sale</a>
                    <a href="/new-arrivals" className="font-bold text-blue-900" style={{ color: '#1230AE' }}>New Arrivals</a> {/* AKTIF */}
                    <a href="/brands">Brands</a>
                </nav>
            </div>
            <div className="flex items-center gap-4 justify-end">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2" style={{ width: '300px' }}>
                    <Search className="text-gray-400" size={20} />
                    <input type="text" placeholder="Celana Panjang" className="bg-transparent outline-none ml-2 w-full text-sm"/>
                </div>
                <button><ShoppingCart size={24} /></button>
                <button><User size={24} /></button>
            </div>
        </div>
    </header>
);

// --- HALAMAN NEW ARRIVALS UTAMA ---
export default function NewArrivalsPage() {
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    return (
        <div className="min-h-screen bg-white font-sans">
            
            {/* 1. TOP BANNER */}
            <div className="bg-blue-900 text-white text-xs sm:text-sm py-2 text-center relative" style={{ backgroundColor: '#1230AE' }}>
                <p>
                    Sign up and get 20% off to your first order. <span className="font-bold underline cursor-pointer">Sign Up Now</span>
                </p>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hidden sm:block">✕</button>
            </div>

            {/* 2. NAVBAR */}
            <HeaderComponent mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

            <main className="max-w-7xl mx-auto px-6">
                
                {/* 3. BANNER NEW ARRIVALS (Diperbaiki) */}
                <NewArrivalsBanner />
                
                {/* 4. PRODUCT GRID */}
                <ProductGrid products={products} />
                
            </main>

            {/* 5. NEWSLETTER SECTION */}
            <NewsletterSection />

        </div>
    );
}