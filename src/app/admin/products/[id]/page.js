"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/services/productApi";

function ProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });
  const [updateProduct, { isLoading: isSaving }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    slug: "Top Products",
    price: "",
    oldPrice: "",
    category: "",
    description: "",
    images: "",
    features: "",
    colors: "",
  });

  useEffect(() => {
    if (!product) return;

    setFormData({
      name: product.name || "",
      sku: product.sku || "",
      slug: product.slug || "Top Products",
      price: product.price?.toString() || "",
      oldPrice: product.oldPrice?.toString() || "",
      category: product.category || "",
      description: product.description || "",
      images: Array.isArray(product.images) ? product.images.join(", ") : "",
      features: Array.isArray(product.features) ? product.features.join(", ") : "",
      colors: Array.isArray(product.colors) ? product.colors.join(", ") : "",
    });
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateProduct({
        id: productId,
        body: {
          ...formData,
          images: formData.images
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          features: formData.features
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          colors: formData.colors
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },
      }).unwrap();
      toast.success("Product updated successfully");
    } catch (updateError) {
      console.error("Failed to update product:", updateError);
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully");
      router.push("/admin/products");
    } catch (deleteError) {
      console.error("Failed to delete product:", deleteError);
      toast.error("Failed to delete product");
    }
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading product...</div>;
  }

  if (error || !product) {
    return <div className="py-10 text-center text-red-500">Product not found.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white/90">
            Edit Product
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Update the product details used across the storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="rounded-lg border border-red-200 px-4 py-2 font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Deleting..." : "Delete Product"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
      >
        <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <h2 className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
            Basic Information
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                Product Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                SKU
              </label>
              <input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="SKU"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                Slug
              </label>
              <select
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
              >
                <option value="Top Products">Top Products</option>
                <option value="Offer Products">Offer Products</option>
                <option value="Best Selling">Best Selling</option>
                <option value="New Arrivals">New Arrivals</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                Price
              </label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                placeholder="Price"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                Old Price
              </label>
              <input
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                type="number"
                placeholder="Old price"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <h2 className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
            Description
          </h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Description"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <h2 className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
            Media & Attributes
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                Image URLs (comma separated)
              </label>
              <input
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                Features (comma separated)
              </label>
              <input
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Feature 1, Feature 2"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                Colors (comma separated)
              </label>
              <input
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Red, Blue"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-[#D4AF37] px-4 py-2 font-medium text-black transition hover:bg-[#c9a42f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductEditPage;