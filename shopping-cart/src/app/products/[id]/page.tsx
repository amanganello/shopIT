import { getProductById, getProducts } from "@/services/api";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id.toString() }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product: import("@/types").Product | null = null;
  let error: string | null = null;
  try {
    product = await getProductById(id);
  } catch {
    error = "Failed to load product. Please try again later.";
  }
  if (!product && !error) notFound();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-xl text-center py-8 text-red-600 bg-red-50 border border-red-200 rounded mb-4" role="alert">
          {error}
        </div>
        <Link href="/" className="text-main-purple font-semibold hover:underline">&larr; Back to products</Link>
      </div>
    );
  }

  // At this point, product is guaranteed to be non-null
  return (
    <div className="flex flex-col md:flex-row gap-12 bg-white rounded-xl shadow-lg p-6 md:p-12 max-w-4xl mx-auto mt-8">
      <div className="flex-shrink-0 flex items-center justify-center w-full md:w-[400px]">
        <Image
          src={product!.image}
          alt={product!.title}
          width={360}
          height={360}
          className="object-contain bg-white rounded-lg shadow p-6 w-full h-80"
          priority
        />
      </div>
      <div className="flex-1 flex flex-col gap-6 justify-center">
        <Link href="/" className="mb-2 text-main-purple font-semibold hover:underline w-fit">&larr; Back to products</Link>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{product!.title}</h1>
        <div className="text-main-purple font-semibold uppercase tracking-wide text-xs mb-2">{product!.category}</div>
        <div className="text-lg text-gray-700 leading-relaxed mb-4">{product!.description}</div>
        <div className="text-3xl font-bold text-main-purple mb-6">USD {product!.price}</div>
        <ProductDetail product={product!} />
      </div>
    </div>
  );
}
