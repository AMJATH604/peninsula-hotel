"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

// Logo component — uses the actual hotel brand logo image
// Displayed in a clean rounded container that works on both light and dark backgrounds
function PeninsulaLogo({
  height = 48,
  variant = "auto",
  className = "",
}: {
  height?: number;
  variant?: "light" | "dark" | "auto";
  className?: string;
}) {
  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden rounded-lg ${className}`}
      style={{ height }}
    >
      <Image
        src="/logo.jpg"
        alt="Hotel Peninsula"
        width={Math.round(height * 1)}
        height={height}
        className="object-contain h-full w-auto"
        priority
      />
    </div>
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
        className="fixed top-0 left-0 right-0 h-[2px] scroll-progress z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main Navigation */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
          isScrolled
            ? "top-0 bg-white/95 backdrop-blur-xl shadow-[0_2px_40px_rgba(0,0,0,0.08)] py-2"
            : "top-[32px] bg-transparent py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo — just the brand image, no separate text */}
          <Link href="/" className="group flex-shrink-0">
            <PeninsulaLogo
              height={isScrolled ? 44 : 52}
              className={`transition-all duration-500 ${
                isScrolled
                  ? "bg-transparent"
                  : "bg-white/90 backdrop-blur-sm shadow-sm"
              }`}
            />
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
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <PeninsulaLogo height={40} className="bg-white/90 backdrop-blur-sm" />
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
