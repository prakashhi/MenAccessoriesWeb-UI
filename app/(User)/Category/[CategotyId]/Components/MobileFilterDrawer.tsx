"use client";

import { Drawer, DrawerContent, DrawerBody } from "@heroui/drawer";
import { Button } from "@heroui/react";
import { X } from "lucide-react";
import OptionComponent from "./OptionComponent";
import { UsePanel } from "@/context/Context";
import axios from "axios";

import { ProductInfoType } from "@/app/(User)/Type/Types";
import { useApi } from "@/app/useApi";
import { useState } from "react";
import { useParams } from "next/navigation";
import { notify } from "@/app/(User)/Component/ToastComponent";

export type StateMobileDrawer = {
  malarialId: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  PriceLabel: string | null;
};

export default function MobileFilterDrawer({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<ProductInfoType[]>>;
}) {
  const { isOpen, onOpenChange } = UsePanel();

  const params = useParams();

  const [state, setState] = useState<StateMobileDrawer>({
    malarialId: null,
    minPrice: null,
    maxPrice: null,
    PriceLabel: null,
  });

  const { callApi } = useApi();

  const handleClick = async () => {
    let url = `/product-list-for-idk-jwellery?limit=100&offset=0&${
      state.malarialId !== null && `materialIds=${state.malarialId}`
    }&categoryIds=${params.CategotyId}&${
      state.minPrice && `minPrice=${state.minPrice}`
    }&${
      state.maxPrice && `maxPrice=${state.maxPrice}`
    }&sortOrder=desc&sortBy=createdAt`;

    try {
      let res = await callApi("get", url);
      setData(res.data);

      onOpenChange();
    } catch (err: unknown) {
      let message;
      if (axios.isAxiosError(err)) {
        message = err?.response?.data?.message || "Something is wrong!";
      }

      notify({
        message: message,
        type: "error",
      });
      console.log(err);
    }
  };

  return (
    <Drawer
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="left"
      size="sm"
      classNames={{
        base: `
          bg-white
          z-[9999]
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        `,
        backdrop: "bg-black/50 backdrop-blur-sm",
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            transition: {
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            },
          },
          exit: {
            x: "-100%",
            transition: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            },
          },
        },
      }}
    >
      <DrawerContent>
        {(onClose) => (
          <div className="flex flex-col min-h-dvh">
            {/* ================= HEADER ================= */}
            <header className="px-5 py-4 border-b-1 border-gray-200 flex items-center justify-between">
              <h2 className="text-[11px] tracking-[0.25em] uppercase text-gray-500">
                Filter Results
              </h2>

              <button
                onClick={onClose}
                className="
                  flex items-center gap-2
                  cursor-pointer
                  text-gray-500
                  hover:text-black
                  transition
                  p-2
                  -mr-2
                "
                aria-label="Close filters"
              >
                <span className="text-[11px] tracking-widest hidden sm:block">
                  CLOSE
                </span>
                <X size={18} />
              </button>
            </header>

            {/* ================= BODY ================= */}
            <DrawerBody className="flex-1 px-5 py-6 overflow-y-auto">
              <OptionComponent setState={setState} state={state} />
            </DrawerBody>

            {/* ================= FOOTER ================= */}
            <footer className="px-5 py-4 border-t-1 border-gray-200 bg-white">
              <Button
                fullWidth
                onPress={handleClick}
                className="
                  bg-black text-white 
                  h-12
                  rounded-lg
                  text-[11px]
                  tracking-[0.3em]
                  uppercase
                  hover:bg-neutral-900
                  transition
                "
              >
                Apply Filters
              </Button>
            </footer>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
