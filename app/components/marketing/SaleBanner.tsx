// app/components/SaleBanner.tsx

import React from "react";

// Anda bisa membuat component ini menerima props jika ingin kontennya berubah
interface SaleBannerProps {
  // Misalnya, Anda ingin mengubah warna latar belakang secara dinamis
  bgColor?: string;
}

const SaleBanner: React.FC<SaleBannerProps> = ({
  bgColor = "bg-[#F2F0F1]",
}) => (
  // Gunakan props 'bgColor' di sini
  <section
    className={`${bgColor} rounded-xl p-8 md:p-16 my-6 flex flex-col md:flex-row items-center justify-center gap-8`}
  >
    {/* Kolom Kiri: Judul */}
    <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-black">
      ON SALE
    </h2>

    {/* Garis Pemisah Vertikal (Hanya terlihat di Desktop) */}
    <div className="hidden md:block w-px h-24 bg-gray-400 mx-4"></div>

    {/* Kolom Kanan: Kotak Promo */}
    <div className="flex gap-4">
      {/* Kotak Promo 1 */}
      <div className="bg-blue-800 text-white p-4 rounded shadow-lg w-32">
        <p className="text-xs font-bold italic">DISC</p>
        <p className="text-xl font-black italic">UP TO</p>
      </div>
      {/* Kotak Promo 2 */}
      <div className="bg-blue-800 text-white p-4 rounded shadow-lg w-32">
        <p className="text-xs font-bold italic">GRATIS</p>
        <p className="text-xl font-black italic">ONGKIR</p>
      </div>
    </div>
  </section>
);

export default SaleBanner;
