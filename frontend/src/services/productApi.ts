import type { AddToCartRequest, AddToCartResponse, Product } from "../types";

const product: Product = {
  productId: "PACK-001",
  name: "AeroPack Day Carrier",
  description:
    "A compact everyday backpack with a padded laptop sleeve, weather-resistant shell, and balanced storage for work, travel, and short weekend plans.",
  images: ["/product.svg"],
  variants: [
    { skuId: "PACK-FOREST-18", color: "Forest", capacity: "18L", price: 89, stock: 8 },
    { skuId: "PACK-FOREST-24", color: "Forest", capacity: "24L", price: 109, stock: 4 },
    { skuId: "PACK-BLACK-18", color: "Black", capacity: "18L", price: 92, stock: 0 },
    { skuId: "PACK-BLACK-24", color: "Black", capacity: "24L", price: 112, stock: 6 },
    { skuId: "PACK-SAND-18", color: "Sand", capacity: "18L", price: 86, stock: 3 },
    { skuId: "PACK-SAND-24", color: "Sand", capacity: "24L", price: 106, stock: 0 }
  ]
};

let cartCount = 0;

const wait = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export async function getProductDetail(productId: string): Promise<Product> {
  await wait(650);

  if (productId !== product.productId) {
    throw new Error("Product not found.");
  }

  return product;
}

export async function addToCart({
  skuId,
  quantity
}: AddToCartRequest): Promise<AddToCartResponse> {
  await wait(500);

  const selectedVariant = product.variants.find((variant) => variant.skuId === skuId);

  if (!selectedVariant) {
    return { success: false, message: "The selected product option is no longer available." };
  }

  if (quantity > selectedVariant.stock) {
    return { success: false, message: "Insufficient stock for the selected option." };
  }

  if (selectedVariant.color === "Sand" && selectedVariant.capacity === "18L") {
    return {
      success: false,
      message: "We could not add this item right now. Please try another option."
    };
  }

  cartCount += quantity;

  return { success: true, cartCount };
}
