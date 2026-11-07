"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, Users, Maximize, Eye, Layers, Check, ArrowLeft } from "lucide-react";
import { rooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import { use } from "react";

export default function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const room = rooms.find((r) => r.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!room) return notFound();

  const activeMainImage = selectedImage || room.images[0];
  const similarRooms = rooms.filter((r) => r.id !== room.id).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/rooms" className="inline-flex items-center gap-2 text-[#C9A96E] text-xs tracking-[0.2em] uppercase mb-4 hover:text-[#D4BC8E] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Rooms
            </Link>
            <div>
              <span className="bg-[#C9A96E] text-[#0A1628] px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold">
                {room.category}
              </span>
            </div>
            <h1 className="font-[var(--font-playfair)] text-4xl md:text-6xl text-white mt-4">{room.name}</h1>
            <div className="w-20 h-0.5 bg-[#C9A96E] mt-4" />
          </motion.div>
        </div>
      </section>

      {/* Interactive Photo Gallery */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Primary Display */}
            <div className="lg:col-span-2 relative aspect-[16/10] overflow-hidden rounded-sm bg-[#0A1628] shadow-md">
              <Image
                src={activeMainImage}
                alt={room.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-all duration-500"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {room.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-[16/10] overflow-hidden rounded-sm border-2 transition-all group ${
                    activeMainImage === img
                      ? "border-[#C9A96E] shadow-lg shadow-[#C9A96E]/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${room.name} view ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 33vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="font-[var(--font-playfair)] text-2xl text-[#0A1628] mb-4">About This Room</h2>
                <div className="w-12 h-0.5 bg-[#C9A96E] mb-6" />
                <p className="text-[#6B6B6B] leading-relaxed text-base">{room.description}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                <h2 className="font-[var(--font-playfair)] text-2xl text-[#0A1628] mb-4">Features</h2>
                <div className="w-12 h-0.5 bg-[#C9A96E] mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 py-2 bg-white px-4 border border-gray-100">
                      <Check className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                      <span className="text-[#0A1628] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                <h2 className="font-[var(--font-playfair)] text-2xl text-[#0A1628] mb-4">Amenities</h2>
                <div className="w-12 h-0.5 bg-[#C9A96E] mb-6" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 bg-white px-4 py-3 border border-gray-100">
                      <div className="w-2 h-2 bg-[#C9A96E] rounded-full flex-shrink-0" />
                      <span className="text-[#0A1628] text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Booking Card */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="sticky top-28">
                <div className="bg-white border border-gray-100 shadow-xl p-8 rounded-sm">
                  <div className="text-center mb-6">
                    {room.originalPrice && (
                      <span className="text-[#9A9A9A] text-lg line-through block">{formatCurrency(room.originalPrice)}</span>
                    )}
                    <span className="font-[var(--font-playfair)] text-3xl text-[#C9A96E]">{formatCurrency(room.price)}</span>
                    <span className="text-[#6B6B6B] text-sm"> / night</span>
                  </div>
                  <div className="w-full h-px bg-gray-100 mb-6" />
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B6B6B] flex items-center gap-2"><Maximize className="w-4 h-4 text-[#C9A96E]" /> Size</span>
                      <span className="text-[#0A1628] font-medium">{room.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B6B6B] flex items-center gap-2"><BedDouble className="w-4 h-4 text-[#C9A96E]" /> Bed</span>
                      <span className="text-[#0A1628] font-medium">{room.bedType}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B6B6B] flex items-center gap-2"><Users className="w-4 h-4 text-[#C9A96E]" /> Occupancy</span>
                      <span className="text-[#0A1628] font-medium">Up to {room.maxOccupancy}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B6B6B] flex items-center gap-2"><Eye className="w-4 h-4 text-[#C9A96E]" /> View</span>
                      <span className="text-[#0A1628] font-medium">{room.view}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#6B6B6B] flex items-center gap-2"><Layers className="w-4 h-4 text-[#C9A96E]" /> Floor</span>
                      <span className="text-[#0A1628] font-medium">{room.floor}</span>
                    </div>
                  </div>
                  <Link href="/book" className="block w-full bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase font-semibold text-center hover:shadow-lg hover:shadow-[#C9A96E]/30 transition-all">
                    Book This Room
                  </Link>
                  <p className="text-center text-[#9A9A9A] text-xs mt-4">
                    Best Rate Guarantee • Free Cancellation up to 48h
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Rooms */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-playfair)] text-2xl text-[#0A1628] mb-2 text-center">You May Also Like</h2>
          <div className="w-12 h-0.5 bg-[#C9A96E] mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {similarRooms.map((r) => (
              <Link key={r.id} href={`/rooms/${r.slug}`} className="group block bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:border-[#C9A96E]/30 rounded-sm">
                <div className="relative aspect-[16/9] bg-[#0A1628] overflow-hidden">
                  <Image
                    src={r.images[0]}
                    alt={r.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#C9A96E] text-[#0A1628] px-2.5 py-0.5 text-[10px] tracking-[0.2em] uppercase font-semibold">
                    {r.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-[var(--font-playfair)] text-lg text-[#0A1628] group-hover:text-[#C9A96E] transition-colors">{r.name}</h3>
                  <p className="text-[#6B6B6B] text-sm mt-1 line-clamp-1">{r.shortDescription}</p>
                  <p className="text-[#C9A96E] mt-3 font-[var(--font-playfair)] text-lg">{formatCurrency(r.price)} <span className="text-[#6B6B6B] text-xs font-sans">/ night</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

