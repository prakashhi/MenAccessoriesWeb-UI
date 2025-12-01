import {Category} from "../../Component/Categotys";

export default function Footer() {
  return (
    <>
      <div className="bg-black text-white p-10 mt-10 relative bottom-0  ">
        <div className="flex flex-col gap-10">
          {Category.map((val, index) => (
            <span key={index}>{val.name}</span>
          ))}
        </div>
      </div>
    </>
  );
}
