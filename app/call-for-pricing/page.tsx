import type { Metadata } from "next";

import { pricingPage } from "../services/service-data";
import { ServicePageView } from "../services/service-page-view";

export const metadata: Metadata = {
  title: pricingPage.metaTitle,
  description: pricingPage.metaDescription,
  alternates: { canonical: "/call-for-pricing" },
  openGraph: {
    title: pricingPage.metaTitle,
    description: pricingPage.metaDescription,
    type: "website",
    url: "/call-for-pricing",
    images: [{ url: "/cvpurewater-hero.webp", width: 1586, height: 992, alt: "Central Valley Pure Water system pricing" }],
  },
  twitter: { card: "summary_large_image", title: pricingPage.metaTitle, description: pricingPage.metaDescription, images: ["/cvpurewater-hero.webp"] },
};

export default function CallForPricingPage() {
  return <ServicePageView page={pricingPage} />;
}
