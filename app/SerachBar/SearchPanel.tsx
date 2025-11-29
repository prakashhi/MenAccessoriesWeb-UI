import React from "react";
import { Button, Form, Input } from "@heroui/react";
import { IoClose } from "react-icons/io5";
import { UsePanel } from "@/context/SerchPanelContext";
import { Category } from "../Component/SerchPanel/Categotys";

export default function SearchPanel() {
  const { setState } = UsePanel();

  const handleClose = () => {
    setState((prev) => ({ ...prev, isSearchPanel: false }));
  };
  return (
    <React.Fragment>
      <div className="absolute w-full inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center  z-10">
        <div className="bg-white/80 p-6  rounded-lg shadow-lg w-[90%] max-w-md flex flex-col gap-3 ">
          <div className="flex flex-row ">
            <Input
              isRequired
              className="w-full outline-hidden bg-white/90 rounded-md p-3 border-none"
              name="username"
              placeholder="Enter your username"
            />
            <IoClose
              onClick={handleClose}
              className="cursor-pointer relative top-0 left-2"
            />
          </div>

          <div className="grid gap-3 grid-cols-3">
            {Category.map((val, index) => (
              <span
                className="bg-gray-200 text-center rounded-xl p-2 shadow cursor-pointer "
                key={index}
              >
                {val.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
