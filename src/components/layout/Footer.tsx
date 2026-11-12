"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUp, Clock, Heart, Globe, MessageCircle } from "lucide-react";
import { hotelInfo } from "@/lib/data";
import { PeninsulaFullLogo } from "./Header";

const quickLinks = [
  { name: "Rooms & Suites", href: "/rooms" },
  { name: "Dining", href: "/dining" },
  { name: "Spa & Wellness", href: "/spa" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Offers", href: "/offers" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const guestServices = [
  { name: "Book a Room", href: "/book" },
  { name: "Airport Transfer", href: "/contact" },
  { name: "Conference Booking", href: "/events" },
  { name: "Spa Appointment", href: "/spa" },
  { name: "Special Requests", href: "/contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      {/* Top gold line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A97E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <PeninsulaFullLogo size={48} textColor="text-white" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {hotelInfo.description}
            </p>
            <div className="flex gap-3">
              <a href={hotelInfo.socialMedia.instagram} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300" aria-label="Instagram">
                <Heart className="w-4 h-4" />
              </a>
              <a href={hotelInfo.socialMedia.facebook} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300" aria-label="Facebook">
                <Globe className="w-4 h-4" />
              </a>
              <a href={hotelInfo.socialMedia.twitter} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300" aria-label="Twitter">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold font-semibold mb-6">Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-gold hover:pl-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Guest Services */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold font-semibold mb-6">Guest Services</h4>
            <ul className="space-y-3">
              {guestServices.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-gold hover:pl-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Clock className="w-3.5 h-3.5 text-gold/60" />
                Check-in: {hotelInfo.checkInTime} | Check-out: {hotelInfo.checkOutTime}
              </div>
            </div>
          </div>

          {/* Column 4 — Contact Info */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-gold font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed">
                  {hotelInfo.address}
                </span>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold/70 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    {hotelInfo.phoneNumbers.map((num) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/[- ]/g, '')}`}
                        className="text-white/50 text-sm hover:text-gold transition-colors block"
                      >
                        {num}
                      </a>
                    ))}
                    <a
                      href={`tel:${hotelInfo.mobile.replace(/[- ]/g, '')}`}
                      className="text-white/50 text-sm hover:text-gold transition-colors block"
                    >
                      {hotelInfo.mobile} (Mobile)
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold/70 flex-shrink-0" />
                <a
                  href={`mailto:${hotelInfo.email}`}
                  className="text-white/50 text-sm hover:text-gold transition-colors break-all"
                >
                  {hotelInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Hotel Peninsula, Chennai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/30 text-xs hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/30 text-xs hover:text-gold transition-colors">
              Terms & Conditions
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
