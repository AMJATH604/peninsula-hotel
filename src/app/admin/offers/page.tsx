"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Tag, Calendar } from "lucide-react";
import { offers } from "@/lib/data";

export default function AdminOffers() {
  const [search, setSearch] = useState("");
  const filtered = offers.filter((o) => o.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Offers & Promo Codes</h1>
          <p className="text-gray-500 text-sm mt-1">Manage special offers and discount codes</p>
        </div>
        <button className="flex items-center gap-2 bg-[#C9A96E] text-[#0A1628] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4BC8E]">
          <Plus className="w-4 h-4" /> Create Offer
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search offers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A96E]" />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((offer) => (
          <div key={offer.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-[#0A1628] text-lg">{offer.title}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${offer.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {offer.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{offer.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-[#C9A96E]" /> Code: <code className="bg-[#0A1628] text-[#C9A96E] px-2 py-0.5 rounded font-mono">{offer.promoCode}</code></span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#C9A96E]" /> {offer.validFrom} to {offer.validTo}</span>
                  <span className="bg-[#C9A96E]/10 text-[#C9A96E] px-2.5 py-1 rounded-full font-semibold">{offer.discountValue}% OFF</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

