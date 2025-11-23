// app/components/ProductSection.tsx

import React from "react";
import ProductCard from "./ProductCard";
// Impor tipe data Product dari lokasi aslinya
import { Product } from "../../lib/types";

interface ProductSectionProps {
  title: string;
  products: Product[];
  // Tambahan: Agar bisa digunakan untuk link "View All"
  viewAllLink?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  viewAllLink,
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Tombol View All (Opsional) */}
      {viewAllLink && (
        <div className="text-center mt-10">
          <a
            href={viewAllLink}
            className="border-2 border-gray-200 px-12 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            View All
          </a>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
