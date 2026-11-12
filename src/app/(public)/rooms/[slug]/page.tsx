"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Users, Maximize, BedDouble, Eye, MapPin, Star } from "lucide-react";
import { rooms } from "@/lib/data";
import { use } from "react";

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

export default function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const room = rooms.find((r) => r.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!room) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-playfair text-3xl text-navy mb-4">Room Not Found</h1>
          <Link href="/rooms" className="btn-gold rounded-full">View All Rooms</Link>
        </div>
      </main>
    );
  }

  const otherRooms = rooms.filter((r) => r.id !== room.id).slice(0, 2);

  return (
    <main>
      {/* Hero Gallery */}
      <section className="pt-28 md:pt-36 pb-12 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <Link href="/rooms" className="text-navy/40 text-sm hover:text-gold transition-colors flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Rooms
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={room.images[activeImage]}
                      alt={room.name}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex gap-2">
                {room.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden flex-1 transition-all duration-300 ${
                      i === activeImage ? "ring-2 ring-gold" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${room.name} ${i + 1}`} fill className="object-cover" sizes="15vw" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Room Info */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <span className="text-[11px] tracking-[0.2em] uppercase text-gold font-medium">{room.category}</span>
              <h1 className="font-playfair text-3xl md:text-4xl text-navy mt-2 mb-4">{room.name}</h1>
              <div className="luxury-divider-left" />

              {/* Price */}
              <div className="flex items-baseline gap-3 my-6">
                <span className="text-3xl font-playfair text-gold">₹{room.price.toLocaleString()}</span>
                {room.originalPrice && (
                  <span className="text-lg text-navy/30 line-through">₹{room.originalPrice.toLocaleString()}</span>
                )}
                <span className="text-navy/40 text-sm">per night</span>
              </div>

              {/* Room details grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Maximize className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-navy/40">Size</p>
                    <p className="text-sm text-navy font-medium">{room.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <BedDouble className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-navy/40">Bed</p>
                    <p className="text-sm text-navy font-medium">{room.bedType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-navy/40">Guests</p>
                    <p className="text-sm text-navy font-medium">Up to {room.maxOccupancy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-navy/40">View</p>
                    <p className="text-sm text-navy font-medium">{room.view}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-navy/40">Floor</p>
                    <p className="text-sm text-navy font-medium">{room.floor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-navy/40">Rating</p>
                    <p className="text-sm text-navy font-medium">4.6 ★</p>
                  </div>
                </div>
              </div>

              <p className="text-charcoal/60 text-sm leading-relaxed mb-6">{room.description}</p>

              {/* Book CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/book" className="btn-gold rounded-full flex-1 text-center">
                  Book This Room
                </Link>
                <a href="tel:+914428150001" className="btn-outline-gold rounded-full !border-navy/20 !text-navy hover:!bg-navy hover:!text-white hover:!border-navy flex-1 text-center">
                  Call to Book
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities & Features */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealOnScroll>
              <h3 className="font-playfair text-2xl text-navy mb-6">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 py-2">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm text-navy/70">{amenity}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <h3 className="font-playfair text-2xl text-navy mb-6">Room Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {room.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 py-2">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm text-navy/70">{feature}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Similar Rooms */}
      {otherRooms.length > 0 && (
        <section className="py-20 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <span className="section-subtitle">You May Also Like</span>
                <h2 className="section-title">Other <span className="italic text-gold">Rooms</span></h2>
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherRooms.map((r, i) => (
                <RevealOnScroll key={r.id} delay={i * 0.12}>
                  <Link href={`/rooms/${r.slug}`} className="group block">
                    <div className="card-luxury rounded-2xl overflow-hidden">
                      <div className="relative aspect-[16/10] img-zoom">
                        <Image src={r.images[0]} alt={r.name} fill className="object-cover" sizes="50vw" />
                        <div className="absolute top-4 right-4 glass-dark rounded-full px-4 py-2">
                          <span className="text-gold font-semibold">₹{r.price.toLocaleString()}</span>
                          <span className="text-white/50 text-xs"> /night</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-playfair text-navy group-hover:text-gold transition-colors">{r.name}</h3>
                        <p className="text-charcoal/50 text-sm mt-1">{r.shortDescription}</p>
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
