import type { Metadata } from "next";
import Link from "next/link";

import { servicePages } from "./service-data";
import { ServiceFooter, ServiceHeader } from "./service-page-view";

export const metadata: Metadata = {
  title: "Water Treatment Services | Central Valley Pure Water",
  description: "Compare water softeners, whole-home filtration, reverse osmosis, city-water, well-water, and commercial treatment services for California's Central Valley.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Water Treatment Services | Central Valley Pure Water",
    description: "Compare practical water-treatment pathways for city water, private wells, homes, and commercial properties.",
    type: "website",
    url: "/services",
    images: [{ url: "/cvpurewater-hero.webp", width: 1586, height: 992, alt: "Central Valley Pure Water treatment systems" }],
  },
};

export default function ServicesPage() {
  const canonical = "https://www.cvpurewater.com/services";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#page`,
        name: "Central Valley Pure Water Services",
        description: "Water-treatment service options for Central Valley homes and commercial properties.",
        url: canonical,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: servicePages.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: `${canonical}/${service.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cvpurewater.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: canonical },
        ],
      },
    ],
  };

  return (
    <main className="service-page service-index-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ServiceHeader />

      <nav className="service-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Services</span></nav>

      <section className="service-index-hero">
        <p className="eyebrow light-eyebrow"><span /> Central Valley water treatment</p>
        <h1>Start with the service that matches your water and property.</h1>
        <p>Softening, filtration, and reverse osmosis solve different problems. Compare the pathways below, then call for a recommendation and current pricing tied to your installation.</p>
        <div className="service-hero-actions">
          <a className="button button-call" href="tel:+15107255120"><span className="call-icon" aria-hidden="true">☎</span><span>Call (510) 725-5120</span></a>
          <Link className="button button-ghost" href="/call-for-pricing">How pricing works <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="service-index-grid-section service-content-section">
        <div className="service-section-heading">
          <p className="eyebrow eyebrow-centered"><span /> Core services</p>
          <h2>Choose a clear starting point</h2>
          <p>Each page explains what the service is for, what shapes the recommendation, and what to have ready when you call.</p>
        </div>
        <div className="service-index-grid">
          {servicePages.map((service, index) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              <span className="service-index-number">{String(index + 1).padStart(2, "0")}</span>
              <small>{service.eyebrow}</small>
              <h2>{service.shortTitle}</h2>
              <p>{service.hero}</p>
              <ul>{service.highlights.slice(0, 3).map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
              <b>Explore {service.shortTitle.toLowerCase()} →</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="service-cta-band">
        <div><span>Not sure where to begin?</span><h2>Tell us what you notice at the property.</h2><p>We will separate hardness, filtration, drinking-water, city-water, well-water, and commercial needs before discussing equipment.</p></div>
        <Link href="/call-for-pricing"><small>See the quote process</small><strong>Call for pricing</strong><span>Review pricing factors →</span></Link>
      </section>

      <section className="service-principles service-content-section">
        <div className="service-section-heading"><p className="eyebrow"><span /> How recommendations are made</p><h2>Useful information before equipment</h2></div>
        <div className="service-decision-grid">
          <article><span>01</span><h3>Water source</h3><p>City water and private wells follow different assessment paths. Commercial use adds its own demand and operating requirements.</p></article>
          <article><span>02</span><h3>Treatment goal</h3><p>Hardness, whole-home filtration, and dedicated drinking water should be discussed as distinct objectives.</p></article>
          <article><span>03</span><h3>Installation conditions</h3><p>Plumbing access, drainage, power, cabinet space, equipment clearance, and unusual site work affect the final scope.</p></article>
        </div>
      </section>

      <ServiceFooter />
    </main>
  );
}
