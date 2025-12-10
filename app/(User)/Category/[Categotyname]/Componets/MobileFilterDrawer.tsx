"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import Optioncomponet from "./Optioncomponet";
import { Button } from "@heroui/react";
import { UsePanel } from "@/context/SerchPanelContext";

export default function MobileFilterDrawer() {
  const { isOpen, onOpenChange } = UsePanel();
  return (
    <>
      <Drawer
        backdrop="blur"
        className="text-black  h-screen p-4 sm:w-[70%] backdrop-blur-2xl w-[80%] top-0 z-9999 bg-white shadow transition duration-700 ease-linear"
        placement="left"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: { x: 0 },
            exit: { x: "-100%" },
          },
        }}
        classNames={{
          base: "left-0", // ensure drawer begins from left
        }}
      >
        <DrawerContent className="z-9999">
          {(onClose) => (
            <>
              <div className="px-3 py-10">
                <Optioncomponet />
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
