"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterPanel({ selectedSort, min, max }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minValue, setMinValue] = useState(min || "");
  const [maxValue, setMaxValue] = useState(max || "");

  // update single query param
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  // apply min/max price
  const applyPriceRange = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (minValue) {
      params.set("min", minValue);
    } else {
      params.delete("min");
    }

    if (maxValue) {
      params.set("max", maxValue);
    } else {
      params.delete("max");
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  // clear only price filter
  const clearPrice = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("min");
    params.delete("max");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);

    setMinValue("");
    setMaxValue("");
  };

  return (
    <div className="space-y-5 rounded-[24px] border border-[#D4AF37]/15 bg-[#111111] p-5 text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
      <h2 className="text-lg font-bold tracking-wide text-[#D4AF37]">
        Filter
      </h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Sort by price
        </label>

        <select
          value={selectedSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="w-full rounded-xl border border-[#D4AF37]/15 bg-[#171717] px-3 py-2 text-white outline-none transition focus:border-[#D4AF37]/50"
        >
          <option value="">Default</option>
          <option value="price_asc">Lowest to Highest</option>
          <option value="price_desc">Highest to Lowest</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Min Price
        </label>
        <input
          type="number"
          value={minValue}
          onChange={(e) => setMinValue(e.target.value)}
          placeholder="e.g. 100"
          className="w-full rounded-xl border border-[#D4AF37]/15 bg-[#171717] px-3 py-2 text-white placeholder:text-white/35 outline-none transition focus:border-[#D4AF37]/50"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Max Price
        </label>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
          placeholder="e.g. 1000"
          className="w-full rounded-xl border border-[#D4AF37]/15 bg-[#171717] px-3 py-2 text-white placeholder:text-white/35 outline-none transition focus:border-[#D4AF37]/50"
        />
      </div>

      <div className="space-y-2">
        <button
          onClick={applyPriceRange}
          className="w-full rounded-xl border border-[#D4AF37] bg-[#D4AF37] py-2.5 font-medium text-black transition hover:bg-[#c9a42f]"
        >
          Apply Filter
        </button>

        <button
          onClick={clearPrice}
          className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#171717] py-2.5 font-medium text-white transition hover:border-[#D4AF37]/40 hover:bg-[#1d1d1d] hover:text-[#D4AF37]"
        >
          Clear Price
        </button>
      </div>
    </div>
  );
}