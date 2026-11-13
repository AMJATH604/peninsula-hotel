"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Shield,
  Clock,
  Users,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { rooms, diningVenues, testimonials, hotelInfo } from "@/lib/data";

// ===== SCROLL-TRIGGERED REVEAL COMPONENT =====
function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
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
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== COUNTER ANIMATION =====
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ===== HERO IMAGE SLIDESHOW =====
const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2000&q=90",
    alt: "Luxury Hotel Room",
  },
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=90",
    alt: "Hotel Lobby",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=90",
    alt: "Hotel Poolside",
  },
];

// ===== HERO SECTION — CINEMATIC FULLSCREEN =====
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 120]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 0.7]);
  const [currentImage, setCurrentImage] = useState(0);

  // Slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={heroRef} className="relative h-[110vh] overflow-hidden bg-navy">
      {/* Slideshow Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImage}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <Image
              src={heroImages[currentImage].src}
              alt={heroImages[currentImage].alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Film grain overlay */}
      <div className="absolute inset-0 z-[3] film-grain pointer-events-none" />

      {/* Gradient overlays */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-10 bg-navy"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy via-transparent to-navy/60" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy/40 via-transparent to-navy/40" />

      {/* Side vertical text */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 z-20 hidden lg:flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-gold/40" />
          <span className="text-gold/50 text-[9px] tracking-[0.4em] uppercase whitespace-nowrap"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Est. 2005 — Chennai, India
          </span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </div>

      {/* Right side — slideshow dots */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`transition-all duration-500 rounded-full ${
              i === currentImage
                ? "w-2 h-8 bg-gold"
                : "w-2 h-2 bg-white/30 hover:bg-gold/60"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: heroOpacity, y: textY }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gold/50" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-gold/80 font-medium">
              Welcome to
            </span>
            <div className="w-12 h-[1px] bg-gold/50" />
          </div>
        </motion.div>

        {/* Main Title — Split into dramatic lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative mb-6"
        >
          {/* "Hotel" — thin elegant */}
          <motion.h1
            initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] text-white font-extralight leading-none tracking-[0.04em]"
          >
            Hotel
          </motion.h1>
          {/* "PENINSULA" — bold gold with gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold leading-none tracking-[0.06em] mt-1"
            style={{
              background: "linear-gradient(135deg, #C8A97E 0%, #F0E0C8 30%, #C8A97E 50%, #E8D5B5 70%, #C8A97E 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PENINSULA
          </motion.h1>
        </motion.div>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-8 origin-center"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-white/50 text-sm sm:text-base md:text-lg tracking-[0.12em] max-w-lg mb-3 font-light"
        >
          Your Home Away From Home
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-gold/60 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium mb-12"
        >
          in the heart of T. Nagar, Chennai
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/book" className="group relative overflow-hidden rounded-full px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-700 hover:shadow-[0_0_40px_rgba(200,169,126,0.3)]"
            style={{
              background: "linear-gradient(135deg, #C8A97E 0%, #D4BC8E 100%)",
              color: "#0C1B2A",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Reserve Your Stay
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link href="/rooms" className="group rounded-full px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-500 border border-white/20 text-white/90 hover:bg-white/10 hover:border-white/40 flex items-center gap-2">
            Explore Rooms
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/25 text-[8px] tracking-[0.5em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pearl to-transparent z-20 pointer-events-none" />
    </section>
  );
}

// ===== LUXURY MARQUEE BANNER =====
function MarqueeBanner() {
  return (
    <div className="bg-navy py-5 overflow-hidden">
      <div className="marquee-banner">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {["Luxury Rooms", "Fine Dining", "Event Spaces", "Spa & Wellness", "Airport Transfer", "24/7 Service"].map((item, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-light px-8 whitespace-nowrap">{item}</span>
                  <span className="text-gold/40 text-lg">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== BOOKING WIDGET — passes selections to /book page =====
function QuickBooking() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("");

  const handleCheckAvailability = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    if (roomType) params.set("roomType", roomType);
    const qs = params.toString();
    router.push(`/book${qs ? `?${qs}` : ""}`);
  };

  return (
    <section className="relative z-30 -mt-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="glass-white rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-6 md:p-8 border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-end">
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-2 block">
                Check In
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="booking-input"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-2 block">
                Check Out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="booking-input"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-2 block">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="booking-input appearance-none"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-navy/40 font-medium mb-2 block">
                Room Type
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="booking-input appearance-none"
              >
                <option value="">Any Room</option>
                <option value="1">Deluxe Room</option>
                <option value="2">Premier Room</option>
                <option value="3">Executive Suite</option>
                <option value="4">Peninsula Suite</option>
              </select>
            </div>
            <button
              onClick={handleCheckAvailability}
              className="btn-gold rounded-xl text-center"
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== ABOUT SECTION — EDITORIAL LAYOUT =====
function AboutSection() {
  return (
    <section className="py-28 md:py-36 bg-warm-white relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — Images (5 columns) */}
          <div className="lg:col-span-5 relative">
            <RevealOnScroll direction="left">
              <div className="relative">
                {/* Main image */}
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=85"
                    alt="Hotel Peninsula — Elegant Interior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                {/* Small floating image */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-8 -right-8 w-40 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80"
                    alt="Hotel Room"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </motion.div>
                {/* Years badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-navy flex flex-col items-center justify-center shadow-xl"
                >
                  <span className="text-2xl font-playfair text-gold font-bold leading-none">
                    <AnimatedCounter target={20} suffix="+" />
                  </span>
                  <span className="text-white/50 text-[8px] tracking-widest uppercase mt-1">Years</span>
                </motion.div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right — Content (7 columns) */}
          <div className="lg:col-span-7 lg:pl-12">
            <RevealOnScroll direction="right" delay={0.2}>
              <span className="section-subtitle block">Our Story</span>
              <h2 className="section-title">
                A Legacy of <br />
                <span className="italic text-gold">Warm Hospitality</span>
              </h2>
              <div className="luxury-divider-left" />
              <p className="text-charcoal/55 text-base leading-[1.9] mb-6">
                Located at the heart of T. Nagar — Chennai&apos;s most vibrant neighbourhood — Hotel Peninsula 
                has been welcoming guests with warmth and authentic South Indian hospitality since 2005. 
                Just steps from Pondy Bazaar and Ranganathan Street, we offer the perfect blend of 
                comfort, convenience, and genuine care.
              </p>
              <p className="text-charcoal/55 text-base leading-[1.9] mb-10">
                Whether you&apos;re here for business meetings, family celebrations, temple visits, or shopping 
                excursions, our dedicated team ensures every stay feels like home.
              </p>

              {/* Feature grid — responsive on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-10">
                <div className="text-center p-4 rounded-2xl bg-cream/60">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-xs text-navy/70 font-medium">Prime Location</span>
                </div>
                <div className="text-center p-4 rounded-2xl bg-cream/60">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <Utensils className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-xs text-navy/70 font-medium">South Indian Cuisine</span>
                </div>
                <div className="text-center p-4 rounded-2xl bg-cream/60">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-xs text-navy/70 font-medium">24/7 Security</span>
                </div>
              </div>

              <Link href="/about" className="btn-gold rounded-full inline-flex items-center gap-2 group">
                Discover More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== ROOMS SECTION — MAGAZINE LAYOUT =====
function RoomsSection() {
  const featuredRooms = rooms.filter(r => r.isFeatured);

  return (
    <section className="py-28 md:py-36 bg-cream relative">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="section-subtitle block">Accommodations</span>
              <h2 className="section-title !mb-0">
                Comfortable <span className="italic text-gold">Rooms & Suites</span>
              </h2>
            </div>
            <Link href="/rooms" className="btn-outline-gold rounded-full !border-navy/15 !text-navy hover:!bg-navy hover:!text-white hover:!border-navy inline-flex items-center gap-2 self-start md:self-auto group">
              View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </RevealOnScroll>

        {/* Room cards — staggered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredRooms.map((room, index) => (
            <RevealOnScroll key={room.id} delay={index * 0.15} direction={index % 2 === 0 ? "left" : "right"}>
              <Link href={`/rooms/${room.slug}`} className="group block">
                <div className="rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-all duration-700" />
                    {/* Price badge */}
                    <div className="absolute top-5 right-5 glass-dark rounded-full px-5 py-2.5">
                      <span className="text-gold font-semibold text-lg">₹{room.price.toLocaleString()}</span>
                      <span className="text-white/40 text-xs ml-1">/ night</span>
                    </div>
                    {/* View button on hover */}
                    <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg">
                        <ArrowUpRight className="w-5 h-5 text-navy" />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-gold/80 font-medium">{room.category}</span>
                      <span className="w-1 h-1 rounded-full bg-gold/30" />
                      <span className="text-[10px] tracking-wider text-navy/30">{room.size}</span>
                    </div>
                    <h3 className="text-xl font-playfair text-navy mb-3 group-hover:text-gold transition-colors duration-500">
                      {room.name}
                    </h3>
                    <p className="text-charcoal/45 text-sm leading-relaxed mb-4">
                      {room.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <span key={amenity} className="text-[9px] tracking-wider text-navy/35 bg-cream rounded-full px-3 py-1.5">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PARALLAX STATS SECTION =====
function StatsSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80"
          alt="Hotel Ambiance"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: 20, suffix: "+", label: "Years of Service", icon: "🏨" },
            { value: 45, suffix: "", label: "Comfortable Rooms", icon: "🛏️" },
            { value: 15000, suffix: "+", label: "Happy Guests", icon: "😊" },
            { value: 4.6, suffix: "★", label: "Guest Rating", icon: "⭐" },
          ].map((stat, index) => (
            <RevealOnScroll key={stat.label} delay={index * 0.1}>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-playfair text-gold mb-3 transition-transform duration-500 group-hover:scale-110">
                  {stat.value === 4.6 ? (
                    <span>{stat.value}{stat.suffix}</span>
                  ) : (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="w-8 h-[1px] bg-gold/30 mx-auto mb-3" />
                <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase">{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== DINING SECTION — SPLIT SCREEN =====
function DiningSection() {
  return (
    <section className="py-28 md:py-36 bg-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div>
            <RevealOnScroll direction="left">
              <span className="section-subtitle block">Dining</span>
              <h2 className="section-title">
                Taste the <span className="italic text-gold">Authentic Flavors</span>
              </h2>
              <div className="luxury-divider-left" />
              <p className="text-charcoal/55 text-base leading-[1.9] mb-10">
                From aromatic Chettinad curries to crispy dosas served on banana leaves, 
                our restaurants celebrate the rich culinary heritage of South India. 
                Start your mornings with our signature filter coffee.
              </p>

              <div className="space-y-5 mb-10">
                {diningVenues.map((venue) => (
                  <div key={venue.id} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-cream/60 transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Utensils className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-navy font-semibold text-base mb-0.5">{venue.name}</h4>
                      <p className="text-charcoal/45 text-sm leading-relaxed">{venue.shortDescription}</p>
                      <p className="text-gold/60 text-xs mt-1.5">{venue.operatingHours.split("|")[0].trim()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/dining" className="btn-gold rounded-full inline-flex items-center gap-2 group">
                View Menu <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </RevealOnScroll>
          </div>

          {/* Right — Bento Grid Images */}
          <RevealOnScroll direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                    alt="Peninsula Restaurant"
                    fill
                    className="object-cover !relative hover:scale-105 transition-transform duration-700"
                    sizes="25vw"
                  />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                    alt="Terrace Café"
                    fill
                    className="object-cover !relative hover:scale-105 transition-transform duration-700"
                    sizes="25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                    alt="South Indian Cuisine"
                    fill
                    className="object-cover !relative hover:scale-105 transition-transform duration-700"
                    sizes="25vw"
                  />
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80"
                    alt="Spice Garden"
                    fill
                    className="object-cover !relative hover:scale-105 transition-transform duration-700"
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ===== SERVICES SECTION =====
function ServicesSection() {
  const services = [
    { icon: Wifi, title: "Free High-Speed WiFi", desc: "Stay connected with complimentary WiFi throughout the hotel" },
    { icon: Coffee, title: "Complimentary Breakfast", desc: "Start your day with our authentic South Indian breakfast" },
    { icon: Car, title: "Airport Transfers", desc: "Convenient pick-up and drop to Chennai International Airport" },
    { icon: Users, title: "Event & Banquet Halls", desc: "Elegant spaces for weddings, conferences, and celebrations" },
    { icon: Shield, title: "24/7 Security", desc: "Round-the-clock security with CCTV for your safety" },
    { icon: Clock, title: "24/7 Front Desk", desc: "Our friendly staff is always available to assist you" },
  ];

  return (
    <section className="py-28 md:py-36 bg-navy relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/[0.02] blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/[0.02] blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="section-subtitle block">Services</span>
            <h2 className="section-title-white">
              Everything You <span className="italic text-gold">Need</span>
            </h2>
            <p className="text-white/35 max-w-xl mx-auto text-base">
              From the moment you arrive, our dedicated team ensures your complete comfort.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <RevealOnScroll key={service.title} delay={index * 0.08} direction="scale">
                <div className="group p-8 rounded-3xl border border-white/[0.06] hover:border-gold/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-500">
                    <IconComponent className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== TESTIMONIALS SECTION — EDITORIAL =====
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 md:py-36 bg-cream relative overflow-hidden">
      {/* Large decorative quote */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[20rem] font-playfair text-gold/[0.04] leading-none pointer-events-none select-none">
        &ldquo;
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="section-subtitle block">Guest Reviews</span>
            <h2 className="section-title">
              What Our <span className="italic text-gold">Guests Say</span>
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1.5 mb-8">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-navy/75 leading-relaxed mb-10 font-light italic font-playfair max-w-2xl mx-auto">
                  &ldquo;{testimonials[current].content}&rdquo;
                </blockquote>

                {/* Guest Info */}
                <div>
                  <div className="w-10 h-[1px] bg-gold/40 mx-auto mb-4" />
                  <p className="text-navy font-semibold text-sm tracking-wide">{testimonials[current].guestName}</p>
                  <p className="text-navy/35 text-xs tracking-wider mt-1">{testimonials[current].guestTitle}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === current
                    ? "w-10 h-2 bg-gold"
                    : "w-2 h-2 bg-navy/15 hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ===== LOCATION SECTION =====
function LocationSection() {
  return (
    <section className="py-28 md:py-36 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Map / Image */}
          <RevealOnScroll direction="left">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
                alt="Hotel Peninsula Location"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-playfair text-lg">T. Nagar, Chennai</p>
                      <p className="text-white/50 text-xs mt-0.5">51, G. N. Chetty Road</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Content */}
          <RevealOnScroll direction="right" delay={0.2}>
            <span className="section-subtitle block">Location</span>
            <h2 className="section-title">
              In the Heart of <span className="italic text-gold">Chennai</span>
            </h2>
            <div className="luxury-divider-left" />
            <p className="text-charcoal/55 text-base leading-[1.9] mb-10">
              Located on the prestigious G. N. Chetty Road in T. Nagar, Hotel Peninsula 
              places you at the center of Chennai&apos;s most popular shopping and cultural district.
            </p>

            <div className="space-y-3 mb-10">
              {hotelInfo.nearbyAttractions.slice(0, 6).map((attraction) => (
                <div key={attraction.name} className="flex items-center justify-between py-3 border-b border-gray-100 group">
                  <span className="text-navy/60 text-sm group-hover:text-navy transition-colors">{attraction.name}</span>
                  <span className="text-gold text-sm font-medium bg-gold/5 px-3 py-1 rounded-full">{attraction.distance}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/contact" className="btn-gold rounded-full inline-flex items-center gap-2 group">
                Get Directions <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${hotelInfo.mobile.replace(/[- ]/g, '')}`} className="btn-outline-gold rounded-full !border-navy/15 !text-navy hover:!bg-navy hover:!text-white hover:!border-navy inline-flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> Call Us
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ===== CTA SECTION — DRAMATIC =====
function CTASection() {
  return (
    <section className="relative py-36 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Room"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-navy/40" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <RevealOnScroll>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-gold/40" />
            <Sparkles className="w-5 h-5 text-gold" />
            <div className="w-8 h-[1px] bg-gold/40" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
            Ready to Experience
            <br />
            <span className="italic text-gold">True Hospitality?</span>
          </h2>
          <p className="text-white/40 text-base mb-12 max-w-md mx-auto leading-relaxed">
            Book direct for the best rates and enjoy complimentary breakfast with every stay.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book" className="btn-gold rounded-full group">
              <span className="flex items-center gap-2">
                Book Your Stay <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <a
              href={`tel:${hotelInfo.mobile.replace(/[- ]/g, '')}`}
              className="btn-outline-gold rounded-full !border-white/20 !text-white hover:!bg-white hover:!text-navy hover:!border-white inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" /> {hotelInfo.mobile}
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ===== MAIN HOME PAGE =====
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <QuickBooking />
      <AboutSection />
      <RoomsSection />
      <StatsSection />
      <MarqueeBanner />
      <DiningSection />
      <ServicesSection />
      <TestimonialsSection />
      <LocationSection />
      <CTASection />
    </main>
  );
}
