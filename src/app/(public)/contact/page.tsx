"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Navigation } from "lucide-react";
import { hotelInfo } from "@/lib/data";

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

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80" alt="Contact" fill priority className="object-cover" sizes="100vw" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium mb-4">Reach Us</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-playfair text-4xl md:text-6xl text-white font-light">
            Get in <span className="italic text-gold">Touch</span>
          </motion.h1>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — Contact Info */}
            <RevealOnScroll direction="left">
              <span className="section-subtitle">Contact Information</span>
              <h2 className="section-title">We&apos;d Love to <span className="italic text-gold">Hear From You</span></h2>
              <div className="luxury-divider-left" />
              <p className="text-charcoal/60 text-base leading-relaxed mb-8">
                Whether you have a question, want to make a reservation, or need assistance planning your stay — 
                our friendly team is here to help. Reach out to us anytime.
              </p>

              <div className="space-y-6 mb-10">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-navy font-semibold text-sm mb-1">Address</h4>
                    <p className="text-charcoal/60 text-sm">{hotelInfo.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-navy font-semibold text-sm mb-1">Phone</h4>
                    {hotelInfo.phoneNumbers.map((num) => (
                      <a key={num} href={`tel:${num.replace(/[- ]/g, '')}`} className="text-charcoal/60 text-sm hover:text-gold transition-colors block">{num}</a>
                    ))}
                    <a href={`tel:${hotelInfo.mobile.replace(/[- ]/g, '')}`} className="text-gold text-sm font-medium mt-1 block">{hotelInfo.mobile} (Mobile / WhatsApp)</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-navy font-semibold text-sm mb-1">Email</h4>
                    <a href={`mailto:${hotelInfo.email}`} className="text-charcoal/60 text-sm hover:text-gold transition-colors">{hotelInfo.email}</a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-navy font-semibold text-sm mb-1">Front Desk</h4>
                    <p className="text-charcoal/60 text-sm">24/7 — We&apos;re always here for you</p>
                    <p className="text-charcoal/40 text-xs mt-1">Check-in: {hotelInfo.checkInTime} | Check-out: {hotelInfo.checkOutTime}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Right — Contact Form */}
            <RevealOnScroll direction="right" delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <h3 className="font-playfair text-2xl text-navy mb-6">Send a Message</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-2 block">Name</label>
                      <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition-colors" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-2 block">Email</label>
                      <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition-colors" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-2 block">Phone</label>
                      <input type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition-colors" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-2 block">Subject</label>
                      <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition-colors appearance-none text-charcoal/70">
                        <option value="">Select subject</option>
                        <option value="reservation">Room Reservation</option>
                        <option value="event">Event Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-2 block">Message</label>
                    <textarea rows={5} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition-colors resize-none" placeholder="How can we help you?" />
                  </div>
                  <button className="btn-gold rounded-full w-full flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Map Placeholder + Nearby */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-navy/5 relative flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Navigation className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="font-playfair text-2xl text-navy mb-2">Find Us</h3>
                  <p className="text-charcoal/60 text-sm mb-4">{hotelInfo.address}</p>
                  <a
                    href="https://maps.google.com/?q=51+G+N+Chetty+Road+T+Nagar+Chennai+600017"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold rounded-full inline-flex items-center gap-2 !text-[10px]"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Open in Google Maps
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.2}>
              <span className="section-subtitle">Nearby</span>
              <h2 className="section-title">Nearby <span className="italic text-gold">Attractions</span></h2>
              <div className="luxury-divider-left" />
              <div className="space-y-4">
                {hotelInfo.nearbyAttractions.map((attraction) => (
                  <div key={attraction.name} className="flex items-center justify-between py-3 border-b border-gray-200/50">
                    <span className="text-navy/70 text-sm">{attraction.name}</span>
                    <span className="text-gold text-sm font-medium">{attraction.distance}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
}
