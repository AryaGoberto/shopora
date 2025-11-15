// app/components/ProductSection.tsx
import React from "react";
import ProductCard from "./ProductCard"; // Import ProductCard

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  rating?: number;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => (
  <section className="max-w-7xl mx-auto px-4 py-16">
    <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    <div className="text-center">
      <button className="border-2 border-gray-200 px-12 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
        View All
      </button>
    </div>
  </section>
);

export default ProductSection;
