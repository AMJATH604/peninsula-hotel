import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hotel Peninsula | Premium Hotel in T. Nagar, Chennai",
    template: "%s | Hotel Peninsula Chennai",
  },
  description:
    "Experience warm hospitality at Hotel Peninsula, a premium hotel in the heart of T. Nagar, Chennai. Comfortable rooms, authentic dining, event spaces, and personalized service. Book direct for best rates.",
  keywords: [
    "hotel Chennai",
    "Hotel Peninsula Chennai",
    "hotel T. Nagar",
    "best hotel Chennai",
    "premium hotel T. Nagar",
    "Chennai accommodation",
    "G N Chetty Road hotel",
    "business hotel Chennai",
  ],
  openGraph: {
    title: "Hotel Peninsula | Premium Hotel in T. Nagar, Chennai",
    description:
      "Your home away from home in Chennai. Located at 51, G. N. Chetty Road, T. Nagar — comfortable rooms, authentic dining & warm hospitality.",
    type: "website",
    locale: "en_IN",
    siteName: "Hotel Peninsula Chennai",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-pearl text-charcoal font-inter">
        {children}
      </body>
    </html>
  );
}
