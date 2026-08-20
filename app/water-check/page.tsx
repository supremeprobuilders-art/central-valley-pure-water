import type { Metadata } from "next";
import Link from "next/link";

import { WaterCheckExperience } from "./water-check-experience";
import { PHONE_DISPLAY, PHONE_HREF } from "./water-check-data";
import styles from "./water-check.module.css";

export const metadata: Metadata = {
  title: "Free California Water Check by ZIP | Central Valley Pure Water",
  description:
    "Enter a California ZIP code to find possible public water systems, review official system details and EPA violation records, and see practical water-treatment next steps. No signup.",
  alternates: {
    canonical: "/water-check",
  },
  openGraph: {
    title: "Free California Water Check by ZIP",
    description:
      "A no-signup public-record lookup for California water systems, EPA violation records, and practical next steps for your home.",
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
      "Find possible public water systems and review official records with no signup.",
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
    question: "Is this an actual water test?",
    answer:
      "No. It is an area-level lookup of public records. It does not sample water at your tap, identify conditions inside your plumbing, or replace current testing and the utility's Consumer Confidence Report.",
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
    question: "Does a listed violation mean I need a particular home system?",
    answer:
      "Not by itself. Review current information with the utility. Home equipment should be selected for the current water source, the condition you want to improve, your plumbing, and the installation requirements—not from one historical record alone.",
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
          "A no-signup California ZIP-code lookup for possible public water systems, official system facts, EPA violation records, and practical water-treatment next steps.",
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
          <p className={styles.heroEyebrow}><span /> Free public-record lookup</p>
          <h1>What does public data say about <em>your area&apos;s water?</em></h1>
          <p className={styles.heroLead}>
            Enter any California ZIP code to find public water systems that may
            serve the area, review official system details and EPA violation
            records, then see a practical next step for your home.
          </p>
          <ul className={styles.heroNotes} aria-label="Water check highlights">
            <li><span>✓</span> California-only at launch</li>
            <li><span>✓</span> No contact form required</li>
            <li><span>✓</span> Private-well path included</li>
          </ul>
        </div>
      </section>

      <WaterCheckExperience />

      <section className={styles.sourceStrip} aria-label="Official public data sources">
        <div>
          <strong>California State Water Board</strong>
          <span>Public water-system service-area boundaries and system facts</span>
        </div>
        <div>
          <strong>U.S. Census Bureau</strong>
          <span>ZIP Code Tabulation Area boundaries used for area matching</span>
        </div>
        <div>
          <strong>U.S. EPA SDWIS</strong>
          <span>Public water-system violation and enforcement records</span>
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
            <h3>Choose the household goal</h3>
            <p>
              Recommendations are based on whether the homeowner wants help with
              hard-water symptoms, kitchen drinking water, both, or a private well.
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
