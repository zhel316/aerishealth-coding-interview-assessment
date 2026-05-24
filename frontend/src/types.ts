export type Variant = {
  skuId: string;
  color: "Forest" | "Black" | "Sand";
  capacity: "18L" | "24L";
  price: number;
  stock: number;
};

export type Product = {
  productId: string;
  name: string;
  description: string;
  images: string[];
  variants: Variant[];
};

export type AddToCartRequest = {
  productId: string;
  skuId: string;
  quantity: number;
};

export type AddToCartResponse = {
  success: boolean;
  cartCount?: number;
  message?: string;
};
