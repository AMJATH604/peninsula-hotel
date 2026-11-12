// ===== HOTEL PENINSULA — AUTHENTIC CHENNAI HOTEL DATA =====
// Real hotel data from visiting card + curated content

import { Room, DiningVenue, SpaService, EventVenue, Testimonial, GalleryImage, Offer, DashboardStats, RevenueData, Booking, Guest } from "@/types";

// ===== ROOMS & SUITES =====
export const rooms: Room[] = [
  {
    id: "1",
    name: "Deluxe Room",
    slug: "deluxe-room",
    category: "Deluxe",
    description: "Our thoughtfully designed Deluxe Rooms offer a peaceful retreat in the heart of T. Nagar, Chennai. Featuring elegant furnishings, large windows with city views, and a modern bathroom with rain shower, every detail is curated for comfort and warmth. The room comes with a queen/king-size bed with premium cotton linens, a work desk, and amenities for both leisure and business travelers.",
    shortDescription: "Elegant city-view rooms with modern amenities and warm hospitality",
    price: 3500,
    originalPrice: 4500,
    size: "28 sqm / 301 sq ft",
    maxOccupancy: 2,
    bedType: "King",
    floor: "1st - 3rd Floor",
    view: "City View",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Free Wi-Fi", "Rain Shower", "Mini Bar", "Smart TV", "Room Service", "Safe", "Air Conditioning", "Complimentary Water"],
    features: ["City View", "Modern Bathroom", "Premium Cotton Linens", "Tea/Coffee Maker", "Pillow Menu"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Premier Room",
    slug: "premier-room",
    category: "Premier",
    description: "The Premier Room at Hotel Peninsula elevates your stay with spacious layouts and premium amenities. Each room features handpicked furniture, a comfortable sitting area, and a well-appointed bathroom with both shower and bathtub. Thoughtful touches like a curated minibar, bluetooth speaker, and attentive room service ensure a memorable experience in the heart of Chennai's shopping capital.",
    shortDescription: "Spacious rooms with premium amenities and separate sitting area",
    price: 5500,
    originalPrice: 7000,
    size: "38 sqm / 409 sq ft",
    maxOccupancy: 3,
    bedType: "King / Twin",
    floor: "2nd - 4th Floor",
    view: "City View",
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Free Wi-Fi", "Rain Shower", "Bathtub", "Mini Bar", "Smart TV", "Bluetooth Speaker", "Room Service", "Safe", "Air Conditioning", "Ironing Service"],
    features: ["City View", "Bathtub & Shower", "Sitting Area", "Bluetooth Speaker", "Evening Turndown"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Executive Suite",
    slug: "executive-suite",
    category: "Suite",
    description: "The Executive Suite offers refined living with a separate living room and bedroom connected by elegant sliding doors. Large windows bring in natural light, while the interiors showcase tasteful South Indian-inspired décor and quality furnishings. A dedicated work area, sitting space, and a bathroom with separate shower and soaking tub make this ideal for extended stays and discerning travelers visiting Chennai.",
    shortDescription: "Luxurious suite with separate living room and premium furnishings",
    price: 8500,
    originalPrice: 11000,
    size: "52 sqm / 560 sq ft",
    maxOccupancy: 3,
    bedType: "King",
    floor: "3rd - 5th Floor",
    view: "City View",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Free Wi-Fi", "Rain Shower", "Soaking Tub", "Mini Bar", "Smart TV", "Bluetooth Speaker", "24/7 Room Service", "Safe", "Air Conditioning", "Tea/Coffee Maker", "Complimentary Breakfast"],
    features: ["Separate Living Room", "Premium Furnishings", "Soaking Tub", "South Indian Décor", "Walk-in Closet"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Peninsula Suite",
    slug: "peninsula-suite",
    category: "Suite",
    description: "The Peninsula Suite is our finest accommodation, offering an expansive living experience in the heart of T. Nagar. This premium suite features a grand living room, a private dining area, a master bedroom with premium bedding, and a luxurious bathroom with jacuzzi. Personalized butler service, complimentary airport transfers, and all-inclusive dining make every moment extraordinary at Hotel Peninsula.",
    shortDescription: "Our finest suite — private dining, jacuzzi, butler service & all-inclusive",
    price: 15000,
    originalPrice: 20000,
    size: "80 sqm / 861 sq ft",
    maxOccupancy: 4,
    bedType: "King",
    floor: "Top Floor",
    view: "Premium City View",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Free Wi-Fi", "Rain Shower", "Jacuzzi", "Full Mini Bar", "Smart TV", "Bluetooth Speaker", "24/7 Butler Service", "Room Service", "Safe", "Climate Control", "Tea/Coffee Maker", "All Meals Included", "Airport Transfer"],
    features: ["Premium City View", "Private Dining Area", "Grand Living Room", "Jacuzzi", "Butler Service", "All-Inclusive"],
    isAvailable: true,
    isFeatured: true,
  },
];

// ===== DINING =====
export const diningVenues: DiningVenue[] = [
  {
    id: "1",
    name: "Peninsula Restaurant",
    slug: "peninsula-restaurant",
    cuisine: "South Indian & Multi-Cuisine",
    description: "Our signature restaurant celebrates the rich culinary heritage of Tamil Nadu with a contemporary touch. From authentic Chettinad specialties to North Indian favourites and international dishes, our experienced chefs craft every meal with passion. The warm, inviting ambiance makes it perfect for family dinners, business lunches, and intimate celebrations.",
    shortDescription: "Authentic South Indian & multi-cuisine dining experience",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    ],
    operatingHours: "Breakfast: 7:00 AM – 10:30 AM | Lunch: 12:30 PM – 3:00 PM | Dinner: 7:00 PM – 11:00 PM",
    dressCode: "Smart Casual",
    highlights: ["Chettinad Specialties", "Live Cooking Stations", "Business Lunch Menu", "Family-Friendly", "Private Dining Available"],
  },
  {
    id: "2",
    name: "Spice Garden",
    slug: "spice-garden",
    cuisine: "Traditional Tamil & Andhra",
    description: "Spice Garden brings the authentic flavors of South India to your plate. Specializing in traditional Tamil cuisine and Andhra delicacies, our chefs use time-honored recipes passed down through generations. From crispy dosas to aromatic biryanis, every dish is a celebration of regional flavors, freshly ground spices, and wholesome ingredients.",
    shortDescription: "Traditional Tamil & Andhra cuisine with authentic flavors",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1200&q=80",
    ],
    operatingHours: "Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 11:00 PM",
    dressCode: "Casual",
    highlights: ["Authentic Dosas", "Chettinad Biryani", "Fresh Ground Spices", "Banana Leaf Meals", "Regional Desserts"],
  },
  {
    id: "3",
    name: "The Terrace Café",
    slug: "the-terrace-cafe",
    cuisine: "Continental & Beverages",
    description: "A relaxed rooftop café offering continental breakfast, fresh juices, artisanal coffees, and light meals throughout the day. The Terrace Café is perfect for a morning start with filter coffee, an afternoon snack, or an evening wind-down. Enjoy the breezy Chennai atmosphere while savoring our curated selection of beverages and bites.",
    shortDescription: "Rooftop café with continental fare, filter coffee & city views",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    ],
    operatingHours: "7:00 AM – 10:00 PM",
    dressCode: "Casual",
    highlights: ["Filter Coffee", "Fresh Juices", "Continental Breakfast", "Evening Snacks", "City Views"],
  },
];

