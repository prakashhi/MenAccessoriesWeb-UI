import { Category } from "@/app/Component/Categotys";
import Link from "next/link";

export default function PrdocutTypeList() {
  return (
    <>
      <div className="flex flex-row p-4 items-center gap-1  shadow-sm">
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          Accessories:
        </span>

        <div className="w-full overflow-x-auto whitespace-nowrap">
          {Category &&
            Category.map((val, index) => (
              <Link
                key={index}
                href={`/Category/${val.name}`}
                className="mx-2 text-sm hover:underline"
                style={{ fontFamily: "sans-serif", fontWeight: 500 }}
              >
                {val.name}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
