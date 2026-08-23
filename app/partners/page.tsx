import type { Metadata } from "next";
import Link from "next/link";

import styles from "./partners.module.css";

const phoneDisplay = "(510) 725-5120";
const phoneHref = "tel:+15107255120";

export const metadata: Metadata = {
  title: "Referral Partner Program | Central Valley Pure Water",
  description:
    "Give Central Valley homeowners a trackable Water Check link and QR code. Eligible completed and paid installations can earn the referring partner a $100 digital gift card.",
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
        <p className={styles.kicker}>CV PURE WATER PARTNER NETWORK</p>
        <h1>Give clients a useful water check.<br /><em>Get $100 when a referral installs.</em></h1>
        <p className={styles.lede}>
          Your unique link and QR code send the homeowner straight to their free California Water Check.
          They see the likely supplier, public monitoring snapshot, treatment starting point, our $3,495 Standard package,
          qualified lifetime-warranty language, and the financing path. We handle everything after the click.
        </p>
        <div className={styles.actions}>
          <Link href="/water-check" className={styles.primary}>See the client Water Check</Link>
          <Link href="/financing" className={styles.secondary}>See the financing page</Link>
        </div>
        <p className={styles.finePrint}>
          $100 digital gift-card reward applies only to eligible referrals after a completed and paid installation.
          The homeowner should be told that the referring partner may receive a referral reward if the homeowner purchases.
          Program terms and applicable employer, brokerage, licensing, tax, and disclosure rules apply.
        </p>
      </section>

      <section className={styles.how}>
        <div><strong>01</strong><h2>Share your exact link or QR</h2><p>Example: cvpurewater.com/r/yourcode. The referral code is attached for 30 days.</p></div>
        <div><strong>02</strong><h2>Client checks their water</h2><p>No signup is required to see the public-record Water Check and treatment path.</p></div>
        <div><strong>03</strong><h2>Client sees price + financing</h2><p>$3,495 Standard offer, qualified lifetime-warranty language, and Hearth financing information are visible online.</p></div>
        <div><strong>04</strong><h2>You get the reward</h2><p>After an eligible referred installation is completed and paid, the $100 digital gift card becomes due.</p></div>
      </section>

      <section className={styles.audience}>
        <p className={styles.kicker}>BUILT FOR PEOPLE WHO ALREADY KNOW HOMEOWNERS</p>
        <h2>Useful for the client. Almost no work for the partner.</h2>
        <div className={styles.chips}>
          {partnerTypes.map((type) => <span key={type}>{type}</span>)}
        </div>
      </section>

      <section className={styles.offer}>
        <div>
          <p className={styles.kicker}>WHAT YOUR CLIENT SEES</p>
          <h2>Water report first. System match second. Price before the sales call.</h2>
          <p>
            Current Standard Complete Home promotional package: whole-home water softener + kitchen reverse osmosis
            + RO faucet + standard installation for <strong>$3,495</strong>. Qualified lifetime warranty; written terms,
            eligibility requirements, exclusions, and covered components control.
          </p>
          <p>
            Costco&apos;s current EcoWater whole-home program directs shoppers to an in-home consultation for system pricing.
            We publish our Standard package price up front so homeowners can compare current written scopes and quotes.
          </p>
          <Link href="/water-check" className={styles.primary}>Open the Water Check</Link>
        </div>
        <aside>
          <span>Hearth financing</span>
          <strong>Clients can check personalized payment options with a soft pull.</strong>
          <p>
            Hearth states that prequalification uses a soft credit inquiry with no impact to the credit score.
            If the homeowner chooses to move forward with a lender offer, additional lender steps may include a hard inquiry.
            Approval, rates, terms, fees, and monthly payments vary by lender and applicant.
          </p>
          <Link href="/financing">Open CV Pure Water financing</Link>
        </aside>
      </section>

      <section className={styles.cta}>
        <h2>Your partner link should be sent, not requested.</h2>
        <p>
          Approved partners receive the exact Water Check link and QR code assigned to their referral code.
          Put it in buyer packets, inspection follow-ups, email signatures, texts, and post-closing messages.
          If you are not assigned yet, call us once and we will activate the code.
        </p>
        <div className={styles.actions}>
          <a href={phoneHref} className={styles.primary}>Activate a partner code</a>
          <Link href="/water-check" className={styles.secondary}>Preview the client experience</Link>
        </div>
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
