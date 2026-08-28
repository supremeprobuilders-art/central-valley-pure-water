import type { Metadata } from "next";
import Link from "next/link";

import { WaterCheckTool } from "./water-check-tool";
import "./approved-water-check.css";

export const metadata: Metadata = {
  title: "California Water Quality Check by ZIP | Central Valley Pure Water",
  description:
    "Enter a California ZIP code to identify the likely public water supplier, review recent official monitoring data, and see which home water system role fits your needs.",
  alternates: { canonical: "/water-check" },
  openGraph: {
    title: "Check Your Water by ZIP | Central Valley Pure Water",
    description:
      "Find the likely water supplier, understand selected reported results, and match the right home water system role.",
    type: "website",
    url: "/water-check",
    images: [{ url: "/cvpurewater-hero.webp", width: 1586, height: 992, alt: "Central Valley Pure Water treatment systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Your Water by ZIP | Central Valley Pure Water",
    description: "A simpler California utility water report and home-system match.",
    images: ["/cvpurewater-hero.webp"],
  },
};

function BrandMark() {
  return (
    <span className="brand-mark" aria-label="Central Valley Pure Water">
      <span className="brand-waves" aria-hidden="true"><i /><i /><i /></span>
      <span className="brand-type"><strong>Central Valley</strong><span>Pure Water</span></span>
    </span>
  );
}

export default async function WaterCheckPage({
  searchParams,
}: {
  searchParams: Promise<{ zip?: string; ref?: string; partner?: string; affiliate?: string; utm_source?: string }>;
}) {
  const params = await searchParams;
  const { zip = "" } = params;
  const initialZip = /^9\d{4}$/.test(zip) ? zip : "";
  const rawReferral = params.ref || params.partner || params.affiliate || params.utm_source || "";
  const initialReferralCode = rawReferral.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 64);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Central Valley Pure Water California Water Check",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: "https://www.cvpurewater.com/water-check",
    provider: {
      "@type": "LocalBusiness",
      name: "Central Valley Pure Water LLC",
      telephone: "+1-510-725-5120",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1620 N Carpenter Rd Suite A5",
        addressLocality: "Modesto",
        addressRegion: "CA",
        postalCode: "95351",
        addressCountry: "US",
      },
    },
  };

  return (
    <main className="water-check-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="offer-bar water-check-offer-bar">
        <span className="offer-pulse" aria-hidden="true" />
        <strong>Free California water check</strong>
        <span>No signup required</span>
        <a href="tel:+15107255120">Call (510) 725-5120</a>
      </div>
      <header className="water-check-header">
        <Link className="brand" href="/" aria-label="Central Valley Pure Water home"><BrandMark /></Link>
        <nav aria-label="Water check navigation">
          <Link href="/">Home</Link>
          <Link href="/services">Systems</Link>
          <a className="water-check-header-call" href="tel:+15107255120">Call for pricing</a>
        </nav>
      </header>

      <WaterCheckTool initialZip={initialZip} initialReferralCode={initialReferralCode} />

      <footer className="water-check-footer">
        <div>
          <BrandMark />
          <p>Clear water guidance for California&apos;s Central Valley.</p>
        </div>
        <div>
          <strong>Central Valley Pure Water LLC</strong>
          <span>1620 N Carpenter Rd, Suite A5, Modesto, CA 95351</span>
          <span>Mon–Fri · 8 AM–6 PM · Appointment only</span>
        </div>
        <a href="tel:+15107255120">(510) 725-5120</a>
      </footer>
      <a className="mobile-call-bar" href="tel:+15107255120">
        <span aria-hidden="true">☎</span>
        <span><small>Questions about your report?</small><strong>(510) 725-5120</strong></span>
      </a>
    </main>
  );
}
