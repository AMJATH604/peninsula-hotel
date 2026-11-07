"use client";

import { useState } from "react";
import { FileText, Image, UtensilsCrossed, Sparkles, Calendar, Tag, MessageSquare, Save, Upload } from "lucide-react";

const contentSections = [
  { id: "hero", name: "Home Hero", icon: Image, description: "Hero video/image, title, subtitle" },
  { id: "dining", name: "Dining Menus", icon: UtensilsCrossed, description: "Restaurant menus and descriptions" },
  { id: "spa", name: "Spa Treatments", icon: Sparkles, description: "Spa services, prices, descriptions" },
  { id: "events", name: "Event Venues", icon: Calendar, description: "Venue details and capacity" },
  { id: "offers", name: "Offers & Packages", icon: Tag, description: "Special offers and promo codes" },
  { id: "gallery", name: "Gallery", icon: Image, description: "Photo and video gallery" },
  { id: "testimonials", name: "Testimonials", icon: MessageSquare, description: "Guest reviews and ratings" },
  { id: "pages", name: "Page Content", icon: FileText, description: "About, contact, and other pages" },
];

export default function AdminContent() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A1628]">Content Management</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all website content from here</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl border border-gray-100 p-3 h-fit">
          <div className="space-y-1">
            {contentSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all text-left ${
                  activeSection === section.id
                    ? "bg-[#C9A96E]/10 text-[#C9A96E] font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <section.icon className="w-4 h-4 flex-shrink-0" />
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "hero" && (
            <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-[#0A1628]">Home Page Hero</h2>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Hero Video/Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[#C9A96E] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Upload hero video (MP4) or image</p>
                  <p className="text-xs text-gray-400 mt-1">Recommended: 1920x1080, max 50MB</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Hero Title</label>
                <input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue="Peninsula Chennai" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Hero Subtitle</label>
                <input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E]" defaultValue="Where Chennai Meets Magnificence" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Welcome Text</label>
                <textarea rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] resize-none" defaultValue="Nestled along the iconic Marina Beach, Peninsula Chennai is a beacon of refined luxury..." />
              </div>
              <button className="flex items-center gap-2 bg-[#C9A96E] text-[#0A1628] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4BC8E] transition-colors">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}

          {activeSection === "gallery" && (
            <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#0A1628]">Gallery Management</h2>
                <button className="flex items-center gap-2 bg-[#C9A96E] text-[#0A1628] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#D4BC8E]">
                  <Upload className="w-4 h-4" /> Upload Images
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center hover:border-[#C9A96E] transition-colors cursor-pointer">
                <Image className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Drag and drop images here, or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, WebP. Multiple files allowed.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                    <Image className="w-6 h-6 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection !== "hero" && activeSection !== "gallery" && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-[#0A1628] mb-2">
                {contentSections.find((s) => s.id === activeSection)?.name}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {contentSections.find((s) => s.id === activeSection)?.description}
              </p>
              <div className="bg-[#FAF7F2] rounded-lg p-8 text-center">
                <FileText className="w-10 h-10 text-[#C9A96E]/30 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  Content editor for this section will load data from the database.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Edit items directly in the table or use the form to add new entries.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

