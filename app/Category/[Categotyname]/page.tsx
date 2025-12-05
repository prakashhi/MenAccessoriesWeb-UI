"use client";
import Nav from "@/app/Component/NavBar/Nav";
import { useParams } from "next/navigation";
import { LeftBar } from "./Componets/LeftBar";
import RightSection from "./Componets/RightSectionProduct";
import Footer from "@/app/Component/Footer/Footer";
import MobileFilterDrawer from "./Componets/MobileFilterDrawer";
import { Button, useDisclosure } from "@heroui/react";

export default function page() {
  const params = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <MobileFilterDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
      <Button onPress={onOpen}>Vlci</Button>
      <Nav />
      {/* <div>
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

        <div className="grid lg:grid-cols-4 gap-3 ">
          <LeftBar />
          <RightSection CategoryName={params?.Categotyname} />
        </div>
      </div> */}

      <Footer />
    </>
  );
}
