import type { Metadata } from "next";
import Link from "next/link";

import styles from "./partners.module.css";

const phoneDisplay = "(510) 725-5120";
const phoneHref = "tel:+15107255120";

export const metadata: Metadata = {
  title: "Referral Partner Program | Central Valley Pure Water",
  description:
    "Refer Central Valley homeowners to Central Valley Pure Water with a trackable partner link. Eligible completed installations can earn a $100 referral reward.",
  alternates: { canonical: "/partners" },
};

const partnerTypes = [
  "Realtors & brokerages",
  "Home inspectors",
  "Contractors & plumbers",
  "Property managers",
  "Builders & designers",
  "Past customers",
];

export default function PartnersPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Central Valley Pure Water</Link>
        <a href={phoneHref}>{phoneDisplay}</a>
      </header>

      <section className={styles.hero}>
        <p className={styles.kicker}>CV PURE WATER PARTNERS</p>
        <h1>Send a homeowner.<br /><em>Get $100 when they install.</em></h1>
        <p className={styles.lede}>
          We give you a trackable referral link. You send it. We handle the water check,
          quote, financing options, and installation.
        </p>
        <div className={styles.actions}>
          <a href="mailto:info@cvpurewater.com?subject=CV%20Pure%20Water%20Partner%20Link" className={styles.primary}>
            Get my referral link
          </a>
          <a href={phoneHref} className={styles.secondary}>Call us</a>
        </div>
        <p className={styles.finePrint}>
          $100 reward applies to eligible referrals after a completed, paid installation.
          Program terms and applicable employer, brokerage, licensing, tax, and disclosure rules apply.
        </p>
      </section>

      <section className={styles.how}>
        <div><strong>01</strong><h2>You get a link</h2><p>Example: cvpurewater.com/r/yourcode</p></div>
        <div><strong>02</strong><h2>They check their water</h2><p>Your code stays attached for 30 days.</p></div>
        <div><strong>03</strong><h2>We do the rest</h2><p>Quote, financing options, installation, follow-up.</p></div>
        <div><strong>04</strong><h2>You get rewarded</h2><p>After an eligible completed installation.</p></div>
      </section>

      <section className={styles.audience}>
        <p className={styles.kicker}>BUILT FOR PEOPLE WHO ALREADY KNOW HOMEOWNERS</p>
        <h2>Easy to share. Zero water sales pitch required.</h2>
        <div className={styles.chips}>
          {partnerTypes.map((type) => <span key={type}>{type}</span>)}
        </div>
      </section>

      <section className={styles.offer}>
        <div>
          <p className={styles.kicker}>WHAT YOUR CLIENT SEES</p>
          <h2>Clear price. No 90-minute kitchen-table pitch.</h2>
          <p>
            Current promotional package: whole-home water softener + kitchen reverse osmosis
            + RO faucet + standard installation for <strong>$3,495</strong>.
          </p>
          <Link href="/water-check" className={styles.primary}>Try the free water check</Link>
        </div>
        <aside>
          <span>Financing available</span>
          <strong>Let the homeowner review payment options.</strong>
          <p>Financing through Hearth is subject to approval and lender terms.</p>
          <Link href="/financing">See financing</Link>
        </aside>
      </section>

      <section className={styles.cta}>
        <h2>Want your link + QR kit?</h2>
        <p>We’ll set up your referral code and give you a one-tap link to send clients.</p>
        <a href="mailto:info@cvpurewater.com?subject=Set%20Up%20My%20CVPW%20Referral%20Code" className={styles.primary}>
          Set me up
        </a>
      </section>

      <footer className={styles.footer}>
        <Link href="/">Home</Link>
        <Link href="/water-check">Free water check</Link>
        <Link href="/financing">Financing</Link>
        <a href={phoneHref}>{phoneDisplay}</a>
      </footer>
    </main>
  );
}
