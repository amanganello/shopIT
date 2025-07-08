import ProductList from "@/components/ProductList";

export default function Home() {
  // No longer fetch products server-side; let ProductList handle fetching/pagination client-side
  return <ProductList />;
}
