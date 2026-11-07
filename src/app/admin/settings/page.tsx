"use client";

import { Save, Hotel, Globe, CreditCard, Shield, Users, Bell } from "lucide-react";
import { hotelInfo } from "@/lib/data";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A1628]">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage hotel configuration and preferences</p>
      </div>

      {/* Hotel Information */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Hotel className="w-5 h-5" /></div>
          <div><h2 className="font-semibold text-[#0A1628]">Hotel Information</h2><p className="text-xs text-gray-500">Basic details about your hotel</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Hotel Name</label><input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue={hotelInfo.name} /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Tagline</label><input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue={hotelInfo.tagline} /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Phone</label><input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue={hotelInfo.phone} /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Email</label><input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue={hotelInfo.email} /></div>
          <div className="md:col-span-2"><label className="text-xs font-medium text-gray-600 mb-1.5 block">Address</label><input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue={hotelInfo.address} /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Check-in Time</label><input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue={hotelInfo.checkInTime} /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Check-out Time</label><input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue={hotelInfo.checkOutTime} /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">GST Number</label><input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" placeholder="Enter GSTIN" /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">WhatsApp</label><input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue={hotelInfo.whatsapp} /></div>
        </div>
        <button className="flex items-center gap-2 bg-[#C9A96E] text-[#0A1628] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4BC8E]"><Save className="w-4 h-4" /> Save Changes</button>
      </div>

      {/* Payment Gateway */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><CreditCard className="w-5 h-5" /></div>
          <div><h2 className="font-semibold text-[#0A1628]">Payment Gateway</h2><p className="text-xs text-gray-500">Configure Razorpay and Stripe</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Razorpay Key ID</label><input type="password" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" placeholder="rzp_live_xxxxx" /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Razorpay Key Secret</label><input type="password" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" placeholder="••••••••••••" /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Stripe Publishable Key</label><input type="password" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" placeholder="pk_live_xxxxx" /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Stripe Secret Key</label><input type="password" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" placeholder="••••••••••••" /></div>
        </div>
        <button className="flex items-center gap-2 bg-[#C9A96E] text-[#0A1628] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4BC8E]"><Save className="w-4 h-4" /> Save Payment Settings</button>
      </div>

      {/* Admin Users */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><Users className="w-5 h-5" /></div>
            <div><h2 className="font-semibold text-[#0A1628]">Admin Users</h2><p className="text-xs text-gray-500">Manage access roles</p></div>
          </div>
          <button className="text-sm text-[#C9A96E] hover:underline font-medium">+ Add User</button>
        </div>
        <div className="space-y-3">
          {[
            { name: "Admin", email: "admin@peninsulachennai.com", role: "Super Admin", active: true },
            { name: "Front Desk", email: "frontdesk@peninsulachennai.com", role: "Front Desk", active: true },
            { name: "Marketing", email: "marketing@peninsulachennai.com", role: "Marketing", active: false },
          ].map((user) => (
            <div key={user.email} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0A1628] rounded-full flex items-center justify-center text-white text-xs font-bold">{user.name[0]}</div>
                <div>
                  <p className="text-sm font-medium text-[#0A1628]">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-[#C9A96E]/10 text-[#C9A96E] px-2.5 py-1 rounded-full font-medium">{user.role}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${user.active ? "bg-green-500" : "bg-gray-300"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center"><Shield className="w-5 h-5" /></div>
          <div><h2 className="font-semibold text-[#0A1628]">Policies</h2><p className="text-xs text-gray-500">Cancellation and tax settings</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">GST Rate (%)</label><input type="number" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue="18" /></div>
          <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Free Cancellation (hours before check-in)</label><input type="number" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue="48" /></div>
        </div>
        <div><label className="text-xs font-medium text-gray-600 mb-1.5 block">Cancellation Policy Text</label><textarea rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] resize-none" defaultValue="Free cancellation up to 48 hours before check-in. Cancellations within 48 hours will be charged one night's stay." /></div>
        <button className="flex items-center gap-2 bg-[#C9A96E] text-[#0A1628] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4BC8E]"><Save className="w-4 h-4" /> Save Policies</button>
      </div>
    </div>
  );
}

