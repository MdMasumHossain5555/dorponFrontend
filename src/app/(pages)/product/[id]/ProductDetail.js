"use client";
import StarRating from "@/app/components/StarRating";
import Image from "next/image";
import React from "react";
import Head from "next/head";
import { useState } from "react";
import { addToCart } from "@/app/lib/cart";
const dotenv = require("dotenv");
dotenv.config();

function ProductDetail({ product }) {
  const fullUrl =
    process.env.NEXT_PUBLIC_BASE_URL + `/product/${product._id}` ||
    `http://localhost:3000/pages/product/${product._id}`;

  const handleAddToCart = async () => {
    const cartItem = {
      productId: product._id,
      quantity: quantity,
    };
    const result = await addToCart(cartItem);
    if (result) {
      console.log("Product added to cart:", result);
      alert("Product added to cart successfully!");
    } else {
      console.error("Failed to add product to cart.");
      alert("Failed to add product to cart.");
    }
  };

  const thumbnails = product.images || []; 
  const color = product.colors || []; 
  const features = product.features || []; 
  console.log("Product Features:", features); // Log the features for debugging
  console.log("Product Colors:", color); // Log the colors for debugging
  console.log("Product : ", product); // Log the thumbnails for debugging
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
      {/* head tag start */}
      {/* SEO Head Tags */}
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
      {/* head tag end */}
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap mx-4 my-20">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <Image
                width={400}
                height={80}
                src={selectedImage}
                alt={product.name}
                unoptimized
                objectFit="cover"
                className="w-full max-h-50 xl:max-h-100 lg:max-h-100 md:max-h-80 sm:max-h-50 rounded-lg shadow-lg shadow-cyan-500/50 mb-4"
                id="mainImage"
              />

              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {/* start thamb */}
                {thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 relative cursor-pointer border-2 ${
                      selectedImage === thumb
                        ? "border-blue-500"
                        : "border-transparent"
                    } rounded-lg`}
                    onClick={() => setSelectedImage(thumb)}
                  >
                    <Image
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      layout="fill"
                      unoptimized
                      objectFit="cover"
                      className="rounded-lg hover:opacity-80 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition duration-300"
                    />
                  </div>
                ))}
                {/* end thamb */}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">SKU: {product.sku}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">$349.99</span>
                <span className="text-gray-500 line-through">$399.99</span>
              </div>
              <div className="flex items-center mb-4">
                <StarRating rating={product.rating} />
                {/* star rating end */}
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Color:</h3>
                <div className="flex space-x-2">
                  {color.map((color, index) => (
                    <button
                      key={index}
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8  rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${color}`}
                    ></button>
                  ))}
                  {/*                   
                  <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                  <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button> */}
                </div>
              </div>

              <div className="mb-6 space-x-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <button onClick={decrease} className=" w-12 text-xl text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
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
                  className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button onClick={increase} className=" w-12 text-xl text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  +
                </button>
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Wishlist
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
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
              priceCurrency: "USD", // you can make this dynamic too
              price: "349.99", // you can use product.price
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
