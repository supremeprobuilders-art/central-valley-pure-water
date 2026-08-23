import type { Metadata } from "next";
import Link from "next/link";

import styles from "./financing.module.css";

const phoneDisplay = "(510) 725-5120";
const phoneHref = "tel:+15107255120";

export const metadata: Metadata = {
  title: "Water System Financing | Central Valley Pure Water",
  description:
    "See the $3,495 Central Valley Pure Water package price first, then review Hearth financing options. Hearth prequalification uses a soft credit inquiry with no score impact.",
  alternates: { canonical: "/financing" },
};

export default function FinancingPage() {
  const financingUrl = process.env.NEXT_PUBLIC_HEARTH_FINANCING_URL?.trim();
  const calculatorEmbedUrl = process.env.NEXT_PUBLIC_HEARTH_CALCULATOR_EMBED_URL?.trim();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Central Valley Pure Water</Link>
        <a href={phoneHref}>{phoneDisplay}</a>
      </header>

      <section className={styles.hero}>
        <p className={styles.kicker}>FINANCING</p>
        <h1>See the $3,495 price.<br /><em>Then check your payment options.</em></h1>
        <p>
          Our current Complete Home promotional package is <strong>$3,495</strong> with standard installation.
          Hearth says its prequalification process uses a soft credit inquiry that does not affect your credit score.
          Financing is subject to lender approval and terms.
        </p>
        <div className={styles.actions}>
          {financingUrl ? (
            <a className={styles.primary} href={financingUrl} target="_blank" rel="noopener noreferrer">
              Check my Hearth options — soft pull
            </a>
          ) : (
            <a className={styles.primary} href={phoneHref}>Get the secure Hearth link</a>
          )}
          <Link className={styles.secondary} href="/water-check">Check my water first</Link>
        </div>
      </section>

      <section className={styles.split}>
        <div>
          <p className={styles.kicker}>NO GUESSING</p>
          <h2>Personalized options instead of a made-up monthly payment.</h2>
          <p>
            Hearth prequalification can show personalized payment options without affecting your credit score.
            A hard credit inquiry may occur only if you decide to move forward with a lender offer.
            Your actual approval, APR, term, fees, and monthly payment depend on the lender and your application.
          </p>
          <a href="https://gethearth.com/product-features-financing/" target="_blank" rel="noopener noreferrer nofollow">
            How Hearth financing works ↗
          </a>
        </div>
        <aside>
          <strong>$3,495</strong>
          <span>Current promotional package</span>
          <ul>
            <li>Whole-home water softener</li>
            <li>Kitchen reverse osmosis system</li>
            <li>Kitchen RO faucet</li>
            <li>Standard installation</li>
            <li>Qualified lifetime warranty · written terms apply</li>
          </ul>
          <small>
            Tax, permits, electrical work, trenching, code upgrades, existing-equipment removal,
            major plumbing modifications, and difficult/nonstandard installations are additional when required.
          </small>
        </aside>
      </section>

      {calculatorEmbedUrl ? (
        <section className={styles.calculator} aria-labelledby="financing-calculator-title">
          <p className={styles.kicker}>PAYMENT OPTIONS</p>
          <h2 id="financing-calculator-title">See financing inside Hearth&apos;s secure experience.</h2>
          <iframe
            title="Hearth financing calculator"
            src={calculatorEmbedUrl}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <p className={styles.disclosure}>
            Hearth prequalification uses a soft credit inquiry with no score impact. If you accept or finalize a lender offer,
            the lender may perform a hard credit inquiry. Central Valley Pure Water does not guarantee approval, a specific rate,
            term, fee, or monthly payment. Review all lender disclosures before accepting an offer.
          </p>
        </section>
      ) : (
        <section className={styles.calculator} aria-labelledby="financing-calculator-title">
          <p className={styles.kicker}>SECURE HEARTH LINK</p>
          <h2 id="financing-calculator-title">Check the real options tied to your credit profile.</h2>
          <p>
            We use Hearth&apos;s branded prequalification experience instead of estimating a payment ourselves.
            That keeps the payment options personalized and avoids advertising a rate or payment you may not actually qualify for.
          </p>
          {financingUrl ? (
            <a className={styles.primary} href={financingUrl} target="_blank" rel="noopener noreferrer">Open Hearth prequalification</a>
          ) : (
            <a className={styles.primary} href={phoneHref}>Call {phoneDisplay} for the secure link</a>
          )}
        </section>
      )}

      <section className={styles.steps}>
        <article><span>1</span><h3>Check your water</h3><p>See the likely supplier, public monitoring snapshot, and treatment starting point.</p></article>
        <article><span>2</span><h3>See the $3,495 scope</h3><p>Know what the Standard Complete Home package includes before financing.</p></article>
        <article><span>3</span><h3>Prequalify with Hearth</h3><p>Review personalized payment options using a soft credit inquiry with no score impact.</p></article>
      </section>

      <section className={styles.cta}>
        <h2>Start with your water report.</h2>
        <p>Then compare the recommended treatment path, package price, warranty terms, and financing options in one place.</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/water-check">Free water check</Link>
          <a className={styles.secondary} href={phoneHref}>Call {phoneDisplay}</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/">Home</Link>
        <Link href="/partners">Partner program</Link>
        <Link href="/water-check">Free water check</Link>
        <a href={phoneHref}>{phoneDisplay}</a>
      </footer>
    </main>
  );
}
