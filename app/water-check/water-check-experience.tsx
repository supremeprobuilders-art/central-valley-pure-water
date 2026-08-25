"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  PHONE_DISPLAY,
  PHONE_HREF,
  formatCount,
  formatDate,
  type SystemDetailResponse,
  type WaterSystem,
  type ZipLookupResponse,
} from "./water-check-data";
import { WaterReportPanel } from "./water-report-panel";
import styles from "./water-check.module.css";

type Concern = "hard-water" | "drinking-water" | "both" | "private-well";

interface ApiErrorBody {
  error?: { code?: string; message?: string };
}

interface Recommendation {
  label: string;
  title: string;
  description: string;
  bullets: string[];
  offerFit: boolean;
}

const concerns: Array<{ value: Concern; title: string; detail: string }> = [
  {
    value: "hard-water",
    title: "Scale, spots, or hard-water feel",
    detail: "Whole-home concern",
  },
  {
    value: "drinking-water",
    title: "Drinking and cooking water",
    detail: "Kitchen-sink concern",
  },
  {
    value: "both",
    title: "Both whole-home and drinking water",
    detail: "Complete-home concern",
  },
];

const recommendations: Record<Concern, Recommendation> = {
  "hard-water": {
    label: "Recommended conversation",
    title: "Start with a whole-home water softener assessment.",
    description:
      "Scale, spotting, and hard-water feel are household-condition questions, not an EPA compliance score. We confirm the water source, household demand, plumbing, drain, power, and installation location before sizing equipment.",
    bullets: [
      "Discuss scale and spotting throughout the home",
      "Confirm system sizing and installation conditions",
      "Review whether kitchen RO should be added separately",
    ],
    offerFit: false,
  },
  "drinking-water": {
    label: "Recommended conversation",
    title: "Start with a kitchen reverse-osmosis assessment.",
    description:
      "A dedicated under-sink RO system is designed for drinking and cooking water at one faucet. The public record helps frame the conversation, but equipment should be selected for your current source, household goals, and installation conditions.",
    bullets: [
      "Focus treatment at the kitchen drinking-water faucet",
      "Confirm under-sink space and connection conditions",
      "Review maintenance and filter-change expectations",
    ],
    offerFit: false,
  },
  both: {
    label: "Strongest package fit to discuss",
    title: "The Complete Home System matches both goals.",
    description:
      "This package combines whole-home water softening with a dedicated reverse-osmosis drinking-water system at the kitchen sink. A phone assessment confirms whether the package and standard installation fit your home.",
    bullets: [
      "Whole-home water softener",
      "Reverse-osmosis drinking-water system",
      "Kitchen RO faucet and standard installation",
    ],
    offerFit: true,
  },
  "private-well": {
    label: "Recommended first step",
    title: "Start with property-specific testing and a well-water assessment.",
    description:
      "Public-system records do not describe a private well. Well conditions can vary from one property to the next, so equipment should not be selected from a ZIP-level report alone.",
    bullets: [
      "Identify the current well and household concerns",
      "Review recent property-specific laboratory results when available",
      "Choose equipment only after the water and installation are assessed",
    ],
    offerFit: false,
  },
};

function track(event: string, details: Record<string, unknown> = {}) {
  const browserWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };
  browserWindow.dataLayer?.push({ event, ...details });
}

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  const body = (await response.json().catch(() => ({}))) as T & ApiErrorBody;

  if (!response.ok) {
    throw new Error(body.error?.message ?? "The water check could not be completed.");
  }

  return body;
}

function systemSubtitle(system: WaterSystem): string {
  const parts = [system.county ? `${system.county} County` : null, system.pwsId];
  return parts.filter(Boolean).join(" · ");
}

function cleanClassification(value: string | null): string {
  if (!value) return "Not listed";
  return value
    .replace(/\bNTNCWS\b/gi, "Non-transient non-community system")
    .replace(/\bTNCWS\b/gi, "Transient non-community system")
    .replace(/\bCWS\b/gi, "Community water system");
}

