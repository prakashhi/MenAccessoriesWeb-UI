import Optioncomponet from "./Optioncomponet";

export function LeftBar() {
  return (
    <>
      <div className="max-h-10  sticky col-span-1 lg:inline   md:hidden hidden top-25  ">
        <div className="lg:px-10 flex  mb-20   flex-col lg:gap-4">
          <Optioncomponet />
        </div>
      </div>
    </>
  );
}
