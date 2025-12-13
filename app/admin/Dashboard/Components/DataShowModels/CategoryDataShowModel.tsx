"use client";

interface Category {
  id: string;
  category_name: string;
  sub_category: string | string[];
  parent_id: string | null;
  category_desc: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

export default function CategoryDetailModal({
  open,
  onClose,
  category,
}: Props) {
  if (!open || !category) return null;

  /* Normalize sub categories */
  const subCategories: string[] = Array.isArray(category.sub_category)
    ? category.sub_category
    : JSON.parse(category.sub_category || "[]");

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center px-3">
      <div className="w-full max-w-3xl bg-[#F9FAFB] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
              Category Details
            </p>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              {category.category_name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Description */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
              Description
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {category.category_desc || "No description available"}
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Info label="Category ID" value={category.id} />
            <Info
              label="Parent Category"
              value={category.parent_id ?? "Main Category"}
            />
          </div>

          {/* Sub Categories */}
          {subCategories.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                Sub Categories
              </p>
              <div className="flex gap-2 flex-wrap">
                {subCategories.map((sub, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 text-xs rounded-full bg-gray-100 text-gray-700 border hover:bg-gray-200 transition"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="text-xs text-gray-400 italic">
            Category structure managed centrally
          </p>
        </div>
      </div>
    </div>
  );
}

/* Small reusable info block */
const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[11px] uppercase tracking-wider text-gray-400">
      {label}
    </p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);
