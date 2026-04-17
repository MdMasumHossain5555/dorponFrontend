"use client";

import Image from "next/image";
import Link from "next/link";
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { toast } from "sonner";
import AddProductModal from "@/app/components/AddProductModal";
import { useDeleteProductMutation, useGetProductsQuery } from "@/redux/services/productApi";

const fallbackImage =
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=600&fit=crop";

function Products() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (event, productId) => {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully");
    } catch (deleteError) {
      console.error("Failed to delete product:", deleteError);
      toast.error("Failed to delete product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#D4AF37]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white/90">
              Products
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage catalog items, pricing, and product tags.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
              {products.length} total
            </span>
            <AddProductModal />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => {
          const productId = product._id || product.id;
          const imageUrl = Array.isArray(product.images)
            ? product.images[0]
            : product.images || fallbackImage;

          return (
            <div
              key={productId}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <Link href={`/admin/products/${productId}`} className="block">
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="line-clamp-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.category || "Uncategorized"}
                      </p>
                      <p className="mt-1 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-0.5 text-xs font-medium text-[#9c7a1f] dark:text-[#f3d37a]">
                        {product.slug || "No slug"}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-[#b89220]">
                      ৳{Number(product.price || 0).toLocaleString()}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {product.description}
                  </p>
                </div>
              </Link>

              <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 dark:border-gray-800">
                <Link
                  href={`/admin/products/${productId}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-3 py-2 text-sm font-medium text-black transition hover:bg-[#c9a42f]"
                >
                  <MdEditNote className="h-4 w-4" />
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={(event) => handleDelete(event, productId)}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:hover:bg-red-950/30"
                >
                  <MdDeleteForever className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Products;