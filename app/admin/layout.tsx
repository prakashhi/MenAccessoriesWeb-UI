"use client";

import { useState } from "react";
import Sidebar from "./Dashboard/Components/SideBar";
import TopBar from "./Dashboard/Components/TopBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // State to control sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Top Bar */}
        <TopBar setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
