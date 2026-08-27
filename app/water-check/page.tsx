import type { Metadata } from "next";
import Link from "next/link";

import { ReferralValuePanel } from "./referral-value-panel";
import { SalesWaterCheckV3 } from "./sales-water-check-v3";
import { PHONE_DISPLAY, PHONE_HREF } from "./water-check-data";
import styles from "./water-check.module.css";

export const metadata: Metadata = {
  title: "Free California Water Check by ZIP | Central Valley Pure Water",
  description:
    "Enter a California ZIP code to identify the likely water supplier, compare selected recent public monitoring results with California health-based goals and legal limits, then see the treatment and price path.",
  alternates: { canonical: "/water-check" },
  openGraph: {
    title: "Free California Water Check by ZIP",
    description:
      "Find the likely supplier automatically, see calculated California health-goal comparisons, then review the treatment path and current package pricing.",
    url: "/water-check",
    type: "website",
    siteName: "Central Valley Pure Water",
    images: [{ url: "/cvpurewater-hero.webp", width: 1586, height: 992, alt: "Central Valley Pure Water home water systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free California Water Check by ZIP",
    description: "See your likely supplier, calculated health-goal comparisons, treatment path, and current package pricing.",
    images: ["/cvpurewater-hero.webp"],
  },
};

function BrandMark() {
  return (
    <span className={styles.brand} aria-label="Central Valley Pure Water">
      <span className={styles.brandWaves} aria-hidden="true"><i /><i /><i /></span>
      <span className={styles.brandType}><strong>Central Valley</strong><span>Pure Water</span></span>
    </span>
  );
}

const faqs = [
  {
    question: "Are these actual water-test results?",
    answer:
      "The report summarizes actual public laboratory monitoring records filed for selected water-system sampling points. It is not a new sample collected from your faucet, and it does not replace current property testing or the utility's Consumer Confidence Report.",
  },
  {
    question: "How do you know which water supplier serves my ZIP?",
    answer:
      "The checker compares the ZIP area with California public-water-system service boundaries and automatically starts with the strongest ZIP match. Because postal and utility boundaries are different, you can change the supplier if the one shown is not on your current bill.",
  },
  {
    question: "How is the X-times number calculated?",
    answer:
      "When a compatible California Public Health Goal is available, the checker divides the highest selected monitoring result by that OEHHA health-based goal. The arithmetic is specific to the selected supplier and records. The PHG is not a legal limit or a line between safe and dangerous; the report shows the separate listed MCL when available.",
  },
  {
    question: "How does the checker recommend a system?",
    answer:
      "The report uses detected analytes, hard-water indicators, sampling context, and listed limits to identify a practical treatment starting point. The price step then uses household size and bathrooms; three or more bathrooms plus four or more people selects Dual Tank Full. Final performance claims still depend on the exact model, current water conditions, and installation details.",
  },
  {
    question: "Can I check financing without hurting my credit score?",
    answer:
      "Hearth states that its prequalification process uses a soft credit inquiry that does not affect your credit score. If you choose to move forward with a lender offer, additional lender steps may include a hard credit inquiry. Approval, rates, terms, fees, and monthly payments depend on the lender and applicant.",
  },
  {
    question: "Does the checker cover private wells?",
    answer:
      "Public-system records do not describe an individual private well. Private-well recommendations begin with property-specific information and appropriate water testing before equipment is selected.",
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
          "A no-signup California ZIP-code water report that identifies the likely public water supplier, summarizes selected recent official monitoring records, calculates available California health-goal comparisons, and shows a practical treatment and pricing path.",
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
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className={styles.topBar}>
        <strong>Free California water check</strong>
        <span>See the report first · No signup required</span>
        <a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
      </div>

      <header className={styles.header}>
        <Link href="/" aria-label="Central Valley Pure Water home"><BrandMark /></Link>
        <div className={styles.headerActions}>
          <Link href="/#systems">Explore water systems</Link>
          <Link href="/financing">Financing</Link>
          <a className={styles.headerCall} href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}><span /> Free California water report</p>
          <h1>Check your water. See the math. <em>Get your price.</em></h1>
          <p className={styles.heroLead}>
            Enter your ZIP. We identify the likely water supplier automatically, turn selected recent public monitoring records into a simple report, calculate available California health-goal comparisons, then show the treatment and price path.
          </p>
          <ul className={styles.heroNotes} aria-label="Water check highlights">
            <li><span>✓</span> Supplier found automatically</li>
            <li><span>✓</span> $3,495 · $3,995 · $5,495 installed prices</li>
            <li><span>✓</span> Qualified lifetime warranty · written terms apply</li>
          </ul>
        </div>
      </section>

      <ReferralValuePanel variant="banner" />
      <SalesWaterCheckV3 />
      <ReferralValuePanel variant="value" />

      <section className={styles.sourceStrip} aria-label="Official public data sources">
        <div><strong>California State Water Board</strong><span>Service-area boundaries, system facts, and laboratory monitoring results</span></div>
        <div><strong>California OEHHA</strong><span>Public Health Goals used for compatible health-based comparisons</span></div>
        <div><strong>U.S. Census Bureau</strong><span>ZIP Code Tabulation Area boundaries used for area matching</span></div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoHeading}>
          <p className={styles.kicker}><span /> Simple by design</p>
          <h2>Useful enough to act on. Simple enough to understand.</h2>
          <p>The useful part comes first: likely supplier, the calculated comparison, detected items, legal-limit context, the treatment path, and the price. Detailed records stay one tap away.</p>
        </div>
        <div className={styles.explainerGrid}>
          <article><span>01</span><h3>We find the supplier</h3><p>The strongest ZIP-area match appears automatically. If the bill shows another provider, one tap opens the alternate supplier list.</p></article>
          <article><span>02</span><h3>We do the math</h3><p>For compatible chemicals, the highest selected result is divided by the California OEHHA Public Health Goal. The listed legal MCL remains separate.</p></article>
          <article><span>03</span><h3>We show the installed price</h3><p>Choose Standard at $3,495, Standard Plus at $3,995, or Dual Tank Full at $5,495. The confirmed household sizing rule selects Dual Tank when required.</p></article>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoHeading}><p className={styles.kicker}><span /> Straight answers</p><h2>Questions about the free water check.</h2></div>
        <div className={styles.faq}>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCopy}><h2>Ready to talk through your water and your home?</h2><p>Central Valley Pure Water installs whole-home water softeners, reverse-osmosis drinking-water systems, complete-home packages, and property-specific well-water solutions across California&apos;s Central Valley.</p></div>
          <a className={styles.footerCall} href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
        </div>
        <div className={styles.footerBottom}><span>© 2026 Central Valley Pure Water LLC</span><span>1620 N Carpenter Rd, Suite A5, Modesto, CA 95351 · Appointment only</span></div>
      </footer>

      <a className={styles.mobileCall} href={PHONE_HREF}><span aria-hidden="true">☎</span> Call {PHONE_DISPLAY}</a>
    </main>
  );
}
