"use client";
import { Category } from "../Component/Categotys";
import { ProductData } from "../Component/ProductList/ProductData";
import CardModel from "../Component/ProductList/CardModel";
import Nav from "../Component/NavBar/Nav";
import Link from "next/link";

export default function page() {
  return (
    <>
      <Nav />
      <div className="">
        <div className="   flex  flex-col gap-5   ">
          <div className="flex   p-5    shadow-md    flex-col gap-4  ">
            <div className="flex flex-row">
              <input
                className="w-full outline-hidden outline-0  p-3 border border-black"
                name="username"
                placeholder="Search "
              />
            </div>

            <div className="grid lg:grid-cols-6 grid-cols-3 lg:gap-3 gap-2">
              {Category.map((val, index) => (
                <Link
                  style={{ fontFamily: "sans-serif", fontWeight: 600 }}
                  href={`/Category/${val.name}`}
                  className=" text-center  bg-gray-50  rounded-md p-2  cursor-pointer "
                  key={index}
                >
                  {val.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3  m-3">
            <span className="flex justify-center">Suggested Products</span>

            <div className="flex flex-row overflow-auto scrollbar-hide  lg:gap-1   w-full">
              <CardModel DataObj={ProductData[0]?.products} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
