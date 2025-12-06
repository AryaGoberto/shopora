'use client';

import React from 'react';
import { Heart, ShoppingCart, Trash2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Header from '../components/common/Header';
import { formatIDR } from '../lib/format';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 font-sans pb-10">
      {/* HEADER */}
      <header className="bg-white sticky top-0 z-20 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b border-gray-100 sm:shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 lg:text-xl">My Wishlist</h1>
        </div>
        <div className="text-sm text-gray-500">
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* EMPTY STATE */}
        {wishlist.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Wishlist Kosong</h3>
            <p className="text-gray-600 mb-6">Tambahkan produk favorit Anda ke wishlist</p>
            <Link href="/" className="inline-block text-blue-600 font-bold hover:underline">
              Mulai belanja →
            </Link>
          </div>
        ) : (
          <>
            {/* CLEAR ALL BUTTON */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  if (confirm('Hapus semua wishlist?')) {
                    clearWishlist();
                  }
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
              >
                <Trash2 size={16} />
                Hapus Semua
              </button>
            </div>

            {/* WISHLIST GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlist.map((product: any) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100 mb-4">
                    <Image
                      src={product.image || 'https://placehold.co/300'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2 mb-4">
                    {/* Brand */}
                    {product.brand && (
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        {product.brand}
                      </p>
                    )}

                    {/* Name */}
                    <Link href={`/detail/${product.id}`}>
                      <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.reviewCount || 0})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-lg font-bold text-blue-600">
                        {formatIDR(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatIDR(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* CONTINUE SHOPPING */}
            <div className="flex justify-center mt-8">
              <Link
                href="/"
                className="text-blue-600 font-bold hover:underline flex items-center gap-2"
              >
                ← Lanjut Belanja
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
