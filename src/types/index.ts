// ===== PENINSULA CHENNAI — TYPE DEFINITIONS =====

export interface Room {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  size: string;
  maxOccupancy: number;
  bedType: string;
  floor: string;
  view: string;
  images: string[];
  amenities: string[];
  features: string[];
  isAvailable: boolean;
  isFeatured: boolean;
}

export interface Booking {
  id: string;
  bookingId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  nights: number;
  roomPrice: number;
  addonsTotal: number;
  taxAmount: number;
  totalAmount: number;
  status: BookingStatus;
  specialRequests?: string;
  promoCode?: string;
  paymentMethod?: string;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled"
  | "no_show";

export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded"
  | "partial_refund";

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country: string;
  idProofType?: string;
  idProofNumber?: string;
  isVIP: boolean;
  totalStays: number;
  totalSpend: number;
  notes?: string;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  promoCode: string;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  termsAndConditions: string[];
  applicableRooms: string[];
}

export interface DiningVenue {
  id: string;
  name: string;
  slug: string;
  cuisine: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  operatingHours: string;
  dressCode: string;
  highlights: string[];
  menuUrl?: string;
}

export interface SpaService {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

export interface EventVenue {
  id: string;
  name: string;
  description: string;
  capacity: number;
  size: string;
  image: string;
  images: string[];
  features: string[];
  suitableFor: string[];
}

export interface Testimonial {
  id: string;
  guestName: string;
  guestTitle?: string;
  content: string;
  rating: number;
  date: string;
  avatar?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: GalleryCategory;
  order: number;
}

export type GalleryCategory =
  | "all"
  | "rooms"
  | "dining"
  | "spa"
  | "events"
  | "exterior"
  | "pool"
  | "lobby";

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: "general" | "event" | "dining" | "spa" | "corporate";
  status: "new" | "read" | "replied";
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "manager" | "front_desk" | "marketing";
  avatar?: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalBookings: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  occupancyRate: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalGuests: number;
  averageRating: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

