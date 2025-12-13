"use client";
import Nav from "../Component/NavBar/Nav";
import Link from "next/link";
import CardModel from "../Component/ProductList/CardModel";
import { Category } from "../Component/Categotys";
import { ProductData } from "../Component/ProductList/ProductData";

export default function Page() {
  return (
    <>
      <Nav />

      <main className="px-4 md:px-8 lg:px-16 py-10 max-w-7xl mx-auto">
        {/* SEARCH BOX */}
        <div className="flex flex-col gap-6 shadow-md p-6 rounded-2xl bg-white">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full border border-gray-200 rounded-full py-3 px-4 pl-12 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 transition-all duration-300 shadow-sm"
              placeholder="Search for products, brands..."
            />
            
          </div>

          {/* CATEGORIES */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Category.map((val, index) => (
              <Link
                key={index}
                href={`/Category/${val.name}`}
                className="text-center bg-gray-100 text-gray-700 rounded-xl py-3 px-2 hover:scale-105 hover:shadow-md transition-transform duration-300 font-medium tracking-wide text-xs sm:text-sm"
              >
                {val.name}
              </Link>
            ))}
          </div>
        </div>

        {/* SUGGESTED PRODUCTS */}
        <section className="mt-10 flex flex-col gap-6">
          <h2
            className="text-center text-xl lg:text-2xl font-extrabold tracking-wide text-gray-800"
            style={{ fontFamily: "ui-serif, serif" }}
          >
            Suggested Products
          </h2>

          <div className="flex flex-row overflow-x-auto gap-4 lg:gap-6 py-2 scrollbar-hide snap-x snap-mandatory">
            {ProductData[0]?.products.map((product: any, index: number) => (
              <div key={index} className="snap-start flex-shrink-0">
                <CardModel
                  DataObj={[product]}
                  CustomWH="w-56 sm:w-64 md:w-72 lg:w-72 h-80 rounded-2xl shadow-md hover:shadow-lg transition-transform duration-500 hover:-translate-y-2"
                  category="All"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
