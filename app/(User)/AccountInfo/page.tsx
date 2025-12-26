"use client";

import { useState, useEffect, useMemo } from "react";
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
import Nav from "../Component/NavBar/Nav";
import { useApi } from "@/app/useApi";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { notify, toastActions } from "@/app/(User)/Component/ToastComponent";
import { getUserFromStorage } from "@/context/utils";
import { User, LikeProductType, OrderType } from "@/app/(User)/Type/Types";
import { ImageShowUtil } from "@/app/utils/ImageShowUtil";
import Image from "next/image";
import { Button } from "@heroui/react";
import UserEditForm from "./Component/UserEditForm";
import { Pencil } from "lucide-react";
import ChangePassword from "./Component/ChangePassword";

type IconType = "📭";

export default function AccountSection() {
  const userData = useMemo(() => getUserFromStorage(), []);

  const [user, setUserData] = useState({
    info: {} as User,
    orders: [] as OrderType[],
    wishlist: [] as LikeProductType[],
    OrderList: [],
  });

  // Logout handler (sample)
  const handleLogout = async () => {
    localStorage.removeItem("UserData");
    localStorage.removeItem("Token");

    notify({
      message: "Log Out Successfully",
      type: "info",
    });
    // Redirect to admin dashboard

    router.replace("/login");
  };

  const menu = [
    { key: "info", label: "Personal Information", icon: <FiUser size={18} /> },
    { key: "orders", label: "My Orders", icon: <FiClipboard size={18} /> },
    {
      key: "logout",
      label: "Logout",
      icon: <FiLogOut size={18} />,
      danger: true,
    },
  ];

  // active tab
  const [active, setActive] = useState<string>("info");

  const { callApi } = useApi();

  const router = useRouter();

  // mobile accordion state
  const [open, setOpen] = useState<{ [k: string]: boolean }>({ info: true });

  // Helper to toggle mobile accordion
  const toggle = (key: string) => {
    setOpen((p) => ({ ...p, [key]: !p[key] }));
    setActive(key);
  };

  useEffect(() => {
    let mounted = true;

    const GetProfileData = async () => {
      if (!userData?.id) {
        router.replace("/login");
        return;
      } else {
        let [profileData, likeProductData, OrderList] = await Promise.all([
          callApi("get", `/user/${userData.id}`),
          callApi("get", `/like-products/${userData.id}`),
          callApi("get", `/sales/customer/${userData.id}`),
        ]);

        console.log(OrderList);

        if (!mounted) return;

        setUserData((prev) => ({
          ...prev,
          info: profileData?.data,
          wishlist: likeProductData?.data,
        }));
      }
    };
    GetProfileData();

    return () => {
      mounted = false;
    };
  }, [userData]);

  return (
    <>
      <Nav />
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-2xl lg:text-4xl font-medium tracking-[0.3em] mb-14"
          style={{ fontFamily: "ui-serif, serif" }}
        >
          My Account
        </motion.h1>

        {/* Desktop: two-column, Mobile: stacked */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="lg:flex">
            {/* Left menu (desktop) */}
            <nav className="hidden lg:block lg:w-72 border-r border-gray-100 p-6">
              <div className="mb-6">
                <div className="text-lg font-semibold">
                  {user?.info?.userName ?? null}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {user?.info?.email ?? null}
                </div>
              </div>

              <div className="space-y-2">
                {menu.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setActive(m.key)}
                    className={`w-full cursor-pointer flex items-center justify-between px-3 py-3 rounded-lg transition
                    ${
                      active === m.key
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                    aria-current={active === m.key}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`${
                          active === m.key ? "text-white" : "text-gray-600"
                        }`}
                      >
                        {m.icon}
                      </span>
                      <span className="text-sm font-medium">{m.label}</span>
                    </div>
                    <FiChevronRight
                      className={`${
                        active === m.key ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </nav>

            {/* Right / Content */}
            <div className="flex-1 lg:p-6 p-3">
              {/* Mobile accordion menu at top */}
              <div className="lg:hidden space-y-3 mb-4">
                {menu.map((m) => (
                  <div
                    key={m.key}
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(m.key)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-700">{m.icon}</span>
                        <span className="font-medium text-sm">{m.label}</span>
                      </div>
                      <FiChevronRight
                        className={`transition-transform ${
                          open[m.key] ? "rotate-90" : "rotate-0"
                        } text-gray-400`}
                      />
                    </button>

                    <div
                      style={{ maxHeight: open[m.key] ? undefined : 0 }}
                      className={`overflow-hidden transition-all duration-300`}
                    >
                      {/* content for mobile accordion - reuse content renderer below */}
                      <div className="p-4 border-t border-gray-100">
                        <ContentRenderer
                          keyname={m.key}
                          user={user}
                          onLogout={handleLogout}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop-only content area */}
              <div className="hidden lg:block">
                <div className="mb-6">
                  <ContentRenderer
                    keyname={active}
                    user={user}
                    onLogout={handleLogout}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
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

/* ---------- Content Renderer ---------- */
/* Renders the panel content for each menu key. */

function ContentRenderer({ keyname, user, onLogout }: any) {
  const [editOpen, setEditOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
                  {new Date(user.info.createdAt).toLocaleDateString()}
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

        {/* ---------------- BUSINESS INFO ---------------- */}
        {user.isSupplier && (
          <>
            <h3 className="text-xl font-semibold mt-8 mb-4">
              Business Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Firm Name</label>
                <div className="mt-1 text-gray-900">{user.info.firmName}</div>
              </div>

              <div>
                <label className="text-sm text-gray-500">GSTIN</label>
                <div className="mt-1 text-gray-900">{user.info.GSTIN}</div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-500">Firm Address</label>
                <div className="mt-1 text-gray-900">
                  {user.info.firmAddress}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    );
  }

  /* ---------------- ORDERS ---------------- */
  if (keyname === "orders") {
    return (
      <section>
        <h3 className="text-xl font-semibold mb-3">My Orders</h3>

        <div className="space-y-3">
          {user.orders?.length > 0 ? (
            user.orders.map((o: any) => (
              <div
                key={o.id}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
              >
                <div>
                  <div className="font-medium">{o.item}</div>
                  <div className="text-sm text-gray-500">{o.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{o.status}</div>
                  <div className="text-xs text-gray-400">{o.id}</div>
                </div>
              </div>
            ))
          ) : (
            <NoData label="Orders" icon="📭" />
          )}
        </div>
      </section>
    );
  }

  /* ---------------- WISHLIST ---------------- */
  // if (keyname === "wishlist") {
  //   return (
  //     <section>
  //       <h3 className="text-xl text-center font-semibold mb-3">Wishlist</h3>

  //       <div className="flex flex-col gap-3 justify-center max-h-[350px] overflow-y-auto">
  //         {user.wishlist?.length > 0 ? (
  //           user.wishlist.map((w: any) => (
  //             <div
  //               key={w.likeId}
  //               className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg"
  //             >
  //               <div className="w-12 h-12 bg-gray-100 rounded-md relative overflow-hidden">
  //                 <Image
  //                   fill
  //                   alt={w.product.name}
  //                   src={ImageShowUtil(w.product.image)}
  //                   className="object-contain"

  //                 />
  //               </div>

  //               <div className="flex-1">
  //                 <div className="font-medium">{w.product.name}</div>
  //                 <div className="text-sm text-gray-500">
  //                   ₹{w.product.price}
  //                 </div>
  //               </div>

  //               <Button
  //                 onPress={() => router.push("/Wishlist")}
  //                 className="text-sm rounded-xl px-8 cursor-pointer hover:bg-gray-50 py-0 border border-gray-50 text-gray-600 hover:text-black"
  //               >
  //                 View
  //               </Button>
  //             </div>
  //           ))
  //         ) : (
  //           <NoData label="Wishlist" icon="💔" />
  //         )}
  //       </div>
  //     </section>
  //   );
  // }

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
