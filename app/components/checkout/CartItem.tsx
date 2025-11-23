import React from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Product Image */}
      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          // Ingat config next.config.ts untuk domain gambar eksternal
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg md:text-xl">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Size: <span className="text-gray-500">{item.size}</span>
            </p>
            <p className="text-sm text-gray-600">
              Color: <span className="text-gray-500">{item.color}</span>
            </p>
          </div>
          {/* Delete Action */}
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 transition p-1"
            aria-label="Remove item"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">${item.price}</span>

          {/* Quantity Update Action */}
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 gap-4">
            <button
              onClick={() => onDecrease(item.id)}
              disabled={item.quantity <= 1}
              className={`text-xl font-bold cursor-pointer ${
                item.quantity <= 1 ? "text-gray-300" : "hover:text-gray-600"
              }`}
            >
              <Minus size={16} />
            </button>

            <span className="font-medium w-4 text-center">{item.quantity}</span>

            <button
              onClick={() => onIncrease(item.id)}
              className="text-xl font-bold cursor-pointer hover:text-gray-600"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
