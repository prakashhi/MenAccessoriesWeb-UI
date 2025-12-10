"use client";

import { useState } from "react";
import { MdReceiptLong, MdVisibility } from "react-icons/md";
import { FaBoxOpen, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Link from "next/link";

const sampleOrders = [
  {
    id: "ORD12345",
    customer: "Prakash Prajapati",
    amount: 1299,
    status: "Pending",
    date: "2025-01-10",
  },
  {
    id: "ORD12346",
    customer: "Neha Patel",
    amount: 2599,
    status: "Shipped",
    date: "2025-01-09",
  },
  {
    id: "ORD12347",
    customer: "Ravi Kumar",
    amount: 1999,
    status: "Delivered",
    date: "2025-01-08",
  },
  {
    id: "ORD12348",
    customer: "Vijay Sharma",
    amount: 999,
    status: "Cancelled",
    date: "2025-01-07",
  },
];

export default function page() {
  const [orders] = useState(sampleOrders);

  const getStatusBadge = (status: string) => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1";

    switch (status) {
      case "Pending":
        return <span className={`${base} bg-yellow-100 text-yellow-700`}><FaBoxOpen /> Pending</span>;
      case "Shipped":
        return <span className={`${base} bg-blue-100 text-blue-700`}> Shipped</span>;
      case "Delivered":
        return <span className={`${base} bg-green-100 text-green-700`}><FaCheckCircle /> Delivered</span>;
      default:
        return <span className={`${base} bg-red-100 text-red-700`}><FaTimesCircle /> Cancelled</span>;
    }
  };

  return (
    <div className="w-full">
      {/* Desktop / Tablet Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left text-gray-700 font-semibold uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-5 py-4 text-left text-gray-700 font-semibold uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-4 text-left text-gray-700 font-semibold uppercase tracking-wider">
                Amount
              </th>
              <th className="px-5 py-4 text-left text-gray-700 font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-4 text-left text-gray-700 font-semibold uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-4 text-right text-gray-700 font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-4 font-medium text-gray-800">{o.id}</td>
                <td className="px-5 py-4 text-gray-800">{o.customer}</td>
                <td className="px-5 py-4 font-medium text-gray-800">₹{o.amount}</td>
                <td className="px-5 py-4">{getStatusBadge(o.status)}</td>
                <td className="px-5 py-4 text-gray-600">{o.date}</td>
                <td className="px-5 py-4 flex justify-end">
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg flex items-center gap-1"
                  >
                    <MdVisibility size={18} /> View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 mt-4 md:hidden">
        {orders.map((o) => (
          <div key={o.id} className="bg-white shadow-md rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-800">{o.id}</h3>
              {getStatusBadge(o.status)}
            </div>

            <p className="text-gray-700">
              <span className="font-medium">Customer:</span> {o.customer}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Amount:</span> ₹{o.amount}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Date:</span> {o.date}
            </p>

            <Link
              href={`/admin/orders/${o.id}`}
              className="text-blue-600 font-medium underline flex items-center gap-1"
            >
              <MdVisibility /> View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
