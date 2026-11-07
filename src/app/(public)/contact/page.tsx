"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Navigation, CheckCircle2, Loader2 } from "lucide-react";
import { hotelInfo } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
      } else {
        alert(data.error || "Failed to send message");
      }
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80"
          alt="Peninsula Chennai Concierge"
          fill
          priority
          className="object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-4">Concierge & Inquiries</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-[var(--font-playfair)] text-4xl md:text-6xl text-white mb-4">Get In Touch</motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-4" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/80 text-lg font-[var(--font-playfair)] italic">We Are At Your Gracious Service, Day & Night</motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-[var(--font-playfair)] text-2xl text-[#0A1628] mb-2">Send Us a Message</h2>
              <div className="w-12 h-0.5 bg-[#C9A96E] mb-8" />

              {submitted ? (
                <div className="bg-white border border-emerald-200 p-8 text-center rounded-lg shadow-sm">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-[var(--font-playfair)] text-xl text-[#0A1628] mb-2">Message Received</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Thank you for contacting Peninsula Chennai. Our guest relation executive will review your request and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="border border-[#C9A96E] text-[#C9A96E] px-6 py-2.5 text-xs tracking-wider uppercase font-semibold hover:bg-[#C9A96E] hover:text-[#0A1628] transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] bg-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] bg-white"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] bg-white"
                        placeholder="Your phone"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] bg-white"
                      >
                        <option>General Inquiry</option>
                        <option>Reservations</option>
                        <option>Events</option>
                        <option>Dining</option>
                        <option>Spa</option>
                        <option>Corporate</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">Message *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] bg-white resize-none"
                      placeholder="How can we assist you?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase font-semibold hover:shadow-lg hover:shadow-[#C9A96E]/30 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-[var(--font-playfair)] text-2xl text-[#0A1628] mb-2">Contact Information</h2>
              <div className="w-12 h-0.5 bg-[#C9A96E] mb-8" />

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-[#C9A96E]" /></div>
                  <div><p className="font-medium text-[#0A1628] text-sm mb-1">Address</p><p className="text-[#6B6B6B] text-sm">{hotelInfo.address}</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-[#C9A96E]" /></div>
                  <div><p className="font-medium text-[#0A1628] text-sm mb-1">Phone</p><a href={`tel:${hotelInfo.phone}`} className="text-[#6B6B6B] text-sm hover:text-[#C9A96E]">{hotelInfo.phone}</a></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-[#C9A96E]" /></div>
                  <div><p className="font-medium text-[#0A1628] text-sm mb-1">Email</p><a href={`mailto:${hotelInfo.email}`} className="text-[#6B6B6B] text-sm hover:text-[#C9A96E]">{hotelInfo.email}</a></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0"><MessageCircle className="w-5 h-5 text-[#C9A96E]" /></div>
                  <div><p className="font-medium text-[#0A1628] text-sm mb-1">WhatsApp</p><a href={`https://wa.me/${hotelInfo.whatsapp.replace(/\s/g, "")}`} className="text-[#6B6B6B] text-sm hover:text-[#C9A96E]">{hotelInfo.whatsapp}</a></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-[#C9A96E]" /></div>
                  <div><p className="font-medium text-[#0A1628] text-sm mb-1">Check-in / Check-out</p><p className="text-[#6B6B6B] text-sm">{hotelInfo.checkInTime} / {hotelInfo.checkOutTime}</p></div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-[16/10] bg-gradient-to-br from-[#0A1628] to-[#152238] flex items-center justify-center border border-[#C9A96E]/20">
                <div className="text-center">
                  <Navigation className="w-8 h-8 text-[#C9A96E]/30 mx-auto mb-2" />
                  <p className="text-white/30 text-sm">Marina Beach Road, Chennai</p>
                  <p className="text-white/20 text-xs mt-1">Google Maps Embedded View</p>
                </div>
              </div>

              {/* Nearby */}
              <div className="mt-8">
                <h3 className="font-[var(--font-playfair)] text-lg text-[#0A1628] mb-4">Nearby Attractions</h3>
                <div className="space-y-3">
                  {hotelInfo.nearbyAttractions.map((a) => (
                    <div key={a.name} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                      <span className="text-[#0A1628]">{a.name}</span>
                      <span className="text-[#C9A96E] font-medium">{a.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
