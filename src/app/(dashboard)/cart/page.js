"use client";
import { useGetCartQuery } from "@/redux/services/cartApi";
import { useGetProductsQuery } from "@/redux/services/productApi";
import CartPage from "./CartPage";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Page() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const pathname = usePathname();
  const { data: cartData, isLoading: cartLoading, error: cartError } = useGetCartQuery(undefined, {
    skip: !isAuthenticated, // Skip cart query if not authenticated
  });
  const { data: allProducts = [], isLoading: productsLoading } = useGetProductsQuery({});
  const cartItems = useMemo(() => Array.isArray(cartData) ? cartData : cartData?.data || [], [cartData]);
  const productList = useMemo(() => Array.isArray(allProducts) ? allProducts : allProducts?.data || [], [allProducts]);
  const [productItems, setProductItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (authLoading || cartLoading || productsLoading) {
      setIsProcessing(true);
      return;
    }

    if (cartItems.length > 0 && productList.length > 0) {
      const products = [];
      
      // Map cart items to full product details
      for (const cart of cartItems) {
        for (const cartItem of cart.products) {
          const cartProductId = cartItem?.productId?._id || cartItem?.productId;

          if (!cartProductId) {
            continue;
          }

          // Find the full product data from allProducts
          const fullProduct = productList.find(
            (p) =>
              p._id?.toString?.() === cartProductId?.toString?.() ||
              p.id?.toString?.() === cartProductId?.toString?.()
          );
          
          if (fullProduct) {
            products.push({
              userId: cart.userId.toString ? cart.userId.toString() : cart.userId,
              cartId: cart._id.toString ? cart._id.toString() : cart._id,
              productId: fullProduct._id?.toString ? fullProduct._id.toString() : fullProduct._id || fullProduct.id,
              quantity: cartItem.quantity,
              name: fullProduct.name,
              sku: fullProduct.sku,
              price: fullProduct.price,
              oldPrice: fullProduct.oldPrice,
              rating: fullProduct.rating,
              reviews: fullProduct.reviews,
              description: fullProduct.description,
              images: fullProduct.images || [],
              colors: fullProduct.colors || [],
              features: fullProduct.features || [],
            });
          }
        }
      }
      
      setProductItems(products);
      setIsProcessing(false);
    } else if (!cartLoading && !productsLoading && !cartError) {
      setProductItems([]);
      setIsProcessing(false);
    }
  }, [cartItems, productList, cartLoading, productsLoading, cartError, authLoading]);

  if (authLoading || cartLoading || productsLoading || isProcessing) {
    return (
      <div className="text-center py-20 text-base-content">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
        <p className="mt-4">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20 text-base-content">
        <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
        <p className="text-base-content/70 mb-6">Please sign in to view your cart</p>
        <div className="space-x-4">
          <Link href={`/signin?redirect=${encodeURIComponent(pathname || "/cart")}`} className="inline-block px-6 py-3 bg-[#D4AF37] text-black rounded font-semibold hover:bg-[#c9a42f]">
            Sign In
          </Link>
          <Link href="/signup" className="inline-block px-6 py-3 bg-[#b89220] text-black rounded font-semibold hover:bg-[#a7821b]">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  if (cartError && !cartItems.length) {
    return (
      <div className="text-center py-20 text-red-500">
        <h1 className="text-2xl font-bold mb-4">Error Loading Cart</h1>
        <p className="mb-4">{cartError?.data?.message || "Unable to load cart. Please try again later."}</p>
      </div>
    );
  }

  return <CartPage productData={productItems} />;
}

export default Page;
