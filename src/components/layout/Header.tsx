"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Phone, Menu, X, Mail, MapPin } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Dining", href: "/dining" },
  { name: "Spa", href: "/spa" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Offers", href: "/offers" },
  { name: "Contact", href: "/contact" },
];

// SVG Logo component recreated from the visiting card
function PeninsulaLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Diamond shape rotated 45 degrees with wave pattern inside */}
      <g transform="translate(40, 40) rotate(45)">
        <rect x="-28" y="-28" width="56" height="56" rx="4" fill="none" stroke="#C8A97E" strokeWidth="2.5" />
      </g>
      {/* Wave lines inside - representing the Peninsula logo */}
      <g transform="translate(40, 30)">
        <path d="M-14 0 Q-7 -8 0 0 Q7 8 14 0" stroke="#C8A97E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M-14 8 Q-7 0 0 8 Q7 16 14 8" stroke="#C8A97E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M-14 16 Q-7 8 0 16 Q7 24 14 16" stroke="#C8A97E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export { PeninsulaLogo };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar — hidden on scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[55] bg-navy text-white/70 text-[10px] tracking-wider py-2 transition-all duration-500"
        animate={{ y: isScrolled ? -40 : 0, opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-gold" />
              51, G. N. Chetty Road, T. Nagar, Chennai
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-gold" />
              hotelpeninsulachennai@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a href="tel:+914428150001" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="w-3 h-3 text-gold" />
              044-2815 0001
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a href="tel:+919445063232" className="hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors">
              +91-94450 63232
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main Navigation */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
          isScrolled
            ? "top-0 bg-white/95 backdrop-blur-xl shadow-[0_2px_40px_rgba(0,0,0,0.08)] py-3"
            : "top-[32px] bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <PeninsulaLogo size={isScrolled ? 36 : 42} />
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-gold opacity-80">
                Hotel
              </span>
              <span
                className={`text-xl md:text-2xl font-playfair tracking-[0.12em] transition-colors duration-500 ${
                  isScrolled ? "text-navy" : "text-white"
                } group-hover:text-gold`}
              >
                PENINSULA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 rounded-full hover:bg-gold/10 ${
                  isScrolled
                    ? "text-navy/70 hover:text-gold"
                    : "text-white/80 hover:text-gold"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/book"
              className="btn-gold rounded-full !py-2.5 !px-6 !text-[10px]"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-full transition-all duration-300 ${
              isScrolled ? "text-navy hover:bg-gold/10" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[45] bg-navy flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                <PeninsulaLogo size={36} />
                <div className="flex flex-col">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-gold/80">Hotel</span>
                  <span className="text-lg font-playfair tracking-[0.12em] text-white">PENINSULA</span>
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/60 hover:text-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 -mt-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-white text-2xl font-playfair tracking-[0.1em] hover:text-gold transition-colors border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-gold rounded-full w-full text-center"
                >
                  Book Your Stay
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="px-8 pb-8 space-y-3"
            >
              <a href="tel:+914428150001" className="flex items-center gap-2 text-gold/80 text-sm">
                <Phone className="w-4 h-4" /> 044-2815 0001
              </a>
              <a href="mailto:hotelpeninsulachennai@gmail.com" className="flex items-center gap-2 text-white/50 text-sm">
                <Mail className="w-4 h-4" /> hotelpeninsulachennai@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
