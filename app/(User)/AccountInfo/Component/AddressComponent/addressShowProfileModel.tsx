import { Button } from "@heroui/react";
import {
  FiMapPin,
  FiPlusCircle,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
} from "react-icons/fi";

import { UserAddressListType } from "@/Type/UserDetailType";
import { UsePanel } from "@/context/Context";
import { notify } from "@/Component/ToastComponent";
import { useState } from "react";

import { DeleteAddressAskModel } from "../DeleteAddressAskModel";

type Props = {
  openCreateAddressModel: () => void;
  setEditAddressData: (Data: UserAddressListType) => void;
  openEditAddressModel: () => void;
};

export default function AddressShowProfileModel({
  openCreateAddressModel,
  setEditAddressData,
  openEditAddressModel,
}: Props) {
  const [state, setState] = useState({
    DeleteAskModel: false,
    DeleteAddressId: "",
  });
  const { userDataContext, DeleteAddressProfile, loading, UserTrigger } =
    UsePanel();

  const addressList = userDataContext.AddressList;

  const onDeleteHandle = async (addressId: string) => {
    try {
      let res = await DeleteAddressProfile(addressId);

      if (res.success == true) {
        UserTrigger();
        setState((prev) => ({
          ...prev,
          DeleteAskModel: false,
        }));
        notify({
          message: "Address deleted successfully",
          type: "success",
        });
      }
    } catch (err: any) {
      notify({
        message: err.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="sm:col-span-2 space-y-3 ">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-5">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700">Addresses</h3>
          </div>

          <Button
            type="button"
            onPress={openCreateAddressModel}
            className="flex items-center border border-dashed border-gray-300 rounded-md  gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            <FiPlusCircle className="text-base" />
            <span className="">Add Address</span>
          </Button>
        </div>

        {/* EMPTY STATE */}
        {addressList.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[200px] gap-2 text-gray-500">
            <p className="text-sm font-medium">No addresses yet</p>
            <p className="text-xs text-gray-400">
              Add a new address to get started
            </p>
          </div>
        )}

        {/* ADDRESS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 h-[50dvh] scrollbar-hide overflow-scroll">
          {addressList
            .sort(
              (a, b) =>
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime()
            )
            .map((address: UserAddressListType) => (
              <div
                key={address.id}
                className="
    rounded-xl
  sm:min-h-[200px]
    cursor-pointer
    border border-gray-200
    bg-white
    p-3 md:p-4
    shadow-xs hover:shadow-md
    transition
  "
              >
                {/* CONTENT */}
                <div className="flex h-full gap-3">
                  <FiMapPin className="mt-1 text-gray-400 shrink-0" />

                  <div className="flex-1 flex flex-col justify-between gap-3 text-sm text-gray-700">
                    {/* ADDRESS + CONTACT */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      {/* ADDRESS */}
                      <div className="space-y-1">
                        <p className="font-medium">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                        </p>

                        <p>
                          {address.city}, {address.state}, {address.country} -{" "}
                          {address.pinCode}
                        </p>
                      </div>

                      {/* CONTACT */}
                      <div className="flex flex-col gap-1 text-gray-500 sm:text-right">
                        {address.email && (
                          <div className="flex items-center gap-2 sm:justify-end">
                            <FiMail size={14} />
                            <span>{address.email}</span>
                          </div>
                        )}

                        {address.contactNumber && (
                          <div className="flex items-center gap-2 sm:justify-end">
                            <FiPhone size={14} />
                            <span>{address.contactNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3 border-t border-gray-300 pt-3 mt-2">
                      <Button
                        onPress={() => {
                          setEditAddressData(address);
                          openEditAddressModel();
                        }}
                        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition"
                      >
                        <FiEdit2 size={14} />
                        Edit
                      </Button>

                      <Button
                        onPress={() =>
                          setState({
                            DeleteAskModel: true,
                            DeleteAddressId: address.id,
                          })
                        }
                        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {state.DeleteAskModel == true && (
        <DeleteAddressAskModel
          open={state.DeleteAskModel}
          onConfirm={() => onDeleteHandle(state.DeleteAddressId)}
          onCancel={() =>
            setState((prev) => ({
              ...prev,
              DeleteAskModel: false,
            }))
          }
          loading={loading}
        />
      )}
    </>
  );
}
