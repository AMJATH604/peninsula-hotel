"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Rooms & Suites", href: "/rooms" },
  { name: "Dining", href: "/dining" },
  { name: "Spa & Wellness", href: "/spa" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Offers", href: "/offers" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0A1628]/95 backdrop-blur-md shadow-2xl py-3.5 border-b border-[#C9A96E]/25"
            : "bg-gradient-to-b from-[#0A1628]/90 via-[#0A1628]/60 to-transparent backdrop-blur-[4px] py-5 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="text-2xl md:text-3xl font-[var(--font-playfair)] tracking-[0.18em] text-white group-hover:text-[#C9A96E] transition-colors duration-300">
              PENINSULA
            </span>
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A96E] font-medium">
              Chennai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10.5px] xl:text-[11px] tracking-[0.18em] uppercase font-medium text-white/85 hover:text-[#C9A96E] transition-colors duration-300 py-1 border-b border-transparent hover:border-[#C9A96E]/40"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a
              href="tel:+914423456789"
              className="hidden xl:flex items-center gap-2 text-xs tracking-wider text-white/80 hover:text-[#C9A96E] transition-colors duration-300"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
              +91 44 2345 6789
            </a>
            <Link
              href="/book"
              className="bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-5 xl:px-6 py-2.5 text-[10.5px] xl:text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg hover:shadow-[#C9A96E]/40 transition-all duration-300 hover:-translate-y-0.5 rounded-sm"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#C9A96E] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A1628] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-lg tracking-[0.2em] uppercase font-[var(--font-playfair)] hover:text-[#C9A96E] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="/book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-10 py-3 text-sm tracking-[0.2em] uppercase font-semibold"
                >
                  Book Now
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <a
                  href="tel:+914423456789"
                  className="flex items-center gap-2 text-[#C9A96E] text-sm tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  +91 44 2345 6789
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

