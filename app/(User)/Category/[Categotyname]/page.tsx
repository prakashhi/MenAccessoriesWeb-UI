"use client";

import Nav from "@/app/Component/NavBar/Nav";
import { useParams } from "next/navigation";
import { LeftBar } from "./Componets/LeftBar";
import RightSection from "./Componets/RightSectionProduct";
import Footer from "@/app/Component/Footer/Footer";
import MobileFilterDrawer from "./Componets/MobileFilterDrawer";
import { useDisclosure } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";
import { Button } from "@heroui/react";

export default function page() {
  const params = useParams();
  const { onOpen } = UsePanel();


  return (
    <>
      {/* Mobile Drawer */}
      <MobileFilterDrawer  />


      {/* Top Navigation */}
      <Nav />

      {/* MAIN WRAPPER */}
      <div className="w-full  mx-auto px-1 lg:px-6">       
        <div className="flex justify-center lg:mt-14 my-6">
          <h2
            className="text-xl lg:text-3xl tracking-wide text-black"
            style={{
              fontFamily: "ui-serif",
              fontWeight: 800,
            }}
          >
            {params?.Categotyname}
          </h2>
        </div>

       
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">

         
          <div className="hidden lg:block">
            <LeftBar />
          </div>

         
          <div className="col-span-4 lg:col-span-3 justify-items-center">
            <RightSection CategoryName={params?.Categotyname} />
          </div>
        </div>
      </div> 

      {/* FOOTER */}
      <Footer />
    </>
  );
}
