import { formatIndianPrice, PriceShowFunction } from "@/utils/FormatCurrency";

export const PriceTable = ({ item, user }: any) => (
  <>
    <div className="grid grid-cols-2 text-xs border border-gray-200 rounded-lg overflow-hidden">
      <div className="py-2 px-3 text-center  min-w-16">
        <p className="text-[10px] text-neutral-400 uppercase">Qty</p>
        <p className="font-medium text-neutral-900">{item.quantity}</p>
      </div>

      <div className="py-2 px-3 text-center border-gray-200 border-x min-w-24">
        <p className="text-[10px] text-neutral-400 uppercase">Unit</p>
        <p className="font-medium text-neutral-900 whitespace-nowrap">
          ₹{" "}
          {user
            ? formatIndianPrice(Number(item.product?.productPrice) * 10)
            : PriceShowFunction(item.code, item.sellingPrice)}
          .00
        </p>
      </div>

      <div className="py-2 w-full col-span-2 border-t-1 border-gray-200 px-3 text-center bg-neutral-50 min-w-24">
        <p className="text-[10px] text-neutral-400 uppercase">Total</p>
        <p className="font-semibold text-neutral-900 whitespace-nowrap">
          ₹{" "}
          {user
            ? formatIndianPrice(
                Number(item.product?.productPrice) * 10 * item.quantity
              )
            : PriceShowFunction(item.code, item.sellingPrice, item.quantity)}
          .00
        </p>
      </div>
    </div>
  </>
);
