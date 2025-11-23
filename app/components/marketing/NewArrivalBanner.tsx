// app/components/NewArrivalsBanner.tsx
import React from "react";

// Karena tidak ada state atau hooks, ini bisa menjadi Server Component (default)
const NewArrivalsBanner: React.FC = () => (
  <section className="mt-6 max-w-7xl mx-auto px-6">
    {/* Banner Utama: SATU blok abu-abu besar dengan dua bagian vertikal */}
    <div className="rounded-xl overflow-hidden bg-[#F0EEED] shadow-sm">
      {/* Bagian Atas: Abu-abu muda dengan Teks */}
      <div className="h-48 flex items-center justify-center bg-gray-200">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          New Arrivals
        </h2>
      </div>
      {/* Bagian Bawah: Abu-abu kosong */}
      <div className="h-48 bg-[#F0EEED]">{/* Kosong */}</div>
    </div>
  </section>
);

export default NewArrivalsBanner;
