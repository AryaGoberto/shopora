import HomeScreen from "../components/HomeScreen";
import { products } from "../lib/mock";

export default function Page() {
  // nanti ganti `products` dengan fetch ke DB/API
  return <HomeScreen products={products} />;
}
