"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const WISHLIST_STORAGE_KEY = "wishlistItems";
const WISHLIST_EVENT_NAME = "wishlist:updated";

const readWishlist = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse wishlist from localStorage:", error);
    return [];
  }
};

const writeWishlist = (items) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(WISHLIST_EVENT_NAME));
};

const normalizeWishlistItem = (product) => {
  const id = String(product?._id || product?.id || product?.productId || "");
  const images = Array.isArray(product?.images)
    ? product.images
    : product?.images
      ? [product.images]
      : [];

  return {
    productId: id,
    name: product?.name || product?.product_name || "Unnamed Product",
    price: Number(product?.price || 0),
    images,
    slug: product?.slug || "",
    addedAt: new Date().toISOString(),
  };
};

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const syncWishlist = useCallback(() => {
    setWishlistItems(readWishlist());
  }, []);

  useEffect(() => {
    syncWishlist();

    const handleStorage = (event) => {
      if (!event.key || event.key === WISHLIST_STORAGE_KEY) {
        syncWishlist();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(WISHLIST_EVENT_NAME, syncWishlist);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(WISHLIST_EVENT_NAME, syncWishlist);
    };
  }, [syncWishlist]);

  const isInWishlist = useCallback(
    (productId) => {
      const normalizedId = String(productId || "");
      return wishlistItems.some((item) => String(item.productId) === normalizedId);
    },
    [wishlistItems]
  );

  const addToWishlist = useCallback(
    (product) => {
      const item = normalizeWishlistItem(product);

      if (!item.productId) {
        return { added: false, item: null };
      }

      if (isInWishlist(item.productId)) {
        return { added: false, item };
      }

      const next = [...wishlistItems, item];
      writeWishlist(next);
      setWishlistItems(next);
      return { added: true, item };
    },
    [isInWishlist, wishlistItems]
  );

  const removeFromWishlist = useCallback(
    (productId) => {
      const normalizedId = String(productId || "");
      const next = wishlistItems.filter(
        (item) => String(item.productId) !== normalizedId
      );

      writeWishlist(next);
      setWishlistItems(next);
      return next.length !== wishlistItems.length;
    },
    [wishlistItems]
  );

  const toggleWishlist = useCallback(
    (product) => {
      const productId = String(product?._id || product?.id || product?.productId || "");
      if (!productId) return { added: false, removed: false };

      if (isInWishlist(productId)) {
        const removed = removeFromWishlist(productId);
        return { added: false, removed };
      }

      const result = addToWishlist(product);
      return { added: result.added, removed: false };
    },
    [addToWishlist, isInWishlist, removeFromWishlist]
  );

  const clearWishlist = useCallback(() => {
    writeWishlist([]);
    setWishlistItems([]);
  }, []);

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  return {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };
}