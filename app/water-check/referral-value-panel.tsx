"use client";

import { useEffect, useState } from "react";

import styles from "./referral-value-panel.module.css";

type ReferralValuePanelProps = {
  variant: "banner" | "value";
};

const CODE_PATTERN = /^[a-z0-9][a-z0-9-]{1,39}$/i;
const HEARTH_APPLICATION_URL =
  "https://app.gethearth.com/partners/supreme-pro-builders/motuma/apply";

export function ReferralValuePanel({ variant }: ReferralValuePanelProps) {
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const value = new URLSearchParams(window.location.search).get("ref")?.trim().toLowerCase() ?? "";
      setReferralCode(CODE_PATTERN.test(value) ? value : "");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (variant === "banner") {
    if (!referralCode) return null;

    return (
      <aside className={styles.referralBanner} aria-label="Referral disclosure">
        <div>
          <span className={styles.badge}>PARTNER REFERRAL ACTIVE</span>
          <strong>Your referral code is attached.</strong>
          <p>
            Complete the free Water Check below. If you purchase through this referral,
            the referring partner may receive a $100 digital gift card after an eligible
            completed and paid installation.
          </p>
        </div>
        <code>{referralCode}</code>
      </aside>
    );
  }

  return (
    <section className={styles.valueSection} aria-labelledby="cvpw-value-heading">
      <div className={styles.valueHeading}>
        <p>COMPARE BEFORE YOU BOOK A SALES APPOINTMENT</p>
        <h2 id="cvpw-value-heading">A clear package, a clear price, and a financing path you can check yourself.</h2>
        <span>
          Use your water report to understand the starting treatment path, then compare the
          actual scope and written quote with any retailer or water-treatment company you are considering.
        </span>
      </div>

      <div className={styles.valueGrid}>
        <article>
          <span>UP-FRONT INSTALLED PRICES</span>
          <strong>From $3,495</strong>
          <p>Standard $3,495, Standard Plus $3,995, and Dual Tank Full $5,495 with standard installation.</p>
        </article>
        <article>
          <span>WHAT IS INCLUDED</span>
          <strong>Softener + RO</strong>
          <p>Whole-home water softener, kitchen reverse-osmosis system, RO faucet, and standard installation.</p>
        </article>
        <article>
          <span>WARRANTY</span>
          <strong>Qualified lifetime warranty</strong>
          <p>Written warranty terms, eligibility requirements, exclusions, and covered components control.</p>
        </article>
        <article>
          <span>FINANCING</span>
          <strong>Check options with a soft pull</strong>
          <p>Hearth prequalification can show personalized payment options without affecting your credit score.</p>
        </article>
      </div>

      <div className={styles.compareRow}>
        <div>
          <span>WHY THIS IS EASIER TO COMPARE</span>
          <h3>Costco / EcoWater currently sends whole-home shoppers to an in-home consultation for system pricing.</h3>
          <p>
            We publish the $3,495 Standard package price before an appointment. Costco and EcoWater products,
            promotions, warranty terms, and installed pricing can change, so compare current written scopes and quotes.
          </p>
          <a
            href="https://www.costco.com/f/-/ecowater-water-treatment-systems"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            See Costco&apos;s current EcoWater program ↗
          </a>
        </div>
        <aside>
          <span>PAYMENT OPTIONS</span>
          <strong>See what is available for your $3,495 system.</strong>
          <p>
            Checking Hearth prequalification options uses a soft credit inquiry with no score impact.
            If you choose to move forward with a lender offer, additional lender steps may include a hard credit inquiry.
            Approval, rates, terms, fees, and payments depend on the lender and applicant.
          </p>
          <a href={HEARTH_APPLICATION_URL} target="_blank" rel="noopener noreferrer">
            Check Hearth financing options →
          </a>
        </aside>
      </div>

      <p className={styles.exclusions}>
        Standard offer excludes sales tax, permits, electrical work, trenching, code upgrades,
        removal of existing equipment, major plumbing modifications, difficult/nonstandard installations,
        and other work outside standard installation when required.
      </p>
    </section>
  );
}
