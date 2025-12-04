"use client";
import Nav from "../Component/NavBar/Nav";
import Footer from "../Component/Footer/Footer";
import Image from "next/image";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import ItemCount from "./component/ItemCount";

export default function page() {
  const [total, setTotal] = useState(0);

  const { cartProduct, RemoveCartProduct } = UsePanel();

  const TotalAmount = useMemo(() => {
    let sum = 0;
    cartProduct.map((val: any) => (sum = sum + val.price * val.Quanty));
    return sum;
  }, [cartProduct]);

  useEffect(() => {
    setTotal(TotalAmount);
  }, [TotalAmount]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />

        <div className="my-5 flex-1">
          <div className="">
            <div className="flex flex-col  items-center gap-5 lg:gap-10">
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 800,
                }}
                className="lg:text-2xl mt-10 lg:mb-0 mb-5 underline"
              >
                Cart
              </span>

              <div className="flex lg:flex-row lg:px-10 flex-col px-3 w-full gap-5  mx-3">
                <div className="grid  lg:gap-5 gap-3 max-h-[400px] overflow-auto w-full  ">
                  {cartProduct.length > 0 ? (
                    cartProduct.map((val: any, i: number) => (
                      <div
                        key={i}
                        className="flex flex-row items-center border-gray-100 border-b-1 pb-5  justify-between    "
                      >
                        <div className="flex flex-row lg:gap-5  gap-3 items-center">
                          <Image
                            className=" cursor-pointer hover:scale-105 transition duration-500 ease-in"
                            loading="eager"
                            src={val?.img}
                            width={100}
                            height={100}
                            alt={`${i}`}
                          />

                          <div className="flex flex-col gap-1 items-baseline">
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                              }}
                              className="lg:text-medium text-[13px]"
                            >
                              {val.name}
                            </span>

                            <ItemCount id={val.id} />
                            <Button
                              onPress={() => RemoveCartProduct(val.id)}
                              className="border border-gray-300  rounded-sm"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 700,
                            }}
                          >
                            Rs {val.price}.00
                          </span>
                        </div>

                        {/* <MdOutlineDeleteForever
                          onClick={() => RemoveCartProduct(val.id)}
                          className="text-red-300 cursor-pointer"
                        /> */}
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center text-center gap-3 mt-5 flex-col">
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                        }}
                        className="lg:text-xl text-center"
                      >
                        Your Cart is Empty
                      </span>

                      <div className="flex justify-center">
                        <Link
                          className="hover:underline bg-ThemGold py-2 px-4 rounded-xl "
                          href={"/"}
                        >
                          Back To Home
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {total > 0 && (
                  <>
                    <div className="border border-gray-300"></div>

                    <div className="  flex max-h-56 overflow-y-auto w-full flex-col bg-ThemGold overflow-auto  p-5 gap-5 ">
                      <div className="flex w-full justify-between ">
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          Total Amount:
                        </span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                          }}
                        >
                          Rs {total}.00
                        </span>
                      </div>

                      <div className="flex flex-row w-[70%]">
                        <input
                          type="text"
                          className="outline-none bg-white border-none px-3 py-2"
                          placeholder="Discount Code"
                        />
                        <Button className="bg-ThemDeepGray text-white">
                          APPLY
                        </Button>
                      </div>

                      <div>
                        <Button className="bg-ThemCharcoal flex justify-center w-full text-white text-center py-3">
                          CHECK OUT
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
