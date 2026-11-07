"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { spaServices } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function SpaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80"
          alt="The Peninsula Spa Chennai"
          fill
          priority
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4">Wellness & Rejuvenation</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-[var(--font-playfair)] text-4xl md:text-6xl text-white mb-4">The Peninsula Spa</motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-4" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/80 text-lg font-[var(--font-playfair)] italic">Surrender to Serenity & Vedic Healing</motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Sparkles className="w-8 h-8 text-[#C9A96E] mx-auto mb-6" />
            <p className="text-[#6B6B6B] leading-relaxed text-lg">
              Drawing from ancient Ayurvedic traditions and modern wellness practices, our expert therapists
              guide you on a transformative journey. Featuring 12 treatment rooms, a vitality pool, steam room,
              and a tranquil Zen garden, The Peninsula Spa is your sanctuary of calm amidst the vibrant city.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl text-[#0A1628] mb-4">Our Treatments</h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-[#C9A96E]/40 group rounded-sm"
              >
                <div className="relative aspect-[16/10] bg-[#0A1628] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 bg-[#C9A96E] text-[#0A1628] px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold shadow-md">
                    {service.category}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-[var(--font-playfair)] text-xl text-[#0A1628] mb-3 group-hover:text-[#C9A96E] transition-colors">{service.name}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6 line-clamp-3">{service.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-[#6B6B6B] text-xs">
                      <Clock className="w-4 h-4 text-[#C9A96E]" />
                      {service.duration}
                    </div>
                    <span className="font-[var(--font-playfair)] text-xl text-[#C9A96E] font-medium">{formatCurrency(service.price)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-[var(--font-playfair)] text-3xl text-white mb-4">Begin Your Wellness Journey</h2>
          <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto mb-6" />
          <p className="text-white/70 mb-8">Contact our spa concierge to curate a personalized wellness experience tailored to your needs.</p>
          <Link href="/contact" className="inline-block bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase font-semibold hover:shadow-lg hover:shadow-[#C9A96E]/30 transition-all">
            Book a Treatment
          </Link>
        </div>
      </section>
    </>
  );
}

