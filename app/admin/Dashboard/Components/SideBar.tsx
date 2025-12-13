"use client";

import {
  MdDashboard,
  MdInventory,
  MdLogout,
  MdReceiptLong,
} from "react-icons/md";
import Link from "next/link";
import { useApi } from "@/app/useApi";
import { notify } from "@/app/(User)/Component/ToastComponent";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { callApi } = useApi();
  const router = useRouter();

  const handleLogOut = async () => {
    const res = await callApi("post", "/admin/logout");

    if (res?.error) {
      notify({
        message: res.message || "Something went wrong!",
        type: "error",
      });
      return;
    }

    notify({ message: res.msg || res.message, type: "info" });
    router.push("/adminLogin");
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 z-40
          bg-[#FAFAFA] backdrop-blur-xl
          shadow-[0_20px_50px_rgba(0,0,0,0.12)]
          px-6 py-8
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-400">
            Control Panel
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-1">
            Admin
          </h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavItem href="/admin/Dashboard" icon={<MdDashboard />} label="Dashboard" />
          <NavItem href="/admin/products" icon={<MdInventory />} label="Products" />
          <NavItem href="/admin/Orders" icon={<MdReceiptLong />} label="Orders" />

          {/* Divider */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Logout */}
          <button
            onClick={handleLogOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
              text-red-600 hover:bg-red-50 transition text-sm font-medium"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

/* Reusable Nav Item */
function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 px-4 py-2.5 rounded-xl
        text-gray-700 hover:bg-gray-100 hover:text-gray-900
        transition text-sm font-medium"
    >
      <span className="text-lg text-gray-400 group-hover:text-gray-800 transition">
        {icon}
      </span>
      {label}
    </Link>
  );
}
