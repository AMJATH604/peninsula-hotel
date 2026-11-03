import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Peninsula Chennai | Luxury 5-Star Hotel on Marina Beach",
    template: "%s | Peninsula Chennai",
  },
  description:
    "Experience unparalleled luxury at Peninsula Chennai, a prestigious 5-star hotel on Marina Beach. World-class dining, award-winning spa, magnificent event venues, and impeccable service await you.",
  keywords: [
    "luxury hotel Chennai",
    "5 star hotel Marina Beach",
    "Peninsula Chennai",
    "premium hotel Tamil Nadu",
    "luxury accommodation Chennai",
    "best hotel Chennai",
    "Marina Beach hotel",
  ],
  openGraph: {
    title: "Peninsula Chennai | Luxury 5-Star Hotel",
    description:
      "Where Chennai Meets Magnificence. Experience world-class luxury on Marina Beach.",
    type: "website",
    locale: "en_IN",
    siteName: "Peninsula Chennai",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-pearl text-navy">
        {children}
      </body>
    </html>
  );
}
