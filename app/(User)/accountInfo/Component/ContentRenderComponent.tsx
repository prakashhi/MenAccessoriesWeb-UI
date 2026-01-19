import { useState } from "react";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { OrderDetailType, UserAddressListType } from "@/Type/UserDetailType";
import UserEditForm from "@/app/(User)/accountInfo/Component/UserEditForm";
import { Pencil } from "lucide-react";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import OrderDetailModel from "@/app/(User)/accountInfo/Component/OrderDetailModel";

import OrderListComponent from "@/app/(User)/accountInfo/Component/OrderListComponent";

import AddressShowProfileModel from "./AddressComponent/addressShowProfileModel";

import { useForm } from "react-hook-form";

import CreateEditConfigAddressForm from "./AddressComponent/CreateEditConfigAddressForm";
import { UsePanel } from "@/context/Context";

type IconType = "📭";

export default function ContentRenderer({
  keyname,
  onLogout,
}: {
  keyname: string;
  onLogout: () => void;
}) {
  const { userDataContext } = UsePanel();
  const user = userDataContext;
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "",
      state: "",
      countryCode: "",
      countryCodeLabel: "",
      pinCode: "",
    },
  });
  const [editOpen, setEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const [editAddressData, setEditAddressData] = useState<UserAddressListType>({
    id: "",
    ninerockUserId: "",
    idkUserId: null,
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    countryCode: "",
    contactNumber: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
  });
  const [selectOrderDetail, setSelectOrderDetail] = useState<
    Partial<OrderDetailType>
  >({});
  const [modelState, setModelState] = useState({
    EditAddressModel: false,
    AddressDetailEdit: false,
  });

  const router = useRouter();
  /* ---------------- INFO ---------------- */
  if (keyname === "info") {
    return (
      <>
        {modelState.EditAddressModel == false && (
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 lg:mb-5 mb-6 lg:items-center  sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-semibold ">
                {editOpen == true
                  ? "Edit Personal Information"
                  : "Personal Information"}
              </h3>

              {editOpen == false && (
                <Button
                  className="flex border  border-gray-50 rounded-xl hover:bg-cyan-50  items-center gap-3 w-full sm:w-auto"
                  size="sm"
                  onPress={() => setEditOpen(true)}
                >
                  <Pencil className="w-3 h-3" />
                  <span className="text-sm">Edit</span>
                </Button>
              )}
            </div>

            {editOpen == true ? (
              <UserEditForm user={user} onClose={() => setEditOpen(false)} />
            ) : (
              <div className="grid sm:grid-cols-2 justify-center-safe gap-4">
                {/* NAME */}
                <div>
                  <label className="text-sm text-gray-500">Full name</label>
                  <div className="mt-1 text-gray-900 flex items-center gap-2">
                    <FiUser className="text-gray-400" />
                    {user?.info?.userFirstName} {user?.info?.userLastName}
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <div className="mt-1 text-gray-900 flex items-center gap-2">
                    <FiMail className="text-gray-400" />
                    {user.info?.email}
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <div className="mt-1 text-gray-900 flex items-center gap-2">
                    <FiPhone className="text-gray-400" />
                    {user?.info?.contactNumber
                      ? ` ${user?.info?.contactNumber}`
                      : "N/A"}
                  </div>
                </div>

                {/* CREATED AT */}
                <div className="w-full">
                  <label className="text-sm text-gray-500">Joined On</label>

                  <div className="flex justify-between">
                    <div className="mt-1 text-gray-900">
                      {user?.info &&
                        new Date(user?.info?.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </>
    );
  }

  /* ---------------- ORDERS ---------------- */
  if (keyname === "orders") {
    return (
      <section>
        <h3 className="text-xl font-semibold lg:mb-3 mb-5">My Orders</h3>

        {isDetailOpen == true ? (
          <OrderDetailModel
            OrderData={selectOrderDetail}
            onClose={() => setIsDetailOpen(false)}
          />
        ) : (
          <div className="space-y-3 lg:p-5 p-1 h-[50dvh] overflow-y-auto">
            {user.OrderList?.length > 0 ? (
              user.OrderList.map((o: OrderDetailType) => (
                <OrderListComponent
                  openDetail={() => setIsDetailOpen(true)}
                  setOderDetail={setSelectOrderDetail}
                  onCloseDetail={() => setIsDetailOpen(false)}
                  key={o.id}
                  Data={o}
                />
              ))
            ) : (
              <NoData label="Orders" icon="📭" />
            )}
          </div>
        )}
      </section>
    );
  }

  if (keyname === "Addresses") {
    return (
      <>
        {modelState.EditAddressModel == false &&
          modelState.AddressDetailEdit == false && (
            <AddressShowProfileModel
              openCreateAddressModel={() =>
                setModelState((prev) => ({
                  ...prev,
                  EditAddressModel: true,
                }))
              }
              setEditAddressData={(value) => setEditAddressData(value)}
              openEditAddressModel={() =>
                setModelState((prev) => ({
                  ...prev,
                  AddressDetailEdit: true,
                }))
              }
            />
          )}

        {modelState.EditAddressModel == true && (
          <CreateEditConfigAddressForm
            onClose={() =>
              setModelState((prev) => ({ ...prev, EditAddressModel: false }))
            }
            typeOperation={"Create"}
          />
        )}

        {modelState.AddressDetailEdit === true && (
          <CreateEditConfigAddressForm
            EditAddersData={editAddressData}
            onClose={() =>
              setModelState((prev) => ({ ...prev, AddressDetailEdit: false }))
            }
            typeOperation={"Edit"}
          />
        )}
      </>
    );
  }

  /* ---------------- LOGOUT ---------------- */
  if (keyname === "logout") {
    return (
      <section>
        <h3 className="text-xl font-semibold mb-3 text-red-600">Logout</h3>
        <p className="text-sm text-gray-600 mb-4">
          Click the button below to sign out of your account.
        </p>

        <button
          onClick={onLogout}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </section>
    );
  }

  return null;
}

export function NoData({ label, icon }: { label: string; icon: IconType }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
        <span className="text-4xl text-gray-400">{icon}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-700">No {label}</h3>
      <p className="text-sm text-gray-500 mt-1">
        You don’t have any {label.toLowerCase()} yet.
      </p>
    </div>
  );
}
