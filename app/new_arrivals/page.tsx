import Header from "../components/common/Header";
import TopBanner from "../components/common/TopBanner";
import Newsletter from "../components/common/NewsLetter";
import Footer from "../components/common/footer";
import ProductSection from "../components/product/ProductSection";
import { getProductsData } from "../lib/productService";
import NewArrivalsBanner from "../components/marketing/NewArrivalBanner";

export default async function NewArrivalsPage() {
  const products = await getProductsData();
  return (
    <div className="min-h-screen bg-white font-sans">
      <TopBanner />
      <Header />
      <NewArrivalsBanner imageUrl="/new_arrival.png" />
      <ProductSection
        title="New Arrivals"
        products={products.filter((p) => p.isNewArrival)}
        viewAllLink="/new_arrivals"
      />
      <Newsletter />
      <Footer />
    </div>
  );
}
