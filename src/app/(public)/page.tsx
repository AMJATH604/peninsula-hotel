"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  UtensilsCrossed,
  Sparkles,
  Calendar,
  Quote,
  BedDouble,
  Award,
} from "lucide-react";
import { rooms, diningVenues, testimonials, offers, hotelInfo } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ===== HERO SECTION WITH LUXURY CINEMATIC VIDEO BACKGROUND ===== */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-32 md:pt-36 pb-12 overflow-hidden">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
            className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-[0.75]"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Deep Navy Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/85 via-[#0A1628]/45 to-[#0A1628]/95" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto my-auto py-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#C9A96E] text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold"
          >
            Welcome to Peninsula Chennai
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide drop-shadow-2xl leading-[1.15]"
          >
            Where Chennai Meets
            <span className="block text-[#C9A96E] italic mt-2">Magnificence</span>
          </motion.h1>

          {/* Gold Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/90 text-base md:text-lg font-light tracking-wide mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            An iconic 5-star oceanfront retreat on Marina Beach Road, delivering unparalleled hospitality, Michelin-grade gastronomy, and bespoke sanctuaries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/rooms"
              className="bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-8 py-3.5 text-[11px] tracking-[0.25em] uppercase font-bold hover:shadow-2xl hover:shadow-[#C9A96E]/50 transition-all hover:-translate-y-0.5 rounded-sm"
            >
              Explore Suites
            </Link>
            <Link
              href="/book"
              className="border border-[#C9A96E] text-[#C9A96E] backdrop-blur-md bg-[#0A1628]/40 px-8 py-3.5 text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-[#C9A96E] hover:text-[#0A1628] transition-all rounded-sm"
            >
              Reserve Your Stay
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-10 mx-auto mt-4 mb-2 flex flex-col items-center gap-1.5 cursor-pointer group"
          onClick={() => {
            const el = document.getElementById("booking-widget");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-white/60 group-hover:text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase transition-colors">
            Scroll to Discover
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-[#C9A96E]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FLOATING BOOKING WIDGET ===== */}
      <section id="booking-widget" className="relative z-20 -mt-10 mb-20 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white shadow-2xl border border-[#C9A96E]/30 p-6 md:p-8 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block font-medium">Check In</label>
                <input
                  type="date"
                  className="w-full border-b border-[#0A1628]/20 pb-2 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A96E] transition-colors bg-transparent"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block font-medium">Check Out</label>
                <input
                  type="date"
                  className="w-full border-b border-[#0A1628]/20 pb-2 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A96E] transition-colors bg-transparent"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block font-medium">Guests</label>
                <select className="w-full border-b border-[#0A1628]/20 pb-2 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A96E] transition-colors bg-transparent">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block font-medium">Suite Tier</label>
                <select className="w-full border-b border-[#0A1628]/20 pb-2 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A96E] transition-colors bg-transparent">
                  <option>Any Sanctuary</option>
                  <option>Deluxe Room</option>
                  <option>Premier Room</option>
                  <option>Executive Suite</option>
                  <option>Presidential Suite</option>
                </select>
              </div>
              <Link
                href="/book"
                className="bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase font-bold text-center hover:shadow-lg hover:shadow-[#C9A96E]/40 transition-all"
              >
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WELCOME / LEGACY SECTION WITH EDITORIAL IMAGERY ===== */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4 font-medium">A Heritage of Excellence</p>
              <h2 className="font-[var(--font-playfair)] text-3xl md:text-5xl text-[#0A1628] mb-4">
                A Grand Landmark on Marina Beach
              </h2>
              <div className="w-16 h-0.5 bg-[#C9A96E] mb-8" />
              <p className="text-[#6B6B6B] leading-relaxed mb-6 text-base">
                Nestled along Chennai&apos;s celebrated coastline, Peninsula Chennai marries the noble heritage of South India with the refined standards of international 7-star hospitality.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-8 text-base">
                From hand-carved Dravidian columns framing the lobby to rooftop infinity pools gazing over the Bay of Bengal, every moment is sculpted for royalty, dignitary visits, and discerning travelers.
              </p>
              <div className="flex items-center gap-6 mb-8 border-y border-gray-200 py-4">
                <div>
                  <p className="font-[var(--font-playfair)] text-2xl font-bold text-[#0A1628]">250+</p>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Luxury Rooms</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <p className="font-[var(--font-playfair)] text-2xl font-bold text-[#C9A96E]">4</p>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Signature Restaurants</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <p className="font-[var(--font-playfair)] text-2xl font-bold text-[#0A1628]">12</p>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Spa Treatment Pavilions</p>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-block border border-[#C9A96E] text-[#0A1628] px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#C9A96E] hover:text-[#0A1628] transition-all"
              >
                Discover Our Heritage
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-none overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                  alt="Peninsula Chennai Colonnade and Grand Hall"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative Gold Frame */}
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border-2 border-[#C9A96E]/40 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED SUITES WITH REAL PHOTOGRAPHY ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Bespoke Sanctuaries</p>
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-5xl text-[#0A1628] mb-4">
              Featured Rooms & Suites
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto mb-4" />
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              Every room at Peninsula Chennai is an oasis of tranquility, featuring custom Italian linens, deep marble bathtubs, and panoramic coastline vistas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.slice(0, 4).map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link href={`/rooms/${room.slug}`} className="group block">
                  <div className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-[#C9A96E]/40">
                    {/* Real Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 bg-[#0A1628]/80 backdrop-blur-md text-[#C9A96E] border border-[#C9A96E]/30 px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold">
                        {room.category}
                      </div>
                      <div className="absolute bottom-4 left-4 text-white text-xs tracking-wider font-light">
                        {room.view} • {room.size}
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="font-[var(--font-playfair)] text-2xl text-[#0A1628] mb-2 group-hover:text-[#C9A96E] transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-[#6B6B6B] text-sm mb-6 line-clamp-2 leading-relaxed">
                        {room.shortDescription}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-[#C9A96E] font-[var(--font-playfair)] text-2xl font-bold">
                            {formatCurrency(room.price)}
                          </span>
                          <span className="text-[#6B6B6B] text-xs"> / night</span>
                        </div>
                        <span className="text-[11px] tracking-[0.15em] uppercase text-[#0A1628] font-bold group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all">
                          View Sanctuary →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link
              href="/rooms"
              className="inline-block border border-[#C9A96E] text-[#0A1628] px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-[#C9A96E] hover:text-[#0A1628] transition-all"
            >
              View All 5 Room Categories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== DINING HIGHLIGHTS WITH EDITORIAL GASTRONOMY ===== */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Fine Dining & Lounge</p>
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-5xl text-[#0A1628] mb-4">
              Epicurean Journeys
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto mb-4" />
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              Four curated culinary destinations celebrating Tamil spice routes, theatre pan-Asian cuisine, all-day veranda dining, and rare single malts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diningVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href="/dining" className="group block">
                  <div className="bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-[#C9A96E] text-[10px] tracking-[0.2em] uppercase mb-1 font-semibold">
                          {venue.cuisine}
                        </p>
                        <h3 className="font-[var(--font-playfair)] text-white text-xl">
                          {venue.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[#6B6B6B] text-xs line-clamp-2 mb-3 leading-relaxed">
                        {venue.shortDescription}
                      </p>
                      <p className="text-[10px] text-[#9A9A9A] tracking-wider uppercase">
                        {venue.operatingHours}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPA & WELLNESS WITH SANCTUARY PHOTOGRAPHY ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Holistic Rejuvenation</p>
              <h2 className="font-[var(--font-playfair)] text-3xl md:text-5xl text-white mb-4">
                The Peninsula Spa
              </h2>
              <div className="w-16 h-0.5 bg-[#C9A96E] mb-8" />
              <p className="text-white/70 leading-relaxed mb-6 text-base">
                Surrender to serenity in our award-winning wellness retreat. Guided by centuries-old Ayurvedic traditions, Swedish deep-tissue philosophies, and 24K gold facials.
              </p>
              <p className="text-white/70 leading-relaxed mb-8 text-base">
                Featuring 12 private therapy suites, vitality pools, herbal steam grottos, and an open Zen meditation courtyard.
              </p>
              <Link
                href="/spa"
                className="inline-block bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-2xl transition-all"
              >
                View Spa Treatments
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] relative overflow-hidden shadow-2xl border-2 border-[#C9A96E]/30">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                  alt="The Peninsula Spa Sanctuary"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="py-16 bg-white border-y border-[#C9A96E]/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: 250, suffix: "+", label: "Luxury Suites", icon: BedDouble },
              { number: 4, suffix: "", label: "Fine Dining Venues", icon: UtensilsCrossed },
              { number: 15, suffix: "+", label: "Spa Treatments", icon: Sparkles },
              { number: 800, suffix: "", label: "Grand Gala Capacity", icon: Users },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <stat.icon className="w-6 h-6 text-[#C9A96E] mb-3" />
                <span className="font-[var(--font-playfair)] text-3xl md:text-4xl text-[#0A1628] mb-1 font-bold">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </span>
                <span className="text-[#6B6B6B] text-xs tracking-[0.15em] uppercase font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Guest Accolades</p>
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-5xl text-[#0A1628] mb-4">
              Stories of Magnificence
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto" />
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote className="w-10 h-10 text-[#C9A96E]/40 mx-auto mb-6" />
              <p className="font-[var(--font-playfair)] text-xl md:text-2xl text-[#0A1628] leading-relaxed mb-8 italic font-light">
                &ldquo;{testimonials[currentTestimonial].content}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#C9A96E] fill-[#C9A96E]" />
                ))}
              </div>
              <p className="text-[#0A1628] font-bold text-sm tracking-wide">
                {testimonials[currentTestimonial].guestName}
              </p>
              <p className="text-[#6B6B6B] text-xs tracking-wider">
                {testimonials[currentTestimonial].guestTitle}
              </p>
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-3 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentTestimonial ? "bg-[#C9A96E] w-8" : "bg-[#0A1628]/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXCLUSIVE OFFERS WITH PHOTO TILES ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Bespoke Privileges</p>
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-5xl text-[#0A1628] mb-4">
              Seasonal Offers & Experiences
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-[#C9A96E]/40">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-[#C9A96E] text-[#0A1628] px-3 py-1 text-xs font-bold shadow-md">
                      {offer.discountValue}% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-[var(--font-playfair)] text-xl text-[#0A1628] mb-2 font-bold">
                      {offer.title}
                    </h3>
                    <p className="text-[#6B6B6B] text-sm mb-6 line-clamp-2">
                      {offer.shortDescription}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <code className="text-[#0A1628] text-xs bg-[#C9A96E]/20 px-3 py-1 font-mono font-bold">
                        {offer.promoCode}
                      </code>
                      <Link
                        href="/offers"
                        className="text-[11px] tracking-[0.15em] uppercase text-[#C9A96E] font-bold group-hover:translate-x-1 transition-transform"
                      >
                        Claim Offer →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER CTA ===== */}
      <section className="py-20 md:py-28 bg-[#0A1628] relative overflow-hidden text-center text-white">
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-3 font-medium">The Peninsula Connoisseur</p>
          <h2 className="font-[var(--font-playfair)] text-3xl md:text-5xl mb-4">
            Receive Curated Invitations
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto mb-6" />
          <p className="text-white/70 mb-8 text-sm">
            Be the first to receive invitations to winemaker dinners, seasonal suite promotions, and private cultural exhibitions at Peninsula Chennai.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 px-5 py-3.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
            <button className="bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
