"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  PHONE_DISPLAY,
  PHONE_HREF,
  type WaterSystem,
  type ZipLookupResponse,
} from "./water-check-data";
import styles from "./sales-water-check.module.css";

type Tier = "standard" | "plus" | "dual";
type PointContext = "delivered" | "source" | "other";
type AnalyteStatus =
  | "above-listed-mcl"
  | "detected-below-listed-mcl"
  | "detected-no-listed-mcl"
  | "source-detection";

interface ApiErrorBody {
  error?: { message?: string };
}

interface ReportAnalyte {
  id: string;
  name: string;
  unit: string;
  status: AnalyteStatus;
  context: PointContext;
  detectionCount: number;
  latestSampleDate: string | null;
  minDetected: number | null;
  maxDetected: number | null;
  listedMcl: number | null;
  maxPercentOfListedMcl: number | null;
  resultSummary: string;
  comparisonSummary: string;
}

interface WaterReportResponse {
  pwsId: string;
  systemName: string;
  generatedAt: string;
  lookback: { months: number; start: string; end: string };
  status: "records-returned" | "no-recent-records";
  monitoringContext: "delivered" | "source" | "mixed" | "other";
  summary: {
    pointsReviewed: number;
    recordsReviewed: number;
    analytesReviewed: number;
    detectedAnalytes: number;
    aboveListedMcl: number;
    notDetectedAnalytes: number;
    latestSampleDate: string | null;
  };
  analytes: ReportAnalyte[];
  recommendation: {
    key: string;
    label: string;
    title: string;
    description: string;
    bullets: string[];
    evidence: string[];
    offerFit: boolean;
    confidence: "moderate" | "limited";
    servicePath: string;
  };
  notices: string[];
  officialLinks: {
    systemDetail: string;
    monitoringResults: string;
    dataDictionary: string;
  };
}

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
    throw new Error(body.error?.message ?? "We could not load this water report right now.");
  }
  return body;
}

function supplierName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase())
    .replace(/\bOf\b/g, "of")
    .replace(/\bThe\b/g, "the");
}

