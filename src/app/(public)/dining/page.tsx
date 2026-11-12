"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Clock, Utensils, ArrowRight } from "lucide-react";
import { diningVenues } from "@/lib/data";

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

export default function DiningPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80" alt="Dining" fill priority className="object-cover" sizes="100vw" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium mb-4">Culinary</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-playfair text-4xl md:text-6xl text-white font-light">
            Dining & <span className="italic text-gold">Cuisine</span>
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <RevealOnScroll>
            <p className="text-charcoal/60 text-lg leading-relaxed font-light">
              From aromatic filter coffee at dawn to sumptuous Chettinad feasts, Hotel Peninsula celebrates 
              the rich culinary heritage of South India. Our restaurants offer authentic flavors crafted 
              with the freshest ingredients and time-honored recipes.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Restaurants */}
      {diningVenues.map((venue, index) => (
        <section key={venue.id} className={`py-20 md:py-28 ${index % 2 === 0 ? "bg-cream" : "bg-warm-white"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Image */}
              <RevealOnScroll direction={index % 2 === 0 ? "left" : "right"}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src={venue.image} alt={venue.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </RevealOnScroll>

              {/* Content */}
              <RevealOnScroll direction={index % 2 === 0 ? "right" : "left"} delay={0.15} className={index % 2 === 1 ? "lg:order-first" : ""}>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-medium">{venue.cuisine}</span>
                <h2 className="font-playfair text-3xl md:text-4xl text-navy mt-2 mb-4">{venue.name}</h2>
                <div className="luxury-divider-left" />
                <p className="text-charcoal/60 text-base leading-relaxed mb-6">{venue.description}</p>

                <div className="flex items-center gap-2 text-sm text-navy/50 mb-4">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>{venue.operatingHours}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-navy/50 mb-6">
                  <Utensils className="w-4 h-4 text-gold" />
                  <span>Dress Code: {venue.dressCode}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {venue.highlights.map((h) => (
                    <span key={h} className="text-[10px] tracking-wider uppercase text-navy/50 bg-white rounded-full px-4 py-1.5 border border-gray-100">{h}</span>
                  ))}
                </div>

                <Link href="/contact" className="btn-gold rounded-full inline-flex items-center gap-2">
                  Reserve a Table <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
