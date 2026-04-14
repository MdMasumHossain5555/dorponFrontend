import CartPage from "./CartPage";
import { getCart } from "@/app/lib/cart";
import { faceProductByID } from "@/app/lib/products";
import { cookies } from "next/headers";
import { use } from "react";

async function page() {
  const productItems = [];
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return (
      <div className="text-center py-10 text-red-500">
        Please login to view this page.
      </div>
    );
  }
  const cartItems = await getCart(token);
  if (!cartItems) {
    return <div>Loading...</div>;
  }
  const formattedCart = cartItems.map((item) => {
    return {
      cartId: item._id.toString(), // Convert ObjectId to string
      userId: item.userId.toString(),
      products: item.products.map((product) => ({
        productId: product.productId.toString(), // Convert ObjectId to string
        quantity: product.quantity,
      })),
    };
  });

  for (const cart of formattedCart) {
    for (const product of cart.products) {
      try {
        const productData = await faceProductByID(product.productId);
        if (!productData) {
          throw new Error(
            `Error fetching product ${product.productId}: ${productData.statusText}`
          );
        }
        productItems.push({
          userId: cart.userId,
          productId: productData._id,
          name: productData.name,
          sku: productData.sku,
          price: productData.price,
          oldPrice: productData.oldPrice,
          rating: productData.rating,
          reviews: productData.reviews,
          description: productData.description,
          images: productData.images,
          colors: productData.colors,
          features: productData.features,
          quantity: product.quantity, 
        });
      } catch (error) {
        console.error(`Error fetching product ${product.productId}:`, error);
      }
    }
  }

  return (
    <>
      <CartPage productData={productItems} />
    </>
  );
}

export default page;
