# 🏨 Peninsula Chennai — Luxury Hotel Website & Admin Panel

A dynamic, 7-star luxury hotel digital experience and hotel management dashboard built for **Peninsula Chennai** (Marina Beach Road, Chennai). Designed with high-end Silicon Valley engineering practices and inspired by the world's most prestigious hospitality brands like The Peninsula Hotels, Taj Hotels, Aman, and Four Seasons.

---

## 🌟 Tech Stack (Silicon Valley Grade)

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Server Components & Dynamic API Routes)
- **Language**: TypeScript (Type-safe domain models for rooms, bookings, guests, and finances)
- **Styling**: Tailwind CSS & Luxury Design System (`#0A1628` Deep Navy, `#C9A96E` Champagne Gold, `#FAF7F2` Pearl White)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth staggered reveals, entrance choreographies, subtle parallax)
- **Icons**: [Lucide React](https://lucide.dev)
- **State & Data Store**: Next.js In-Memory & Modular Store (`src/lib/store.ts`) with seamless plug-in compatibility for PostgreSQL / Supabase
- **Payments Ready**: Dual architecture for **Razorpay** (India UPI/Cards) and **Stripe** (International)

---

## 🧭 Application Structure & URLs

### 🌐 Public Guest-Facing Experience
| URL | Description |
|---|---|
| `/` | **Grand Hero & Showcase**: Floating booking engine, featured suites, culinary highlights, spa teaser, guest testimonials, and live statistics counter. |
| `/rooms` | **Suites & Accommodation**: Interactive category filters (Deluxe, Premier, Suite), dimensions, occupancy, bed types, and pricing. |
| `/rooms/[slug]` | **Suite Detail View**: High-resolution gallery preview, architectural features, amenities checklist, and booking sidebar. |
| `/dining` | **Culinary Venues**: Showcasing *The Marina* (Modern Indian), *Jade Palace* (Pan-Asian), *The Verandah*, and *The Whiskey Lounge*. |
| `/spa` | **The Peninsula Spa**: Full wellness menu, Ayurvedic treatments, duration, pricing, and appointment inquiries. |
| `/events` | **Celebrations & Galas**: Grand Ballroom, Garden Pavilion, and interactive RFQ / Event Proposal form. |
| `/gallery` | **Visual Portfolio**: Masonry layout with category filtering across exterior, lobby, suites, pools, and dining. |
| `/offers` | **Exclusive Packages**: Early Bird, Romance Package, Weekend Escapes with interactive promo code copy. |
| `/contact` | **Concierge & Location**: Live contact form submitting to API, nearby landmark distances, and hotel details. |
| `/book` | **4-Step Booking Engine**: Date selection, suite choice, guest info, live promo code validation, and instant confirmation voucher with print/export. |

---

### 👑 Hotel Admin Panel
Access all administrative controls via `/admin`:

| URL | Module & Capabilities |
|---|---|
| `/admin` | **Executive Dashboard**: Daily check-ins/outs, occupancy gauge, monthly revenue visualizer, and recent bookings. |
| `/admin/rooms` | **Suite Management**: Live inventory table, modal to add new suites with real-time API persistence, and room status toggling. |
| `/admin/bookings` | **Reservations Desk**: Real-time status updates (Check In, Check Out, Cancel), guest search, and one-click **CSV export**. |
| `/admin/guests` | **Guest Database**: VIP tagging, lifetime spend analytics, repeat visitor tracking, and contact details. |
| `/admin/content` | **Mini-CMS**: Manage homepage hero copy, dining menus, spa services, and photo gallery uploads. |
| `/admin/finance` | **Financial Analytics**: Monthly turnover breakdowns, average revenue per reservation, GST calculations, and transaction logs. |
| `/admin/offers` | **Promotions & Promo Codes**: Manage discount rates, code validity dates, and active/inactive states. |
| `/admin/reviews` | **Feedback Moderation**: Review moderation (approve/reject), ratings breakdown, and guest response tools. |
| `/admin/settings` | **Hotel Configuration**: GSTIN, check-in/out hours, Razorpay & Stripe API keys, policies, and staff access roles. |

---

## 🚀 Getting Started

### 1. Installation
Dependencies are already installed. If running in a new environment:
```bash
npm install
```

### 2. Development Mode
Run the local dev server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** for the public site, or **[http://localhost:3000/admin](http://localhost:3000/admin)** for the Admin Panel.

### 3. Production Build & Start
```bash
npm run build
npm run start
```

---

## 🛠️ Customizing for the Hotel (Client Handover)

1. **Hotel Imagery**:
   - Place official high-resolution photographs into `public/images/rooms/`, `public/images/dining/`, and `public/images/gallery/`.
   - Update image links in `src/lib/data.ts` or upload directly from the Admin Panel (`/admin/content`).

2. **Payment Credentials**:
   - Enter your live **Razorpay** and **Stripe** API keys in `/admin/settings` or add them to `.env.local`:
     ```env
     RAZORPAY_KEY_ID="rzp_live_..."
     RAZORPAY_KEY_SECRET="..."
     STRIPE_PUBLIC_KEY="pk_live_..."
     STRIPE_SECRET_KEY="sk_live_..."
     ```

3. **Database Integration (When scaling beyond local store)**:
   - Connect Supabase or Neon PostgreSQL by providing `DATABASE_URL` in `.env.local` and running `npx prisma db push`.
