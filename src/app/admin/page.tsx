"use client";

import { motion } from "framer-motion";
import {
  CalendarDays, BedDouble, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight,
  LogIn, LogOut as LogOutIcon, Percent, Star,
} from "lucide-react";
import { dashboardStats, revenueData, mockBookings } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const statCards = [
  { label: "Total Revenue", value: formatCurrency(dashboardStats.totalRevenue), icon: DollarSign, change: "+12.5%", up: true, color: "bg-emerald-50 text-emerald-600" },
  { label: "Monthly Revenue", value: formatCurrency(dashboardStats.monthlyRevenue), icon: TrendingUp, change: "+8.2%", up: true, color: "bg-blue-50 text-blue-600" },
  { label: "Occupancy Rate", value: `${dashboardStats.occupancyRate}%`, icon: Percent, change: "+3.1%", up: true, color: "bg-purple-50 text-purple-600" },
  { label: "Today Check-ins", value: dashboardStats.todayCheckIns.toString(), icon: LogIn, change: "", up: true, color: "bg-amber-50 text-amber-600" },
  { label: "Today Check-outs", value: dashboardStats.todayCheckOuts.toString(), icon: LogOutIcon, change: "", up: true, color: "bg-rose-50 text-rose-600" },
  { label: "Total Bookings", value: dashboardStats.totalBookings.toString(), icon: CalendarDays, change: "+15.3%", up: true, color: "bg-sky-50 text-sky-600" },
  { label: "Total Guests", value: dashboardStats.totalGuests.toString(), icon: Users, change: "+9.7%", up: true, color: "bg-indigo-50 text-indigo-600" },
  { label: "Avg Rating", value: dashboardStats.averageRating.toString(), icon: Star, change: "+0.1", up: true, color: "bg-yellow-50 text-yellow-600" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  checked_in: "bg-green-100 text-green-800",
  checked_out: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0A1628]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here&apos;s an overview of Peninsula Chennai.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              {stat.change && (
                <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-emerald-600" : "text-red-600"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-[#0A1628]">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart Placeholder + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-[#0A1628]">Revenue Overview</h2>
            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:border-[#C9A96E]">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          {/* Simple bar chart visualization */}
          <div className="flex items-end gap-2 h-48">
            {revenueData.map((d) => {
              const maxRevenue = Math.max(...revenueData.map((r) => r.revenue));
              const heightPercent = (d.revenue / maxRevenue) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-gray-400 font-medium">
                    {formatCurrency(d.revenue / 100000)}L
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-[#C9A96E] to-[#D4BC8E] rounded-t-sm hover:from-[#0A1628] hover:to-[#152238] transition-colors cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                    title={`${d.month}: ${formatCurrency(d.revenue)} | ${d.bookings} bookings`}
                  />
                  <span className="text-[10px] text-gray-400">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Room Status */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-[#0A1628] mb-6">Room Status</h2>
          <div className="space-y-4">
            {[
              { label: "Occupied", count: 195, total: 250, color: "bg-green-500" },
              { label: "Available", count: 40, total: 250, color: "bg-blue-500" },
              { label: "Maintenance", count: 10, total: 250, color: "bg-yellow-500" },
              { label: "Blocked", count: 5, total: 250, color: "bg-red-500" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{s.label}</span>
                  <span className="text-sm font-semibold text-[#0A1628]">{s.count}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full`}
                    style={{ width: `${(s.count / s.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-3xl font-bold text-[#C9A96E]">{dashboardStats.occupancyRate}%</p>
            <p className="text-xs text-gray-500">Overall Occupancy</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-[#0A1628]">Recent Bookings</h2>
          <a href="/admin/bookings" className="text-xs text-[#C9A96E] hover:underline font-medium">View All →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 pr-4">Booking ID</th>
                <th className="pb-3 pr-4">Guest</th>
                <th className="pb-3 pr-4">Room</th>
                <th className="pb-3 pr-4">Check-in</th>
                <th className="pb-3 pr-4">Check-out</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50">
                  <td className="py-3 pr-4 font-mono text-xs text-[#C9A96E]">{b.bookingId}</td>
                  <td className="py-3 pr-4 font-medium text-[#0A1628]">{b.guestName}</td>
                  <td className="py-3 pr-4 text-gray-600">{b.roomName}</td>
                  <td className="py-3 pr-4 text-gray-600">{b.checkIn}</td>
                  <td className="py-3 pr-4 text-gray-600">{b.checkOut}</td>
                  <td className="py-3 pr-4 font-medium text-[#0A1628]">{formatCurrency(b.totalAmount)}</td>
                  <td className="py-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase ${statusColors[b.status] || "bg-gray-100 text-gray-800"}`}>
                      {b.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

