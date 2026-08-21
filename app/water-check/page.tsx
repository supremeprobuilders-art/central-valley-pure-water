import type { Metadata } from "next";
import Link from "next/link";

import { WaterCheckExperience } from "./water-check-experience";
import { PHONE_DISPLAY, PHONE_HREF } from "./water-check-data";
import styles from "./water-check.module.css";

export const metadata: Metadata = {
  title: "Free California Water Check by ZIP | Central Valley Pure Water",
  description:
    "Enter a California ZIP code to find the likely public water system, review recent official laboratory monitoring results and listed limits, and see the best-fit system path. No signup.",
  alternates: {
    canonical: "/water-check",
  },
  openGraph: {
    title: "Free California Water Check by ZIP",
    description:
      "A no-signup California water report with recent public laboratory monitoring results, listed limits, and a best-fit home water system path.",
    url: "/water-check",
    type: "website",
    siteName: "Central Valley Pure Water",
    images: [
      {
        url: "/cvpurewater-hero.webp",
        width: 1586,
        height: 992,
        alt: "Central Valley Pure Water home water systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free California Water Check by ZIP",
    description:
      "Review recent public water-test records and a best-fit system path with no signup.",
    images: ["/cvpurewater-hero.webp"],
  },
};

function BrandMark() {
  return (
    <span className={styles.brand} aria-label="Central Valley Pure Water">
      <span className={styles.brandWaves} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className={styles.brandType}>
        <strong>Central Valley</strong>
        <span>Pure Water</span>
      </span>
    </span>
  );
}

const faqs = [
  {
    question: "Are these actual water-test results?",
    answer:
      "The report displays actual public laboratory monitoring results filed for selected water-system sampling points. It is not a new sample collected from your faucet, and it does not replace current property testing or the utility's Consumer Confidence Report.",
  },
  {
    question: "Why can one ZIP code show more than one water system?",
    answer:
      "ZIP codes are postal areas, while water systems use separate service boundaries. The two can overlap in several ways. Confirm the provider and public water system ID shown on your current bill.",
  },
  {
    question: "Does the checker cover private wells?",
    answer:
      "Public-system records do not describe an individual private well. Private-well recommendations begin with property-specific information and appropriate water testing before equipment is selected.",
  },
  {
    question: "How does the checker recommend a system?",
    answer:
      "The report evaluates detected analytes, hard-water indicators, the sampling-point context, and the limits printed in the selected state records. It then identifies the strongest system conversation while requiring model-specific performance and installation confirmation.",
  },
];

export default function WaterCheckPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Central Valley Pure Water Free California Water Check",
        url: "https://www.cvpurewater.com/water-check",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        description:
          "A no-signup California ZIP-code water report with likely public systems, recent official laboratory monitoring results, listed limits, and a best-fit home water system path.",
        provider: {
          "@type": "LocalBusiness",
          name: "Central Valley Pure Water LLC",
          telephone: "+1-510-725-5120",
          url: "https://www.cvpurewater.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1620 N Carpenter Rd Suite A5",
            addressLocality: "Modesto",
            addressRegion: "CA",
            postalCode: "95351",
            addressCountry: "US",
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={styles.topBar}>
        <strong>Free California water check</strong>
        <span>No email · No signup · Public records</span>
        <a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
      </div>

      <header className={styles.header}>
        <Link href="/" aria-label="Central Valley Pure Water home">
          <BrandMark />
        </Link>
        <div className={styles.headerActions}>
          <Link href="/#systems">Explore water systems</Link>
          <a className={styles.headerCall} href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}><span /> Free California water report</p>
          <h1>What do actual public water tests show for <em>your area?</em></h1>
          <p className={styles.heroLead}>
            Enter any California ZIP code, confirm the provider shown on your
            bill, review recent public laboratory results and listed limits, then
            see the strongest water-system fit for your home.
          </p>
          <ul className={styles.heroNotes} aria-label="Water check highlights">
            <li><span>✓</span> Actual public monitoring results</li>
            <li><span>✓</span> No contact form required</li>
            <li><span>✓</span> Best-fit system recommendation</li>
          </ul>
        </div>
      </section>

      <WaterCheckExperience />

      <section className={styles.sourceStrip} aria-label="Official public data sources">
        <div>
          <strong>California State Water Board</strong>
          <span>Service-area boundaries, system facts, and laboratory monitoring results</span>
        </div>
        <div>
          <strong>U.S. Census Bureau</strong>
          <span>ZIP Code Tabulation Area boundaries used for area matching</span>
        </div>
        <div>
          <strong>U.S. EPA SDWIS</strong>
          <span>Public water-system compliance, violation, and enforcement records</span>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoHeading}>
          <p className={styles.kicker}><span /> Honest by design</p>
          <h2>A useful starting point—not a fear-based score.</h2>
          <p>
            The tool separates what public records can show from what still has
            to be confirmed at the property. That makes the recommendation more
            useful and keeps the sales conversation grounded in the homeowner&apos;s
            actual goals.
          </p>
        </div>
        <div className={styles.explainerGrid}>
          <article>
            <span>01</span>
            <h3>Find possible providers</h3>
            <p>
              The checker overlays the ZIP area with California public-water-system
              boundaries and prioritizes systems that contain the ZIP&apos;s representative center.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Confirm the current bill</h3>
            <p>
              ZIP boundaries and service areas are different. The provider and
              PWSID on the current bill are the strongest confirmation before using a report.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Review results and system fit</h3>
            <p>
              The report summarizes detected analytes, listed limits, and sampling
              context, then recommends the strongest softener, RO, filtration, or
              complete-home conversation.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoHeading}>
          <p className={styles.kicker}><span /> Straight answers</p>
          <h2>Questions about the free water check.</h2>
        </div>
        <div className={styles.faq}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCopy}>
            <h2>Ready to talk through your water and your home?</h2>
            <p>
              Central Valley Pure Water installs whole-home water softeners,
              reverse-osmosis drinking-water systems, complete-home packages,
              and property-specific well-water solutions across California&apos;s Central Valley.
            </p>
          </div>
          <a className={styles.footerCall} href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Central Valley Pure Water LLC</span>
          <span>1620 N Carpenter Rd, Suite A5, Modesto, CA 95351 · Appointment only</span>
        </div>
      </footer>

      <a className={styles.mobileCall} href={PHONE_HREF}>
        <span aria-hidden="true">☎</span> Call {PHONE_DISPLAY}
      </a>
    </main>
  );
}
