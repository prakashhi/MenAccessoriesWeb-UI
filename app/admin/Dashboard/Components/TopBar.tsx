"use client";

import { MdMenu } from "react-icons/md";

interface TopBarProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function TopBar({ setSidebarOpen }: TopBarProps) {
  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
      <h2 className="text-xl font-semibold">Admin Panel</h2>
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <MdMenu size={26} />
      </button>
    </div>
  );
}
