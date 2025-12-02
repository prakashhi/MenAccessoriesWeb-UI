import {Category} from "../../Component/Categotys";

import Link from 'next/link'
export default function Footer() {
  return (
    <>
      <div className="bg-black text-white lg:p-10 p-5 mt-10 relative left-0 w-full bottom-0 top-0 ">
        <div className="flex flex-col gap-10">
          {Category.map((val, index) => (
            <Link className="hover:underline" href={`/Category/${val.name}`} key={index}>{val.name}</Link>
          ))}
        </div>
      </div>
    </>
  );
}