function formatDate(value: string | null): string {
  if (!value) return "Not listed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not listed";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatMultiplier(percent: number): string {
  const multiplier = percent / 100;
  if (multiplier >= 10) return `${Math.round(multiplier)}×`;
  if (multiplier >= 2) return `${multiplier.toFixed(1).replace(/\.0$/, "")}×`;
  return `${multiplier.toFixed(2).replace(/0$/, "").replace(/\.0$/, "")}×`;
}

function recommendationLabel(key: string): string {
  switch (key) {
    case "reverse-osmosis":
      return "Kitchen reverse osmosis";
    case "water-softener":
      return "Whole-home water softener";
    case "complete-home":
      return "Complete Home System";
    case "whole-home-filtration":
      return "Whole-home filtration";
    default:
      return "Water specialist review";
  }
}

const tierCopy: Record<Tier, { title: string; price: string; note: string }> = {
  standard: {
    title: "Standard",
    price: "$3,495",
    note: "Current Complete Home promotional package",
  },
  plus: {
    title: "Plus",
    price: "Personalized",
    note: "Upgrade pricing confirmed after home sizing",
  },
  dual: {
    title: "Dual Tank",
    price: "Personalized",
    note: "Dual-tank pricing confirmed after home sizing",
  },
};

export function SalesWaterCheck() {
  const [zip, setZip] = useState("");
  const [lookup, setLookup] = useState<ZipLookupResponse | null>(null);
  const [provider, setProvider] = useState<WaterSystem | null>(null);
  const [report, setReport] = useState<WaterReportResponse | null>(null);
  const [privateWell, setPrivateWell] = useState(false);
  const [showProviders, setShowProviders] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [error, setError] = useState("");
  const [reportError, setReportError] = useState("");
  const [tier, setTier] = useState<Tier>("standard");
  const [quoteReady, setQuoteReady] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const lookupController = useRef<AbortController | null>(null);
  const reportController = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const loadReport = useCallback(async (system: WaterSystem) => {
    reportController.current?.abort();
    const controller = new AbortController();
    reportController.current = controller;
    setReport(null);
    setReportError("");
    setReportLoading(true);

    try {
      const query = new URLSearchParams({ pws: system.pwsId, name: system.name });
      const data = await getJson<WaterReportResponse>(
        `/api/water-report?${query.toString()}`,
        controller.signal,
      );
      setReport(data);
      track("water_monitoring_report_view", {
        pws_id: data.pwsId,
        detected_analytes: data.summary.detectedAnalytes,
        listed_mcl_exceedances: data.summary.aboveListedMcl,
        recommendation: data.recommendation.key,
      });
      window.setTimeout(() => resultRef.current?.focus(), 0);
    } catch (caught) {
      if (controller.signal.aborted) return;
      setReportError(
        caught instanceof Error ? caught.message : "We could not load this water report right now.",
      );
      track("water_monitoring_report_error", { pws_id: system.pwsId });
    } finally {
      if (!controller.signal.aborted) setReportLoading(false);
    }
  }, []);

  const runLookup = useCallback(async (requestedZip: string, updateAddress = true) => {
    const normalized = requestedZip.trim();
    if (!/^\d{5}$/.test(normalized)) {
      setError("Enter a five-digit California ZIP code.");
      return;
    }

    lookupController.current?.abort();
    reportController.current?.abort();
    const controller = new AbortController();
    lookupController.current = controller;

    setLookupLoading(true);
    setError("");
    setReportError("");
    setLookup(null);
    setProvider(null);
    setReport(null);
    setPrivateWell(false);
    setShowProviders(false);
    setQuoteReady(false);

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

      const likely = data.systems.find((system) => system.centerMatch) ?? data.systems[0] ?? null;
      if (likely) {
        setProvider(likely);
        track("water_system_auto_select", {
          pws_id: likely.pwsId,
          center_match: likely.centerMatch,
        });
        await loadReport(likely);
      } else {
        setShowProviders(true);
      }
    } catch (caught) {
      if (controller.signal.aborted) return;
      setError(caught instanceof Error ? caught.message : "We could not check this ZIP code right now.");
      track("water_check_error", { placement: "water_check_page" });
    } finally {
      if (!controller.signal.aborted) setLookupLoading(false);
    }
  }, [loadReport]);

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
      reportController.current?.abort();
    };
  }, [runLookup]);

  async function changeProvider(system: WaterSystem) {
    setProvider(system);
    setPrivateWell(false);
    setShowProviders(false);
    setQuoteReady(false);
    track("water_system_select", { pws_id: system.pwsId, center_match: system.centerMatch });
    await loadReport(system);
  }

  function usePrivateWell() {
    reportController.current?.abort();
    setProvider(null);
    setReport(null);
    setPrivateWell(true);
    setShowProviders(false);
    setReportError("");
    setReportLoading(false);
    setQuoteReady(false);
    track("water_system_select", { source: "private_well" });
  }

  function submitLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    track("water_check_start", {
      zip_prefix: zip.trim().slice(0, 3),
      placement: "water_check_page",
    });
    void runLookup(zip);
  }

  const primaryAnalyte = useMemo(() => {
    if (!report) return null;
    return [...report.analytes]
      .filter((analyte) => analyte.maxPercentOfListedMcl !== null)
      .sort(
        (a, b) =>
          (b.maxPercentOfListedMcl ?? 0) - (a.maxPercentOfListedMcl ?? 0),
      )[0] ?? null;
  }, [report]);

  const topAnalytes = useMemo(() => {
    if (!report) return [];
    return [...report.analytes]
      .sort((a, b) => {
        const aboveDifference =
          Number(b.status === "above-listed-mcl") - Number(a.status === "above-listed-mcl");
        if (aboveDifference !== 0) return aboveDifference;
        return (b.maxPercentOfListedMcl ?? -1) - (a.maxPercentOfListedMcl ?? -1);
      })
      .slice(0, 5);
  }, [report]);

  const quoteContext = report
    ? recommendationLabel(report.recommendation.key)
    : privateWell
      ? "Private-well assessment"
      : "Water system review";

  const smsHref = useMemo(() => {
    const selectedTier = tierCopy[tier];
    const lines = [
      "Central Valley Pure Water quote request",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Address: ${address}`,
      `ZIP: ${zip}`,
      `Bathrooms: ${bathrooms}`,
      provider ? `Likely water provider: ${supplierName(provider.name)} (${provider.pwsId})` : "Water source: Private well",
      `Water-report match: ${quoteContext}`,
      `Requested configuration: ${selectedTier.title}`,
      tier === "standard" ? "Displayed promotional package: $3,495" : "Upgrade pricing requested",
    ].filter(Boolean);
    return `sms:+15107255120?&body=${encodeURIComponent(lines.join("\n"))}`;
  }, [address, bathrooms, email, name, phone, provider, quoteContext, tier, zip]);

  function buildQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuoteReady(true);
    track("water_quote_view", {
      tier,
      pws_id: provider?.pwsId ?? null,
      source: privateWell ? "private_well" : "public",
    });
  }

  const hasResult = Boolean(report || privateWell);

  return (
    <section className={styles.funnel} aria-labelledby="water-check-tool-heading">
      <div className={styles.searchCard}>
        <div className={styles.searchCopy}>
          <span>1</span>
          <div>
            <h2 id="water-check-tool-heading">Enter your ZIP.</h2>
            <p>We find the most likely water supplier automatically.</p>
          </div>
        </div>
        <form onSubmit={submitLookup} className={styles.zipForm} noValidate>
          <label htmlFor="simple-water-zip">California ZIP code</label>
          <div>
            <input
              id="simple-water-zip"
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
              aria-describedby={error ? "simple-water-error" : undefined}
            />
            <button type="submit" disabled={lookupLoading || reportLoading}>
              {lookupLoading || reportLoading ? "Checking…" : "Check my water"}
              {!lookupLoading && !reportLoading ? <b aria-hidden="true">→</b> : null}
            </button>
          </div>
          {error ? <p id="simple-water-error" role="alert" className={styles.error}>{error}</p> : null}
          <small>Free. No signup. Public water-system records.</small>
        </form>
      </div>

      {lookup && provider ? (
        <div className={styles.providerCard}>
          <div>
            <span className={styles.checkIcon} aria-hidden="true">✓</span>
            <div>
              <small>Likely water supplier for {lookup.zip}</small>
              <strong>{supplierName(provider.name)}</strong>
              <span>{provider.pwsId}{provider.county ? ` · ${supplierName(provider.county)} County` : ""}</span>
            </div>
          </div>
          <button type="button" onClick={() => setShowProviders((current) => !current)}>
            Not your supplier? Change
          </button>
        </div>
      ) : null}

      {lookup && showProviders ? (
        <div className={styles.providerPicker}>
          <strong>Choose your provider</strong>
          <div className={styles.providerOptions}>
            {lookup.systems.map((system) => (
              <button key={system.pwsId} type="button" onClick={() => void changeProvider(system)}>
                <span>{supplierName(system.name)}</span>
                <small>{system.pwsId}{system.centerMatch ? " · Best ZIP match" : ""}</small>
              </button>
            ))}
          </div>
          <button className={styles.wellButton} type="button" onClick={usePrivateWell}>
            I use a private well
          </button>
        </div>
      ) : null}

      {lookup && !provider && !privateWell && lookup.systems.length === 0 ? (
        <div className={styles.providerPicker}>
          <strong>We did not find a clear public-water boundary.</strong>
          <p>This may be a private-well property or a gap in the public boundary layer.</p>
          <button className={styles.wellButton} type="button" onClick={usePrivateWell}>
            I use a private well
          </button>
        </div>
      ) : null}

      {reportLoading ? (
        <div className={styles.loading} role="status">
          <i aria-hidden="true" />
          Pulling the latest selected public monitoring records…
        </div>
      ) : null}

      {reportError ? (
        <div className={styles.reportError} role="alert">
          <strong>We found your supplier, but the monitoring source is temporarily unavailable.</strong>
          <p>{reportError}</p>
          <a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
        </div>
      ) : null}

      {report ? (
        <div className={styles.resultStack} ref={resultRef} tabIndex={-1}>
          <div className={styles.sectionIntro}>
            <span>2</span>
            <div>
              <small>Your water snapshot</small>
              <h2>Here&apos;s the simple version.</h2>
            </div>
          </div>

          <div className={styles.snapshotGrid}>
            <article className={styles.snapshotPrimary}>
              <span>Detected in selected recent records</span>
              <strong>{report.summary.detectedAnalytes}</strong>
              <p>substances detected across the representative public records reviewed</p>
            </article>
            <article>
              <span>Selected results above a listed MCL</span>
              <strong>{report.summary.aboveListedMcl}</strong>
              <p>A result above a listed limit is not by itself a formal utility compliance finding.</p>
            </article>
            <article className={styles.snapshotCompare}>
              <span>Closest selected result to a listed limit</span>
              {primaryAnalyte?.maxPercentOfListedMcl !== null && primaryAnalyte ? (
                primaryAnalyte.maxPercentOfListedMcl >= 100 ? (
                  <>
                    <strong>{formatMultiplier(primaryAnalyte.maxPercentOfListedMcl)}</strong>
                    <p>{primaryAnalyte.name} · highest selected result versus its listed MCL</p>
                  </>
                ) : (
                  <>
                    <strong>{Math.round(primaryAnalyte.maxPercentOfListedMcl)}%</strong>
                    <p>{primaryAnalyte.name} · of its listed MCL at the highest selected result</p>
                  </>
                )
              ) : (
                <>
                  <strong>—</strong>
                  <p>No direct listed-MCL comparison was available in the selected results.</p>
                </>
              )}
            </article>
          </div>

          <p className={styles.contextNote}>
            This is a simple summary of selected public monitoring records for {supplierName(report.systemName)}.
            It is not a new test of water from your faucet.
          </p>

          <div className={styles.detectedList}>
            <div className={styles.detectedHeading}>
              <div>
                <small>What showed up</small>
                <h3>Top detected items from the selected records</h3>
              </div>
              <span>Latest selected sample: {formatDate(report.summary.latestSampleDate)}</span>
            </div>
            <div className={styles.analyteRows}>
              {topAnalytes.map((analyte) => (
                <article key={analyte.id}>
                  <div>
                    <strong>{analyte.name}</strong>
                    <span>{analyte.resultSummary}</span>
                  </div>
                  <div>
                    {analyte.maxPercentOfListedMcl !== null ? (
                      analyte.maxPercentOfListedMcl >= 100 ? (
                        <b>{formatMultiplier(analyte.maxPercentOfListedMcl)} listed MCL</b>
                      ) : (
                        <b>{Math.round(analyte.maxPercentOfListedMcl)}% of listed MCL</b>
                      )
                    ) : (
                      <b>No listed MCL in selected row</b>
                    )}
                    <small>{analyte.context === "source" ? "Source-water record" : "Treated / distribution record"}</small>
                  </div>
                </article>
              ))}
            </div>
            <details className={styles.details}>
              <summary>See report details and limitations <span aria-hidden="true">+</span></summary>
              <div>
                <p>
                  We reviewed {report.summary.recordsReviewed.toLocaleString()} selected records across {report.summary.pointsReviewed} representative sampling points over the last {report.lookback.months} months.
                </p>
                <ul>
                  {report.notices.map((notice) => <li key={notice}>{notice}</li>)}
                </ul>
                <a href={report.officialLinks.monitoringResults} target="_blank" rel="noreferrer">
                  Open the official California monitoring records ↗
                </a>
              </div>
            </details>
          </div>

          <section className={styles.matchCard} aria-labelledby="system-match-heading">
            <div className={styles.sectionIntroLight}>
              <span>3</span>
              <div>
                <small>Your system match</small>
                <h2 id="system-match-heading">{recommendationLabel(report.recommendation.key)}</h2>
              </div>
            </div>
            <p>{report.recommendation.description}</p>
            {report.recommendation.evidence.length > 0 ? (
              <div className={styles.evidence}>
                <span>Report items used in this starting recommendation:</span>
                <div>{report.recommendation.evidence.slice(0, 5).map((item) => <b key={item}>{item}</b>)}</div>
              </div>
            ) : null}
            <p className={styles.matchDisclosure}>
              Final treatment performance depends on the exact equipment selected, current water conditions,
              and verified model-specific performance. We do not claim one system removes every item shown above.
            </p>
            <Link href={report.recommendation.servicePath}>See this treatment option →</Link>
          </section>
        </div>
      ) : null}

      {privateWell ? (
        <div className={styles.wellResult} ref={resultRef} tabIndex={-1}>
          <div className={styles.sectionIntro}>
            <span>2</span>
            <div>
              <small>Private well</small>
              <h2>Your ZIP cannot replace a test of your well.</h2>
            </div>
          </div>
          <p>
            Private-well conditions can vary property by property. We can still price the standard Complete Home package,
            but any treatment recommendation beyond that starts with property-specific water information.
          </p>
        </div>
      ) : null}

      {hasResult ? (
        <section className={styles.priceSection} aria-labelledby="package-price-heading">
          <div className={styles.priceHeader}>
            <div>
              <small>See your package price</small>
              <h2 id="package-price-heading">Start with the configuration you want priced.</h2>
              <p>
                The water report chooses the treatment path. Home sizing and installation determine whether
                Standard, Plus, or Dual Tank is the right final configuration.
              </p>
            </div>
            <div className={styles.offerPrice}>
              <span>Standard Complete Home offer</span>
              <del>$4,995</del>
              <strong>$3,495</strong>
            </div>
          </div>

          <div className={styles.tierGrid} role="radiogroup" aria-label="Configuration to price">
            {(Object.keys(tierCopy) as Tier[]).map((option) => {
              const copy = tierCopy[option];
              return (
                <button
                  type="button"
                  role="radio"
                  aria-checked={tier === option}
                  className={tier === option ? styles.tierSelected : undefined}
                  onClick={() => {
                    setTier(option);
                    setQuoteReady(false);
                  }}
                  key={option}
                >
                  <span>{tier === option ? "✓" : ""}</span>
                  <strong>{copy.title}</strong>
                  <b>{copy.price}</b>
                  <small>{copy.note}</small>
                </button>
              );
            })}
          </div>

          <div className={styles.includedBox}>
            <strong>The confirmed $3,495 Standard offer includes:</strong>
            <ul>
              <li>Whole-home water softener</li>
              <li>Reverse-osmosis drinking-water system</li>
              <li>Kitchen RO faucet</li>
              <li>Standard installation</li>
            </ul>
            <p>Financing is available through Hearth, subject to approval and lender terms.</p>
          </div>

          <form className={styles.quoteForm} onSubmit={buildQuote}>
            <div className={styles.formHeading}>
              <span>4</span>
              <div>
                <small>Personalize the quote</small>
                <h3>Tell us where the system is going.</h3>
                <p>We use this to confirm the configuration and installation—not to hide the price.</p>
              </div>
            </div>
            <div className={styles.fieldGrid}>
              <label>
                <span>Name</span>
                <input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <label>
                <span>Phone</span>
                <input required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </label>
              <label className={styles.fullField}>
                <span>Installation address</span>
                <input required autoComplete="street-address" value={address} onChange={(event) => setAddress(event.target.value)} />
              </label>
              <label>
                <span>Bathrooms</span>
                <select required value={bathrooms} onChange={(event) => setBathrooms(event.target.value)}>
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </label>
              <label>
                <span>Email <em>optional</em></span>
                <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
            </div>
            <button className={styles.quoteButton} type="submit">Build my quote <span aria-hidden="true">→</span></button>
            <small className={styles.localPrivacy}>Your details stay on this page until you choose to call or send the prefilled quote request by text.</small>
          </form>

          {quoteReady ? (
            <div className={styles.quoteResult} aria-live="polite">
              <div>
                <span>Your preliminary quote</span>
                <h3>{tierCopy[tier].title} configuration</h3>
                <p>{quoteContext}</p>
              </div>
              <div className={styles.quoteAmount}>
                {tier === "standard" ? (
                  <>
                    <del>$4,995</del>
                    <strong>$3,495</strong>
                    <small>Standard package · standard installation</small>
                  </>
                ) : (
                  <>
                    <strong>Personalized</strong>
                    <small>We confirm the {tierCopy[tier].title} upgrade price after home sizing.</small>
                  </>
                )}
              </div>
              <div className={styles.quoteActions}>
                <a
                  href={smsHref}
                  onClick={() => track("water_quote_text", { tier, pws_id: provider?.pwsId ?? null })}
                >
                  Text my quote request
                </a>
                <a
                  href={PHONE_HREF}
                  onClick={() => track("water_check_call", { placement: "quote_result", tier })}
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>
              <p className={styles.exclusions}>
                Standard installation only. Sales tax, permits, electrical work, trenching, code upgrades,
                removal of existing equipment, major plumbing modifications, difficult or nonstandard installations,
                and work outside standard installation are additional when required and must be separately quoted.
              </p>
            </div>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}
