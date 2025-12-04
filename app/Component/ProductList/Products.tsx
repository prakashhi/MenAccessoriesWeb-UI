import { ProductData } from "./ProductData";
import Link from "next/link";
import CardModel from "./CardModel";
import { product } from "../../../context/Types/type";

export default function Product() {
  return (
    <>
      <div className=" bg-ThemGold lg:pt-30 pt-10">
        {ProductData.map((val, index) => (
          <div key={index}>
            <div className="flex flex-col lg:gap-15 gap-3  items-center justify-center  cursor-pointer">
              {" "}
              <div className="flex lg:gap-3 gap-2 items-center justify-center flex-col lg:mt-10 mt-20">
                <span
                  style={{ fontFamily: "ui-serif", fontWeight: 700 }}
                  className="font-bold lg:text-xl sm:text-medium text-[20px]"
                >
                  {val.category}
                </span>
                <Link
                  href={`/Category/${val.category}`}
                  className="lg:text-medium text-[13px]  px-6 py-2  border border-black  hover:bg-black hover:text-white duration-700 ease-in-out "
                >
                  VIEW ALL
                </Link>
              </div>
              <div className="flex flex-row overflow-auto scrollbar-hide lg:mx-2 px-2 lg:gap-1   w-full">
                <CardModel DataObj={val.products} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
