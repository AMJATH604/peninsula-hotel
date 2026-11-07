"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BedDouble, CalendarDays, Users, FileText,
  DollarSign, Tag, Star, Settings, LogOut, Menu, X, ChevronRight, Hotel,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { name: "Guests", href: "/admin/guests", icon: Users },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Finance", href: "/admin/finance", icon: DollarSign },
  { name: "Offers", href: "/admin/offers", icon: Tag },
  { name: "Reviews", href: "/admin/reviews", icon: Star },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1628] text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex-shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C9A96E] flex items-center justify-center">
                <Hotel className="w-5 h-5 text-[#0A1628]" />
              </div>
              <div>
                <p className="font-[var(--font-playfair)] text-lg tracking-wider">PENINSULA</p>
                <p className="text-[9px] tracking-[0.3em] text-[#C9A96E] uppercase">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all ${
                    isActive
                      ? "bg-[#C9A96E]/20 text-[#C9A96E] font-medium"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <link.icon className="w-4.5 h-4.5" />
                  {link.name}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-white/10">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-white/40 text-sm hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <LogOut className="w-4 h-4" />
              Back to Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="text-sm font-semibold text-[#0A1628]">Admin</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C9A96E] rounded-full flex items-center justify-center text-[#0A1628] text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

