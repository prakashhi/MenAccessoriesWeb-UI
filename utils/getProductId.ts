import { ProductInfoType } from "@/Type/ProductType";

export function getProductId(
  product: ProductInfoType | { data: ProductInfoType }
): string {
  // If product has 'data', use data.id
  if ("data" in product && product.data?.id) {
    return product.data.id;
  }

  // Otherwise, assume product is ProductInfoType and return id
  return (product as ProductInfoType).id;
}

export function getProduct(
  product: ProductInfoType | { data: ProductInfoType }
): ProductInfoType {
  if ("data" in product) {
    return product.data;
  }

  // TS now knows this is ProductInfoType
  return product;
}
