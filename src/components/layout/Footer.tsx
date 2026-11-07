"use client";

import Link from "next/link";
import { Globe, Heart, MessageCircle, Play, Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { hotelInfo } from "@/lib/data";

const quickLinks = [
  { name: "Rooms & Suites", href: "/rooms" },
  { name: "Dining", href: "/dining" },
  { name: "Spa & Wellness", href: "/spa" },
  { name: "Events & Weddings", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Offers", href: "/offers" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Gold Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 — About */}
          <div>
            <h3 className="font-[var(--font-playfair)] text-2xl tracking-[0.1em] mb-2">
              PENINSULA
            </h3>
            <span className="text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase block mb-6">
              Chennai
            </span>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Nestled along the iconic Marina Beach, Peninsula Chennai is a
              beacon of refined luxury in South India&apos;s cultural capital.
            </p>
            <div className="flex gap-4">
              <a href={hotelInfo.socialMedia.instagram} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors" aria-label="Instagram">
                <Heart className="w-4 h-4" />
              </a>
              <a href={hotelInfo.socialMedia.facebook} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors" aria-label="Facebook">
                <Globe className="w-4 h-4" />
              </a>
              <a href={hotelInfo.socialMedia.twitter} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors" aria-label="Twitter">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href={hotelInfo.socialMedia.youtube} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors" aria-label="YouTube">
                <Play className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-[var(--font-playfair)] text-lg mb-6">Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-[#C9A96E] transition-colors tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="font-[var(--font-playfair)] text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A96E] mt-1 flex-shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">
                  {hotelInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="text-white/60 text-sm hover:text-[#C9A96E] transition-colors"
                >
                  {hotelInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                <a
                  href={`mailto:${hotelInfo.email}`}
                  className="text-white/60 text-sm hover:text-[#C9A96E] transition-colors"
                >
                  {hotelInfo.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs">
                Check-in: {hotelInfo.checkInTime} | Check-out: {hotelInfo.checkOutTime}
              </p>
            </div>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h4 className="font-[var(--font-playfair)] text-lg mb-6">
              Stay Connected
            </h4>
            <p className="text-white/60 text-sm mb-4">
              Subscribe for exclusive offers, events, and the latest from
              Peninsula Chennai.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
              />
              <button className="bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold hover:shadow-lg hover:shadow-[#C9A96E]/20 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {hotelInfo.awards.slice(0, 4).map((award, i) => (
              <span
                key={i}
                className="text-white/30 text-[10px] tracking-[0.15em] uppercase border border-white/10 px-4 py-2"
              >
                {award}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Peninsula Chennai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/30 text-xs hover:text-[#C9A96E] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/30 text-xs hover:text-[#C9A96E] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/sitemap" className="text-white/30 text-xs hover:text-[#C9A96E] transition-colors">
              Sitemap
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

