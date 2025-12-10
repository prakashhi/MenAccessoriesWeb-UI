"use client";

import Nav from "../../../Component/NavBar/Nav";
import Footer from "../../../Component/Footer/Footer";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@heroui/react";
import { Heart } from "lucide-react";
import { UsePanel } from "@/context/SerchPanelContext";
import { ProductData } from "@/app/(User)/Component/ProductList/ProductData";
import ItemCount from "@/app/(User)/Cart/component/ItemCount";
import Star from "@/app/(User)/Component/ProductList/Star";
import { toast } from "react-toastify";



import PictureGallery from "./Component/PictureGallery";
import { notify } from "@/app/(User)/Component/AddCartToast";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [items, setItemscount] = useState<number>(1);
  const { AddCartProduct, AddLikeProduct } = UsePanel();


  // Get product from data
  const getProductData = useCallback(() => {
    const res = ProductData.find(
      (val) => val.category === params.type
    )?.products.find((item) => item.id === Number(params.id));
    setProduct(res);
  }, [params]);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        Loading...
      </div>
    );

 let images=[
  "/images/p1-2.webp",
  "/images/p1-2.webp",
  "/images/p1-3.webp"
]


  return (
    <>
      <Nav />

      <div className="max-w-6xl mx-auto lg:px-10 px-3 py-8 grid lg:grid-cols-2 gap-8">
        {/* LEFT SIDE: IMAGES */}
        
        <PictureGallery images={images} name={product.name} />

        {/* RIGHT SIDE: PRODUCT INFO */}  
        <div className="flex flex-col sticky top-24 gap-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            {product.name}
          </h1>

          <Star starNum={product.raring} />

          <p className="text-xl font-semibold mt-2">₹{product.price}.00</p>

          <div className="w-[150px] mt-2">
            <ItemCount
              id={product.id}
              Quanty={1}
              setItemscount={setItemscount}
            />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <Button
              onPress={() => {
                AddCartProduct(product);

                notify({
                  message: `${product.name} added to Cart!`,
                  type: "success",
                });
                
              }}
              className="w-full bg-black text-white hover:bg-gray-900 py-3 rounded-lg"
            >
              Add to Cart
            </Button>

            <Button
              startContent={<Heart size={18} color="#5443d0" strokeWidth={1} />}
              onPress={() => {
                AddLikeProduct(product, items);

                 notify({
                  message: `${product.name}  added to Wishlist!`,
                  type: "success",
                }); 
              }}
              className="w-full flex justify-center items-center border border-black hover:bg-black hover:text-white py-3 rounded-lg"
            >
              Add to Wishlist
            </Button>
          </div>

          {/* Hero Drawer Info */}
          <div className="mt-8 p-5 bg-black/10 rounded-xl shadow-inner">
            <h2 className="font-bold text-lg">Product Details</h2>
            <p className="text-gray-700 mt-2">
              {product.description ||
                "This is a premium product with high-quality design, inspired by luxury fashion."}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