export function WaterCheckExperience() {
  const [zip, setZip] = useState("");
  const [lookup, setLookup] = useState<ZipLookupResponse | null>(null);
  const [detail, setDetail] = useState<SystemDetailResponse | null>(null);
  const [selectedPwsId, setSelectedPwsId] = useState("");
  const [waterSource, setWaterSource] = useState<"public" | "private-well" | null>(null);
  const [concern, setConcern] = useState<Concern | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailError, setDetailError] = useState("");
  const lookupController = useRef<AbortController | null>(null);
  const detailController = useRef<AbortController | null>(null);
  const resultsHeading = useRef<HTMLHeadingElement | null>(null);

  const runLookup = useCallback(async (requestedZip: string, updateAddress = true) => {
    const normalized = requestedZip.trim();
    if (!/^\d{5}$/.test(normalized)) {
      setError("Enter a five-digit ZIP code.");
      return;
    }

    lookupController.current?.abort();
    detailController.current?.abort();
    const controller = new AbortController();
    lookupController.current = controller;

    setLookupLoading(true);
    setError("");
    setDetailError("");
    setLookup(null);
    setDetail(null);
    setSelectedPwsId("");
    setWaterSource(null);
    setConcern(null);

    try {
      const data = await getJson<ZipLookupResponse>(
        `/api/water-check?zip=${encodeURIComponent(normalized)}`,
        controller.signal,
      );
      setLookup(data);
      setZip(normalized);
      if (updateAddress) {
        window.history.replaceState({}, "", `/water-check?zip=${encodeURIComponent(normalized)}`);
      }
      track("water_check_success", {
        zip_prefix: normalized.slice(0, 3),
        system_count: data.totalSystems,
        match_method: data.matchMethod,
      });
      window.setTimeout(() => resultsHeading.current?.focus(), 0);
    } catch (caught) {
      if (controller.signal.aborted) return;
      const message = caught instanceof Error ? caught.message : "The water check could not be completed.";
      setError(message);
      track("water_check_error", { placement: "water_check_page" });
    } finally {
      if (!controller.signal.aborted) setLookupLoading(false);
    }
  }, []);

  async function selectSystem(system: WaterSystem) {
    detailController.current?.abort();
    const controller = new AbortController();
    detailController.current = controller;

    setSelectedPwsId(system.pwsId);
    setDetail(null);
    setDetailError("");
    setDetailLoading(true);
    setWaterSource("public");
    setConcern(null);
    track("water_system_select", { pws_id: system.pwsId, center_match: system.centerMatch });

    try {
      const data = await getJson<SystemDetailResponse>(
        `/api/water-check?pws=${encodeURIComponent(system.pwsId)}`,
        controller.signal,
      );
      setDetail(data);
    } catch (caught) {
      if (controller.signal.aborted) return;
      setDetailError(
        caught instanceof Error
          ? caught.message
          : "The system details could not be loaded.",
      );
    } finally {
      if (!controller.signal.aborted) setDetailLoading(false);
    }
  }

  function selectPrivateWell() {
    detailController.current?.abort();
    setSelectedPwsId("");
    setDetail(null);
    setDetailError("");
    setDetailLoading(false);
    setWaterSource("private-well");
    setConcern("private-well");
    track("water_system_select", { pws_id: null, source: "private_well" });
    track("water_recommendation_view", { concern: "private-well", pws_id: null });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    track("water_check_start", { zip_prefix: zip.trim().slice(0, 3), placement: "water_check_page" });
    void runLookup(zip);
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const initialZip = new URLSearchParams(window.location.search).get("zip")?.trim() ?? "";
      if (/^\d{5}$/.test(initialZip)) {
        setZip(initialZip);
        track("water_check_start", {
          zip_prefix: initialZip.slice(0, 3),
          placement: "water_check_query",
        });
        void runLookup(initialZip, false);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      lookupController.current?.abort();
      detailController.current?.abort();
    };
  }, [runLookup]);

  const recommendation =
    waterSource === "private-well"
      ? recommendations["private-well"]
      : concern
        ? recommendations[concern]
        : null;

  return (
    <section className={styles.experience} aria-labelledby="water-check-tool-heading">
      <div className={styles.toolIntro}>
        <span className={styles.stepLabel}>Step 1 of 3</span>
        <h2 id="water-check-tool-heading">Enter your California ZIP code</h2>
        <p>No email address, account, or sales form is required.</p>
      </div>

      <form className={styles.lookupForm} onSubmit={submit} noValidate>
        <label htmlFor="water-check-zip">California ZIP code</label>
        <div className={styles.lookupRow}>
          <input
            id="water-check-zip"
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
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "water-check-error water-check-helper" : "water-check-helper"}
          />
          <button type="submit" disabled={lookupLoading}>
            {lookupLoading ? "Checking official sources…" : "Check my water"}
            {!lookupLoading ? <span aria-hidden="true">→</span> : null}
          </button>
        </div>
        {error ? <p className={styles.formError} id="water-check-error" role="alert">{error}</p> : null}
        <p className={styles.formNote} id="water-check-helper">
          This is an area-level public-record lookup, not a laboratory test of water at your tap.
        </p>
      </form>

      <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
        {lookupLoading ? "Checking California and EPA public records." : ""}
      </div>

      {lookup ? (
        <div className={styles.resultsShell}>
          <div className={styles.resultsHeader}>
            <div>
              <span className={styles.stepLabel}>Step 2 of 3</span>
              <h2 ref={resultsHeading} tabIndex={-1}>
                Possible systems for {lookup.areaLabel}
              </h2>
              <p>
                Select the provider shown on your water bill. A ZIP can overlap more
                than one service area, and some homes use private wells.
              </p>
            </div>
            <span className={styles.resultCount}>
              {lookup.totalSystems === 1 ? "1 possible system" : `${lookup.totalSystems} possible systems`}
            </span>
          </div>

          {lookup.systems.length > 0 ? (
            <ul className={styles.systemList} aria-label="Possible public water systems">
              {lookup.systems.map((system, index) => {
                const selected = selectedPwsId === system.pwsId;
                return (
                  <li key={system.pwsId}>
                    <button
                      className={`${styles.systemChoice}${selected ? ` ${styles.systemChoiceSelected}` : ""}`}
                      type="button"
                      onClick={() => void selectSystem(system)}
                      aria-pressed={selected}
                    >
                      <span className={styles.systemRank}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={styles.systemChoiceCopy}>
                        <span className={styles.systemBadges}>
                          {system.centerMatch ? <strong>Best ZIP-center match</strong> : <em>Overlaps part of ZIP</em>}
                          {system.verificationStatus ? <em>{system.verificationStatus} boundary</em> : null}
                        </span>
                        <b>{system.name}</b>
                        <small>{systemSubtitle(system)}</small>
                      </span>
                      <span className={styles.chooseArrow} aria-hidden="true">{selected ? "✓" : "→"}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.noMatchCard}>
              <span aria-hidden="true">⌖</span>
              <div>
                <h3>No public-system boundary was confirmed for this ZIP.</h3>
                <p>
                  This can happen with private wells, PO-box-only ZIP codes, or gaps in
                  the state boundary layer. It does not mean the area has no water provider.
                </p>
                <button type="button" onClick={selectPrivateWell}>I use a private well</button>
              </div>
            </div>
          )}

          {lookup.systems.length > 0 ? (
            <button
              className={`${styles.privateWellChoice}${waterSource === "private-well" ? ` ${styles.privateWellChoiceSelected}` : ""}`}
              type="button"
              onClick={selectPrivateWell}
              aria-pressed={waterSource === "private-well"}
            >
              <span aria-hidden="true">⌂</span>
              <span>
                <strong>None of these—I use a private well</strong>
                <small>Skip public-system records and continue with a property-specific path.</small>
              </span>
              <b aria-hidden="true">→</b>
            </button>
          ) : null}

          {lookup.truncated ? (
            <p className={styles.noticeStrong}>
              This ZIP overlaps more systems than can be shown here. Confirm the PWSID on
              the bill or call us for help identifying the correct provider.
            </p>
          ) : null}

          <details className={styles.matchNotes}>
            <summary>How this ZIP match works <span aria-hidden="true">+</span></summary>
            <ul>
              {lookup.notices.map((notice) => <li key={notice}>{notice}</li>)}
            </ul>
          </details>
        </div>
      ) : null}

      {detailLoading ? (
        <div className={styles.loadingCard} role="status">
          <span className={styles.spinner} aria-hidden="true" />
          Loading the selected public water system…
        </div>
      ) : null}

      {detailError ? <p className={styles.detailError} role="alert">{detailError}</p> : null}

      {detail ? (
        <div className={styles.report}>
          <div className={styles.reportHeading}>
            <div>
              <span className={styles.stepLabel}>Selected public water system</span>
              <h2>{detail.system.name}</h2>
              <p>{systemSubtitle(detail.system)}</p>
              <small className={styles.sourceStamp}>Official sources checked {formatDate(detail.generatedAt)}</small>
            </div>
            <a
              className={styles.officialLink}
              href={detail.officialLinks.californiaDrinkingWaterWatch}
              target="_blank"
              rel="noreferrer"
            >
              Open California Drinking Water Watch <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className={styles.factGrid}>
            <div><span>Public system ID</span><strong>{detail.system.pwsId}</strong></div>
            <div><span>Population listed</span><strong>{formatCount(detail.system.population)}</strong></div>
            <div><span>Service connections</span><strong>{formatCount(detail.system.serviceConnections)}</strong></div>
            <div><span>Federal classification</span><strong>{cleanClassification(detail.system.federalClassification)}</strong></div>
            <div>
              <span>Boundary record</span>
              <strong>
                {[detail.system.boundaryType, detail.system.verificationStatus].filter(Boolean).join(" · ") || "Not listed"}
              </strong>
            </div>
            <div><span>Boundary verified</span><strong>{formatDate(detail.system.verifiedDate)}</strong></div>
          </div>

          <WaterReportPanel system={detail.system} />

          <section className={styles.violationSection} aria-labelledby="epa-record-heading">
            <div className={styles.violationHeading}>
              <div>
                <p className={styles.kicker}><span /> EPA compliance record</p>
                <h3 id="epa-record-heading">
                  {detail.violations.status === "source-unavailable"
                    ? "EPA violation data source status"
                    : `Violation records returned for the last ${detail.violations.lookbackYears} years`}
                </h3>
              </div>
              <div className={styles.violationNumber}>
                <strong>{detail.violations.status === "source-unavailable" ? "—" : detail.violations.distinctRecords}</strong>
                <span>{detail.violations.status === "source-unavailable" ? "source unavailable" : "distinct records"}</span>
              </div>
            </div>

            {detail.violations.status === "records-returned" ? (
              <div className={styles.violationList}>
                {detail.violations.records.map((record) => (
                  <article key={record.id}>
                    <div>
                      <span>{record.violationType ?? "Record"}</span>
                      <h4>{record.contaminantName}</h4>
                      <p>{record.violationName}</p>
                    </div>
                    <dl>
                      <div><dt>Compliance period ended</dt><dd>{formatDate(record.compliancePeriodEnd)}</dd></div>
                      <div><dt>Latest listed action</dt><dd>{record.latestEnforcementAction ?? "Not listed"}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            ) : (
              <div
                className={`${styles.clearRecordCard}${detail.violations.status === "source-unavailable" ? ` ${styles.unavailableRecordCard}` : ""}`}
              >
                <span aria-hidden="true">{detail.violations.status === "source-unavailable" ? "!" : "i"}</span>
                <p>{detail.violations.sourceNote}</p>
              </div>
            )}

            {detail.violations.status === "records-returned" ? (
              <p className={styles.sourceNote}>{detail.violations.sourceNote}</p>
            ) : null}
            <a
              className={styles.textLink}
              href={detail.officialLinks.epaViolationData}
              target="_blank"
              rel="noreferrer"
            >
              View the raw EPA endpoint for {detail.system.pwsId} <span aria-hidden="true">↗</span>
            </a>
          </section>
        </div>
      ) : null}

      {waterSource === "private-well" ? (
        <section className={styles.recommendationSection} aria-labelledby="recommendation-heading">
          <div className={styles.recommendationPrompt}>
            <span className={styles.stepLabel}>Step 3 of 3</span>
            <h2 id="recommendation-heading">
              {waterSource === "private-well"
                ? "Start with your private well and property."
                : "What do you want to improve at home?"}
            </h2>
            <p>
              {waterSource === "private-well"
                ? "Public-system records do not describe an individual well, so this path stays property-specific."
                : "The choice below guides the next conversation. It is not a claim that a system treats every item in a public report."}
            </p>
          </div>

          {waterSource !== "private-well" ? (
            <fieldset className={styles.concernGrid}>
              <legend className={styles.srOnly}>Choose your main water concern</legend>
              {concerns.map((item) => (
                <label
                  className={`${styles.concernChoice}${concern === item.value ? ` ${styles.concernChoiceSelected}` : ""}`}
                  key={item.value}
                >
                  <input
                    type="radio"
                    name="water-concern"
                    value={item.value}
                    checked={concern === item.value}
                    onChange={() => {
                      setConcern(item.value);
                      track("water_recommendation_view", {
                        concern: item.value,
                        pws_id: detail?.system.pwsId ?? (selectedPwsId || null),
                      });
                    }}
                  />
                  <span className={styles.radioMark} aria-hidden="true" />
                  <span><strong>{item.title}</strong><small>{item.detail}</small></span>
                </label>
              ))}
            </fieldset>
          ) : null}

          {recommendation ? (
            <div className={styles.recommendationCard}>
              <div className={styles.recommendationCopy}>
                <span className={styles.recommendationLabel}>{recommendation.label}</span>
                <h3>{recommendation.title}</h3>
                <p>{recommendation.description}</p>
                <ul>
                  {recommendation.bullets.map((bullet) => <li key={bullet}><span>✓</span>{bullet}</li>)}
                </ul>
                <a
                  className={styles.primaryCall}
                  href={PHONE_HREF}
                  onClick={() => track("water_check_call", {
                    concern,
                    pws_id: detail?.system.pwsId ?? (selectedPwsId || null),
                    source: waterSource,
                  })}
                >
                  <span aria-hidden="true">☎</span>
                  Call {PHONE_DISPLAY}
                </a>
              </div>

              <aside className={styles.offerCard}>
                <span>Current complete-home offer</span>
                <div className={styles.offerPrice}>
                  <small>Regularly $4,995</small>
                  <strong>$3,495</strong>
                </div>
                <ul>
                  <li>Whole-home water softener</li>
                  <li>Reverse-osmosis drinking-water system</li>
                  <li>Kitchen RO faucet</li>
                  <li>Standard installation</li>
                </ul>
                {recommendation.offerFit ? <p className={styles.fitBadge}>This package matches the goals you selected.</p> : null}
                <p className={styles.financing}>Financing available through Hearth, subject to approval and lender terms.</p>
              </aside>
            </div>
          ) : null}
        </section>
      ) : null}

      {(lookup || detail) ? (
        <div className={styles.disclosureBox}>
          <strong>Important report and pricing disclosures</strong>
          <p>
            Area-level public records may not reflect current conditions at your tap or
            plumbing inside your home. This lookup is informational, not a laboratory
            test, medical advice, or a guarantee that specific equipment is appropriate.
            Confirm current information with your utility and its Consumer Confidence Report.
          </p>
          <p>
            The $3,495 offer includes the listed equipment and standard installation.
            Tax, permits, electrical work, trenching, code upgrades, removal of existing
            equipment, major plumbing modifications, and difficult or nonstandard
            installations are not included and may cost extra.
          </p>
        </div>
      ) : null}
    </section>
  );
}
