// import Image from "next/image";
// import Link from "next/link";
// import { faceProduct } from "./lib/products";
// import Carousel from "./components/Carousel";
// import AddToCartButton from "./components/AddToCartButton";
// import ProductCard from "./components/ui/ProductCard";
// export const revalidate = 10;
// // export async function generateStaticParams() {
// //   const products = await faceProduct();
// //   return{
// //     props : {products},
// //     revalidate : 10,
// //   }
// // }

// export default async function Home() {
//   const products = await faceProduct(); /// face data from api
  
  
//   return (
//     <>
//       <div className="mt-25">
//         <Carousel />
//       </div>
//       {/* face data from api */}

//       {/* <div className="mx-10 my-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 items-center justify-center md:grid-cols-2 sm:grid-cols-1 gap-4">
//         {products.map((product) => (
//           <Link key={product._id} href={`/pages/product/${product._id}`}>
//             <div
//               key={product._id}
//               className="card transform motion-reduce:transform-fill hover:-translate-y-1 hover:scale-108 transition ease-in-out duration-300 bg-base-100 w-70 shadow-lg hover:shadow-cyan-500/50 shadow-cyan-500/20 mt-10"
//             >
//               <figure>
//                 <Image
//                   className="max-h-50"
//                   src={product.images[0]}
//                   alt={product.name}
//                   unoptimized
//                   width={300}
//                   height={40}
//                 />
//               </figure>
//               <div className="card-body">
//                 <h2 key={product._id} className="card-title">
//                   {product.name}
//                 </h2>
//                 <p>
//                   Link card component has Link figure, Link body part, and
//                   inside body there are title and actions parts
//                 </p>
//                 <div className="card-actions justify-end">
                  
//                   <span className="text-lg font-bold">
//                     ${product?.price?.toFixed(2)}
//                   </span>
//                   <AddToCartButton product={product} />

//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div> */}

//       <div className="mx-10 my-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
//         {products.map((product) => (
//           <div key={product._id}>
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>

//       {/* end face data from api */}
//     </>
//   );
// }


import PromoBannerSection from "@/app/components/home/PromoBannerSection";
import TrustHighlightsSection from "@/app/components/home/TrustHighlightsSection";
import ShopByCategorySection from "@/app/components/home/ShopByCategorySection";
import BestSellingProductsSection from "@/app/components/home/BestSellingProductsSection";
import TopProductsSection from "@/app/components/home/TopProductsSection";
import OfferProductsSection from "@/app/components/home/OfferProductsSection";
import NewArrivalsSection from "@/app/components/home/NewArrivalsSection";
import ProductCard from "@/app/components/ui/ProductCard";

export default function Home() {
  const categories = [
    { id: 1, name: "Skincare", description: "Serum, cleanser, toner, moisturizer", icon: "🧴" },
    { id: 2, name: "Makeup", description: "Lipstick, foundation, blush, compact", icon: "💄" },
    { id: 3, name: "Hair Care", description: "Oil, shampoo, conditioner, mask", icon: "✨" },
    { id: 4, name: "Fragrance", description: "Perfume, mist and body spray", icon: "🌸" },
  ];

  const bestSellingProducts = [
    { _id: "1", name: "Product 1", price: 1200 },
    { _id: "2", name: "Product 2", price: 1500 },
    { _id: "3", name: "Product 3", price: 1800 },
    { _id: "4", name: "Product 4", price: 2000 },
  ];

  const topProducts = bestSellingProducts;
  const offerProducts = bestSellingProducts;
  const newArrivals = bestSellingProducts;

  return (
    <main className="space-y-8 bg-base-100 px-4 py-8 md:px-8">
      <PromoBannerSection />
      <TrustHighlightsSection />
      <ShopByCategorySection categories={categories} />

      <BestSellingProductsSection>
        {bestSellingProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </BestSellingProductsSection>

      <TopProductsSection>
        {topProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </TopProductsSection>

      <OfferProductsSection>
        {offerProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </OfferProductsSection>

      <NewArrivalsSection>
        {newArrivals.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </NewArrivalsSection>
    </main>
  );
}