import { Room, Booking, Guest, DiningVenue, SpaService, EventVenue, Offer, Testimonial, ContactInquiry } from "@/types";
import { rooms as initialRooms, mockBookings as initialBookings, mockGuests as initialGuests, diningVenues, spaServices, eventVenues, offers as initialOffers, testimonials, hotelInfo } from "./data";
import { generateBookingId } from "./utils";

// Global in-memory storage for development and runtime persistence
declare global {
  // eslint-disable-next-line no-var
  var __peninsulaDb: {
    rooms: Room[];
    bookings: Booking[];
    guests: Guest[];
    offers: Offer[];
    inquiries: ContactInquiry[];
  } | undefined;
}

if (!global.__peninsulaDb) {
  global.__peninsulaDb = {
    rooms: [...initialRooms],
    bookings: [...initialBookings],
    guests: [...initialGuests],
    offers: [...initialOffers],
    inquiries: [],
  };
}

export const db = global.__peninsulaDb;

export function getRooms() {
  return db.rooms;
}

export function getRoomBySlug(slug: string) {
  return db.rooms.find((r) => r.slug === slug);
}

export function addRoom(room: Omit<Room, "id" | "slug">) {
  const id = (db.rooms.length + 1).toString();
  const slug = room.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newRoom: Room = { ...room, id, slug };
  db.rooms.unshift(newRoom);
  return newRoom;
}

export function getBookings() {
  return db.bookings;
}

export function createBooking(data: {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  specialRequests?: string;
  promoCode?: string;
}) {
  const room = db.rooms.find((r) => r.id === data.roomId);
  if (!room) throw new Error("Room not found");

  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  let discountMultiplier = 1;
  if (data.promoCode) {
    const offer = db.offers.find(
      (o) => o.promoCode.toUpperCase() === data.promoCode?.toUpperCase() && o.isActive
    );
    if (offer) {
      discountMultiplier = (100 - offer.discountValue) / 100;
    }
  }

  const roomPrice = room.price;
  const baseTotal = roomPrice * nights * discountMultiplier;
  const taxAmount = baseTotal * 0.18; // 18% GST for luxury hotels
  const totalAmount = Math.round(baseTotal + taxAmount);

  const bookingId = generateBookingId();
  const newBooking: Booking = {
    id: (db.bookings.length + 1).toString(),
    bookingId,
    guestName: data.guestName,
    guestEmail: data.guestEmail,
    guestPhone: data.guestPhone,
    roomId: room.id,
    roomName: room.name,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    adults: data.adults,
    children: data.children,
    nights,
    roomPrice,
    addonsTotal: 0,
    taxAmount,
    totalAmount,
    status: "confirmed",
    specialRequests: data.specialRequests,
    promoCode: data.promoCode,
    paymentStatus: "completed",
    transactionId: `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };

  db.bookings.unshift(newBooking);

  // Update or add guest record
  const existingGuest = db.guests.find((g) => g.email.toLowerCase() === data.guestEmail.toLowerCase());
  if (existingGuest) {
    existingGuest.totalStays += 1;
    existingGuest.totalSpend += totalAmount;
  } else {
    db.guests.unshift({
      id: (db.guests.length + 1).toString(),
      name: data.guestName,
      email: data.guestEmail,
      phone: data.guestPhone,
      country: "India",
      isVIP: totalAmount > 50000,
      totalStays: 1,
      totalSpend: totalAmount,
      createdAt: new Date().toISOString().split("T")[0],
    });
  }

  return newBooking;
}

export function updateBookingStatus(id: string, status: Booking["status"]) {
  const booking = db.bookings.find((b) => b.id === id || b.bookingId === id);
  if (!booking) return null;
  booking.status = status;
  booking.updatedAt = new Date().toISOString().split("T")[0];
  return booking;
}

export function addInquiry(inquiry: Omit<ContactInquiry, "id" | "status" | "createdAt">) {
  const newInquiry: ContactInquiry = {
    ...inquiry,
    id: (db.inquiries.length + 1).toString(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  db.inquiries.unshift(newInquiry);
  return newInquiry;
}

