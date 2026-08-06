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
  title: "Water Softeners & Reverse Osmosis | Central Valley Pure Water",
  description:
    "Water softeners, whole-home water systems, and reverse osmosis installation in Modesto and California's Central Valley. Call for special pricing and a quote.",
  keywords: [
    "water softener Modesto",
    "Central Valley water softener installation",
    "reverse osmosis system Modesto",
    "whole home water system",
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
    title: "Central Valley Pure Water | Better Water for Your Whole Home",
    description:
      "Water softeners, reverse osmosis, and whole-home water systems for California's Central Valley. Special pricing available—call for a quote.",
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
    title: "Central Valley Pure Water",
    description:
      "Water softeners and reverse osmosis systems for Central Valley homes. Call for special pricing.",
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
