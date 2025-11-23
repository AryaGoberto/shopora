import Header from "../components/Header";
import TopBanner from "../components/TopBanner";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/footer";
import ProductSection from "../components/ProductSection";
import { getProductsData } from "../lib/productService";
import NewArrivalsBanner from "../components/NewArrivalBanner";

export default async function NewArrivalsPage() {
  const products = await getProductsData();
  return (
    <div className="min-h-screen bg-white font-sans">
      <TopBanner />
      <Header />
      <NewArrivalsBanner />
      <ProductSection
        title="Top Selling"
        products={products.slice(8, 16)} 
        viewAllLink="/shop/top-selling"
      />
      <Newsletter />
      <Footer />
    </div>
  );
}
