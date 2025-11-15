// app/components/Newsletter.tsx
import React from "react";

const Newsletter: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 py-16">
    <div
      className="rounded-3xl p-8 md:p-12 text-center"
      style={{ backgroundColor: "#1230AE" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
        STAY UP TO DATE ABOUT
        <br />
        OUR LATEST OFFERS
      </h2>
      <div className="max-w-md mx-auto space-y-4">
        <div className="relative bg-white rounded-full">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            📧
          </span>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full pl-14 pr-6 py-4 rounded-full outline-none text-gray-700"
          />
        </div>
        <button className="w-full bg-white text-black font-medium py-4 rounded-full hover:bg-gray-100 transition-colors">
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  </section>
);

export default Newsletter;
