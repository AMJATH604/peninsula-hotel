"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Download, CheckCircle, Clock, XCircle, UserCheck } from "lucide-react";
import { mockBookings as initialBookings } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Booking } from "@/types";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  checked_in: "bg-green-100 text-green-800",
  checked_out: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  no_show: "bg-orange-100 text-orange-800",
};

const paymentColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-purple-100 text-purple-800",
};

export default function AdminBookings() {
  const [bookingsList, setBookingsList] = useState<Booking[]>(initialBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchBookings = () => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.bookings) {
          setBookingsList(data.bookings);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: Booking["status"]) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBookingsList((prev) =>
          prev.map((b) => (b.id === id || b.bookingId === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch {
      alert("Failed to update status");
    }
  };

  const handleExportCSV = () => {
    const headers = "Booking ID,Guest,Email,Room,Check In,Check Out,Nights,Total,Status\n";
    const rows = bookingsList
      .map(
        (b) =>
          `"${b.bookingId}","${b.guestName}","${b.guestEmail}","${b.roomName}","${b.checkIn}","${b.checkOut}",${b.nights},"${b.totalAmount}","${b.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Peninsula_Bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = bookingsList.filter((b) => {
    const matchesSearch =
      b.guestName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      b.roomName.toLowerCase().includes(search.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Booking Management</h1>
          <p className="text-gray-500 text-sm mt-1">{bookingsList.length} total hotel reservations</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 border border-gray-200 text-gray-700 bg-white px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#C9A96E]" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by guest name, booking ID, email, or room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A96E]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked_in">Checked In</option>
            <option value="checked_out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Suite / Room</th>
                <th className="px-6 py-4">Stay Dates</th>
                <th className="px-6 py-4">Nights</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4 text-center">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((b, i) => (
                <motion.tr
                  key={b.id || b.bookingId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50/50"
                >
                  <td className="px-6 py-4 font-mono text-xs font-bold text-[#C9A96E]">
                    {b.bookingId}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#0A1628]">{b.guestName}</p>
                    <p className="text-xs text-gray-400">{b.guestEmail}</p>
                    <p className="text-xs text-gray-400">{b.guestPhone}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{b.roomName}</td>
                  <td className="px-6 py-4 text-gray-600 text-xs">
                    {b.checkIn} → {b.checkOut}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-center font-medium">{b.nights}</td>
                  <td className="px-6 py-4 font-bold text-[#0A1628]">
                    {formatCurrency(b.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                        statusColors[b.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {b.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                        paymentColors[b.paymentStatus] || "bg-green-100 text-green-800"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {b.status !== "checked_in" && b.status !== "checked_out" && (
                        <button
                          onClick={() => handleStatusUpdate(b.id, "checked_in")}
                          className="px-2.5 py-1 text-[11px] bg-green-50 text-green-700 rounded hover:bg-green-100 flex items-center gap-1 font-medium transition-colors"
                          title="Check In"
                        >
                          <UserCheck className="w-3.5 h-3.5" /> Check In
                        </button>
                      )}
                      {b.status === "checked_in" && (
                        <button
                          onClick={() => handleStatusUpdate(b.id, "checked_out")}
                          className="px-2.5 py-1 text-[11px] bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-1 font-medium transition-colors"
                          title="Check Out"
                        >
                          <Clock className="w-3.5 h-3.5" /> Check Out
                        </button>
                      )}
                      {b.status !== "cancelled" && b.status !== "checked_out" && (
                        <button
                          onClick={() => handleStatusUpdate(b.id, "cancelled")}
                          className="px-2.5 py-1 text-[11px] bg-red-50 text-red-700 rounded hover:bg-red-100 flex items-center gap-1 font-medium transition-colors"
                          title="Cancel"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
