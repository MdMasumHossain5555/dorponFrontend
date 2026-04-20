"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {useGetProductsQuery} from '@/redux/services/productApi';
import CategorySidebar from "./CategorySidebar";
import FilterPanel from "./FilterPanel";
import ProductGrid from "./ProductGrid";
import ShopPageSkeleton from "../skeleton/ShopPageSkeleton";

const slugify = (text = "") =>
  text.toLowerCase().trim().replace(/\s+/g, "-");

export default function ShopClient() {
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const selectedTag = searchParams.get("tag") || "";
  const sort = searchParams.get("sort") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const search = (searchParams.get("search") || "").trim().toLowerCase();

  const minPrice = min ? Number(min) : 0;
  const maxPrice = max ? Number(max) : Infinity;

  const { data, isLoading, isError } = useGetProductsQuery();

  const allProducts = Array.isArray(data) ? data : data?.data || [];

  const categories = useMemo(() => {
    return [...new Set(allProducts.map((p) => p.category).filter(Boolean))];
  }, [allProducts]);

  const slugOptions = useMemo(() => {
    return [...new Set(allProducts.map((p) => p?.slug).filter(Boolean))];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // category filter
    if (selectedCategory) {
      result = result.filter(
        (product) => slugify(product.category) === selectedCategory
      );
    }

    // tag filter (e.g., top-products)
    if (selectedTag) {
      result = result.filter((product) => slugify(product?.slug || "") === selectedTag);
    }

    // text search filter
    if (search) {
      result = result.filter((product) => {
        const searchableText = [
          product?.name,
          product?.description,
          product?.category,
          product?.sku,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(search);
      });
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
  }, [allProducts, selectedCategory, selectedTag, sort, minPrice, maxPrice, search]);

  if (isLoading) return <ShopPageSkeleton />;
  if (isError) return <div className="text-red-500">Something went wrong</div>;

  return (
    <div className="grid grid-cols-12 gap-6 p-6 md:h-[calc(100vh-96px)] md:overflow-hidden md:items-start">
      <aside className="col-span-12 space-y-6 md:col-span-3 md:sticky md:top-6 md:h-full md:overflow-y-auto md:pr-1">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          slugOptions={slugOptions}
        />

        <FilterPanel
          selectedSort={sort}
          min={min}
          max={max}
        />
      </aside>

      <main className="col-span-12 md:col-span-9 md:h-full md:overflow-y-auto md:pr-1">
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}