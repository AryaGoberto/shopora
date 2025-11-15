// app/page.tsx
"use client";

import React from "react";
import TopBanner from "./components/TopBanner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Footer from "./components/footer";
import BrandsSection from "./components/BrandsSection";
import BrowseByStyle from "./components/BrowseByStyle";
import CustomerReviews from "./components/CustomerReviews";
import ProductSection from "./components/ProductSection";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Header />

      <main>
        <HeroSection />
        <BrandsSection />
        <BrowseByStyle />
        <CustomerReviews />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
