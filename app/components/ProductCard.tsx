import React from "react";
import { Star } from "lucide-react";
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  rating?: number;
}
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    );
  }
  if (hasHalfStar) {
    stars.push(
      <Star
        key="half"
        className="w-4 h-4 fill-yellow-400 text-yellow-400"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      />
    );
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
  }
  return stars;
};
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
    <div className="bg-white rounded-xl h-48 flex items-center justify-center text-6xl mb-4">
      {product.image}
    </div>
    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
    <div className="flex items-center gap-1 mb-2">
      {product.rating && renderStars(product.rating)}
      <span className="text-sm text-gray-600 ml-1">{product.rating}/5</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="font-bold text-xl">${product.price}</span>
      {product.originalPrice && (
        <>
          <span className="text-gray-400 line-through">
            ${product.originalPrice}
          </span>
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            {product.discount}
          </span>
        </>
      )}
    </div>
  </div>
);

export default ProductCard;
