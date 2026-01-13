import { FaFilter, FaBoxOpen } from "react-icons/fa";

export default function EmptyTableComponent() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div
        className="
          w-20 h-20
          rounded-full
          bg-gray-100
          flex items-center justify-center
          mb-6
        "
      >
        <FaBoxOpen size={28} className="text-gray-400" />
      </div>

      <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-700">
        No Products Found
      </h3>

      <p className="mt-2 text-xs text-gray-400 max-w-xs">
        Try adjusting filters or explore other categories
      </p>
    </div>
  );
}
