import { ProductData } from "./ProductData";
import Link from "next/link";
import CardModel from "./CardModel";
import { product } from "../../../context/Types/type";

export default function Product() {
  return (
    <>
      <div className="pt-10 lg:pt-20 px-4 md:px-8 lg:px-16">
        {ProductData.map((categoryItem, index) => (
          <div key={index} className="mb-16">
            {/* Category Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-6">
              <h2
                className="text-2xl lg:text-3xl font-extrabold font-serif text-gray-900"
                style={{ fontFamily: "ui-serif, serif" }}
              >
                {categoryItem.category}
              </h2>
              <Link
                href={`/Category/${categoryItem.category}`}
                className="mt-3 lg:mt-0 px-5 py-2 border border-black text-sm font-semibold rounded-md hover:bg-black hover:text-white transition-colors duration-300"
              >
                VIEW ALL
              </Link>
            </div>

            {/* Product Cards Scroll */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
              <CardModel
                category={categoryItem.category}
                DataObj={categoryItem.products}
                CustomWH="min-w-[220px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[300px]"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
