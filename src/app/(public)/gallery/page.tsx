"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { galleryImages } from "@/lib/data";

function RevealOnScroll({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const categories = ["all", "exterior", "lobby", "rooms", "dining", "spa", "events"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80" alt="Gallery" fill priority className="object-cover" sizes="100vw" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium mb-4">Visual Tour</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-playfair text-4xl md:text-6xl text-white font-light">
            Photo <span className="italic text-gold">Gallery</span>
          </motion.h1>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-2 mb-16 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
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

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, index) => (
              <RevealOnScroll key={img.id} delay={index * 0.05}>
                <button
                  onClick={() => setLightboxImage(img.url)}
                  className="w-full rounded-2xl overflow-hidden group block break-inside-avoid"
                >
                  <div className="relative img-zoom">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      width={600}
                      height={index % 3 === 0 ? 450 : index % 3 === 1 ? 350 : 400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-300 flex items-end justify-start p-4">
                      <span className="text-white text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {img.alt}
                      </span>
                    </div>
                  </div>
                </button>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-white z-10">
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightboxImage} alt="Gallery" fill className="object-contain" sizes="90vw" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
