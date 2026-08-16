import Link from "next/link";

import { ServiceFooter, ServiceHeader } from "../services/service-page-view";
import { servicePageBySlug, type ServicePage } from "../services/service-data";
import { areaPageBySlug, type AreaPage } from "./area-data";

const phoneDisplay = "(510) 725-5120";
const phoneHref = "tel:+15107255120";

function StructuredData({ page }: { page: AreaPage }) {
  const canonical = `https://www.cvpurewater.com/areas/${page.slug}`;
  const provider = {
    "@type": "LocalBusiness",
    "@id": "https://www.cvpurewater.com/#business",
    name: "Central Valley Pure Water LLC",
    url: "https://www.cvpurewater.com",
    telephone: "+1-510-725-5120",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1620 N Carpenter Rd Suite A5",
      addressLocality: "Modesto",
      addressRegion: "CA",
      postalCode: "95351",
      addressCountry: "US",
    },
  };
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${canonical}#page`,
      name: page.title,
      description: page.metaDescription,
      url: canonical,
      mainEntity: { "@id": `${canonical}#service` },
    },
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: `Water treatment system installation in ${page.city}`,
      description: page.metaDescription,
      url: canonical,
      areaServed: {
        "@type": "City",
        name: `${page.city}, California`,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: page.county,
        },
      },
      provider,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cvpurewater.com" },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://www.cvpurewater.com/areas" },
        { "@type": "ListItem", position: 3, name: page.city, item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}

function getServices(page: AreaPage): ServicePage[] {
  return page.serviceSlugs
    .map((slug) => servicePageBySlug[slug])
    .filter((service): service is ServicePage => Boolean(service));
}

export function AreaPageView({ page }: { page: AreaPage }) {
  const services = getServices(page);
  const relatedAreas = page.relatedAreas.map((slug) => areaPageBySlug[slug]).filter(Boolean);

  return (
    <main className="service-page area-page">
      <StructuredData page={page} />
      <ServiceHeader />

      <nav className="service-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        <Link href="/areas">Service areas</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{page.city}</span>
      </nav>

      <section className="service-hero">
        <div className="service-hero-copy">
          <p className="eyebrow light-eyebrow"><span /> {page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.hero}</p>
          <div className="service-hero-actions">
            <a className="button button-call" href={phoneHref}><span className="call-icon" aria-hidden="true">☎</span><span>Call for current pricing</span></a>
            <Link className="button button-ghost" href="/areas">Compare service areas <span aria-hidden="true">→</span></Link>
          </div>
          <small>Call to confirm service at your exact address. Equipment and pricing depend on the water source, property, goals, and installation conditions.</small>
        </div>
        <aside className="service-hero-panel" aria-label={`${page.city} service highlights`}>
          <span>{page.county}</span>
          <ul>{page.highlights.map((item) => <li key={item}><b aria-hidden="true">✓</b>{item}</li>)}</ul>
          <Link href="/call-for-pricing">How pricing works <span aria-hidden="true">↗</span></Link>
        </aside>
      </section>

      <section className="service-overview service-content-section">
        <div>
          <p className="eyebrow"><span /> Local system guidance</p>
          <h2>{page.overviewTitle}</h2>
        </div>
        <div className="service-prose">{page.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section className="service-fit service-content-section">
        <div className="service-section-heading">
          <p className="eyebrow eyebrow-centered"><span /> A useful place to begin</p>
          <h2>Call about a {page.city} property when…</h2>
        </div>
        <div className="service-check-grid">{page.helpfulFor.map((item) => <article key={item}><span aria-hidden="true">✓</span><p>{item}</p></article>)}</div>
      </section>

      <section className="service-decisions service-content-section">
        <div className="service-section-heading">
          <p className="eyebrow"><span /> Before equipment is selected</p>
          <h2>Three decisions that shape the local plan</h2>
        </div>
        <div className="service-decision-grid">{page.decisions.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
      </section>

      <section className="service-related service-content-section area-service-options">
        <div className="service-section-heading">
          <p className="eyebrow"><span /> Compare the service paths</p>
          <h2>Popular options for {page.city} properties</h2>
        </div>
        <div className="service-related-grid">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              <span>{service.eyebrow}</span>
              <h3>{service.shortTitle}</h3>
              <p>{service.metaDescription}</p>
              <b>Explore service →</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="service-process service-content-section">
        <div className="service-section-heading">
          <p className="eyebrow eyebrow-centered"><span /> A bounded, practical process</p>
          <h2>From the first call to a clear scope</h2>
        </div>
        <ol>{page.process.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol>
      </section>

      <section className="service-cta-band">
        <div><span>{page.city} service availability</span><h2>Discuss your property with the local team.</h2><p>Call with the address, water source, household needs, and the results you want from the system.</p></div>
        <a href={phoneHref}><small>Tap or click to call</small><strong>{phoneDisplay}</strong><span>Call for pricing →</span></a>
      </section>

      {relatedAreas.length > 0 ? (
        <section className="service-related service-content-section">
          <div className="service-section-heading">
            <p className="eyebrow"><span /> More Central Valley coverage</p>
            <h2>Related service areas</h2>
          </div>
          <div className="service-related-grid">
            {relatedAreas.map((area) => (
              <Link href={`/areas/${area.slug}`} key={area.slug}>
                <span>{area.county}</span>
                <h3>{area.city}</h3>
                <p>{area.hero}</p>
                <b>Explore {area.city} →</b>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="service-faq service-content-section" id="faq">
        <div className="service-section-heading">
          <p className="eyebrow eyebrow-centered"><span /> Straight answers</p>
          <h2>{page.city} water system FAQs</h2>
        </div>
        <div className="faq-list">{page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <ServiceFooter />
    </main>
  );
}
