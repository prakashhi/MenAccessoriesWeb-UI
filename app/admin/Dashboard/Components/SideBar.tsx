"use client";

import {
  MdDashboard,
  MdInventory,
  MdLogout,
  MdReceiptLong,
  MdMenu,
} from "react-icons/md";
import Link from "next/link";
import { useApi } from "@/app/useApi";
import { toast } from "react-toastify";

import Router from "next/router";

import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { callApi, data, loading, error } = useApi();

  const router = useRouter();

  const handleLogOut = async () => {
    let res = await callApi("post", "/admin/logout");

    if (res?.error) {
      toast.error(res.message || "Something went wrong!");
      return;
    }

    // Show success toast
    toast.info(res.msg || res.message);

    // Redirect to admin dashboard
    router.push("/adminLogin");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-lg p-6 z-40
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-64
        `}
      >
        <h2 className="text-2xl font-bold mb-10">Admin</h2>
        <nav className="space-y-3">
          <Link
            href="/admin/Dashboard"
            className="flex items-center gap-3 text-gray-700 hover:text-black"
          >
            <MdDashboard size={22} /> Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 text-gray-700 hover:text-black"
          >
            <MdInventory size={22} /> Products
          </Link>

          <Link
            href="/admin/Orders"
            className="flex items-center gap-3 text-gray-700 hover:text-black"
          >
            <MdReceiptLong size={22} /> Orders
          </Link>

          <button
            onClick={handleLogOut}
            className="flex items-center cursor-pointer gap-3 text-red-600 mt-10"
          >
            <MdLogout size={22} /> Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for Mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
