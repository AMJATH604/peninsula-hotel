"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { galleryImages } from "@/lib/data";
import { GalleryCategory, GalleryImage } from "@/types";

const categories: { label: string; value: GalleryCategory }[] = [
  { label: "All", value: "all" },
  { label: "Rooms", value: "rooms" },
  { label: "Dining", value: "dining" },
  { label: "Spa", value: "spa" },
  { label: "Events", value: "events" },
  { label: "Exterior", value: "exterior" },
  { label: "Pool", value: "pool" },
  { label: "Lobby", value: "lobby" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filtered = activeCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
          alt="Peninsula Chennai Architecture"
          fill
          priority
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4">Visual Journey</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-[var(--font-playfair)] text-4xl md:text-6xl text-white mb-4">Gallery</motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-4" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/80 text-lg font-[var(--font-playfair)] italic">Glimpse Into Extraordinary Luxury by the Bay</motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 text-[11px] tracking-[0.2em] uppercase font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-[#C9A96E] text-[#0A1628] shadow-md shadow-[#C9A96E]/20"
                  : "border border-gray-200 text-[#6B6B6B] hover:border-[#C9A96E] hover:text-[#C9A96E]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {filtered.map((image, index) => {
                const isLarge = index % 5 === 0;
                return (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="break-inside-avoid group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div
                      className={`relative overflow-hidden rounded-sm bg-[#0A1628] shadow-md border border-gray-100 ${
                        isLarge ? "aspect-[3/4]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10 bg-[#0A1628]/80 backdrop-blur-sm text-[#C9A96E] px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase font-semibold">
                        {image.category}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#0A1628]/0 group-hover:bg-[#0A1628]/70 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center">
                        <ZoomIn className="w-8 h-8 text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 mb-3" />
                        <p className="text-white text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-[var(--font-playfair)]">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative w-full h-[65vh] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  fill
                  priority
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase block mb-1">
                  {selectedImage.category}
                </span>
                <p className="text-white text-lg font-[var(--font-playfair)]">
                  {selectedImage.alt}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

