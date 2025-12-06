"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../lib/types";

// Wishlist item hanya butuh product info, tanpa quantity
export interface WishlistItem extends Product {}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load dari LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("shopora-wishlist");
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading wishlist:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Simpan ke LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("shopora-wishlist", JSON.stringify(wishlist));
      console.log(`✅ Wishlist saved: ${wishlist.length} items`);
    }
  }, [wishlist, isLoaded]);

  // Tambah ke wishlist
  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id == product.id);
      if (exists) {
        console.log(`⚠️ Product already in wishlist: ${product.id}`);
        return prev;
      }
      console.log(`✅ Added to wishlist: ${product.name}`);
      return [...prev, product];
    });
  };

  // Hapus dari wishlist
  const removeFromWishlist = (id: string | number) => {
    setWishlist((prev) => {
      const found = prev.find((item) => item.id == id);
      console.log(`❌ Removed from wishlist: ${found?.name}`);
      return prev.filter((item) => item.id != id);
    });
  };

  // Check apakah product ada di wishlist
  const isInWishlist = (id: string | number): boolean => {
    return wishlist.some((item) => item.id == id);
  };

  // Clear semua wishlist
  const clearWishlist = () => {
    setWishlist([]);
    console.log("🗑️ Wishlist cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        totalItems: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    // Return safe default
    return {
      wishlist: [],
      addToWishlist: () => {},
      removeFromWishlist: () => {},
      isInWishlist: () => false,
      clearWishlist: () => {},
      totalItems: 0,
    } as WishlistContextType;
  }
  return context;
};