// ===== SPA =====
export const spaServices: SpaService[] = [
  { id: "1", name: "Traditional Ayurvedic Massage", category: "Massage", description: "A rejuvenating full-body massage using warm herbal oils, combining traditional Ayurvedic techniques for deep relaxation and wellness.", duration: "60 min", price: 3000, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" },
  { id: "2", name: "Deep Tissue Therapy", category: "Massage", description: "Targeted deep tissue work to relieve muscle tension, improve circulation, and restore mobility. Ideal for travelers and desk workers.", duration: "75 min", price: 3500, image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80" },
  { id: "3", name: "Herbal Facial Treatment", category: "Facial", description: "A nourishing facial using natural herbal products to cleanse, exfoliate, and hydrate your skin, leaving it refreshed and glowing.", duration: "45 min", price: 2500, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" },
  { id: "4", name: "Couple's Wellness Package", category: "Couples", description: "Share a blissful experience in our private couple's room. Includes dual massages, aromatic oil therapy, and refreshments.", duration: "90 min", price: 6000, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80" },
  { id: "5", name: "Stress Relief Package", category: "Wellness", description: "A holistic wellness journey including aromatherapy massage, hot stone therapy, and a calming head massage.", duration: "120 min", price: 5000, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80" },
];

// ===== EVENTS =====
export const eventVenues: EventVenue[] = [
  {
    id: "1",
    name: "The Peninsula Banquet Hall",
    description: "Our elegant banquet hall is perfect for weddings, receptions, and grand celebrations. With beautiful décor, professional event management, and customizable catering, we ensure every event is memorable. Located in the heart of T. Nagar, it's easily accessible for all your guests.",
    capacity: 300,
    size: "350 sqm / 3767 sq ft",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["Elegant Décor", "Professional Sound System", "Customizable Lighting", "Catering Service", "Valet Parking", "Event Coordinator"],
    suitableFor: ["Weddings", "Receptions", "Anniversary Celebrations", "Corporate Events"],
  },
  {
    id: "2",
    name: "The Conference Room",
    description: "A professional conference room equipped with modern AV technology, comfortable seating, and a dedicated support team. Perfect for corporate meetings, seminars, and training sessions in a prime T. Nagar location.",
    capacity: 50,
    size: "60 sqm / 645 sq ft",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"],
    features: ["Projector & Screen", "Video Conferencing", "Whiteboard", "High-Speed Wi-Fi", "Tea/Coffee Service", "Soundproofed"],
    suitableFor: ["Board Meetings", "Seminars", "Training Sessions", "Product Launches"],
  },
];

// ===== TESTIMONIALS =====
export const testimonials: Testimonial[] = [
  { id: "1", guestName: "Rajesh Krishnamurthy", guestTitle: "Business Traveler, Bangalore", content: "Hotel Peninsula has become my regular stay whenever I visit Chennai for business. The rooms are spotless, the staff is incredibly welcoming, and the location in T. Nagar is unbeatable — everything is within reach. Truly a home away from home.", rating: 5, date: "2026-09-15" },
  { id: "2", guestName: "Priya & Karthik", guestTitle: "Family from Coimbatore", content: "We stayed here during our family trip to Chennai and absolutely loved it. The rooms were spacious and comfortable, the restaurant served authentic home-style food, and the staff went above and beyond for our children. Will definitely come back!", rating: 5, date: "2026-08-22" },
  { id: "3", guestName: "Ananya Sharma", guestTitle: "Tourist from Delhi", content: "Great location right in T. Nagar — perfect for shopping and sightseeing. The hotel is clean, well-maintained, and the staff speaks multiple languages which was very helpful. The rooftop café was a lovely surprise!", rating: 5, date: "2026-10-01" },
  { id: "4", guestName: "James & Emily Park", guestTitle: "Travelers from Sydney", content: "We chose Hotel Peninsula for our Chennai leg and it was a wonderful decision. The warm hospitality, delicious South Indian breakfast, and the convenient location made our stay perfect. Highly recommended!", rating: 5, date: "2026-07-10" },
  { id: "5", guestName: "Dr. Vikram Patel", guestTitle: "Medical Conference Attendee", content: "Hosted our regional medical seminar at the conference room — excellent AV setup and the team managed everything professionally. The rooms were comfortable after long conference days. Great value for money.", rating: 5, date: "2026-06-18" },
];

// ===== GALLERY =====
export const galleryImages: GalleryImage[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80", alt: "Hotel Peninsula Exterior - T. Nagar, Chennai", category: "exterior", order: 1 },
  { id: "2", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", alt: "Welcoming Hotel Lobby", category: "lobby", order: 2 },
  { id: "3", url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", alt: "Deluxe Room with Premium Furnishings", category: "rooms", order: 3 },
  { id: "4", url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80", alt: "Peninsula Suite - Grand Living Room", category: "rooms", order: 4 },
  { id: "5", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80", alt: "Peninsula Restaurant - Fine Dining", category: "dining", order: 5 },
  { id: "6", url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80", alt: "Spice Garden - Traditional Dining", category: "dining", order: 6 },
  { id: "7", url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", alt: "Spa Treatment Room", category: "spa", order: 7 },
  { id: "8", url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80", alt: "Peninsula Banquet Hall - Wedding Setup", category: "events", order: 8 },
  { id: "9", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80", alt: "Hotel Grounds & Garden", category: "exterior", order: 9 },
  { id: "10", url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80", alt: "Hotel Corridor & Architecture", category: "lobby", order: 10 },
];

// ===== OFFERS =====
export const offers: Offer[] = [
  {
    id: "1",
    title: "Early Bird Offer",
    slug: "early-bird-offer",
    description: "Plan ahead and save! Book 15 days in advance and enjoy 20% off our best available rates. Includes complimentary breakfast for two guests.",
    shortDescription: "Book 15 days ahead, save 20% + free breakfast",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    discountType: "percentage",
    discountValue: 20,
    promoCode: "EARLYBIRD20",
    validFrom: "2026-01-01",
    validTo: "2027-03-31",
    isActive: true,
    termsAndConditions: ["Non-refundable", "Book minimum 15 days in advance", "Subject to availability"],
    applicableRooms: ["1", "2", "3"],
  },
  {
    id: "2",
    title: "Weekend Getaway",
    slug: "weekend-getaway",
    description: "Make your weekends special with our all-inclusive package. Two nights in a Premier Room, complimentary breakfast and dinner, and late checkout until 2 PM.",
    shortDescription: "2 nights all-inclusive with meals & late checkout",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    discountType: "percentage",
    discountValue: 15,
    promoCode: "WEEKEND15",
    validFrom: "2026-01-01",
    validTo: "2027-12-31",
    isActive: true,
    termsAndConditions: ["Friday to Sunday only", "Minimum 2-night stay", "Includes buffet meals"],
    applicableRooms: ["2", "3"],
  },
  {
    id: "3",
    title: "Business Traveler Special",
    slug: "business-traveler-special",
    description: "Designed for professionals — enjoy complimentary high-speed Wi-Fi, airport pickup, express laundry, and access to our conference room facilities.",
    shortDescription: "Airport pickup + express laundry + conference access",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    discountType: "percentage",
    discountValue: 10,
    promoCode: "BUSINESS10",
    validFrom: "2026-01-01",
    validTo: "2027-06-30",
    isActive: true,
    termsAndConditions: ["Weekday stays only (Mon-Thu)", "Minimum 2-night stay", "Valid ID required"],
    applicableRooms: ["1", "2", "3"],
  },
];

// ===== DASHBOARD STATS (MOCK) =====
export const dashboardStats: DashboardStats = {
  totalBookings: 487,
  todayCheckIns: 6,
  todayCheckOuts: 4,
  occupancyRate: 72,
  totalRevenue: 4500000,
  monthlyRevenue: 750000,
  totalGuests: 1250,
  averageRating: 4.6,
};

export const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 520000, bookings: 42 },
  { month: "Feb", revenue: 610000, bookings: 48 },
  { month: "Mar", revenue: 700000, bookings: 55 },
  { month: "Apr", revenue: 580000, bookings: 46 },
  { month: "May", revenue: 490000, bookings: 38 },
  { month: "Jun", revenue: 650000, bookings: 52 },
  { month: "Jul", revenue: 730000, bookings: 58 },
  { month: "Aug", revenue: 680000, bookings: 54 },
  { month: "Sep", revenue: 750000, bookings: 60 },
  { month: "Oct", revenue: 820000, bookings: 65 },
  { month: "Nov", revenue: 770000, bookings: 62 },
  { month: "Dec", revenue: 900000, bookings: 72 },
];

// ===== MOCK BOOKINGS =====
export const mockBookings: Booking[] = [
  {
    id: "1", bookingId: "PEN-A1B2C3-X9Y8", guestName: "Arjun Reddy", guestEmail: "arjun@email.com", guestPhone: "+91 98765 43210",
    roomId: "3", roomName: "Executive Suite", checkIn: "2026-11-05", checkOut: "2026-11-08", adults: 2, children: 0, nights: 3,
    roomPrice: 8500, addonsTotal: 2000, taxAmount: 5670, totalAmount: 33170, status: "confirmed", paymentStatus: "completed",
    transactionId: "TXN-001", specialRequests: "High floor, extra pillows", createdAt: "2026-10-28", updatedAt: "2026-10-28",
  },
  {
    id: "2", bookingId: "PEN-D4E5F6-Z1W2", guestName: "Priya Nair", guestEmail: "priya@email.com", guestPhone: "+91 87654 32109",
    roomId: "1", roomName: "Deluxe Room", checkIn: "2026-11-03", checkOut: "2026-11-05", adults: 2, children: 1, nights: 2,
    roomPrice: 3500, addonsTotal: 500, taxAmount: 1350, totalAmount: 8850, status: "checked_in", paymentStatus: "completed",
    transactionId: "TXN-002", createdAt: "2026-10-30", updatedAt: "2026-11-03",
  },
  {
    id: "3", bookingId: "PEN-G7H8I9-V3U4", guestName: "Michael Chen", guestEmail: "michael@email.com", guestPhone: "+65 9123 4567",
    roomId: "4", roomName: "Peninsula Suite", checkIn: "2026-11-10", checkOut: "2026-11-14", adults: 2, children: 0, nights: 4,
    roomPrice: 15000, addonsTotal: 3000, taxAmount: 12960, totalAmount: 75960, status: "confirmed", paymentStatus: "completed",
    transactionId: "TXN-003", specialRequests: "Anniversary celebration, arrange flowers", createdAt: "2026-10-15", updatedAt: "2026-10-15",
  },
  {
    id: "4", bookingId: "PEN-J1K2L3-T5S6", guestName: "Deepa Venkatesh", guestEmail: "deepa@email.com", guestPhone: "+91 76543 21098",
    roomId: "2", roomName: "Premier Room", checkIn: "2026-11-06", checkOut: "2026-11-07", adults: 1, children: 0, nights: 1,
    roomPrice: 5500, addonsTotal: 0, taxAmount: 990, totalAmount: 6490, status: "pending", paymentStatus: "pending",
    promoCode: "EARLYBIRD20", createdAt: "2026-11-02", updatedAt: "2026-11-02",
  },
  {
    id: "5", bookingId: "PEN-M4N5O6-R7Q8", guestName: "Robert Williams", guestEmail: "robert@email.com", guestPhone: "+1 555 123 4567",
    roomId: "3", roomName: "Executive Suite", checkIn: "2026-11-01", checkOut: "2026-11-03", adults: 2, children: 2, nights: 2,
    roomPrice: 8500, addonsTotal: 2000, taxAmount: 3420, totalAmount: 22420, status: "checked_out", paymentStatus: "completed",
    transactionId: "TXN-005", createdAt: "2026-10-20", updatedAt: "2026-11-03",
  },
];

// ===== MOCK GUESTS =====
export const mockGuests: Guest[] = [
  { id: "1", name: "Arjun Reddy", email: "arjun@email.com", phone: "+91 98765 43210", country: "India", city: "Hyderabad", isVIP: true, totalStays: 5, totalSpend: 150000, createdAt: "2025-06-15" },
  { id: "2", name: "Priya Nair", email: "priya@email.com", phone: "+91 87654 32109", country: "India", city: "Mumbai", isVIP: false, totalStays: 2, totalSpend: 18000, createdAt: "2026-03-20" },
  { id: "3", name: "Michael Chen", email: "michael@email.com", phone: "+65 9123 4567", country: "Singapore", city: "Singapore", isVIP: true, totalStays: 8, totalSpend: 250000, createdAt: "2024-11-10" },
  { id: "4", name: "Deepa Venkatesh", email: "deepa@email.com", phone: "+91 76543 21098", country: "India", city: "Chennai", isVIP: false, totalStays: 1, totalSpend: 6490, createdAt: "2026-11-02" },
  { id: "5", name: "Robert Williams", email: "robert@email.com", phone: "+1 555 123 4567", country: "USA", city: "New York", isVIP: true, totalStays: 3, totalSpend: 80000, createdAt: "2025-12-01" },
  { id: "6", name: "Lakshmi Sundaram", email: "lakshmi@email.com", phone: "+91 99887 76655", country: "India", city: "Bangalore", isVIP: false, totalStays: 4, totalSpend: 52000, createdAt: "2025-08-15" },
];

// ===== HOTEL INFO =====
export const hotelInfo = {
  name: "Hotel Peninsula",
  tagline: "Your Home Away From Home in Chennai",
  description: "Located in the vibrant heart of T. Nagar, Hotel Peninsula offers warm hospitality, modern comfort, and authentic South Indian experiences. Whether you're visiting Chennai for business, family, or leisure, we ensure every stay is memorable.",
  address: "51, G. N. Chetty Road, T. Nagar, Chennai - 600 017",
  phone: "044-2815 0001",
  phoneNumbers: ["044-2815 0001", "044-2815 0002", "044-2815 0003"],
  mobile: "+91-94450 63232",
  email: "hotelpeninsulachennai@gmail.com",
  whatsapp: "+91-94450 63232",
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  totalRooms: 45,
  yearEstablished: 2005,
  awards: [
    "TripAdvisor Travelers' Choice 2025",
    "Booking.com Guest Review Award 2024",
    "Best Budget Hotel — T. Nagar 2025",
    "Hospitality Excellence Award 2024",
  ],
  nearbyAttractions: [
    { name: "Pondy Bazaar (T. Nagar Shopping)", distance: "0.5 km" },
    { name: "Ranganathan Street", distance: "0.8 km" },
    { name: "Kapaleeshwarar Temple, Mylapore", distance: "3.0 km" },
    { name: "Marina Beach", distance: "5.0 km" },
    { name: "Valluvar Kottam", distance: "1.5 km" },
    { name: "Chennai Mambalam Railway Station", distance: "1.2 km" },
    { name: "Chennai International Airport", distance: "14 km" },
    { name: "Chennai Central Railway Station", distance: "7 km" },
  ],
  socialMedia: {
    instagram: "https://instagram.com/hotelpeninsula",
    facebook: "https://facebook.com/hotelpeninsulachennai",
    twitter: "https://twitter.com/hotelpeninsula",
    youtube: "https://youtube.com/hotelpeninsula",
  },
};
