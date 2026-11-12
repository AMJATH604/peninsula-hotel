"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Users, Maximize, Check, Send, ArrowRight } from "lucide-react";
import { eventVenues, hotelInfo } from "@/lib/data";

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

export default function EventsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80" alt="Events" fill priority className="object-cover" sizes="100vw" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium mb-4">Celebrations</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-playfair text-4xl md:text-6xl text-white font-light">
            Events & <span className="italic text-gold">Weddings</span>
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <RevealOnScroll>
            <p className="text-charcoal/60 text-lg leading-relaxed font-light">
              From grand weddings and receptions to corporate conferences and intimate celebrations, 
              Hotel Peninsula provides elegant venues and professional event management in the heart of 
              T. Nagar, Chennai.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Venues */}
      {eventVenues.map((venue, index) => (
        <section key={venue.id} className={`py-20 md:py-28 ${index % 2 === 0 ? "bg-cream" : "bg-warm-white"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <RevealOnScroll direction={index % 2 === 0 ? "left" : "right"}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src={venue.image} alt={venue.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction={index % 2 === 0 ? "right" : "left"} delay={0.15} className={index % 2 === 1 ? "lg:order-first" : ""}>
                <h2 className="font-playfair text-3xl md:text-4xl text-navy mb-4">{venue.name}</h2>
                <div className="luxury-divider-left" />
                <p className="text-charcoal/60 text-base leading-relaxed mb-6">{venue.description}</p>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-sm text-navy/60">
                    <Users className="w-4 h-4 text-gold" />
                    Up to {venue.capacity} guests
                  </div>
                  <div className="flex items-center gap-2 text-sm text-navy/60">
                    <Maximize className="w-4 h-4 text-gold" />
                    {venue.size}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-3">Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {venue.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-navy/60">
                        <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-3">Ideal For</h4>
                  <div className="flex flex-wrap gap-2">
                    {venue.suitableFor.map((s) => (
                      <span key={s} className="text-[10px] tracking-wider uppercase bg-gold/10 text-gold rounded-full px-4 py-1.5 font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      ))}

      {/* Inquiry Form */}
      <section className="py-20 md:py-28 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <span className="section-subtitle">Get in Touch</span>
              <h2 className="section-title-white">Plan Your <span className="italic text-gold">Event</span></h2>
              <p className="text-white/40 text-sm">Fill out the form below and our events team will get back to you within 24 hours.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2 block">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-gold transition-colors" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2 block">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-gold transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2 block">Phone</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-gold transition-colors" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2 block">Event Type</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-gold transition-colors appearance-none">
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="reception">Reception</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="conference">Conference / Seminar</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2 block">Event Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2 block">Expected Guests</label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-gold transition-colors" placeholder="Number of guests" />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-2 block">Additional Details</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about your event..." />
              </div>
              <button className="btn-gold rounded-full w-full flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Inquiry
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
