// app/components/BrandsSection.tsx
import React from "react";

const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

const BrandsSection: React.FC = () => (
  <section className="py-8" style={{ backgroundColor: "#1230AE" }}>
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
        {brands.map((brand, index) => (
          <div key={index} className="text-white text-2xl font-bold">
            {brand}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BrandsSection;
