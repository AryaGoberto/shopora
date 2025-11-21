"use client";

import React, { useState } from 'react';
import { Search, ShoppingCart, User, Star, Mail, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Header from '../components/Header'; 
import TopBanner from '../components/TopBanner';
import Newsletter from '../components/NewsLetter';
import Footer from '../components/footer';

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


//--- HALAMAN NEW ARRIVALS UTAMA ---
export default function NewArrivalsPage() {
        
    return (
        <div className="min-h-screen bg-white font-sans">
            
            {/* 1. TOP BANNER */}
            <TopBanner />

            {/* 2. NAVBAR */}
            <Header/>

            <main className="max-w-7xl mx-auto px-6">
                
                {/* 3. BANNER NEW ARRIVALS (Diperbaiki) */}
                <NewArrivalsBanner />
                
                {/* 4. PRODUCT GRID */}
                <ProductGrid products={products} />
                
            </main>

            {/* 5. NEWSLETTER SECTION */}
            <Newsletter/>
            <Footer/>

        </div>
    );
}