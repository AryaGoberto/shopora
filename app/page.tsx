// app/page.tsx
import ProductCard from "./components/ProductCard";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Footer from "./components/footer"; 
import { FakeProduct, Product } from "./lib/types";
import Newsletter from "./components/NewsLetter";
import TopBanner from "./components/TopBanner";

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Gagal mengambil data produk');
  }
  return res.json();
}

export default async function Home() {
  const rawProducts: FakeProduct[] = await getProducts();

  const products: Product[] = rawProducts.map((item) => {
    
    // --- LOGIKA PENGACAKAN ---
    // Math.random() menghasilkan angka 0.0 sampai 1.0
    // Jika angkanya > 0.5 (peluang 50%), maka kita kasih diskon.
    const isDiscounted = Math.random() > 0.5; 

    // Variabel penampung (defaultnya kosong/undefined)
    let finalOriginalPrice = undefined;
    let finalDiscountLabel = undefined;

    // JIKA DAPAT DISKON:
    if (isDiscounted) {
       const markupPrice = item.price * 1.2; // Harga naik 20%
       finalOriginalPrice = Number(markupPrice.toFixed(2));
       finalDiscountLabel = "20% OFF";
    }

    return {
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
      rating: item.rating.rate,
      
      // Masukkan variabel hasil logika di atas
      originalPrice: finalOriginalPrice, 
      discount: finalDiscountLabel
    };
  });

  return (
    <main className="min-h-screen bg-white">
      <TopBanner/>
      <Header />
      <HeroSection />
      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Newsletter/>
      <Footer />
    </main>
  );
}