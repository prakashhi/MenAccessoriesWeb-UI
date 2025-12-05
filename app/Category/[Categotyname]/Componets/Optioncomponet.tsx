import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { options } from "../option";

import { Checkbox } from "@heroui/checkbox";
import { useState } from "react";
import React from "react";
export default function Optioncomponet() {
  const [state, setState] = useState({});

  const handleUpDown = (index: number) => {
    setState((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <>
      {options &&
        options.map((val: any, index: number) => (
          <React.Fragment key={index}>
            <div
              onClick={() => handleUpDown(index)}
              className="flex flex-row justify-between border-b-1 border-gray-200 pb-3 cursor-pointer transition duration-500 ease-in"
            >
              <h2
                style={{
                  fontFamily: "revert-layer",
                  fontWeight: 200,
                }}
              >
                {val.name}
              </h2>

              {state[index] == true ? (
                <RiArrowDropDownLine />
              ) : (
                <RiArrowDropUpLine />
              )}
            </div>

            {state[index] == true &&
              val.opt &&
              val.opt.map((val: string, index: number) => (
                <div key={index} className="flex items-center gap-6">
                  <Checkbox
                    style={{
                      accentColor: "#d4af37",
                    }}
                    type="checkbox"
                    name={val}
                    className="checked:accent-white"
                    id=""
                  />
                  <span
                    style={{
                      fontFamily: "revert-layer",
                      fontWeight: 200,
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
          </React.Fragment>
        ))}
    </>
  );
}
