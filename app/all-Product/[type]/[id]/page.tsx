"use client";

import { useParams } from "next/navigation";

import { ProductData } from "@/app/Component/ProductList/ProductData";
import { useCallback, useEffect, useState } from "react";
import Nav from "@/app/Component/NavBar/Nav";
import Star from "@/app/Component/ProductList/Star";
import ItemCount from "@/app/Cart/component/ItemCount";
import Footer from "@/app/Component/Footer/Footer";
import Image from "next/image";

import { Heart } from "lucide-react";

import { Button } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";
import { toast } from "react-toastify";

export default function page() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);

  const [items,setItemscount]=useState<number>(1);

   console.log(items);

  const { AddCartProduct, AddLikeProduct } = UsePanel();

  const getProductData = useCallback(() => {
    let res = ProductData.find(
      (val, index) => val.category === params.type
    )?.products.find((item) => item.id === Number(params.id));
    setProduct(res);
  }, []);

  console.log("product", product);
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      <Nav />

      {product ? (
        <div className="grid lg:grid-cols-2 grid-row-2 lg:p-5 mx-2 gap-3 ">
          <div className=" h-[500px] relative ">
            <Image
              className="object-cover"
              loading="eager"
              src={product?.img}
              alt={product?.name}
              fill
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="p-5 flex flex-col gap-4">
              <h1
                className="text-xl "
                style={{ fontFamily: "sans-serif", fontWeight: 700 }}
              >
                {product?.name}
              </h1>
              <Star starNum={product.raring} />
              <span
                className="text-lg  mt-5"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                Rs. {product?.price}.00
              </span>
            </div>

            <div className="p-3 w-[150px]">
              
              <ItemCount id={product.id} Quanty={1} setItemscount={setItemscount} />
            </div>

            <div className="flex flex-col justify-center  p-3 ">
              <Button
                onPress={(e) => {
                  AddCartProduct(product);
                  toast(
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-lg text-yellow-400">
                        {product.name}
                      </span>
                      <span className="text-sm font-bold text-black/80">
                        Add to your Cart!
                      </span>
                    </div>,
                    {
                      style: {
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        marginTop: "20px",
                        backgroundColor: "#fff", // dark card-like background
                        color: "black",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                        maxWidth: "300px",
                      },
                      hideProgressBar: true,
                      position: "top-center",
                      autoClose: 1000,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    }
                  );
                }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                }}
                className="lg:text-medium overflow-hidden sm:text-[10px] bg-HoverThemDeepGray  text-[9px] border border-black hover:border-transparent hover:text-white   w-full p-2 py-4"
              >
                ADD TO CART
              </Button>

              <Button
                startContent={
                  <Heart size={18} color="#5443d0" strokeWidth={1} />
                }
                onPress={() => {
                  AddLikeProduct(product,items);
                  toast(
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-lg text-yellow-400">
                        {product.name}
                      </span>
                      <span className="text-sm text-white/90">
                        Product is added to your Wishlist!
                      </span>
                    </div>,
                    {
                      style: {
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        marginTop: "20px",
                        backgroundColor: "#1f1f1f", // dark card-like background
                        color: "#fff",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                        maxWidth: "300px",
                      },
                      hideProgressBar: true,
                      position: "bottom-center",
                      autoClose: 1000,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    }
                  );
                }}
                className="flex items-center gap-3 justify-center lg:text-medium overflow-hidden sm:text-[10px] bg-white mt-3 text-[9px] border border-black     w-full p-2 py-4"
              >
                ADD TO WISHLIST
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center  min-h-[70dvh] items-center">
          <span> Loading...</span>
        </div>
      )}

      <Footer />
    </>
  );
}
