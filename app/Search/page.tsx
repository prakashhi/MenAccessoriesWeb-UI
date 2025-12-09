"use client";
import { Category } from "../Component/Categotys";
import { ProductData } from "../Component/ProductList/ProductData";
import CardModel from "../Component/ProductList/CardModel";
import Nav from "../Component/NavBar/Nav";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Nav />

      <div className="px-4 md:px-8 lg:px-16 py-6">
        {/* Search Box */}
        <div className="flex flex-col gap-6 shadow-md p-6 rounded-lg bg-white">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-full py-3 px-4 pl-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 shadow-sm"
              placeholder="Search for products, brands..."
            />
            {/* Search Icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {Category.map((val, index) => (
              <Link
                key={index}
                href={`/Category/${val.name}`}
                className="text-center shadow bg-ThemGold text-white rounded-lg py-2 px-2 hover:scale-105 transition-transform duration-300 font-medium"
              >
                {val.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Suggested Products */}
        <div className="flex flex-col gap-4 mt-8">
          <span
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
            className="text-center text-lg lg:text-xl"
          >
            Suggested Products
          </span>

          <div className="flex flex-row overflow-auto scrollbar-hide gap-4 lg:gap-6 w-full py-2">
            <CardModel DataObj={ProductData[0]?.products} CustomWH="sm:w-56 md:w-64 lg:w-72 h-80 flex-shrink-0" category="All" />
          </div>
        </div>
      </div>
    </>
  );
}
