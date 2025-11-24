import HeroSection from "./components/marketing/HeroSection";
import Header from "./components/common/Header";
import Footer from "./components/common/footer";
import { getProductsData } from "./lib/productService";
import TopBanner from "./components/common/TopBanner";
import ProductSection from "./components/product/ProductSection";
import Newsletter from "./components/common/NewsLetter";

export default async function Home() {
  const products = await getProductsData();
  return (
    <main className="min-h-screen bg-white">
      <TopBanner />
      <Header />
      <HeroSection />

      <ProductSection
        title="New Arrivals"
        products={products.slice(0, 8)} // Ambil 8 produk pertama
        viewAllLink="/shop/new-arrivals"
      />
      <ProductSection
        title="Top Selling"
        products={products.slice(8, 16)} // Ambil 8 produk berikutnya
        viewAllLink="/shop/top-selling"
      />
      <Newsletter />
      <Footer />
    </main>
  );
}
