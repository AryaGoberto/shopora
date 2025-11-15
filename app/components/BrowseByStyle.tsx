// app/components/BrowseByStyle.tsx
import React from "react";

const BrowseByStyle: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 py-16">
    <h2 className="text-4xl font-bold text-center mb-12">
      BROWSE BY DRESS STYLE
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Casual */}
      <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
        <span className="text-2xl font-bold">Casual</span>
      </div>
      {/* Card 2: Formal (md:col-span-2) */}
      <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center md:col-span-2 cursor-pointer hover:shadow-lg transition-shadow">
        <span className="text-2xl font-bold">Formal</span>
      </div>
      {/* Card 3: Party (md:col-span-2) */}
      <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center md:col-span-2 cursor-pointer hover:shadow-lg transition-shadow">
        <span className="text-2xl font-bold">Party</span>
      </div>
      {/* Card 4: Gym */}
      <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
        <span className="text-2xl font-bold">Gym</span>
      </div>
    </div>
  </section>
);

export default BrowseByStyle;
