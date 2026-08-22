"use client";

import { useState, type FormEvent } from "react";

import styles from "./water-check-launcher.module.css";

function track(event: string, details: Record<string, unknown> = {}) {
  const browserWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };
  browserWindow.dataLayer?.push({ event, ...details });
}

export function WaterCheckLauncher() {
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = zip.trim();

    if (!/^\d{5}$/.test(normalized)) {
      setError("Enter a five-digit ZIP code.");
      return;
    }

    setError("");
    track("water_check_start", { zip_prefix: normalized.slice(0, 3), placement: "homepage" });
    window.location.assign(`/water-check?zip=${encodeURIComponent(normalized)}`);
  }

  return (
    <section className={styles.launcherSection} aria-labelledby="free-water-check-heading">
      <div className={styles.launcherGlow} aria-hidden="true" />
      <div className={styles.launcherCopy}>
        <p className={styles.kicker}><span /> Free California water check</p>
        <h2 id="free-water-check-heading">
          Your supplier. Your water snapshot. <em>Your system match.</em>
        </h2>
        <p>
          Enter a California ZIP code. We find the likely water supplier automatically,
          simplify selected recent public monitoring records, then show the treatment
          path and current package pricing. See the report before giving us any contact info.
        </p>
        <ul className={styles.launcherBenefits}>
          <li><span aria-hidden="true">✓</span> Supplier found automatically</li>
          <li><span aria-hidden="true">✓</span> Simple listed-limit comparisons</li>
          <li><span aria-hidden="true">✓</span> System match + price path</li>
        </ul>
      </div>

      <div className={styles.launcherFormCard}>
        <span className={styles.stepLabel}>Start your free check</span>
        <form onSubmit={submit} noValidate>
          <label htmlFor="home-water-check-zip">California ZIP code</label>
          <div className={styles.zipRow}>
            <input
              id="home-water-check-zip"
              name="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              pattern="[0-9]{5}"
              placeholder="95351"
              value={zip}
              onChange={(event) => {
                setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
                if (error) setError("");
              }}
              aria-describedby={error ? "home-water-check-error home-water-check-note" : "home-water-check-note"}
              aria-invalid={Boolean(error)}
            />
            <button type="submit">See my water report <span aria-hidden="true">→</span></button>
          </div>
          {error ? <p className={styles.formError} id="home-water-check-error">{error}</p> : null}
          <p className={styles.formNote} id="home-water-check-note">
            Free public-record lookup. No signup required to see the report.
          </p>
        </form>
      </div>
    </section>
  );
}
