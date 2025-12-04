import { useState } from "react";
import { options } from "../option";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

export function LeftBar() {
  type State = {
    isDown: boolean;
    selectedId: number;
  };

  const [state, setState] = useState<State>({
    isDown: false,
    selectedId: 0,
  });

  const handleUpDown = (id: number) => {
    setState((prev) => ({ ...prev, isDown: !prev.isDown, selectedId: id }));
  };

  return (
    <>
      <div className="lg:px-10 flex basis-[22%] flex-col lg:gap-4">
        {options &&
          options.map((val: any, index: number) => (
            <>
              <div
                onClick={() => handleUpDown(index)}
                className="flex flex-row justify-between cursor-pointer transition duration-500 ease-in"
              >
                <h2
                  style={{
                    fontFamily: "revert-layer",
                    fontWeight: 200,
                  }}
                  key={index}
                >
                  {val.name}
                </h2>

                {state.isDown == true ? (
                  <RiArrowDropDownLine />
                ) : (
                  <RiArrowDropUpLine />
                )}
              </div>

              {
                state.isDown == true &&
                val.opt &&
                val.opt.map((val) => <div>{val}</div>)}
            </>
          ))}
      </div>
    </>
  );
}
