"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Maximize, Check, Send } from "lucide-react";
import { eventVenues } from "@/lib/data";

export default function EventsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", eventType: "Wedding", date: "", guests: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `${formData.eventType} Proposal Request`,
          message: `Event Date: ${formData.date || "TBD"}, Guests: ${formData.guests || "TBD"}\nDetails: ${formData.message}`,
          type: "event",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", eventType: "Wedding", date: "", guests: "", message: "" });
      }
    } catch {
      alert("Failed to submit inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80"
          alt="Peninsula Chennai Events & Weddings"
          fill
          priority
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4">Celebrations & Conferences</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-[var(--font-playfair)] text-4xl md:text-6xl text-white mb-4">Events & Weddings</motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-4" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/80 text-lg font-[var(--font-playfair)] italic">Where Grand Milestones Become Timeless Memories</motion.p>
        </div>
      </section>

      {/* Venues */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl text-[#0A1628] mb-4">Our Venues</h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto mb-4" />
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">From intimate boardroom summits to 800-guest fairy tale weddings, our versatile venues provide the quintessential luxury setting.</p>
          </div>

          <div className="space-y-16">
            {eventVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white border border-gray-100 overflow-hidden shadow-xl rounded-sm group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-[16/10] lg:aspect-auto bg-[#0A1628] overflow-hidden min-h-[320px]">
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 bg-[#C9A96E] text-[#0A1628] px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-semibold shadow-md">
                      Capacity: {venue.capacity}
                    </div>
                  </div>
                  <div className="p-8 md:p-12">
                    <h3 className="font-[var(--font-playfair)] text-2xl md:text-3xl text-[#0A1628] mb-3">{venue.name}</h3>
                    <div className="w-12 h-0.5 bg-[#C9A96E] mb-6" />
                    <p className="text-[#6B6B6B] leading-relaxed mb-6 text-sm md:text-base">{venue.description}</p>
                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                        <Users className="w-4 h-4 text-[#C9A96E]" /> Up to {venue.capacity} guests
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                        <Maximize className="w-4 h-4 text-[#C9A96E]" /> {venue.size}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {venue.features.map((f) => (
                        <span key={f} className="flex items-center gap-1.5 text-xs text-[#0A1628] bg-[#FAF7F2] px-3 py-1.5 border border-gray-100">
                          <Check className="w-3 h-3 text-[#C9A96E]" /> {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {venue.suitableFor.map((s) => (
                        <span key={s} className="text-[10px] tracking-[0.1em] uppercase text-[#0A1628] bg-[#C9A96E]/15 border border-[#C9A96E]/30 px-3 py-1 font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-playfair)] text-3xl text-[#0A1628] mb-4">Request a Proposal</h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto mb-4" />
            <p className="text-[#6B6B6B]">Tell us about your event and our dedicated team will craft a bespoke proposal.</p>
          </div>

          {submitted ? (
            <div className="bg-[#FAF7F2] border border-[#C9A96E]/30 p-8 text-center rounded-lg">
              <p className="text-[#C9A96E] font-semibold text-lg mb-2">Proposal Request Received</p>
              <p className="text-gray-600 text-sm mb-6">Our banquet and events concierge will review your date and requirements and respond with a customized luxury package.</p>
              <button onClick={() => setSubmitted(false)} className="border border-[#C9A96E] text-[#C9A96E] px-6 py-2.5 text-xs tracking-wider uppercase font-semibold hover:bg-[#C9A96E] hover:text-[#0A1628]">Request Another Event</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Full Name *</label>
                  <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors bg-[#FAF7F2]" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Email *</label>
                  <input required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors bg-[#FAF7F2]" placeholder="Your email" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Phone</label>
                  <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="tel" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors bg-[#FAF7F2]" placeholder="Your phone" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Event Type</label>
                  <select value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors bg-[#FAF7F2]">
                    <option>Wedding</option><option>Corporate Gala</option><option>Conference</option><option>Private Celebration</option><option>Product Launch</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Preferred Date</label>
                  <input value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} type="date" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors bg-[#FAF7F2]" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Number of Guests</label>
                  <input value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} type="number" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors bg-[#FAF7F2]" placeholder="Expected guests" />
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Additional Details</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors bg-[#FAF7F2] resize-none" placeholder="Tell us more about your event..." />
              </div>
              <button disabled={loading} type="submit" className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase font-semibold hover:shadow-lg hover:shadow-[#C9A96E]/30 transition-all disabled:opacity-50">
                <Send className="w-4 h-4" /> {loading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

