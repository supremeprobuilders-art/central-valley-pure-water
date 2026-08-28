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
      ...(page.report ? { dateModified: "2026-08-28", citation: page.sources?.map((source) => source.href) } : {}),
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
            {page.report ? (
              <Link className="button button-call" href={`/water-check?zip=${page.report.zip}`}><span>Get my free water report</span></Link>
            ) : (
              <a className="button button-call" href={phoneHref}><span className="call-icon" aria-hidden="true">☎</span><span>Call for current pricing</span></a>
            )}
            {page.report ? (
              <a className="button button-ghost" href={phoneHref}>Call {phoneDisplay} <span aria-hidden="true">→</span></a>
            ) : (
              <Link className="button button-ghost" href="/areas">Compare service areas <span aria-hidden="true">→</span></Link>
            )}
          </div>
          <small>{page.report ? "Free, no signup, and no sales-representative conversation required before you see the report and installed-price path." : "Call to confirm service at your exact address. Equipment and pricing depend on the water source, property, goals, and installation conditions."}</small>
        </div>
        <aside className="service-hero-panel" aria-label={`${page.city} service highlights`}>
          <span>{page.county}</span>
          <ul>{page.highlights.map((item) => <li key={item}><b aria-hidden="true">✓</b>{item}</li>)}</ul>
          <Link href={page.report ? `/water-check?zip=${page.report.zip}` : "/call-for-pricing"}>{page.report ? "Start the free ZIP lookup" : "How pricing works"} <span aria-hidden="true">↗</span></Link>
        </aside>
      </section>

      <section className="service-overview service-content-section">
        <div>
          <p className="eyebrow"><span /> Local system guidance</p>
          <h2>{page.overviewTitle}</h2>
        </div>
        <div className="service-prose">{page.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      {page.report ? (
        <section className="area-report service-content-section" aria-labelledby="area-report-title">
          <div className="service-section-heading">
            <p className="eyebrow"><span /> {page.report.reviewed}</p>
            <h2 id="area-report-title">{page.report.title}</h2>
            <p>{page.report.intro}</p>
          </div>
          <div className="area-report-grid">
            {page.report.facts.map((fact) => (
              <article key={fact.label}>
                <strong>{fact.value}</strong>
                <h3>{fact.label}</h3>
                <p>{fact.copy}</p>
              </article>
            ))}
          </div>
          <div className="area-report-action">
            <div>
              <span>Report first. Price next.</span>
              <h3>See the likely supplier, system path, and all installed prices.</h3>
              <p>{page.report.limitation}</p>
            </div>
            <div className="area-report-links">
              <Link href={`/water-check?zip=${page.report.zip}`}>Get my free Modesto Water Report <span aria-hidden="true">→</span></Link>
              <Link href="/financing">See financing availability <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      ) : null}

      {page.sources?.length ? (
        <section className="service-related service-content-section" aria-labelledby="local-sources-title">
          <div className="service-section-heading">
            <p className="eyebrow"><span /> Verify the local context</p>
            <h2 id="local-sources-title">Official water information for {page.city}</h2>
          </div>
          <div className="service-related-grid">
            {page.sources.map((source) => (
              <a href={source.href} key={source.href} target="_blank" rel="noreferrer">
                <span>Official source</span>
                <h3>{source.label}</h3>
                <p>{source.note}</p>
                <b>Read the source ↗</b>
              </a>
            ))}
          </div>
        </section>
      ) : null}

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
        <div><span>{page.report ? "Free Modesto Water Report" : `${page.city} service availability`}</span><h2>{page.report ? "Get the report and installed price before you contact anyone." : "Discuss your property with the local team."}</h2><p>{page.report ? "Enter a ZIP, confirm the likely supplier, review public records, and size the starting system in about two minutes." : "Call with the address, water source, household needs, and the results you want from the system."}</p></div>
        {page.report ? (
          <Link href={`/water-check?zip=${page.report.zip}`}><small>No signup required</small><strong>Start free</strong><span>Check Modesto water by ZIP →</span></Link>
        ) : (
          <a href={phoneHref}><small>Tap or click to call</small><strong>{phoneDisplay}</strong><span>Call for pricing →</span></a>
        )}
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
