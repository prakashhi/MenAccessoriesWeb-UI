"use client";

import Nav from "@/app/(User)/Component/NavBar/Nav";
import { useParams } from "next/navigation";
import { LeftBar } from "./Componets/LeftBar";
import RightSection from "./Componets/RightSectionProduct";
import Footer from "@/app/(User)/Component/Footer/Footer";
import MobileFilterDrawer from "./Componets/MobileFilterDrawer";
import { useApi } from "@/app/useApi";
import { notify } from "../../Component/ToastComponent";
import { useCallback, useState, useEffect } from "react";

export default function page() {
  const params = useParams();


  const { callApi } = useApi();

  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    const res = await callApi("get", `/product/get-with-category?categoryId=${params.Categotyname}`);

  
    if (res?.error) {
      notify({
        message: res.message || "SomeThing is wrong!",
        type: "error",
      });
      return;
    }

    setData(res);
  }, []);

 

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* Mobile Drawer */}
      <MobileFilterDrawer />

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
            {data.category?.category_name}
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="hidden lg:block">
            <LeftBar />
          </div>

          <div className="col-span-4 lg:col-span-3 justify-items-center">
            <RightSection ProductData={data} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
