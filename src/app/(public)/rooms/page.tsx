"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Users, Maximize, BedDouble } from "lucide-react";
import { rooms } from "@/lib/data";

function RevealOnScroll({ children, delay = 0, direction = "up", className = "" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "scale"; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants[direction]}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const categories = ["All", "Deluxe", "Premier", "Suite"];

export default function RoomsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredRooms = activeCategory === "All"
    ? rooms
    : rooms.filter((r) => r.category === activeCategory);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=80"
          alt="Hotel Peninsula Rooms"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium mb-4"
          >
            Accommodations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-playfair text-4xl md:text-6xl text-white font-light"
          >
            Rooms & <span className="italic text-gold">Suites</span>
          </motion.h1>
        </div>
      </section>

      {/* Filter & Rooms */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-2 mb-16 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-navy text-white"
                      : "bg-white text-navy/60 hover:bg-gold/10 hover:text-gold border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Room Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRooms.map((room, index) => (
              <RevealOnScroll key={room.id} delay={index * 0.12}>
                <Link href={`/rooms/${room.slug}`} className="group block">
                  <div className="card-luxury rounded-2xl overflow-hidden">
                    <div className="relative aspect-[16/10] img-zoom">
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 right-4 glass-dark rounded-full px-4 py-2 text-white">
                        <span className="text-gold font-semibold text-lg">₹{room.price.toLocaleString()}</span>
                        <span className="text-white/50 text-xs"> /night</span>
                      </div>
                      {room.originalPrice && (
                        <div className="absolute top-4 left-4 bg-red-500/90 text-white rounded-full px-3 py-1 text-[10px] tracking-wider uppercase font-semibold">
                          Save {Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] tracking-[0.15em] uppercase text-gold/80 font-medium">{room.category}</span>
                      </div>
                      <h3 className="text-xl font-playfair text-navy mb-2 group-hover:text-gold transition-colors">{room.name}</h3>
                      <p className="text-charcoal/50 text-sm leading-relaxed mb-4">{room.shortDescription}</p>
                      <div className="flex items-center gap-6 text-xs text-navy/40 mb-4">
                        <span className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5" />{room.size}</span>
                        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />Up to {room.maxOccupancy}</span>
                        <span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5" />{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {room.amenities.slice(0, 5).map((a) => (
                          <span key={a} className="text-[10px] tracking-wider text-navy/40 bg-cream rounded-full px-3 py-1">{a}</span>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end">
                        <span className="text-gold text-xs font-semibold tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-center">
        <RevealOnScroll>
          <h2 className="font-playfair text-3xl md:text-4xl text-white font-light mb-4">
            Find Your Perfect <span className="italic text-gold">Room</span>
          </h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto text-sm">Book direct for the best rates and complimentary breakfast.</p>
          <Link href="/book" className="btn-gold rounded-full">Book Your Stay</Link>
        </RevealOnScroll>
      </section>
    </main>
  );
}
