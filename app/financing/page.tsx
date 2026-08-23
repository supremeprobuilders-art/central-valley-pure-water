import type { Metadata } from "next";
import Link from "next/link";

import styles from "./financing.module.css";

const phoneDisplay = "(510) 725-5120";
const phoneHref = "tel:+15107255120";

export const metadata: Metadata = {
  title: "Water System Financing | Central Valley Pure Water",
  description:
    "Explore financing for an eligible Central Valley Pure Water project. Financing through Hearth is subject to approval and lender terms.",
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
        <h1>Know the full price.<br /><em>Then see your options.</em></h1>
        <p>
          Our current complete-home promotional package is <strong>$3,495</strong> with standard installation.
          Financing is available through Hearth for qualified applicants, subject to lender approval and terms.
        </p>
        <div className={styles.actions}>
          {financingUrl ? (
            <a className={styles.primary} href={financingUrl} target="_blank" rel="noopener noreferrer">
              Check financing options
            </a>
          ) : (
            <a className={styles.primary} href={phoneHref}>Ask about financing</a>
          )}
          <Link className={styles.secondary} href="/water-check">Check my water first</Link>
        </div>
      </section>

      <section className={styles.split}>
        <div>
          <p className={styles.kicker}>SIMPLE BY DESIGN</p>
          <h2>No fake “$49/mo” headline.</h2>
          <p>
            Your actual payment, APR, term, fees, and approval are determined by the financing offers available to you.
            We show the project price first and let the financing process show the real options.
          </p>
        </div>
        <aside>
          <strong>$3,495</strong>
          <span>Current promotional package</span>
          <ul>
            <li>Whole-home water softener</li>
            <li>Kitchen reverse osmosis system</li>
            <li>Kitchen RO faucet</li>
            <li>Standard installation</li>
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
          <h2 id="financing-calculator-title">Explore financing in Hearth’s secure experience.</h2>
          <iframe
            title="Hearth financing calculator"
            src={calculatorEmbedUrl}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <p className={styles.disclosure}>
            Financing is offered through Hearth’s network for qualified applicants. Central Valley Pure Water does not
            guarantee approval, a specific rate, term, fee, or monthly payment. Review the lender’s disclosures before accepting an offer.
          </p>
        </section>
      ) : (
        <section className={styles.calculator} aria-labelledby="financing-calculator-title">
          <p className={styles.kicker}>PAYMENT OPTIONS</p>
          <h2 id="financing-calculator-title">Want to see what financing could look like?</h2>
          <p>
            Call us and we’ll send the current Central Valley Pure Water financing link. We don’t publish sample payments
            that may not match the offer available to you.
          </p>
          <a className={styles.primary} href={phoneHref}>Call {phoneDisplay}</a>
        </section>
      )}

      <section className={styles.steps}>
        <article><span>1</span><h3>See your system price</h3><p>Know the project price and scope first.</p></article>
        <article><span>2</span><h3>Review financing</h3><p>Use the current Hearth experience to view available options.</p></article>
        <article><span>3</span><h3>Choose what works</h3><p>Financing is optional. You decide whether to accept an offer.</p></article>
      </section>

      <section className={styles.cta}>
        <h2>Not sure which system fits?</h2>
        <p>Start with the free water check, then see the package that fits your home.</p>
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
