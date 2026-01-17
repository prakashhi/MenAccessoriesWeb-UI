import { X } from "lucide-react";
import { useState } from "react";
import { UsePanel } from "@/context/Context";
import CreateEditConfigAddressForm from "@/app/(User)/accountInfo/Component/AddressComponent/CreateEditConfigAddressForm";
import { Button } from "@heroui/react";

export function PaymentAddressSelect({
  onClose,
  setSelectedAddressIndex,
  selectedAddressIndex,
}: {
  onClose: () => void;
  setSelectedAddressIndex: (index: number) => void;
  selectedAddressIndex: number;
}) {
  const { userDataContext } = UsePanel();

  const [stateModel, setStateModel] = useState({
    CreateAddress: false,
  });
  return (
    <>
      {stateModel.CreateAddress == true && (
        <CreateEditConfigAddressForm
          typeOperation="Create"
          onClose={() =>
            setStateModel((prev) => ({ ...prev, CreateAddress: false }))
          }
        />
      )}

      {stateModel.CreateAddress == false && (
        <div className="relative w-full">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
        absolute top-4 right-4
        flex items-center cursor-pointer justify-center
        w-9 h-9
        rounded-full
        bg-gray-100/70
        text-gray-600
        hover:bg-gray-200
        hover:text-gray-900
        active:scale-95
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-gray-300
      "
          >
            <X size={18} />
          </button>
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 space-y-5">
            <h3 className="text-lg font-semibold text-gray-900">
              Select Delivery Address
            </h3>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 h-80 overflow-y-auto">
              {userDataContext.AddressList.map((val, index) => {
                const isSelected = selectedAddressIndex === index;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedAddressIndex(index);
                      onClose();
                    }}
                    className={`
    cursor-pointer flex flex-col justify-between
    rounded-2xl border
    p-4 sm:p-5
    transition-all duration-200
    active:scale-[0.99]
    ${
      isSelected
        ? "border-black ring-2 ring-black/10 bg-gray-50"
        : "border-gray-200 bg-white hover:border-gray-300"
    }
  `}
                  >
                    {/* Address Info */}
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base font-semibold text-gray-900">
                        {val.addressLine1}
                      </p>

                      {val.addressLine2 && (
                        <p className="text-sm text-gray-600">
                          {val.addressLine2}
                        </p>
                      )}

                      <p className="text-sm text-gray-700">
                        {val.city}, {val.state} – {val.pinCode}
                      </p>

                      <p className="text-sm text-gray-700">{val.country}</p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-3" />

                    {/* Contact */}
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        📞 {val.countryCode} {val.contactNumber}
                      </p>
                      {val.email && <p className="truncate">✉️ {val.email}</p>}
                    </div>

                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="mt-3 text-xs font-medium text-green-600">
                        ✓ Selected
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className="
    sticky bottom-0
    bg-white pt-4
    space-y-3
  "
            >
              <Button
                type="button"
                onPress={() =>
                  setStateModel((prev) => ({ ...prev, CreateAddress: true }))
                }
                className="
    w-full h-11 rounded-xl
    border border-dashed border-gray-300
    text-sm font-medium
    text-gray-700
    hover:border-black hover:text-black
    active:scale-95
    transition
  "
              >
                + Add New Address
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
