const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const PRODUCTS_ENDPOINT = `${API_BASE_URL.replace(/\/$/, "")}/products`;

export async function addProduct(product) {
  try {
    const res = await fetch(PRODUCTS_ENDPOINT, {
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

export async function faceProductByID(id) {
  try {
    if (!id) return null;

    const res = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
      cache: "no-store",
    });
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
    if (!category) return [];

    const res = await fetch(PRODUCTS_ENDPOINT, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const products = await res.json();
    const list = Array.isArray(products) ? products : products?.data || [];

    return list.filter(
      (item) => String(item?.category || "").toLowerCase() === String(category).toLowerCase()
    );
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return [];
  }
}


