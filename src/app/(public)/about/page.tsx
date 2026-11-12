"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Heart, Award, Users, Star, ArrowRight } from "lucide-react";
import { hotelInfo } from "@/lib/data";

function RevealOnScroll({ children, delay = 0, direction = "up", className = "" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "scale"; className?: string;
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
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants[direction]}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const team = [
  { name: "Mr. Suresh Kumar", role: "Managing Director", description: "With 25+ years in hospitality, Mr. Kumar founded Hotel Peninsula with a vision of authentic South Indian warmth." },
  { name: "Mrs. Lakshmi Kumar", role: "Director of Operations", description: "Ensuring every department runs seamlessly, from housekeeping to dining, with attention to detail." },
  { name: "Mr. Rajan Pillai", role: "Head Chef", description: "A culinary veteran specializing in Chettinad and traditional Tamil cuisine for over 15 years." },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80" alt="About Us" fill priority className="object-cover" sizes="100vw" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium mb-4">Our Story</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-playfair text-4xl md:text-6xl text-white font-light">
            About <span className="italic text-gold">Hotel Peninsula</span>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80" alt="Hotel Peninsula" fill className="object-cover" sizes="50vw" />
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.2}>
              <span className="section-subtitle">Since {hotelInfo.yearEstablished}</span>
              <h2 className="section-title">A Legacy of <span className="italic text-gold">Warm Hospitality</span></h2>
              <div className="luxury-divider-left" />
              <div className="space-y-4 text-charcoal/60 text-base leading-relaxed">
                <p>
                  Established in {hotelInfo.yearEstablished}, Hotel Peninsula has been a trusted name in Chennai&apos;s
                  hospitality landscape for over two decades. Located at the prestigious G. N. Chetty Road in
                  T. Nagar — the commercial heart of Chennai — we have served thousands of guests from across
                  India and around the world.
                </p>
                <p>
                  What began as a family dream to offer genuine South Indian hospitality has grown into one of
                  T. Nagar&apos;s most respected hotel establishments. Our commitment remains unchanged: to make
                  every guest feel welcome, comfortable, and cared for.
                </p>
                <p>
                  From business travelers seeking a convenient base to families celebrating milestones, from
                  temple pilgrims to shopping enthusiasts exploring Pondy Bazaar — Hotel Peninsula has been
                  the preferred choice for travelers who value quality, convenience, and warmth.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="section-subtitle">What We Stand For</span>
              <h2 className="section-title">Our <span className="italic text-gold">Values</span></h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <RevealOnScroll delay={0} direction="scale">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                  <Heart className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-playfair text-xl text-navy mb-3">Warm Hospitality</h3>
                <p className="text-charcoal/50 text-sm leading-relaxed">We treat every guest like family, with genuine warmth and personalized care that makes you feel at home.</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1} direction="scale">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                  <Star className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-playfair text-xl text-navy mb-3">Quality & Comfort</h3>
                <p className="text-charcoal/50 text-sm leading-relaxed">Every room, meal, and service is maintained to the highest standards because you deserve nothing less.</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2} direction="scale">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                  <Users className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-playfair text-xl text-navy mb-3">Community First</h3>
                <p className="text-charcoal/50 text-sm leading-relaxed">As a proud T. Nagar establishment, we&apos;re deeply connected to our local community and culture.</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3} direction="scale">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                  <Award className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-playfair text-xl text-navy mb-3">Continuous Excellence</h3>
                <p className="text-charcoal/50 text-sm leading-relaxed">We constantly evolve our services based on guest feedback to deliver better experiences every day.</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="section-subtitle">Leadership</span>
              <h2 className="section-title">Meet Our <span className="italic text-gold">Team</span></h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <RevealOnScroll key={member.name} delay={index * 0.12}>
                <div className="card-luxury rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-playfair text-xl text-navy mb-1">{member.name}</h3>
                  <p className="text-gold text-xs tracking-[0.15em] uppercase font-medium mb-4">{member.role}</p>
                  <p className="text-charcoal/50 text-sm leading-relaxed">{member.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-navy text-center">
        <div className="max-w-4xl mx-auto px-4">
          <RevealOnScroll>
            <span className="section-subtitle">Recognition</span>
            <h2 className="section-title-white mb-12">Awards & <span className="italic text-gold">Accolades</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hotelInfo.awards.map((award, i) => (
                <div key={i} className="border border-white/10 rounded-xl p-5 hover:border-gold/30 transition-colors">
                  <Award className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-white/70 text-sm">{award}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream text-center">
        <RevealOnScroll>
          <h2 className="font-playfair text-3xl md:text-4xl text-navy font-light mb-4">
            Experience Our <span className="italic text-gold">Hospitality</span>
          </h2>
          <p className="text-charcoal/50 mb-8 max-w-md mx-auto text-sm">Book your stay and discover why guests keep coming back.</p>
          <Link href="/book" className="btn-gold rounded-full inline-flex items-center gap-2">
            Book Your Stay <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </RevealOnScroll>
      </section>
    </main>
  );
}
