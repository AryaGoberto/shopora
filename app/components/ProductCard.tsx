// components/ProductCard.tsx
import React from "react";
import { Star } from "lucide-react";
import { Product } from "../lib/types"; // Sesuaikan path import type kamu

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    );
  }
  return stars;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full group">
    {/* Gambar */}
    <div className="bg-white rounded-xl h-64 flex items-center justify-center mb-4 p-4 relative overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="object-contain h-full w-full mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
      />
      
      {/* LABEL DISKON (Opsional: muncul di atas gambar) */}
      {product.discount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.discount}
        </span>
      )}
    </div>

    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
    
    <div className="flex items-center gap-1 mb-2">
      {renderStars(product.rating || 0)}
      <span className="text-sm text-gray-600 ml-1">({product.rating || 0})</span>
    </div>

    {/* BAGIAN HARGA & CORETAN */}
    <div className="mt-auto flex items-center gap-2 flex-wrap">
      <span className="font-bold text-xl">${product.price}</span>
      
      {/* Ini Logika Coretannya */}
      {product.originalPrice && (
        <>
          <span className="text-gray-400 line-through text-sm">
            ${product.originalPrice}
          </span>
          {/* Label Diskon kecil di sebelah harga (opsional jika sudah ada di gambar) */}
          <span className="text-red-500 text-xs font-semibold bg-red-100 px-2 py-0.5 rounded-full">
            {product.discount}
          </span>
        </>
      )}
    </div>
  </div>
);

export default ProductCard;