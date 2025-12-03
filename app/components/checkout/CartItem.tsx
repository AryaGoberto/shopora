"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { CartItem as CartItemType } from "../../context/CartContext";

interface CartItemProps {
  item: CartItemType;
  
  // Definisi fungsi tetap meminta number (sesuai Context)
  onIncrease?: (id: number) => void; 
  onDecrease?: (id: number) => void;
  onRemove?: (id: number) => void;
  onUpdateQuantity?: (id: number, qty: number) => void;
  
  readOnly?: boolean;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onUpdateQuantity,
  readOnly = false
}: CartItemProps) {

  // --- PERBAIKAN DI SINI: Konversi ID ke Number ---
  const productId = Number(item.id); 

  const handleIncrease = () => {
    if (onUpdateQuantity) {
      onUpdateQuantity(productId, item.quantity + 1);
    } else if (onIncrease) {
      onIncrease(productId);
    }
  };

  const handleDecrease = () => {
    if (onUpdateQuantity) {
      onUpdateQuantity(productId, item.quantity - 1);
    } else if (onDecrease) {
      onDecrease(productId);
    }
  };

  const handleRemove = () => {
    if (onRemove) onRemove(productId);
  };
  // ------------------------------------------------

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Product Image */}
      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
        <Image
          src={item.image || "https://placehold.co/100"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg md:text-xl line-clamp-1">{item.name}</h3>
            
            {/* Tampilkan Size & Color jika ada */}
            <p className="text-sm text-gray-600 mt-1">
              Size: <span className="text-gray-500">
                {item.sizes && item.sizes.length > 0 ? item.sizes[0] : "Standard"}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Color: <span className="text-gray-500">
                {item.colors && item.colors.length > 0 ? item.colors[0] : "Standard"}
              </span>
            </p>
          </div>

          {/* Delete Action */}
          {!readOnly && (onRemove || onUpdateQuantity) && (
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 transition p-1"
              aria-label="Remove item"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">
            Rp {item.price.toLocaleString("id-ID")}
          </span>

          {/* Quantity Update Action */}
          {readOnly ? (
             <span className="text-sm text-gray-600 font-medium">Qty: {item.quantity}</span>
          ) : (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 gap-4">
              <button
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
                className={`text-xl font-bold cursor-pointer ${
                  item.quantity <= 1 ? "text-gray-300" : "hover:text-gray-600"
                }`}
              >
                <Minus size={16} />
              </button>

              <span className="font-medium w-4 text-center">{item.quantity}</span>

              <button
                onClick={handleIncrease}
                className="text-xl font-bold cursor-pointer hover:text-gray-600"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}