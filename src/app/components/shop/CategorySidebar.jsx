"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
const slugify = (text = "") =>
  text.toLowerCase().trim().replace(/\s+/g, "-");

export default function CategorySidebar({ categories, selectedCategory }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", slugify(category));
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="rounded-[24px] border border-[#D4AF37]/15 bg-[#111111] p-5 text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
      <h2 className="mb-5 text-lg font-bold tracking-wide text-[#D4AF37]">
        Categories
      </h2>

      <div className="space-y-3">
        <button
          onClick={() => handleCategoryClick("")}
          className={`block w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
            selectedCategory === ""
              ? "border-[#D4AF37] bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
              : "border-[#D4AF37]/10 bg-[#171717] text-white/80 hover:border-[#D4AF37]/30 hover:bg-[#1d1d1d] hover:text-[#D4AF37]"
          }`}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`block w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
              selectedCategory === category
                ? "border-[#D4AF37] bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                : "border-[#D4AF37]/10 bg-[#171717] text-white/80 hover:border-[#D4AF37]/30 hover:bg-[#1d1d1d] hover:text-[#D4AF37]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}