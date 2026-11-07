"use client";

import { motion } from "framer-motion";
import { Award, Leaf, Users, Heart } from "lucide-react";
import { hotelInfo } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-[#0A1628] via-[#0f2035] to-[#162d4a]">
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4">Our Heritage</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-[var(--font-playfair)] text-4xl md:text-6xl text-white mb-4">Our Story</motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto" />
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl text-[#0A1628] mb-4">A Legacy Born of Vision</h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto mb-8" />
            <p className="text-[#6B6B6B] leading-relaxed text-lg mb-6">
              Peninsula Chennai was born from a singular vision: to create a sanctuary where the rich cultural heritage of Tamil Nadu meets the pinnacle of contemporary luxury. Since opening our doors, we have redefined hospitality in South India.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed text-lg mb-6">
              Situated along the storied Marina Beach — the second longest urban beach in the world — our hotel draws inspiration from the Bay of Bengal&apos;s timeless beauty and Chennai&apos;s vibrant artistic traditions. Every arch, every mosaic, every curated experience reflects the soul of this magnificent city.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed text-lg">
              With {hotelInfo.totalRooms} meticulously designed rooms and suites, four award-winning restaurants, a world-class spa, and event spaces that have hosted royalty and heads of state, Peninsula Chennai stands as a beacon of excellence in the global luxury hospitality landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-playfair)] text-3xl text-[#0A1628] mb-4">Our Pillars</h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Impeccable Service", desc: "Every guest is treated as royalty. Our staff anticipates your every need before you even ask." },
              { icon: Award, title: "Uncompromising Quality", desc: "From the thread count of our linens to the vintage of our wines, we accept nothing less than the finest." },
              { icon: Users, title: "Cultural Authenticity", desc: "We celebrate Tamil Nadu's rich heritage through art, cuisine, and warm South Indian hospitality." },
              { icon: Leaf, title: "Sustainability", desc: "Committed to responsible luxury — solar energy, zero single-use plastics, and local community partnerships." },
            ].map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6">
                <div className="w-16 h-16 bg-[#C9A96E]/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-[#C9A96E]" />
                </div>
                <h3 className="font-[var(--font-playfair)] text-lg text-[#0A1628] mb-3">{value.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-[var(--font-playfair)] text-3xl text-white mb-4">Awards & Accolades</h2>
          <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotelInfo.awards.map((award, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 border border-white/10 p-5 hover:border-[#C9A96E]/30 transition-colors">
                <Award className="w-6 h-6 text-[#C9A96E] flex-shrink-0" />
                <span className="text-white/80 text-sm">{award}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

