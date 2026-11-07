"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BedDouble, Users, Maximize, Eye } from "lucide-react";
import { rooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const categories = ["All", "Deluxe", "Premier", "Suite"];

export default function RoomsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredRooms =
    activeCategory === "All"
      ? rooms
      : rooms.filter((r) => r.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80"
          alt="Peninsula Chennai Suites"
          fill
          priority
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4"
          >
            Accommodation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[var(--font-playfair)] text-4xl md:text-6xl text-white mb-4"
          >
            Rooms & Suites
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/80 text-lg font-[var(--font-playfair)] italic"
          >
            Your Private Sanctuary Overlooking Marina Bay & Chennai Skyline
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#C9A96E] text-[#0A1628] shadow-md shadow-[#C9A96E]/20"
                  : "border border-gray-200 text-[#6B6B6B] hover:border-[#C9A96E] hover:text-[#C9A96E]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/rooms/${room.slug}`} className="group block">
                    <div className="bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#C9A96E]/40 rounded-sm">
                      <div className="relative aspect-[16/10] bg-[#0A1628] overflow-hidden">
                        <Image
                          src={room.images[0]}
                          alt={room.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute top-4 left-4 bg-[#C9A96E] text-[#0A1628] px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold shadow-md">
                          {room.category}
                        </div>
                        {room.originalPrice && (
                          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-[10px] tracking-wider uppercase font-semibold shadow-md">
                            Save {Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>
                      <div className="p-6 md:p-8">
                        <h3 className="font-[var(--font-playfair)] text-2xl text-[#0A1628] mb-2 group-hover:text-[#C9A96E] transition-colors">
                          {room.name}
                        </h3>
                        <p className="text-[#6B6B6B] text-sm mb-4 leading-relaxed line-clamp-2">
                          {room.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-4 mb-6 text-[#6B6B6B]">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Maximize className="w-3.5 h-3.5 text-[#C9A96E]" />
                            {room.size}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <Users className="w-3.5 h-3.5 text-[#C9A96E]" />
                            Up to {room.maxOccupancy} Guests
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <BedDouble className="w-3.5 h-3.5 text-[#C9A96E]" />
                            {room.bedType}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <Eye className="w-3.5 h-3.5 text-[#C9A96E]" />
                            {room.view}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div>
                            {room.originalPrice && (
                              <span className="text-[#9A9A9A] text-sm line-through mr-2">
                                {formatCurrency(room.originalPrice)}
                              </span>
                            )}
                            <span className="text-[#C9A96E] font-[var(--font-playfair)] text-xl font-medium">
                              {formatCurrency(room.price)}
                            </span>
                            <span className="text-[#6B6B6B] text-xs"> / night</span>
                          </div>
                          <span className="text-[11px] tracking-[0.15em] uppercase text-[#C9A96E] font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            Explore Room →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

