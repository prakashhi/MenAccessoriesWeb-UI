import { useState } from "react";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { OrderDetailType } from "@/app/(User)/Type/UserDetailType";
import UserEditForm from "@/app/(User)/AccountInfo/Component/UserEditForm";
import { Pencil } from "lucide-react";
import ChangePassword from "@/app/(User)/AccountInfo/Component/ChangePassword";
import {
  FiUser,
  FiHeart,
  FiClipboard,
  FiLogOut,
  FiChevronRight,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import OrderDetailModel from "./OrderDetailModel";

import OrderListComponent from "./OrderListComponent";

type IconType = "📭";

export default function ContentRenderer({ keyname, user, onLogout }: any) {
  const [editOpen, setEditOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [selectOrderDetail, setSelectOrderDetail] = useState<OrderDetailType>(
    {}
  );

  const router = useRouter();
  /* ---------------- INFO ---------------- */
  if (keyname === "info") {
    return (
      <section>
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
        ) : isOpen == false ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500">Full name</label>
              <div className="mt-1 text-gray-900 flex items-center gap-2">
                <FiUser className="text-gray-400" />
                {user.info?.userName}
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
                {user.info?.contactNumber
                  ? `${user.info.countryCode} ${user.info.contactNumber}`
                  : "N/A"}
              </div>
            </div>

            {/* ADDRESS */}
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500">Address</label>

              <div className="mt-1 flex items-start gap-2 text-gray-900 bg-gray-50 rounded-md p-3">
                <FiMapPin className="text-gray-400 mt-1 shrink-0" />
                <p className="text-sm leading-relaxed">
                  {user?.info?.address?.trim() ? user.info.address : "N/A"}
                  {user?.info?.state && `, ${user.info.state}`}
                  {user?.info?.country && `, ${user.info.country}`}
                  {user?.info?.pinCode && ` - ${user.info.pinCode}`}
                </p>
              </div>
            </div>

            {/* CREATED AT */}
            <div className="w-full">
              <label className="text-sm text-gray-500">Joined On</label>

              <div className="flex justify-between">
                <div className="mt-1 text-gray-900">
                  {new Date(user?.info?.createdAt).toLocaleDateString()}
                </div>

                <div>
                  <span
                    className="underline text-sm text-blue-700 cursor-pointer"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    Change Password
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ChangePassword onClose={() => setIsOpen(false)} />
        )}
      </section>
    );
  }

  /* ---------------- ORDERS ---------------- */
  if (keyname === "orders") {
    return (
      <section>
        <h3 className="text-xl font-semibold mb-3">My Orders</h3>

        {isDetailOpen == true ? (
          <OrderDetailModel
            OrderData={selectOrderDetail}
            onClose={() => setIsDetailOpen(false)}
          />
        ) : (
          <div className="space-y-3 p-5">
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
