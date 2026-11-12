"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  BedDouble,
  CreditCard,
  Check,
  ArrowLeft,
  ArrowRight,
  Shield,
  Loader2,
  CheckCircle2,
  Printer,
  Sparkles,
} from "lucide-react";
import { rooms } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const steps = ["Select Dates", "Choose Room", "Guest Details", "Payment"];

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-navy/40">Loading...</div></div>}>
      <BookingPageContent />
    </Suspense>
  );
}

function BookingPageContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState<number | null>(null);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    roomId: "1",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    promoCode: "",
  });

  // Pre-fill from URL query params (from landing page Check Availability widget)
  useEffect(() => {
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests");
    const roomType = searchParams.get("roomType");

    if (checkIn || checkOut || guests || roomType) {
      setBooking((prev) => ({
        ...prev,
        ...(checkIn && { checkIn }),
        ...(checkOut && { checkOut }),
        ...(guests && { adults: parseInt(guests, 10) || 2 }),
        ...(roomType && { roomId: roomType }),
      }));
    }
  }, [searchParams]);

  const selectedRoom = rooms.find((r) => r.id === booking.roomId) || rooms[0];
  const nights =
    booking.checkIn && booking.checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const baseSubtotal = selectedRoom ? selectedRoom.price * nights : 0;
  const discountMultiplier = promoDiscount ? (100 - promoDiscount) / 100 : 1;
  const subtotal = Math.round(baseSubtotal * discountMultiplier);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleApplyPromo = async () => {
    if (!booking.promoCode.trim()) return;
    setPromoLoading(true);
    setPromoMessage(null);
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: booking.promoCode }),
      });
      const data = await res.json();
      if (data.success) {
        setPromoDiscount(data.offer.discountValue);
        setPromoMessage(`✓ Applied: ${data.offer.discountValue}% discount with ${data.offer.title}`);
      } else {
        setPromoDiscount(null);
        setPromoMessage(data.error || "Invalid promo code");
      }
    } catch {
      setPromoMessage("Unable to validate code at this moment");
    } finally {
      setPromoLoading(false);
    }
  };

  const handleConfirmReservation = async () => {
    if (!booking.name || !booking.email || !booking.phone) {
      alert("Please provide your name, email, and phone number before proceeding.");
      setCurrentStep(2);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: booking.name,
          guestEmail: booking.email,
          guestPhone: booking.phone,
          roomId: selectedRoom.id,
          checkIn: booking.checkIn || new Date().toISOString().split("T")[0],
          checkOut:
            booking.checkOut ||
            new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
          adults: booking.adults,
          children: booking.children,
          specialRequests: booking.specialRequests,
          promoCode: promoDiscount ? booking.promoCode : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmedBooking(data.booking);
      } else {
        alert(data.error || "Failed to finalize reservation. Please try again.");
      }
    } catch {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmedBooking) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#C9A96E]/30 shadow-2xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-2">
              Reservation Confirmed
            </p>
            <h1 className="font-[var(--font-playfair)] text-3xl md:text-5xl text-[#0A1628] mb-4">
              Thank You, {confirmedBooking.guestName.split(" ")[0]}!
            </h1>
            <p className="text-[#6B6B6B] text-sm max-w-lg mx-auto mb-8">
              Your reservation at Peninsula Chennai is confirmed. A receipt and arrival details have
              been dispatched to{" "}
              <strong className="text-[#0A1628]">{confirmedBooking.guestEmail}</strong>.
            </p>

            <div className="bg-[#FAF7F2] border border-gray-100 p-6 rounded-lg text-left mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between pb-3 border-b border-gray-200">
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">Booking ID</span>
                <span className="font-mono text-sm font-bold text-[#C9A96E]">
                  {confirmedBooking.bookingId}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between pb-3 border-b border-gray-200">
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">Room</span>
                <span className="text-sm font-semibold text-[#0A1628]">
                  {confirmedBooking.roomName}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between pb-3 border-b border-gray-200">
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">Dates</span>
                <span className="text-sm text-[#0A1628]">
                  {confirmedBooking.checkIn} → {confirmedBooking.checkOut} ({confirmedBooking.nights}{" "}
                  {confirmedBooking.nights === 1 ? "night" : "nights"})
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between pb-3 border-b border-gray-200">
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">Total Paid</span>
                <span className="font-[var(--font-playfair)] text-xl font-bold text-[#C9A96E]">
                  {formatCurrency(confirmedBooking.totalAmount)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">Transaction ID</span>
                <span className="font-mono text-xs text-gray-500">
                  {confirmedBooking.transactionId}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 border border-[#C9A96E] text-[#C9A96E] px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#C9A96E] hover:text-[#0A1628] transition-all w-full sm:w-auto justify-center"
              >
                <Printer className="w-4 h-4" /> Print Voucher
              </button>
              <Link
                href="/admin/bookings"
                className="bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold hover:shadow-lg transition-all w-full sm:w-auto text-center"
              >
                View in Admin Panel
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-[#0A1628] pt-28 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#C9A96E] text-xs tracking-[0.2em] uppercase mb-6 hover:text-[#D4BC8E]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-[var(--font-playfair)] text-3xl md:text-4xl text-white mb-2">
            Book Your Stay
          </h1>
          <p className="text-white/50 text-sm">
            Complete your reservation at Peninsula Chennai — 5-Star Luxury on Marina Beach
          </p>

          {/* Steps */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wider transition-all ${
                    i === currentStep
                      ? "bg-[#C9A96E] text-[#0A1628] font-semibold"
                      : i < currentStep
                      ? "bg-[#C9A96E]/20 text-[#C9A96E]"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  {i < currentStep ? <Check className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{step}</span>
                </div>
                {i < steps.length - 1 && <div className="w-8 h-px bg-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#FAF7F2] min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 border border-gray-100 shadow-sm"
              >
                {/* Step 1: Dates */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="font-[var(--font-playfair)] text-xl text-[#0A1628] mb-6">
                      Select Your Dates & Guests
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">
                          Check-in Date *
                        </label>
                        <input
                          type="date"
                          value={booking.checkIn}
                          onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
                          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">
                          Check-out Date *
                        </label>
                        <input
                          type="date"
                          value={booking.checkOut}
                          onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
                          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">
                          Adults
                        </label>
                        <select
                          value={booking.adults}
                          onChange={(e) =>
                            setBooking({ ...booking, adults: Number(e.target.value) })
                          }
                          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                              {n} Adult{n > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">
                          Children
                        </label>
                        <select
                          value={booking.children}
                          onChange={(e) =>
                            setBooking({ ...booking, children: Number(e.target.value) })
                          }
                          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                        >
                          {[0, 1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>
                              {n} Child{n !== 1 ? "ren" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Room Selection */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="font-[var(--font-playfair)] text-xl text-[#0A1628] mb-6">
                      Choose Your Suite or Room
                    </h2>
                    <div className="space-y-4">
                      {rooms
                        .filter((r) => r.isAvailable)
                        .map((room) => (
                          <div
                            key={room.id}
                            onClick={() => setBooking({ ...booking, roomId: room.id })}
                            className={`p-4 sm:p-5 border cursor-pointer transition-all rounded-sm flex flex-col sm:flex-row gap-4 items-start ${
                              booking.roomId === room.id
                                ? "border-[#C9A96E] bg-[#C9A96E]/5 shadow-md"
                                : "border-gray-200 hover:border-[#C9A96E]/50"
                            }`}
                          >
                            <div className="relative w-full sm:w-36 h-28 flex-shrink-0 rounded-sm overflow-hidden bg-[#0A1628]">
                              <Image
                                src={room.images[0]}
                                alt={room.name}
                                fill
                                sizes="150px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 w-full">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                    <h3 className="font-[var(--font-playfair)] text-lg text-[#0A1628]">
                                      {room.name}
                                    </h3>
                                    <span className="text-[9px] tracking-[0.15em] uppercase text-[#C9A96E] border border-[#C9A96E]/30 px-2 py-0.5">
                                      {room.category}
                                    </span>
                                  </div>
                                  <p className="text-[#6B6B6B] text-xs sm:text-sm mb-2.5 line-clamp-2">
                                    {room.shortDescription}
                                  </p>
                                  <div className="flex flex-wrap gap-3 text-xs text-[#6B6B6B]">
                                    <span className="flex items-center gap-1">
                                      <BedDouble className="w-3.5 h-3.5 text-[#C9A96E]" />
                                      {room.bedType}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Users className="w-3.5 h-3.5 text-[#C9A96E]" />
                                      Up to {room.maxOccupancy}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="font-[var(--font-playfair)] text-lg sm:text-xl text-[#C9A96E] font-medium">
                                    {formatCurrency(room.price)}
                                  </p>
                                  <p className="text-[#6B6B6B] text-xs">/ night</p>
                                  {booking.roomId === room.id && (
                                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-[#0A1628] bg-[#C9A96E] px-2 py-0.5 font-semibold">
                                      <Check className="w-3 h-3" /> Selected
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Guest Details */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="font-[var(--font-playfair)] text-xl text-[#0A1628] mb-6">
                      Guest Information
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={booking.name}
                          onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                          placeholder="e.g. Vikramaditya Singhania"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={booking.email}
                            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                            placeholder="vikram@luxury.com"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={booking.phone}
                            onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E]"
                            placeholder="+91 98400 12345"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">
                          Special Requests
                        </label>
                        <textarea
                          rows={3}
                          value={booking.specialRequests}
                          onChange={(e) =>
                            setBooking({ ...booking, specialRequests: e.target.value })
                          }
                          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] resize-none"
                          placeholder="High floor, extra feather pillows, airport chauffeur pickup, etc."
                        />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] mb-2 block">
                          Promotional Code
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={booking.promoCode}
                            onChange={(e) =>
                              setBooking({ ...booking, promoCode: e.target.value })
                            }
                            className="flex-1 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] font-mono uppercase"
                            placeholder="e.g. EARLYBIRD25, ROMANCE15"
                          />
                          <button
                            type="button"
                            onClick={handleApplyPromo}
                            disabled={promoLoading}
                            className="border border-[#C9A96E] text-[#C9A96E] px-6 py-3 text-[11px] tracking-[0.15em] uppercase hover:bg-[#C9A96E] hover:text-[#0A1628] transition-all disabled:opacity-50"
                          >
                            {promoLoading ? "Checking..." : "Apply"}
                          </button>
                        </div>
                        {promoMessage && (
                          <p
                            className={`text-xs mt-2 ${
                              promoDiscount ? "text-emerald-600 font-medium" : "text-red-500"
                            }`}
                          >
                            {promoMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Payment */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="font-[var(--font-playfair)] text-xl text-[#0A1628] mb-6">
                      Payment & Confirmation
                    </h2>
                    <div className="bg-[#FAF7F2] border border-gray-100 p-6 mb-6">
                      <h3 className="font-semibold text-[#0A1628] text-sm mb-4">
                        Reservation Breakdown
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#6B6B6B]">Guest</span>
                          <span className="font-medium text-[#0A1628]">{booking.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B6B6B]">Suite / Room</span>
                          <span className="text-[#0A1628]">{selectedRoom?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B6B6B]">Check-in</span>
                          <span className="text-[#0A1628]">{booking.checkIn || "Flexible"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B6B6B]">Check-out</span>
                          <span className="text-[#0A1628]">{booking.checkOut || "Flexible"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B6B6B]">Length of Stay</span>
                          <span className="text-[#0A1628]">
                            {nights} {nights === 1 ? "night" : "nights"}
                          </span>
                        </div>
                        {promoDiscount && (
                          <div className="flex justify-between text-emerald-600 font-medium">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5" /> Promo Discount
                            </span>
                            <span>-{promoDiscount}%</span>
                          </div>
                        )}
                        <div className="border-t border-gray-200 pt-3 flex justify-between">
                          <span className="text-[#6B6B6B]">Subtotal</span>
                          <span className="text-[#0A1628]">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B6B6B]">GST (18% Luxury Hospitality)</span>
                          <span className="text-[#0A1628]">{formatCurrency(tax)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                          <span className="text-[#0A1628]">Total Due</span>
                          <span className="text-[#C9A96E] font-[var(--font-playfair)] text-2xl font-bold">
                            {formatCurrency(total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-[#6B6B6B]">Select Payment Gateway:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          className="p-4 border-2 border-[#C9A96E] bg-[#C9A96E]/5 text-center transition-all"
                        >
                          <CreditCard className="w-6 h-6 text-[#C9A96E] mx-auto mb-2" />
                          <p className="text-sm font-semibold text-[#0A1628]">Razorpay Express</p>
                          <p className="text-xs text-[#6B6B6B]">
                            UPI, Indian Cards, Netbanking, Wallets
                          </p>
                        </button>
                        <button
                          type="button"
                          className="p-4 border border-gray-200 text-center hover:border-[#C9A96E] transition-all"
                        >
                          <CreditCard className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                          <p className="text-sm font-semibold text-[#0A1628]">Stripe Global</p>
                          <p className="text-xs text-[#6B6B6B]">International Amex, Visa, Master</p>
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleConfirmReservation}
                      disabled={loading}
                      className="w-full mt-8 bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] py-4 text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-xl hover:shadow-[#C9A96E]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Processing Reservation...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4" /> Confirm & Pay {formatCurrency(total)}
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-[#9A9A9A] mt-3">
                      🔒 Secured with end-to-end 256-bit SSL encryption
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 text-[11px] tracking-[0.2em] uppercase transition-all ${
                    currentStep === 0
                      ? "text-[#9A9A9A] cursor-not-allowed opacity-50"
                      : "border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A1628]"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
                {currentStep < 3 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#C9A96E] to-[#D4BC8E] text-[#0A1628] px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold hover:shadow-lg hover:shadow-[#C9A96E]/30 transition-all"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 p-6 sticky top-28 shadow-lg rounded-sm">
                <div className="relative aspect-[16/10] w-full mb-4 rounded-sm overflow-hidden bg-[#0A1628]">
                  <Image
                    src={selectedRoom.images[0]}
                    alt={selectedRoom.name}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#C9A96E] text-[#0A1628] text-[9px] px-2 py-0.5 tracking-wider uppercase font-semibold">
                    {selectedRoom.category}
                  </div>
                </div>
                <h3 className="font-[var(--font-playfair)] text-lg text-[#0A1628] mb-1">
                  {selectedRoom.name}
                </h3>
                <div className="w-10 h-0.5 bg-[#C9A96E] mb-5" />

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-[#6B6B6B]">
                    <Calendar className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                    <span>
                      {booking.checkIn ? booking.checkIn : "Select Date"} →{" "}
                      {booking.checkOut ? booking.checkOut : "Select Date"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#6B6B6B]">
                    <Users className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                    <span>
                      {booking.adults} Adults, {booking.children} Children
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#6B6B6B]">
                    <BedDouble className="w-4 h-4 text-[#C9A96E] flex-shrink-0" />
                    <span>{selectedRoom.name}</span>
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-xs text-[#6B6B6B]">
                      <span>
                        Rate ({nights} {nights === 1 ? "night" : "nights"})
                      </span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {promoDiscount && (
                      <div className="flex justify-between text-xs text-emerald-600">
                        <span>Discount ({booking.promoCode})</span>
                        <span>-{promoDiscount}%</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-[#6B6B6B]">
                      <span>GST (18%)</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold">
                      <span className="text-[#0A1628]">Estimated Total</span>
                      <span className="text-[#C9A96E] font-[var(--font-playfair)] text-xl font-bold">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
