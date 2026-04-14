import add from "../admin/products/add";

const dotenv = require("dotenv");
dotenv.config();

export async function addProduct(product) {
    console.log("api url : ", process.env.NEXT_PUBLIC_PRODUCT_URL);
  console.log("product : ", product);
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PRODUCT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    console.error("Error adding product:", res.text());
    throw new Error("Failed to add product");
  }
  const data = await res.json();
  return data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;    
  }
}

export async function faceProduct() {
  const res = await fetch(process.env.PRODUCT_URL);
  console.log(res)
  const products = await res.json();
  return products;
}
export async function faceProductByID(id) {
  try {
    const res = await fetch(`${process.env.PRODUCT_URL}/pages/product/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const product = await res.json();
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

export async function faceProductByCategory(category) {
  try {
    const res = await fetch(
      `${process.env.PRODUCT_URL}/pages/category/${category}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const product = await res.json();
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}
