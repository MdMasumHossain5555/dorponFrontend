"use client";
import StarRating from "@/app/components/StarRating";
import Image from "next/image";
import React from "react";
import Head from "next/head";
import { useState } from "react";
import { useAddToCartMutation } from "@/redux/services/cartApi";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWishlist } from "@/app/hooks/useWishlist";
const dotenv = require("dotenv");
dotenv.config();

function ProductDetail({ product }) {
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const productId = product?._id || product?.id || product?.productId;
  const inWishlist = isInWishlist(productId);
  const fullUrl =
    process.env.NEXT_PUBLIC_BASE_URL + `/product/${product._id}` ||
    `http://localhost:3000/pages/product/${product._id}`;

  const handleAddToCart = async () => {
    const productId = product?._id || product?.id;

    if (!productId) {
      toast.error("Failed to add product to cart.");
      return;
    }

    const cartItem = {
      productId,
      quantity: quantity,
    };
    try {
      await addToCart(cartItem).unwrap();
      console.log("Product added to cart:", cartItem);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      if (error?.status === 401) {
        router.push(`/signin?redirect=${encodeURIComponent(pathname || "/")}`);
        return;
      }

      toast.error("Failed to add product to cart.");
    }
  };

  const handleWishlist = () => {
    const result = toggleWishlist(product);

    if (result.removed) {
      toast.success("Removed from wishlist");
      return;
    }

    if (result.added) {
      toast.success("Added to wishlist!");
      return;
    }

    toast.error("Unable to update wishlist.");
  };

  const thumbnails = product.images || [];
  const color = product.colors || [];
  const features = product.features || [];
  console.log("Product Features:", features);
  console.log("Product Colors:", color);
  console.log("Product : ", product);

  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <>
      <Head>
        <title>{product.name} | MyShop</title>
        <meta
          name="description"
          content={
            product.description?.slice(0, 160) ||
            "Buy top quality products from MyShop."
          }
        />
        <link rel="canonical" href={fullUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta
          property="og:description"
          content={product.description?.slice(0, 160)}
        />
        <meta property="og:image" content={product.images?.[0]} />
        <meta property="og:url" content={fullUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta
          name="twitter:description"
          content={product.description?.slice(0, 160)}
        />
        <meta name="twitter:image" content={product.images?.[0]} />
      </Head>

      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-4 my-20 flex flex-wrap">
            <div className="mb-8 w-full px-4 md:w-1/2">
              <div className="mb-4 flex h-[420px] w-full items-center justify-center overflow-hidden rounded-lg border border-[#D4AF37]/12 bg-base-100 shadow-lg shadow-[#D4AF37]/10">
                <Image
                  width={800}
                  height={800}
                  src={selectedImage}
                  alt={product.name}
                  unoptimized
                  className="h-full w-full object-contain"
                  id="mainImage"
                />
              </div>

              <div className="flex justify-center gap-4 overflow-x-auto py-4">
                {thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    className={`relative h-20 w-20 cursor-pointer rounded-lg border-2 ${selectedImage === thumb
                        ? "border-[#D4AF37]"
                        : "border-transparent"
                      }`}
                    onClick={() => setSelectedImage(thumb)}
                  >
                    <Image
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      unoptimized
                      objectFit="cover"
                      className="rounded-lg shadow-lg shadow-[#D4AF37]/10 transition duration-300 hover:opacity-80 hover:shadow-[#D4AF37]/20"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2">
              <h2 className="mb-2 text-3xl font-bold text-base-content">
                {product.name}
              </h2>
              <p className="mb-4 text-base-content/60">SKU: {product.sku}</p>

              <div className="mb-4">
                <span className="mr-2 text-2xl font-bold text-[#b89220]">
                  $349.99
                </span>
                <span className="text-base-content/50 line-through">$399.99</span>
              </div>

              <div className="mb-4 flex items-center">
                <StarRating rating={product.rating} />
                <span className="ml-2 text-base-content/60">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="mb-6 text-base-content/75">{product.description}</p>

              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-base-content">
                  Color:
                </h3>
                <div className="flex space-x-2">
                  {color.map((color, index) => (
                    <button
                      key={index}
                      style={{ backgroundColor: color }}
                      className={`h-8 w-8 rounded-full border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2`}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                <label
                  htmlFor="quantity"
                  className="w-full text-sm font-medium text-base-content"
                >
                  Quantity:
                </label>

                <button
                  onClick={decrease}
                  className="w-12 rounded-md border border-[#D4AF37]/20 bg-base-100 text-center text-xl text-base-content shadow-sm transition hover:bg-[#D4AF37] hover:text-black focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37]/20 focus:ring-opacity-50"
                >
                  -
                </button>

                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const val = Math.max(1, parseInt(e.target.value) || 1);
                    setQuantity(val);
                  }}
                  className="w-12 rounded-md border border-[#D4AF37]/20 bg-base-100 text-center text-base-content shadow-sm focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37]/20 focus:ring-opacity-50"
                />

                <button
                  onClick={increase}
                  className="w-12 rounded-md border border-[#D4AF37]/20 bg-base-100 text-center text-xl text-base-content shadow-sm transition hover:bg-[#D4AF37] hover:text-black focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37]/20 focus:ring-opacity-50"
                >
                  +
                </button>
              </div>

              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-6 py-2 text-black transition hover:bg-[#c9a42f] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isLoading ? "Adding..." : "Add to Cart"}
                </button>

                <button
                  onClick={handleWishlist}
                  className={`flex w-full items-center justify-center gap-2 rounded-md border px-6 py-2 transition focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:ring-offset-2 sm:w-auto ${
                    inWishlist
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#b89220]"
                      : "border-[#D4AF37]/20 bg-base-100 text-base-content hover:bg-[#D4AF37]/10 hover:text-[#b89220]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={inWishlist ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 sm:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  {inWishlist ? "Wishlisted" : "Wishlist"}
                </button>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-base-content">
                  Key Features:
                </h3>
                <ul className="list-inside list-disc text-base-content/75">
                  {features.map((feature, index) => (
                    <li key={index} className="mb-1">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.images?.[0],
            description: product.description,
            sku: product.sku,
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "349.99",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
          }),
        }}
      />
    </>
  );
}

export default ProductDetail;