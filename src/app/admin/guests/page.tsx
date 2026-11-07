"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Crown, Mail, Phone, MapPin, Eye } from "lucide-react";
import { mockGuests } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function AdminGuests() {
  const [search, setSearch] = useState("");
  const filtered = mockGuests.filter(
    (g) => g.name.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A1628]">Guest Management</h1>
        <p className="text-gray-500 text-sm mt-1">{mockGuests.length} registered guests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Guests", value: mockGuests.length, color: "bg-blue-50 text-blue-600" },
          { label: "VIP Guests", value: mockGuests.filter((g) => g.isVIP).length, color: "bg-amber-50 text-amber-600" },
          { label: "Repeat Guests", value: mockGuests.filter((g) => g.totalStays > 1).length, color: "bg-green-50 text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-3xl font-bold text-[#0A1628]">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" placeholder="Search guests by name or email..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A96E]"
          />
        </div>
      </div>

      {/* Guest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((guest, i) => (
          <motion.div
            key={guest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0A1628] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {guest.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#0A1628]">{guest.name}</p>
                    {guest.isVIP && <Crown className="w-4 h-4 text-[#C9A96E]" />}
                  </div>
                  <p className="text-xs text-gray-400">{guest.city}, {guest.country}</p>
                </div>
              </div>
              <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="w-3.5 h-3.5" /> {guest.email}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Phone className="w-3.5 h-3.5" /> {guest.phone}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-bold text-[#0A1628]">{guest.totalStays}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Stays</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#C9A96E]">{formatCurrency(guest.totalSpend)}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Total Spend</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#0A1628]">{new Date(guest.createdAt).getFullYear()}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Since</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

