export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
        sm:gap-5
        lg:gap-6
        mt-6
      "
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="animate-pulse rounded-xl border border-gray-200 p-3 space-y-3">
            {/* Image */}
            <div className="h-55 w-full rounded-lg bg-gray-200" />

            {/* Title */}
            <div className="h-4 w-3/4 rounded bg-gray-200" />

            {/* Button */}
            <div className="h-9 w-full rounded-lg bg-gray-200 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
