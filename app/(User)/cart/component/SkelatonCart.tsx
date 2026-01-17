
export default function CartSkeleton() {
  return (
    <section className="px-4 lg:px-20 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT: CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex gap-4 p-4  rounded-xl bg-white"
            >
              {/* Image */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse" />

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Price */}
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* ================= RIGHT: SUMMARY ================= */}
        <div className=" rounded-2xl p-6 bg-white space-y-5 h-fit">
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />

          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between">
            <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Checkout Button */}
          <div className="h-11 w-full bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}
