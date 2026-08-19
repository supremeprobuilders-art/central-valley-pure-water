import type { Metadata } from "next";
import Link from "next/link";

import { ServiceFooter, ServiceHeader } from "../services/service-page-view";
import { areaPages } from "./area-data";

export const metadata: Metadata = {
  title: "Central Valley Water System Service Areas | Central Valley Pure Water",
  description:
    "Explore water softener, filtration, reverse osmosis, city-water, and private-well service pages for eight Central Valley and Sacramento-area markets.",
  alternates: { canonical: "/areas" },
  openGraph: {
    title: "Central Valley Water System Service Areas",
    description:
      "Find source-aware water system guidance for eight Central Valley and Sacramento-area markets.",
    type: "website",
    url: "/areas",
    images: [{ url: "/cvpurewater-hero.webp", width: 1586, height: 992, alt: "Central Valley Pure Water treatment systems" }],
  },
};

export default function AreasPage() {
  const canonical = "https://www.cvpurewater.com/areas";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#page`,
        name: "Central Valley Pure Water Service Areas",
        description: metadata.description,
        url: canonical,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: areaPages.map((area, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${area.city} water treatment system installation`,
            url: `${canonical}/${area.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cvpurewater.com" },
          { "@type": "ListItem", position: 2, name: "Service Areas", item: canonical },
        ],
      },
    ],
  };

  return (
    <main className="service-page service-index-page area-index-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ServiceHeader />

      <nav className="service-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Service areas</span></nav>

      <section className="service-index-hero">
        <p className="eyebrow light-eyebrow"><span /> Central Valley service coverage</p>
        <h1>Local water system guidance starts with the property.</h1>
        <p>Explore all eight approved launch-market pages below. Each one connects a distinct local search need to the right service pathway without pretending every address has the same water source or installation conditions.</p>
        <div className="service-hero-actions">
          <a className="button button-call" href="tel:+15107255120"><span className="call-icon" aria-hidden="true">☎</span><span>Call (510) 725-5120</span></a>
          <Link className="button button-ghost" href="/services">Compare water services <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="service-index-grid-section service-content-section">
        <div className="service-section-heading">
          <p className="eyebrow eyebrow-centered"><span /> Initial city cluster</p>
          <h2>Choose your service area</h2>
          <p>Call to confirm availability at the exact property address. The business office remains in Modesto; these pages describe service coverage and do not claim a separate office in each city.</p>
        </div>
        <div className="service-index-grid">
          {areaPages.map((area, index) => (
            <Link href={`/areas/${area.slug}`} key={area.slug}>
              <span className="service-index-number">{String(index + 1).padStart(2, "0")}</span>
              <small>{area.county}</small>
              <h2>{area.city}</h2>
              <p>{area.hero}</p>
              <ul>{area.highlights.slice(0, 3).map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
              <b>Explore {area.city} water systems →</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="service-cta-band">
        <div><span>Don&apos;t see your city?</span><h2>Call to check Central Valley service availability.</h2><p>Share the property address, water source, and the system or water concern you want to discuss.</p></div>
        <a href="tel:+15107255120"><small>Tap or click to call</small><strong>(510) 725-5120</strong><span>Check my address →</span></a>
      </section>

      <section className="service-principles service-content-section">
        <div className="service-section-heading"><p className="eyebrow"><span /> What changes by property</p><h2>Three details come before a responsible recommendation</h2></div>
        <div className="service-decision-grid">
          <article><span>01</span><h3>Water source</h3><p>Municipal water and private wells follow different information and assessment paths. Confirm the source before comparing equipment.</p></article>
          <article><span>02</span><h3>Household goal</h3><p>Hardness, whole-home filtration, and dedicated kitchen drinking water are different objectives and may require different systems.</p></article>
          <article><span>03</span><h3>Installation conditions</h3><p>Plumbing, drainage, power, space, cabinet access, equipment removal, and unusual work can affect both the layout and price.</p></article>
        </div>
      </section>

      <ServiceFooter />
    </main>
  );
}
