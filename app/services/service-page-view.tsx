import Link from "next/link";

import { pricingPage, servicePageBySlug, servicePages, type ServicePage } from "./service-data";

const phoneDisplay = "(510) 725-5120";
const phoneHref = "tel:+15107255120";

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand-mark${inverse ? " inverse" : ""}`} aria-label="Central Valley Pure Water">
      <span className="brand-waves" aria-hidden="true"><i /><i /><i /></span>
      <span className="brand-type"><strong>Central Valley</strong><span>Pure Water</span></span>
    </span>
  );
}

export function ServiceHeader() {
  return (
    <>
      <div className="offer-bar">
        <span className="offer-pulse" aria-hidden="true" />
        <strong>Special pricing available now</strong>
        <span>Financing available · Call for your quote</span>
        <a href={phoneHref}>Call {phoneDisplay}</a>
      </div>
      <header className="site-header service-header">
        <Link className="brand" href="/" aria-label="Central Valley Pure Water home"><BrandMark /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/services">Services</Link>
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/#service-area">Service area</Link>
          <Link href="/call-for-pricing">Call for pricing</Link>
        </nav>
        <a className="header-call" href={phoneHref}><span>Call for special pricing</span><strong>{phoneDisplay}</strong></a>
        <details className="service-mobile-menu">
          <summary aria-label="Open navigation"><span /><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/services">Services</Link>
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/#service-area">Service area</Link>
            <Link href="/call-for-pricing">Call for pricing</Link>
            <a className="menu-call" href={phoneHref}>Call {phoneDisplay}</a>
          </nav>
        </details>
      </header>
    </>
  );
}

export function ServiceFooter() {
  return (
    <>
      <footer>
        <div className="footer-main">
          <div className="footer-brand"><BrandMark inverse /><p>Water softening, reverse osmosis, and whole-home water solutions for California&apos;s Central Valley.</p><a href={phoneHref}>{phoneDisplay}</a></div>
          <div><h3>Services</h3>{servicePages.slice(0, 4).map((item) => <Link href={pageHref(item.slug)} key={item.slug}>{item.shortTitle}</Link>)}</div>
          <div><h3>More</h3><Link href="/services/well-water-treatment">Well water treatment</Link><Link href="/services/commercial-water-treatment">Commercial treatment</Link><Link href="/call-for-pricing">Call for pricing</Link><Link href="/#service-area">Service area</Link></div>
          <div><h3>Visit</h3><p>1620 N Carpenter Rd<br />Suite A5<br />Modesto, CA 95351</p><small>Office &amp; warehouse<br />Appointment only</small><p className="footer-hours">Mon–Fri · 8 AM–6 PM</p></div>
        </div>
        <div className="footer-bottom"><p>© 2026 Central Valley Pure Water LLC. All rights reserved.</p><p>Special pricing subject to system selection and installation conditions.</p></div>
      </footer>
      <a className="mobile-call-bar" href={phoneHref}><span aria-hidden="true">☎</span><span><small>Special pricing · Tap to call</small><strong>{phoneDisplay}</strong></span></a>
    </>
  );
}

function pageHref(slug: string) {
  return slug === pricingPage.slug ? "/call-for-pricing" : `/services/${slug}`;
}

function getPage(slug: string) {
  return slug === pricingPage.slug ? pricingPage : servicePageBySlug[slug];
}

function StructuredData({ page }: { page: ServicePage }) {
  const canonical = `https://www.cvpurewater.com${pageHref(page.slug)}`;
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
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: page.title,
      description: page.metaDescription,
      url: canonical,
      areaServed: { "@type": "AdministrativeArea", name: "California Central Valley" },
      provider,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cvpurewater.com" },
        { "@type": "ListItem", position: 2, name: page.slug === pricingPage.slug ? "Call for Pricing" : "Services", item: page.slug === pricingPage.slug ? canonical : "https://www.cvpurewater.com/services" },
        ...(page.slug === pricingPage.slug ? [] : [{ "@type": "ListItem", position: 3, name: page.shortTitle, item: canonical }]),
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

export function ServicePageView({ page }: { page: ServicePage }) {
  const related = page.related.map(getPage).filter(Boolean);

  return (
    <main className="service-page">
      <StructuredData page={page} />

      <ServiceHeader />

      <nav className="service-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        {page.slug === pricingPage.slug ? null : <><Link href="/services">Services</Link><span aria-hidden="true">/</span></>}
        <span aria-current="page">{page.shortTitle}</span>
      </nav>

      <section className="service-hero">
        <div className="service-hero-copy">
          <p className="eyebrow light-eyebrow"><span /> {page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.hero}</p>
          <div className="service-hero-actions">
            <a className="button button-call" href={phoneHref}><span className="call-icon" aria-hidden="true">☎</span><span>Call for current pricing</span></a>
            <Link className="button button-ghost" href="/services">Compare services <span aria-hidden="true">→</span></Link>
          </div>
          <small>System selection and pricing depend on the property, water source, goals, and installation conditions.</small>
        </div>
        <aside className="service-hero-panel" aria-label="Service highlights">
          <span>What to expect</span>
          <ul>{page.highlights.map((item) => <li key={item}><b aria-hidden="true">✓</b>{item}</li>)}</ul>
          <Link href="/call-for-pricing">How pricing works <span aria-hidden="true">↗</span></Link>
        </aside>
      </section>

      <section className="service-overview service-content-section">
        <div>
          <p className="eyebrow"><span /> Clear system guidance</p>
          <h2>{page.overviewTitle}</h2>
        </div>
        <div className="service-prose">{page.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section className="service-fit service-content-section">
        <div className="service-section-heading">
          <p className="eyebrow eyebrow-centered"><span /> Is this the right starting point?</p>
          <h2>Consider this service when…</h2>
        </div>
        <div className="service-check-grid">{page.goodFit.map((item) => <article key={item}><span aria-hidden="true">✓</span><p>{item}</p></article>)}</div>
      </section>

      <section className="service-decisions service-content-section">
        <div className="service-section-heading">
          <p className="eyebrow"><span /> Before equipment is selected</p>
          <h2>Three decisions that shape the recommendation</h2>
        </div>
        <div className="service-decision-grid">{page.decisions.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
      </section>

      <section className="service-process service-content-section">
        <div className="service-section-heading">
          <p className="eyebrow eyebrow-centered"><span /> A straightforward path</p>
          <h2>From first call to a clear plan</h2>
        </div>
        <ol>{page.process.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol>
      </section>

      <section className="service-cta-band">
        <div><span>Talk with a local team</span><h2>Get a recommendation for your property.</h2><p>Call with your water source, location, and the concerns you want to discuss.</p></div>
        <a href={phoneHref}><small>Tap or click to call</small><strong>{phoneDisplay}</strong><span>Call for pricing →</span></a>
      </section>

      <section className="service-related service-content-section">
        <div className="service-section-heading">
          <p className="eyebrow"><span /> Compare your options</p>
          <h2>Related water services</h2>
        </div>
        <div className="service-related-grid">
          {related.map((item) => <Link href={pageHref(item.slug)} key={item.slug}><span>{item.eyebrow}</span><h3>{item.shortTitle}</h3><p>{item.metaDescription}</p><b>Explore service →</b></Link>)}
        </div>
      </section>

      <section className="service-faq service-content-section" id="faq">
        <div className="service-section-heading">
          <p className="eyebrow eyebrow-centered"><span /> Straight answers</p>
          <h2>{page.shortTitle} FAQs</h2>
        </div>
        <div className="faq-list">{page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <ServiceFooter />
    </main>
  );
}
