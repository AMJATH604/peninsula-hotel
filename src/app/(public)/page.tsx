"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  MapPin,
  Phone,
  ChevronDown,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Shield,
  Clock,
  Users,
  Calendar,
  Sparkles,
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

// ===== PARALLAX IMAGE COMPONENT =====
function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-[120%] w-full relative -top-[10%]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </motion.div>
    </div>
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

// ===== HERO SECTION =====
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background Image with parallax */}
      <motion.div style={{ scale: heroScale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Hotel Peninsula Chennai"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Noise texture */}
      <div className="absolute inset-0 z-10 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <motion.div
        style={{ opacity: heroOpacity, y: textY }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium mb-4 block">
            Welcome to
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light leading-[0.95] mb-6"
        >
          Hotel
          <br />
          <span className="text-gradient-gold italic font-normal">Peninsula</span>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="h-[1px] bg-gold mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-white/70 text-sm sm:text-base md:text-lg tracking-wider max-w-xl mb-10 font-light"
        >
          Your home away from home in the heart of
          <br className="hidden sm:block" />
          <span className="text-gold/90">T. Nagar, Chennai</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/book" className="btn-gold rounded-full">
            Reserve Your Stay
          </Link>
          <Link href="/rooms" className="btn-outline-gold rounded-full !border-white/30 !text-white hover:!bg-white hover:!text-navy hover:!border-white">
            Explore Rooms
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ===== BOOKING WIDGET =====
function QuickBooking() {
  return (
    <section className="relative z-30 -mt-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-navy/50 font-medium mb-2 block">
                Check In
              </label>
              <input
                type="date"
                className="w-full border-b-2 border-gold/30 focus:border-gold pb-2 text-navy font-medium outline-none transition-colors bg-transparent"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-navy/50 font-medium mb-2 block">
                Check Out
              </label>
              <input
                type="date"
                className="w-full border-b-2 border-gold/30 focus:border-gold pb-2 text-navy font-medium outline-none transition-colors bg-transparent"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-navy/50 font-medium mb-2 block">
                Guests
              </label>
              <select className="w-full border-b-2 border-gold/30 focus:border-gold pb-2 text-navy font-medium outline-none transition-colors bg-transparent appearance-none">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-navy/50 font-medium mb-2 block">
                Room Type
              </label>
              <select className="w-full border-b-2 border-gold/30 focus:border-gold pb-2 text-navy font-medium outline-none transition-colors bg-transparent appearance-none">
                <option>Any Room</option>
                <option>Deluxe Room</option>
                <option>Premier Room</option>
                <option>Executive Suite</option>
                <option>Peninsula Suite</option>
              </select>
            </div>
            <Link
              href="/book"
              className="btn-gold rounded-xl text-center"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== ABOUT SECTION =====
function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Images */}
          <div className="relative">
            <RevealOnScroll direction="left">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                    alt="Hotel Peninsula Lobby"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Floating overlay card */}
                <div className="absolute -bottom-8 -right-4 md:-right-8 bg-navy rounded-xl p-6 text-white shadow-2xl max-w-[200px]">
                  <div className="text-3xl font-playfair text-gold mb-1">
                    <AnimatedCounter target={20} suffix="+" />
                  </div>
                  <p className="text-white/60 text-xs tracking-wider">Years of warm hospitality</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right — Content */}
          <div className="lg:pl-8">
            <RevealOnScroll direction="right" delay={0.2}>
              <span className="section-subtitle">About Us</span>
              <h2 className="section-title">
                A Legacy of <br />
                <span className="italic text-gold">Warm Hospitality</span>
              </h2>
              <div className="luxury-divider-left" />
              <p className="text-charcoal/60 text-base leading-relaxed mb-6">
                Located at the heart of T. Nagar — Chennai&apos;s most vibrant neighbourhood — Hotel Peninsula 
                has been welcoming guests with warmth and authentic South Indian hospitality since 2005. 
                Just steps from Pondy Bazaar and Ranganathan Street, we offer the perfect blend of 
                comfort, convenience, and genuine care.
              </p>
              <p className="text-charcoal/60 text-base leading-relaxed mb-8">
                Whether you&apos;re here for business meetings, family celebrations, temple visits, or shopping 
                excursions, our dedicated team ensures every stay feels like home. From our signature 
                South Indian breakfast to our attentive 24/7 service, every detail is designed for your comfort.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-navy/70">Prime T. Nagar Location</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Utensils className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-navy/70">Authentic South Indian Dining</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Wifi className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-navy/70">High-Speed WiFi</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Car className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-navy/70">Airport Transfer Service</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-navy/70">24/7 Security & CCTV</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Coffee className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-navy/70">Complimentary Breakfast</span>
                </div>
              </div>

              <Link href="/about" className="btn-gold rounded-full inline-flex items-center gap-2">
                Our Story <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== ROOMS SECTION =====
function RoomsSection() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="section-subtitle">Accommodations</span>
            <h2 className="section-title">
              Comfortable <span className="italic text-gold">Rooms & Suites</span>
            </h2>
            <p className="text-charcoal/50 max-w-2xl mx-auto text-base">
              From well-appointed deluxe rooms to our premium Peninsula Suite, 
              find your perfect retreat in the heart of Chennai.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.filter(r => r.isFeatured).map((room, index) => (
            <RevealOnScroll key={room.id} delay={index * 0.15} direction={index % 2 === 0 ? "left" : "right"}>
              <Link href={`/rooms/${room.slug}`} className="group block">
                <div className="card-luxury rounded-2xl overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[16/10] img-zoom">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Price badge */}
                    <div className="absolute top-4 right-4 glass-dark rounded-full px-4 py-2 text-white">
                      <span className="text-gold font-semibold text-lg">₹{room.price.toLocaleString()}</span>
                      <span className="text-white/50 text-xs"> / night</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-gold/80 font-medium">{room.category}</span>
                      <span className="w-1 h-1 rounded-full bg-gold/40" />
                      <span className="text-[10px] tracking-wider text-navy/40">{room.size}</span>
                    </div>
                    <h3 className="text-xl font-playfair text-navy mb-2 group-hover:text-gold transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-charcoal/50 text-sm leading-relaxed mb-4">
                      {room.shortDescription}
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <span key={amenity} className="text-[10px] tracking-wider text-navy/40 bg-cream rounded-full px-3 py-1">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-navy/40">Up to {room.maxOccupancy} guests · {room.bedType}</span>
                      <span className="text-gold text-xs font-semibold tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/rooms" className="btn-outline-gold rounded-full !border-navy/20 !text-navy hover:!bg-navy hover:!text-white hover:!border-navy inline-flex items-center gap-2">
              View All Rooms <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ===== PARALLAX STATS SECTION =====
function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80"
          alt="Hotel Ambiance"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: 20, suffix: "+", label: "Years of Service" },
            { value: 45, suffix: "", label: "Comfortable Rooms" },
            { value: 15000, suffix: "+", label: "Happy Guests" },
            { value: 4.6, suffix: "★", label: "Guest Rating" },
          ].map((stat, index) => (
            <RevealOnScroll key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-playfair text-gold mb-2">
                  {stat.value === 4.6 ? (
                    <span>{stat.value}{stat.suffix}</span>
                  ) : (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-white/50 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== DINING SECTION =====
function DiningSection() {
  return (
    <section className="py-24 md:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div>
            <RevealOnScroll direction="left">
              <span className="section-subtitle">Dining</span>
              <h2 className="section-title">
                Taste the <span className="italic text-gold">Authentic Flavors</span>
              </h2>
              <div className="luxury-divider-left" />
              <p className="text-charcoal/60 text-base leading-relaxed mb-8">
                From aromatic Chettinad curries to crispy dosas served on banana leaves, 
                our restaurants celebrate the rich culinary heritage of South India. 
                Start your mornings with our signature filter coffee and end your 
                evenings at our rooftop Terrace Café.
              </p>

              <div className="space-y-6 mb-10">
                {diningVenues.map((venue, i) => (
                  <div key={venue.id} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Utensils className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-navy font-semibold text-base mb-0.5">{venue.name}</h4>
                      <p className="text-charcoal/50 text-sm">{venue.shortDescription}</p>
                      <p className="text-gold/70 text-xs mt-1">{venue.operatingHours.split("|")[0].trim()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/dining" className="btn-gold rounded-full inline-flex items-center gap-2">
                View Menu <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </RevealOnScroll>
          </div>

          {/* Right — Images */}
          <RevealOnScroll direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                    alt="Peninsula Restaurant"
                    fill
                    className="object-cover !relative"
                    sizes="25vw"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                    alt="Terrace Café"
                    fill
                    className="object-cover !relative"
                    sizes="25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                    alt="South Indian Cuisine"
                    fill
                    className="object-cover !relative"
                    sizes="25vw"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80"
                    alt="Spice Garden"
                    fill
                    className="object-cover !relative"
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
  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C8A97E' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-1.5z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="section-subtitle">Services</span>
            <h2 className="section-title-white">
              Everything You <span className="italic text-gold">Need</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-base">
              From the moment you arrive, our dedicated team ensures your complete comfort and satisfaction.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RevealOnScroll delay={0} direction="scale">
            <div className="group p-8 rounded-2xl border border-white/5 hover:border-gold/30 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <Wifi className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Free High-Speed WiFi</h3>
              <p className="text-white/40 text-sm leading-relaxed">Stay connected with complimentary WiFi throughout the hotel</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} direction="scale">
            <div className="group p-8 rounded-2xl border border-white/5 hover:border-gold/30 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <Coffee className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Complimentary Breakfast</h3>
              <p className="text-white/40 text-sm leading-relaxed">Start your day with our authentic South Indian breakfast</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2} direction="scale">
            <div className="group p-8 rounded-2xl border border-white/5 hover:border-gold/30 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <Car className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Airport Transfers</h3>
              <p className="text-white/40 text-sm leading-relaxed">Convenient pick-up and drop-off to Chennai International Airport</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3} direction="scale">
            <div className="group p-8 rounded-2xl border border-white/5 hover:border-gold/30 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <Users className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Event & Banquet Halls</h3>
              <p className="text-white/40 text-sm leading-relaxed">Elegant spaces for weddings, conferences, and celebrations</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.4} direction="scale">
            <div className="group p-8 rounded-2xl border border-white/5 hover:border-gold/30 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <Shield className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">24/7 Security</h3>
              <p className="text-white/40 text-sm leading-relaxed">Round-the-clock security with CCTV surveillance for your safety</p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5} direction="scale">
            <div className="group p-8 rounded-2xl border border-white/5 hover:border-gold/30 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">24/7 Front Desk</h3>
              <p className="text-white/40 text-sm leading-relaxed">Our friendly staff is always available to assist you</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ===== TESTIMONIALS SECTION =====
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="section-subtitle">Guest Reviews</span>
            <h2 className="section-title">
              What Our <span className="italic text-gold">Guests Say</span>
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="relative min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-navy/80 leading-relaxed mb-8 font-light italic font-playfair">
                  &ldquo;{testimonials[current].content}&rdquo;
                </blockquote>

                {/* Guest Info */}
                <div>
                  <p className="text-navy font-semibold text-sm">{testimonials[current].guestName}</p>
                  <p className="text-navy/40 text-xs tracking-wider">{testimonials[current].guestTitle}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === current
                    ? "w-8 h-2 bg-gold"
                    : "w-2 h-2 bg-navy/20 hover:bg-gold/50"
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
    <section className="py-24 md:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Map / Image placeholder */}
          <RevealOnScroll direction="left">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream relative">
              <Image
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
                alt="Hotel Peninsula Location"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-navy/30 flex items-center justify-center">
                <div className="glass rounded-2xl px-8 py-6 text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-playfair text-lg">T. Nagar, Chennai</p>
                  <p className="text-white/60 text-xs mt-1">Heart of the City</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Content */}
          <RevealOnScroll direction="right" delay={0.2}>
            <span className="section-subtitle">Location</span>
            <h2 className="section-title">
              In the Heart of <span className="italic text-gold">Chennai</span>
            </h2>
            <div className="luxury-divider-left" />
            <p className="text-charcoal/60 text-base leading-relaxed mb-8">
              Located on the prestigious G. N. Chetty Road in T. Nagar, Hotel Peninsula 
              places you at the center of Chennai&apos;s most popular shopping and cultural district.
            </p>

            <div className="space-y-4 mb-8">
              {hotelInfo.nearbyAttractions.slice(0, 6).map((attraction) => (
                <div key={attraction.name} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-navy/70 text-sm">{attraction.name}</span>
                  <span className="text-gold text-sm font-medium">{attraction.distance}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/contact" className="btn-gold rounded-full inline-flex items-center gap-2">
                Get Directions <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a href={`tel:${hotelInfo.mobile.replace(/[- ]/g, '')}`} className="btn-outline-gold rounded-full !border-navy/20 !text-navy hover:!bg-navy hover:!text-white hover:!border-navy inline-flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> Call Us
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ===== CTA SECTION =====
function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Room"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/80" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <RevealOnScroll>
          <Sparkles className="w-8 h-8 text-gold mx-auto mb-6" />
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
            Ready to Experience
            <br />
            <span className="italic text-gold">True Hospitality?</span>
          </h2>
          <p className="text-white/50 text-base mb-10 max-w-md mx-auto">
            Book direct for the best rates and enjoy complimentary breakfast with every stay.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book" className="btn-gold rounded-full">
              Book Your Stay
            </Link>
            <a
              href={`tel:${hotelInfo.mobile.replace(/[- ]/g, '')}`}
              className="btn-outline-gold rounded-full !border-white/30 !text-white hover:!bg-white hover:!text-navy hover:!border-white inline-flex items-center gap-2"
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
      <DiningSection />
      <ServicesSection />
      <TestimonialsSection />
      <LocationSection />
      <CTASection />
    </main>
  );
}
