"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Shirt } from "lucide-react";
import { diningVenues } from "@/lib/data";

export default function DiningPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
          alt="Peninsula Chennai Dining"
          fill
          priority
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4">Gastronomy & Libations</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-[var(--font-playfair)] text-4xl md:text-6xl text-white mb-4">Culinary Excellence</motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-4" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-white/80 text-lg font-[var(--font-playfair)] italic">Michelin-Trained Chefs, Coastal Seafood & Heritage Flavours</motion.p>
        </div>
      </section>

      {/* Dining Venues */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {diningVenues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`bg-white border border-gray-100 shadow-md overflow-hidden rounded-sm grid grid-cols-1 lg:grid-cols-2 gap-0 items-center mb-16 last:mb-0 group ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[360px] bg-[#0A1628] overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent opacity-50" />
                <div className="absolute top-4 left-4 bg-[#C9A96E] text-[#0A1628] px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold shadow-md">
                  {venue.cuisine}
                </div>
              </div>

              {/* Content */}
              <div className={`p-8 md:p-12 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-2 font-medium">{venue.cuisine}</p>
                <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl text-[#0A1628] mb-4">{venue.name}</h2>
                <div className="w-12 h-0.5 bg-[#C9A96E] mb-6" />
                <p className="text-[#6B6B6B] leading-relaxed mb-6 text-base">{venue.description}</p>

                <div className="flex flex-wrap gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <Clock className="w-4 h-4 text-[#C9A96E]" />
                    {venue.operatingHours}
                  </div>
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <Shirt className="w-4 h-4 text-[#C9A96E]" />
                    {venue.dressCode}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {venue.highlights.map((h) => (
                    <span key={h} className="text-[10px] tracking-[0.1em] uppercase text-[#0A1628] bg-[#FAF7F2] border border-[#C9A96E]/30 px-3 py-1.5 font-medium">
                      {h}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-semibold hover:shadow-lg hover:shadow-[#C9A96E]/30 transition-all"
                >
                  Reserve a Table
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

