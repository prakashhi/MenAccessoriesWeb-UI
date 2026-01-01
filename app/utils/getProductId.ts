import { ProductInfoType } from "@/app/(User)/Type/Types";

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
