"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {useGetProductsQuery} from '@/redux/services/productApi';
import CategorySidebar from "./CategorySidebar";
import FilterPanel from "./FilterPanel";
import ProductGrid from "./ProductGrid";

const slugify = (text = "") =>
  text.toLowerCase().trim().replace(/\s+/g, "-");

export default function ShopClient() {
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";

  const minPrice = min ? Number(min) : 0;
  const maxPrice = max ? Number(max) : Infinity;

  const { data, isLoading, isError } = useGetProductsQuery();

  const allProducts = Array.isArray(data) ? data : data?.data || [];

  const categories = useMemo(() => {
    return [...new Set(allProducts.map((p) => p.category).filter(Boolean))];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // category filter
    if (selectedCategory) {
      result = result.filter(
        (product) => slugify(product.category) === selectedCategory
      );
    }

    // price range filter
    result = result.filter((product) => {
      const price = Number(product.price) || 0;
      return price >= minPrice && price <= maxPrice;
    });

    // sorting
    if (sort === "price_asc") {
      result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sort === "price_desc") {
      result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    return result;
  }, [allProducts, selectedCategory, sort, minPrice, maxPrice]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      <aside className="col-span-12 md:col-span-3 space-y-6">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
        />

        <FilterPanel
          selectedSort={sort}
          min={min}
          max={max}
        />
      </aside>

      <main className="col-span-12 md:col-span-9">
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}