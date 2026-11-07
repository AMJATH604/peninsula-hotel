"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";
import { offers } from "@/lib/data";

export default function OffersPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-[#0A1628] via-[#0f2035] to-[#162d4a]">
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4">Special Packages</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-[var(--font-playfair)] text-4xl md:text-6xl text-white mb-4">Exclusive Offers</motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2 aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-[#C9A96E]/20 via-[#C9A96E]/10 to-[#FAF7F2] flex items-center justify-center relative min-h-[250px]">
                  <Award className="w-16 h-16 text-[#C9A96E]/30" />
                  <div className="absolute top-4 right-4 bg-[#C9A96E] text-[#0A1628] px-4 py-2 font-bold text-lg">
                    {offer.discountValue}% OFF
                  </div>
                </div>
                <div className="lg:col-span-3 p-8 md:p-10">
                  <h3 className="font-[var(--font-playfair)] text-2xl md:text-3xl text-[#0A1628] mb-4">{offer.title}</h3>
                  <div className="w-12 h-0.5 bg-[#C9A96E] mb-4" />
                  <p className="text-[#6B6B6B] leading-relaxed mb-6">{offer.description}</p>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs text-[#6B6B6B]">Use code:</span>
                    <code className="bg-[#0A1628] text-[#C9A96E] px-4 py-2 font-mono text-sm tracking-widest">{offer.promoCode}</code>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#9A9A9A] mb-6">
                    <Calendar className="w-3.5 h-3.5" />
                    Valid until {new Date(offer.validTo).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2">Terms & Conditions</p>
                    <ul className="space-y-1">
                      {offer.termsAndConditions.map((t, i) => (
                        <li key={i} className="text-xs text-[#9A9A9A]">• {t}</li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/book" className="inline-block bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold hover:shadow-lg hover:shadow-[#C9A96E]/30 transition-all">
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

