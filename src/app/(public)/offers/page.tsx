"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Tag, Calendar, ArrowRight, Copy, Check } from "lucide-react";
import { offers } from "@/lib/data";
import { useState } from "react";

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

function PromoCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 text-sm text-gold font-mono hover:bg-gold/20 transition-colors">
      {code}
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function OffersPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2000&q=80" alt="Offers" fill priority className="object-cover" sizes="100vw" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium mb-4">Special</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-playfair text-4xl md:text-6xl text-white font-light">
            Offers & <span className="italic text-gold">Packages</span>
          </motion.h1>
        </div>
      </section>

      {/* Offers */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-charcoal/50 max-w-2xl mx-auto text-base">
                Take advantage of our exclusive offers and packages for the best value on your stay at Hotel Peninsula.
              </p>
            </div>
          </RevealOnScroll>

          <div className="space-y-12">
            {offers.filter(o => o.isActive).map((offer, index) => (
              <RevealOnScroll key={offer.id} delay={index * 0.15}>
                <div className="card-luxury rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[16/10] lg:aspect-auto img-zoom">
                      <Image src={offer.image} alt={offer.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      <div className="absolute top-4 left-4 bg-gold text-navy rounded-full px-4 py-1.5 text-sm font-bold">
                        {offer.discountValue}% OFF
                      </div>
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <h3 className="font-playfair text-2xl md:text-3xl text-navy mb-3">{offer.title}</h3>
                      <div className="luxury-divider-left" />
                      <p className="text-charcoal/60 text-base leading-relaxed mb-6">{offer.description}</p>

                      <div className="flex items-center gap-4 mb-6 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-gold" />
                          <span className="text-sm text-navy/60">Promo Code:</span>
                        </div>
                        <PromoCodeButton code={offer.promoCode} />
                      </div>

                      <div className="flex items-center gap-2 text-xs text-navy/40 mb-6">
                        <Calendar className="w-3.5 h-3.5" />
                        Valid: {new Date(offer.validFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} — {new Date(offer.validTo).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>

                      {offer.termsAndConditions && (
                        <div className="text-[10px] text-navy/30 mb-6">
                          T&C: {offer.termsAndConditions.join(" • ")}
                        </div>
                      )}

                      <Link href="/book" className="btn-gold rounded-full self-start inline-flex items-center gap-2">
                        Book with Offer <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
