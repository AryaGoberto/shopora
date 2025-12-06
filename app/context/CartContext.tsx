"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../lib/types"; 

// --- PERBAIKAN ADA DI SINI (TAMBAH KATA 'export') ---
export interface CartItem extends Product {
  quantity: number;
}
// ----------------------------------------------------

// 1. UPDATE DAFTAR MENU (INTERFACE)
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, qty: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load dari LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("shopora-cart");
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    setIsLoaded(true);
  }, []);

  // Simpan ke LocalStorage
  useEffect(() => {
    if (isLoaded) localStorage.setItem("shopora-cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  // Fungsi Tambah
  const addToCart = (product: Product, qty = 1, color?: string, size?: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id == product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id == product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      const newColors = color ? [color] : (product.colors || []);
      const newSizes = size ? [size] : (product.sizes || []);

      return [...prev, { ...product, quantity: qty, colors: newColors, sizes: newSizes }];
    });
  };

  // 2. FUNGSI HAPUS (REMOVE)
  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id != id));
  };

  // 3. FUNGSI UPDATE JUMLAH (QTY)
  const updateQuantity = (id: string | number, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        // Bandingkan dengan loose equality untuk mengatasi type mismatch string/number
        item.id == id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("shopora-cart");
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        totalPrice, 
        totalItems 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart error");
  return context;
};