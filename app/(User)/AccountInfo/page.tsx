"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiHeart,
  FiClipboard,
  FiLogOut,
  FiChevronRight,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import Nav from "../Component/NavBar/Nav";
import { useApi } from "@/app/useApi";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Order = { id: string; item: string; status: string; date?: string };
type Wish = { id: number; name: string; price?: number };

export default function AccountSection() {
  const [user, setUserData] = useState({
    info: {},
    orders: [] as Order[],
    wishlist: [] as Wish[],
  });

  const GetProfileData = async () => {
    let res = await callApi("get", "/user/me");
    setUserData((prev) => ({ ...prev, info: res.user }));

    if (res?.error) {
      toast.error(res.message || "Something went wrong!");
      return;
    }

    // Show success toast
    toast.info(res.msg || res.message);
  };

  // Logout handler (sample)
  const handleLogout = async () => {
    let res = await callApi("post", "/user/logout");

    if (res?.error) {
      toast.error(res.message || "Something went wrong!");
      return;
    }

    // Show success toast
    toast.info(res.msg || res.message);

    // Redirect to admin dashboard
    router.push("/Login");
  };

  const menu = [
    { key: "info", label: "Personal Information", icon: <FiUser size={18} /> },
    { key: "orders", label: "My Orders", icon: <FiClipboard size={18} /> },
    { key: "wishlist", label: "Wishlist", icon: <FiHeart size={18} /> },
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
    GetProfileData();
  }, []);

  return (
    <>
      <Nav />
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <h2
          className="text-3xl mb-6 tracking-wide text-center"
          style={{
            fontFamily: "ui-serif",
            fontWeight: 800,
            letterSpacing: "1px",
          }}
        >
          My Account
        </h2>

        {/* Desktop: two-column, Mobile: stacked */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="lg:flex">
            {/* Left menu (desktop) */}
            <nav className="hidden lg:block lg:w-72 border-r border-gray-100 p-6">
              <div className="mb-6">
                <div className="text-lg font-semibold">{user.info?.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {user.info?.email}
                </div>
              </div>

              <div className="space-y-2">
                {menu.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setActive(m.key)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition
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
            <div className="flex-1 p-6">
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

export function NoData({ label, icon }) {
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

  if (keyname === "info") {
    return (
      <section>
        <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Full name</label>
            <div className="mt-1 text-gray-900">{user.info.name}</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <div className="mt-1 text-gray-900 flex items-center gap-2">
              <FiMail className="text-gray-400" /> {user.info.email}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <div className="mt-1 text-gray-900 flex items-center gap-2">
              <FiPhone className="text-gray-400" /> +91 {user.info.mobile_no}
            </div>
          </div>
          {/* <div className="sm:col-span-2">
            <label className="text-sm text-gray-500">Address</label>
            <div className="mt-1 text-gray-900">{user.address}</div>
          </div> */}
        </div>
      </section>
    );
  }

  if (keyname === "orders") {
    return (
      <section>
        <h3 className="text-xl font-semibold mb-3">My Orders</h3>
        <div className="space-y-3">
          {user.orders.length > 0 ? (
            user.orders.map((o: Order) => (
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
            <NoData label="Orders" icon={"📭"} />
          )}
        </div>
      </section>
    );
  }

  if (keyname === "wishlist") {
    return (
      <section>
        <h3 className="text-xl font-semibold mb-3">Wishlist</h3>
        <div className="grid grid-cols-1  justify-items-center w-full sm:grid-cols-2 gap-4">
          {user.wishlist.length > 0 ? (
            user.wishlist.map((w: Wish) => (
              <div
                key={w.id}
                className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-400">
                  IMG
                </div>
                <div className="flex-1">
                  <div className="font-medium">{w.name}</div>
                  <div className="text-sm text-gray-500">₹{w.price}</div>
                </div>
                <button className="text-sm text-gray-600">View</button>
              </div>
            ))
          ) : (
            <div className="flex w-full justify-items-center">
              <NoData label="Wishlist" icon={"💔"} />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (keyname === "logout") {
    return (
      <section>
        <h3 className="text-xl font-semibold mb-3 text-red-600">Logout</h3>
        <p className="text-sm text-gray-600 mb-4">
          Click the button below to sign out of your account.
        </p>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </section>
    );
  }

  return null;
}
