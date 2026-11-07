"use client";

import { DollarSign, TrendingUp, Download, FileText, Receipt } from "lucide-react";
import { revenueData, mockBookings } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function AdminFinance() {
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalBookingsCount = revenueData.reduce((sum, d) => sum + d.bookings, 0);
  const avgPerBooking = Math.round(totalRevenue / totalBookingsCount);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Finance & Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Revenue analytics and financial reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]">
            <option>This Year (2026)</option>
            <option>Last Year (2025)</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
          { label: "Total Bookings", value: totalBookingsCount.toString(), icon: Receipt, color: "bg-blue-50 text-blue-600" },
          { label: "Avg. Per Booking", value: formatCurrency(avgPerBooking), icon: TrendingUp, color: "bg-purple-50 text-purple-600" },
          { label: "Pending Payments", value: formatCurrency(21240), icon: FileText, color: "bg-amber-50 text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color} mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-[#0A1628]">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Monthly Revenue Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-[#0A1628]">Monthly Revenue Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Month</th>
                <th className="px-6 py-3">Revenue</th>
                <th className="px-6 py-3">Bookings</th>
                <th className="px-6 py-3">Avg/Booking</th>
                <th className="px-6 py-3">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {revenueData.map((d) => {
                const maxRev = Math.max(...revenueData.map((r) => r.revenue));
                const pct = (d.revenue / maxRev) * 100;
                return (
                  <tr key={d.month} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-[#0A1628]">{d.month} 2026</td>
                    <td className="px-6 py-4 font-semibold text-[#0A1628]">{formatCurrency(d.revenue)}</td>
                    <td className="px-6 py-4 text-gray-600">{d.bookings}</td>
                    <td className="px-6 py-4 text-gray-600">{formatCurrency(Math.round(d.revenue / d.bookings))}</td>
                    <td className="px-6 py-4 w-48">
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Log */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#0A1628]">Recent Transactions</h2>
          <button className="text-xs text-[#C9A96E] hover:underline font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Transaction ID</th>
                <th className="px-6 py-3">Guest</th>
                <th className="px-6 py-3">Booking</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">GST</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockBookings.filter((b) => b.transactionId).map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-3 font-mono text-xs text-gray-600">{b.transactionId}</td>
                  <td className="px-6 py-3 font-medium text-[#0A1628]">{b.guestName}</td>
                  <td className="px-6 py-3 font-mono text-xs text-[#C9A96E]">{b.bookingId}</td>
                  <td className="px-6 py-3 font-semibold text-[#0A1628]">{formatCurrency(b.totalAmount)}</td>
                  <td className="px-6 py-3 text-gray-600">{formatCurrency(b.taxAmount)}</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium bg-green-100 text-green-800 uppercase tracking-wide">
                      {b.paymentStatus}
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

