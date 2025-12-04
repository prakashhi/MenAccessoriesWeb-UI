"use client";
import Nav from "@/app/Component/NavBar/Nav";
import { useParams } from "next/navigation";
import { LeftBar } from "./Componets/LeftBar";
import RightSection from "./Componets/RightSection";


export default function page() {
  const params = useParams();

  return (
    <>
      <Nav />
      <div>
        <div className="flex justify-center mt-10">
          <h2
            className="lg:text-xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
            }}
          >
            {" "}
            {params?.Categotyname}
          </h2>
        </div>

        <div className="flex flex-row gap-3 ">
          <LeftBar  />
          <RightSection  CategoryName={params?.Categotyname}/>
        </div>
      </div>
    </>
  );
}
