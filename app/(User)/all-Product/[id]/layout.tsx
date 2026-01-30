import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

async function getProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/product/${id}`, {
      cache: "no-store", // or "force-cache"
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Product metadata fetch failed:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;

  let response = await getProduct(id);
  const product = response.data;

  console


  if (!product) {
    return {
      title: "Product Not Found | RockRoars",
      description: "This product does not exist.",
    };
  }

  return {
    title: `${product.name ? product.name : product.categoryName}`,
    description: product.description,
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
