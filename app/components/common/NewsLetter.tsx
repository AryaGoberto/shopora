// app/components/Newsletter.tsx
import React from "react";
import { Mail } from "lucide-react";
import { integralCF_Fonts } from "../../lib/font";

const Newsletter: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 py-16">
    <div
      // Kontainer utama: Flex row di desktop, memastikan elemen sejajar dan terpisah
      className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8"
      style={{ backgroundColor: "#1230AE" }}
    >
      {/* KIRI: Judul (Teks) */}
      <div className="md:w-1/2">
        <h2
          className={`text-3xl md:text-4xl font-extrabold text-white leading-tight ${integralCF_Fonts.className}`}
        >
          STAY UP TO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </h2>
      </div>

      {/* KANAN: Form Input dan Tombol */}
      <div className="md:w-1/3 w-full space-y-4 md:max-w-md">
        {/* Input Email */}
        <div className="relative bg-white rounded-full p-1 flex items-center shadow-lg">
          <Mail className="ml-4 text-gray-500" size={20} />
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full pl-3 pr-4 py-3 rounded-full outline-none text-gray-700 bg-transparent"
          />
        </div>

        {/* Tombol Subscribe */}
        <button className="w-full bg-white text-[#1230AE] font-bold py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  </section>
);

export default Newsletter;
