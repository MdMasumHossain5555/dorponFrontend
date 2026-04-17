"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";
import { useCreateProductMutation } from "@/redux/services/productApi";

export default function AddProductModal() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    slug: "Top Products",
    price: "",
    oldPrice: "",
    imageFiles: [],
    category: "",
    description: "",
    features: [],
    colors: [],
  });
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const mergedFiles = [...formData.imageFiles, ...selectedFiles];
    const limitedFiles = mergedFiles.slice(0, 5);

    if (mergedFiles.length > 5) {
      toast.error("Maximum 5 images allowed");
    }

    setFormData({
      ...formData,
      imageFiles: limitedFiles,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageFiles.length) {
      toast.error("Please select at least one image file");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("sku", formData.sku);
    payload.append("slug", formData.slug);
    payload.append("price", formData.price);
    payload.append("oldPrice", formData.oldPrice);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("features", formData.features.join(","));
    payload.append("colors", formData.colors.join(","));
    formData.imageFiles.forEach((file) => payload.append("images", file));

    try {
      await createProduct(payload).unwrap();
      toast.success("Product added successfully");
      setFormData({
        name: "",
        sku: "",
        slug: "Top Products",
        price: "",
        oldPrice: "",
        imageFiles: [],
        category: "",
        description: "",
        features: [],
        colors: [],
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#c9a42f]"
      >
        <IoMdAdd className="h-4 w-4" />
        Add Product
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-slate-700 bg-[#0f141b] shadow-xl">
            <div className="border-b border-slate-800 px-5 py-4">
              <h2 className="text-xl font-semibold text-slate-100">Add Product</h2>
              <p className="mt-1 text-sm text-slate-400">
                Fill in product details and upload image files.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[72vh] overflow-y-auto px-5 py-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
              </div>

                  <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  SKU
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
              </div>

                  <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Slug
                </label>
                <select
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                >
                  <option value="Top Products">Top Products</option>
                  <option value="Offer Products">Offer Products</option>
                  <option value="Best Selling">Best Selling</option>
                  <option value="New Arrivals">New Arrivals</option>
                </select>
              </div>

                  <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Price
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
              </div>

                  <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Old Price
                </label>
                <input
                  type="number"
                  value={formData.oldPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, oldPrice: e.target.value })
                  }
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
              </div>

                  <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
              </div>

                  <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Product Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  required={formData.imageFiles.length === 0}
                  onChange={handleImageChange}
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 file:mr-3 file:rounded file:border-0 file:bg-[#D4AF37] file:px-3 file:py-1 file:text-sm file:font-semibold file:text-black"
                />
                <p className="mt-1 text-xs text-slate-400">
                  You can select multiple images (max 5 files). You can also add more by selecting again.
                </p>
                {formData.imageFiles.length ? (
                  <p className="mt-1 text-xs font-medium text-emerald-300">
                    Selected: {formData.imageFiles.length} file(s)
                  </p>
                ) : null}
                {formData.imageFiles.length ? (
                  <ul className="mt-2 max-h-24 space-y-1 overflow-y-auto rounded border border-slate-800 bg-[#121923] p-2 text-xs text-slate-300">
                    {formData.imageFiles.map((file, index) => (
                      <li key={`${file.name}-${index}`} className="truncate">
                        {index + 1}. {file.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

                  <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.features.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      features: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
              </div>

                  <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Colors (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.colors.join(",")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      colors: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
              </div>

                  <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
              </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-800 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded border border-slate-700 px-4 py-2 text-slate-200 transition hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded bg-[#D4AF37] px-4 py-2 font-semibold text-black transition hover:bg-[#c9a42f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
