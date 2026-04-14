import { faceProductByID } from "@/app/lib/products";
import ProductDetail from "./ProductDetail";

export default async function ProductPage({ params }) { 
  const { id } = await params; // Destructure the id from params
  console.log("Product ID:", id); // Log the product ID for debugging
  const product = await faceProductByID(id);

  if (!product) {
    return <div className="text-center py-10 text-red-500">Product not found.</div>;
  }

  return <ProductDetail product={product} />;
}
