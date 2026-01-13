"use client";

import { useState, useEffect, useMemo } from "react";
import { Suspense } from "react";
import {
  FiUser,
  FiClipboard,
  FiLogOut,
  FiChevronRight,
  FiMapPin,
} from "react-icons/fi";
import Nav from "@/Component/NavBar/Nav";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { notify } from "@/Component/ToastComponent";
import { getUserFromStorage } from "@/context/utils";

import { UsePanel } from "@/context/Context";

import ContentRenderer from "@/app/(User)/accountInfo/Component/ContentRenderComponent";
import DesktopContentRenderComponent from "./Component/DesktopContentRenderComponent";
import { useGuestUser } from "@/context/GuestUserContext";

import { useSearchParams } from "next/navigation";
type TabKey = "info" | "orders" | "Addresses" | "logout";


export const dynamic = "force-dynamic";


export default function AccountSection() {
  const userData = useMemo(() => getUserFromStorage(), []);

  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as TabKey;
  const [active, setActive] = useState("info");

  useEffect(() => {
    if (tabFromUrl) {
      setActive(tabFromUrl);
    }
  }, [tabFromUrl]);

  const {
    UserRefreshKey,
    userDataContext,
    triggerRefresh,
    setUserDataContext,
    setUserCountData,
    setUser,
  } = UsePanel();

  const { guestTriggerRefresh, guestDataClear } = useGuestUser();

  const [open, setOpen] = useState<{ [k: string]: boolean }>({ info: true });

  const user = userDataContext;

  const router = useRouter();

  const menu = [
    { key: "info", label: "Personal Information", icon: <FiUser size={18} /> },
    { key: "orders", label: "My Orders", icon: <FiClipboard size={18} /> },
    {
      key: "Addresses",
      label: "Addresses",
      icon: <FiMapPin className="mt-1 shrink-0" />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <FiLogOut size={18} />,
      danger: true,
    },
  ];

  // Logout handler (sample)
  const handleLogout = async () => {
    localStorage.removeItem("UserData");
    localStorage.removeItem("Token");
    localStorage.removeItem("GuestUserData");
    localStorage.removeItem("guest_cart_merged");
    localStorage.removeItem("guest_cart_merge_in_progress");
    notify({
      message: "Log-Out Successfully",
      type: "info",
    });
    setUser(null);
    setUserDataContext({
      info: null,
      OrderList: [],
      AddressList: [],
    });

    setUserCountData({ LikeCount: 0, CartCount: 0 });

    guestDataClear();
    router.replace("/");
    guestTriggerRefresh();
    triggerRefresh();
  };

  const toggle = (key: string) => {
    setOpen((p) => ({ ...p, [key]: !p[key] }));
    setActive(key);
  };

  useEffect(() => {
    const userId = userData?.id;

    if (!userId) {
      router.replace("/login");
      return;
    }

    let mounted = true;
    return () => {
      mounted = false;
    };
  }, [UserRefreshKey]);

  return (
    <Suspense fallback={<AccountInfoSkeleton />}>
      <>
        <Nav />
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-2xl lg:text-4xl font-medium tracking-[0.2em] mb-14"
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
                    {user?.info?.userFirstName ?? null}{" "}
                    {user?.info?.userLastName ?? null}
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
                            onLogout={handleLogout}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <DesktopContentRenderComponent
                  active={active}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </Suspense>
  );
}

function AccountInfoSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className="h-[400px] bg-gray-100 rounded-2xl animate-pulse" />
    </div>
  );
}
