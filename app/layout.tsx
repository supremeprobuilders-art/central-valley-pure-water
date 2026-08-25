import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cvpurewater.com"),
  title: "Free Water Report + Installed Prices | Central Valley Pure Water",
  description:
    "Get a free California water report by ZIP, see your likely supplier and public monitoring context, then view the system path, installed price, and financing options—no signup required.",
  keywords: [
    "free water quality report by ZIP code",
    "water quality by ZIP code California",
    "what is in my tap water",
    "city water quality report",
    "water hardness by ZIP code",
    "water softener Modesto",
    "Central Valley water softener installation",
    "water softener price installed",
    "reverse osmosis system Modesto",
    "reverse osmosis system installation",
    "whole home water system",
    "whole house water filter price",
    "water treatment system financing",
    "well water system Central Valley",
    "water softener Stockton",
    "water softener Tracy",
    "water softener Manteca",
    "water softener Turlock",
    "Central Valley Pure Water",
  ],
  alternates: {
    canonical: "/",
  },
  category: "Water Treatment",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Free Water Report + Installed Prices | Central Valley Pure Water",
    description:
      "Enter a California ZIP to see the likely supplier, public water-record context, system path, installed price, and financing options without signing up first.",
    type: "website",
    locale: "en_US",
    siteName: "Central Valley Pure Water",
    url: "/",
    images: [
      {
        url: "/cvpurewater-hero.webp",
        width: 1586,
        height: 992,
        alt: "Central Valley Pure Water whole-home and reverse osmosis systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Water Report + Installed Prices",
    description:
      "See your likely supplier, public water-record context, system path, installed price, and financing options by ZIP—no signup required.",
    images: ["/cvpurewater-hero.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable}`}
      lang="en"
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
