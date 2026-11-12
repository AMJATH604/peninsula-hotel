"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { spaServices } from "@/lib/data";

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

export default function SpaPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80" alt="Spa" fill priority className="object-cover" sizes="100vw" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium mb-4">Wellness</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-playfair text-4xl md:text-6xl text-white font-light">
            Spa & <span className="italic text-gold">Wellness</span>
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <RevealOnScroll>
            <Sparkles className="w-8 h-8 text-gold mx-auto mb-6" />
            <h2 className="section-title">Rejuvenate Your <span className="italic text-gold">Body & Mind</span></h2>
            <p className="text-charcoal/60 text-base leading-relaxed">
              Unwind and restore at our spa center with traditional Ayurvedic treatments, therapeutic massages, 
              and holistic wellness packages. Our experienced therapists bring ancient healing traditions 
              to modern comfort.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaServices.map((service, index) => (
              <RevealOnScroll key={service.id} delay={index * 0.1} direction="scale">
                <div className="card-luxury rounded-2xl overflow-hidden group">
                  <div className="relative aspect-[4/3] img-zoom">
                    <Image src={service.image} alt={service.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] tracking-wider uppercase bg-white/90 text-navy rounded-full px-3 py-1 font-medium">{service.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl text-navy mb-2 group-hover:text-gold transition-colors">{service.name}</h3>
                    <p className="text-charcoal/50 text-sm leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-navy/40 text-sm">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        {service.duration}
                      </div>
                      <span className="text-gold font-semibold text-lg">₹{service.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=80" alt="Spa Ambiance" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative z-10 text-center px-4">
          <RevealOnScroll>
            <h2 className="font-playfair text-3xl md:text-5xl text-white font-light mb-4">
              Book Your <span className="italic text-gold">Spa Session</span>
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto text-sm">Contact us to schedule your treatment and begin your wellness journey.</p>
            <Link href="/contact" className="btn-gold rounded-full inline-flex items-center gap-2">
              Book Appointment <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
