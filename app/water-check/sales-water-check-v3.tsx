"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import {
  formatBenchmarkValue,
  formatHealthMultiplier,
  getHealthComparison,
  type HealthComparison,
} from "./health-benchmarks";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  type WaterSystem,
  type ZipLookupResponse,
} from "./water-check-data";
import baseStyles from "./sales-water-check.module.css";
import healthStyles from "./health-report.module.css";

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
    description: string;
    evidence: string[];
    servicePath: string;
  };
  notices: string[];
  officialLinks: {
    monitoringResults: string;
  };
}

interface RankedAnalyte {
  analyte: ReportAnalyte;
  health: HealthComparison | null;
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
    note: "Upgrade quote after household-demand sizing",
  },
  dual: {
    title: "Dual Tank",
    price: "Personalized",
    note: "Dual-tank quote after household-demand sizing",
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

function formatNumber(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  if (Math.abs(value) >= 100) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  if (Math.abs(value) >= 1) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 3 });
  }
  return value.toLocaleString("en-US", { maximumSignificantDigits: 4 });
}

function formatMclRatio(percent: number): string {
  const multiple = percent / 100;
  if (multiple >= 100) return `${Math.round(multiple).toLocaleString("en-US")}×`;
  if (multiple >= 10) return `${multiple.toFixed(1).replace(/\.0$/, "")}×`;
  if (multiple >= 1) return `${multiple.toFixed(2).replace(/0$/, "").replace(/\.0$/, "")}×`;
  return `${Math.round(percent)}%`;
}

function healthFor(analyte: ReportAnalyte): HealthComparison | null {
  return getHealthComparison({
    name: analyte.name,
    unit: analyte.unit,
    maxDetected: analyte.maxDetected,
    listedMcl: analyte.listedMcl,
  });
}

function healthRatioLabel(health: HealthComparison): string {
  const formatted = formatHealthMultiplier(health.multiplier);
  return health.multiplier >= 1
    ? `${formatted} the CA Public Health Goal`
    : `${formatted} of the CA Public Health Goal`;
}

function treatmentLabel(key: string): string {
  switch (key) {
    case "complete-home":
      return "Complete Home System";
    case "reverse-osmosis":
      return "Complete Home path with kitchen RO focus";
    case "water-softener":
      return "Whole-home softening path";
    case "whole-home-filtration":
      return "Whole-home filtration path";
    default:
      return "Water specialist review";
  }
}

export function SalesWaterCheckV3() {
  const [zip, setZip] = useState("");
  const [lookup, setLookup] = useState<ZipLookupResponse | null>(null);
  const [provider, setProvider] = useState<WaterSystem | null>(null);
  const [report, setReport] = useState<WaterReportResponse | null>(null);
  const [privateWell, setPrivateWell] = useState(false);
  const [showProviders, setShowProviders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tier, setTier] = useState<Tier>("standard");
  const [bathrooms, setBathrooms] = useState("");
  const [householdSize, setHouseholdSize] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quoteReady, setQuoteReady] = useState(false);

  const lookupController = useRef<AbortController | null>(null);
  const reportController = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const loadReport = useCallback(async (system: WaterSystem) => {
    reportController.current?.abort();
    const controller = new AbortController();
    reportController.current = controller;
    setLoading(true);
    setError("");
    setReport(null);

    try {
      const query = new URLSearchParams({ pws: system.pwsId, name: system.name });
      const data = await getJson<WaterReportResponse>(
        `/api/water-report?${query.toString()}`,
        controller.signal,
      );
      setReport(data);
      const comparisons = data.analytes
        .map(healthFor)
        .filter((value): value is HealthComparison => value !== null);
      track("water_monitoring_report_view", {
        pws_id: data.pwsId,
        detected_analytes: data.summary.detectedAnalytes,
        phg_comparisons: comparisons.length,
        highest_phg_multiple: comparisons.length
          ? Math.max(...comparisons.map((comparison) => comparison.multiplier))
          : null,
      });
      window.setTimeout(() => resultRef.current?.focus(), 0);
    } catch (caught) {
      if (!controller.signal.aborted) {
        setError(caught instanceof Error ? caught.message : "We could not load this report right now.");
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  const runLookup = useCallback(async (requestedZip: string, updateUrl = true) => {
    const normalized = requestedZip.trim();
    if (!/^\d{5}$/.test(normalized)) {
      setError("Enter a five-digit California ZIP code.");
      return;
    }

    lookupController.current?.abort();
    reportController.current?.abort();
    const controller = new AbortController();
    lookupController.current = controller;

    setLoading(true);
    setError("");
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
      if (updateUrl) {
        window.history.replaceState({}, "", `/water-check?zip=${encodeURIComponent(normalized)}`);
      }

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
      if (!controller.signal.aborted) {
        setError(caught instanceof Error ? caught.message : "We could not check this ZIP right now.");
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [loadReport]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const initialZip = new URLSearchParams(window.location.search).get("zip")?.trim() ?? "";
      if (/^\d{5}$/.test(initialZip)) {
        setZip(initialZip);
        void runLookup(initialZip, false);
      }
    });
    return () => {
      window.cancelAnimationFrame(frame);
      lookupController.current?.abort();
      reportController.current?.abort();
    };
  }, [runLookup]);

  async function chooseProvider(system: WaterSystem) {
    setProvider(system);
    setPrivateWell(false);
    setShowProviders(false);
    setQuoteReady(false);
    await loadReport(system);
  }

  function choosePrivateWell() {
    reportController.current?.abort();
    setProvider(null);
    setReport(null);
    setPrivateWell(true);
    setShowProviders(false);
    setError("");
    setQuoteReady(false);
  }

  const rankedAnalytes = useMemo<RankedAnalyte[]>(() => {
    if (!report) return [];
    return report.analytes
      .map((analyte) => ({ analyte, health: healthFor(analyte) }))
      .sort((a, b) => {
        const healthDifference = (b.health?.multiplier ?? -1) - (a.health?.multiplier ?? -1);
        if (healthDifference !== 0) return healthDifference;
        return (b.analyte.maxPercentOfListedMcl ?? -1) - (a.analyte.maxPercentOfListedMcl ?? -1);
      });
  }, [report]);

  const primaryHealth = useMemo(() => {
    const healthRows = rankedAnalytes.filter(
      (item): item is RankedAnalyte & { health: HealthComparison } => item.health !== null,
    );
    return healthRows.sort((a, b) => {
      const deliveredDifference =
        Number(b.analyte.context === "delivered") - Number(a.analyte.context === "delivered");
      return deliveredDifference || b.health.multiplier - a.health.multiplier;
    })[0] ?? null;
  }, [rankedAnalytes]);

  const primaryMcl = useMemo(() => {
    return rankedAnalytes
      .map((item) => item.analyte)
      .filter((analyte) => analyte.maxPercentOfListedMcl !== null)
      .sort((a, b) => (b.maxPercentOfListedMcl ?? 0) - (a.maxPercentOfListedMcl ?? 0))[0] ?? null;
  }, [rankedAnalytes]);

  const treatmentPath = report ? treatmentLabel(report.recommendation.key) : "Private-well assessment";
  const hasResult = Boolean(report || privateWell);

  const smsHref = useMemo(() => {
    const lines = [
      "Central Valley Pure Water quote request",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Address: ${address}`,
      `ZIP: ${zip}`,
      `Bathrooms: ${bathrooms}`,
      `People in home: ${householdSize}`,
      provider ? `Likely supplier: ${supplierName(provider.name)} (${provider.pwsId})` : "Water source: Private well",
      `Treatment path: ${treatmentPath}`,
      `Requested configuration: ${tierCopy[tier].title}`,
      tier === "standard" ? "Displayed promotional package: $3,495" : "Personalized upgrade pricing requested",
    ].filter(Boolean);
    return `sms:+15107255120?&body=${encodeURIComponent(lines.join("\n"))}`;
  }, [address, bathrooms, email, householdSize, name, phone, provider, tier, treatmentPath, zip]);

  function submitLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runLookup(zip);
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuoteReady(true);
    track("water_quote_view", {
      tier,
      bathrooms,
      household_size: householdSize,
      pws_id: provider?.pwsId ?? null,
    });
  }

  return (
    <section className={baseStyles.funnel} aria-labelledby="water-check-tool-heading">
      <div className={baseStyles.searchCard}>
        <div className={baseStyles.searchCopy}>
          <span>1</span>
          <div>
            <h2 id="water-check-tool-heading">Enter your ZIP.</h2>
            <p>We find the most likely water supplier automatically.</p>
          </div>
        </div>
        <form onSubmit={submitLookup} className={baseStyles.zipForm} noValidate>
          <label htmlFor="water-report-zip">California ZIP code</label>
          <div>
            <input
              id="water-report-zip"
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
            />
            <button type="submit" disabled={loading}>
              {loading ? "Checking…" : "Check my water"} <b aria-hidden="true">→</b>
            </button>
          </div>
          {error ? <p role="alert" className={baseStyles.error}>{error}</p> : null}
          <small>Free. No signup. California public water-system records.</small>
        </form>
      </div>

      {lookup && provider ? (
        <div className={baseStyles.providerCard}>
          <div>
            <span className={baseStyles.checkIcon} aria-hidden="true">✓</span>
            <div>
              <small>Likely water supplier for {lookup.zip}</small>
              <strong>{supplierName(provider.name)}</strong>
              <span>{provider.pwsId}{provider.county ? ` · ${supplierName(provider.county)} County` : ""}</span>
            </div>
          </div>
          <button type="button" onClick={() => setShowProviders((value) => !value)}>
            Not your supplier? Change
          </button>
        </div>
      ) : null}

      {lookup && showProviders ? (
        <div className={baseStyles.providerPicker}>
          <strong>Choose your provider</strong>
          <div className={baseStyles.providerOptions}>
            {lookup.systems.map((system) => (
              <button key={system.pwsId} type="button" onClick={() => void chooseProvider(system)}>
                <span>{supplierName(system.name)}</span>
                <small>{system.pwsId}{system.centerMatch ? " · Best ZIP match" : ""}</small>
              </button>
            ))}
          </div>
          <button className={baseStyles.wellButton} type="button" onClick={choosePrivateWell}>
            I use a private well
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className={baseStyles.loading} role="status">
          <i aria-hidden="true" /> Calculating your report from recent public monitoring records…
        </div>
      ) : null}

      {report ? (
        <div className={baseStyles.resultStack} ref={resultRef} tabIndex={-1}>
          <div className={baseStyles.sectionIntro}>
            <span>2</span>
            <div>
              <small>Your water snapshot</small>
              <h2>Here&apos;s what the math shows.</h2>
            </div>
          </div>

          <div className={healthStyles.hero}>
            <div className={healthStyles.heroMain}>
              <span className={healthStyles.eyebrow}>Largest health-based comparison in selected results</span>
              {primaryHealth ? (
                <>
                  <strong>{formatHealthMultiplier(primaryHealth.health.multiplier)}</strong>
                  <h3>{primaryHealth.analyte.name}</h3>
                  <p>
                    Highest selected result: <b>{formatNumber(primaryHealth.health.sampleValue)} {primaryHealth.health.unit}</b>
                    {" ÷ "}
                    CA Public Health Goal: <b>{formatBenchmarkValue(primaryHealth.health.benchmarkInSampleUnit)} {primaryHealth.health.unit}</b>
                  </p>
                  <small>
                    {primaryHealth.analyte.context === "source" ? "Source-water monitoring record" : "Treated / distribution monitoring record"}
                    {primaryHealth.analyte.listedMcl !== null
                      ? ` · Separate listed MCL: ${formatNumber(primaryHealth.analyte.listedMcl)} ${primaryHealth.analyte.unit}`
                      : ""}
                  </small>
                </>
              ) : primaryMcl?.maxPercentOfListedMcl !== null && primaryMcl ? (
                <>
                  <strong>{formatMclRatio(primaryMcl.maxPercentOfListedMcl)}</strong>
                  <h3>{primaryMcl.name}</h3>
                  <p>Highest selected result compared with the MCL printed in the state record.</p>
                  <small>No compatible California PHG was available for the detected analytes shown.</small>
                </>
              ) : (
                <>
                  <strong>—</strong>
                  <h3>No direct benchmark comparison available</h3>
                  <p>The monitoring results still appear below with their measured values and context.</p>
                </>
              )}
            </div>

            <div className={healthStyles.stats}>
              <article><strong>{report.summary.detectedAnalytes}</strong><span>detected analytes in selected recent records</span></article>
              <article><strong>{report.summary.aboveListedMcl}</strong><span>selected results above a listed MCL</span></article>
              <article><strong>{formatDate(report.summary.latestSampleDate)}</strong><span>latest selected sample date</span></article>
            </div>
          </div>

          <div className={healthStyles.disclosure}>
            <strong>What does “X times” mean?</strong>
            <p>
              It is actual arithmetic: the highest selected monitoring result divided by the California OEHHA Public Health Goal for that chemical, when a compatible PHG exists. A PHG is a health-based goal, not an enforceable legal limit and not a line between “safe” and “dangerous.” The separate MCL is the regulatory standard. This is not a sample from your home.
            </p>
            <a href="https://oehha.ca.gov/public-health-goals-phgs" target="_blank" rel="noreferrer">
              California OEHHA Public Health Goals ↗
            </a>
          </div>

          <div className={baseStyles.detectedList}>
            <div className={baseStyles.detectedHeading}>
              <div>
                <small>Detected in selected records</small>
                <h3>Each item gets its own calculation.</h3>
              </div>
              <span>{report.summary.recordsReviewed.toLocaleString()} records reviewed</span>
            </div>

            <div className={healthStyles.rows}>
              {rankedAnalytes.map(({ analyte, health }) => (
                <article key={analyte.id}>
                  <div className={healthStyles.name}>
                    <strong>{analyte.name}</strong>
                    <span>{analyte.resultSummary}</span>
                    <small>{analyte.context === "source" ? "Source-water record" : "Treated / distribution record"}</small>
                  </div>
                  <div className={healthStyles.metric}>
                    {health ? (
                      <>
                        <strong>{formatHealthMultiplier(health.multiplier)}</strong>
                        <b>{healthRatioLabel(health)}</b>
                        <small>{formatNumber(health.sampleValue)} {health.unit} ÷ {formatBenchmarkValue(health.benchmarkInSampleUnit)} {health.unit}</small>
                      </>
                    ) : analyte.maxPercentOfListedMcl !== null ? (
                      <>
                        <strong>{formatMclRatio(analyte.maxPercentOfListedMcl)}</strong>
                        <b>{analyte.maxPercentOfListedMcl >= 100 ? "the listed MCL" : "of the listed MCL"}</b>
                        <small>No compatible California PHG found for this item.</small>
                      </>
                    ) : (
                      <>
                        <strong>Detected</strong>
                        <b>No direct benchmark ratio</b>
                        <small>No compatible PHG or listed MCL comparison is available.</small>
                      </>
                    )}
                  </div>
                  <div className={healthStyles.legal}>
                    <span>Legal-limit context</span>
                    <strong>
                      {analyte.listedMcl !== null
                        ? `${formatNumber(analyte.listedMcl)} ${analyte.unit} listed MCL`
                        : "No MCL listed in selected row"}
                    </strong>
                  </div>
                </article>
              ))}
            </div>

            <details className={baseStyles.details}>
              <summary>See source details and limitations <span aria-hidden="true">+</span></summary>
              <div>
                <p>
                  We reviewed {report.summary.recordsReviewed.toLocaleString()} selected records across {report.summary.pointsReviewed} representative sampling points over the last {report.lookback.months} months. Ratios use the highest selected result, not a utility-wide average.
                </p>
                <ul>{report.notices.map((notice) => <li key={notice}>{notice}</li>)}</ul>
                <a href={report.officialLinks.monitoringResults} target="_blank" rel="noreferrer">
                  Open the official California monitoring records ↗
                </a>
              </div>
            </details>
          </div>

          <section className={baseStyles.matchCard} aria-labelledby="system-match-heading">
            <div className={baseStyles.sectionIntroLight}>
              <span>3</span>
              <div>
                <small>Your treatment starting point</small>
                <h2 id="system-match-heading">{treatmentPath}</h2>
              </div>
            </div>
            <p>{report.recommendation.description}</p>
            {report.recommendation.evidence.length ? (
              <div className={baseStyles.evidence}>
                <span>Report items used in this starting recommendation:</span>
                <div>{report.recommendation.evidence.slice(0, 5).map((item) => <b key={item}>{item}</b>)}</div>
              </div>
            ) : null}
            <p className={baseStyles.matchDisclosure}>
              The report selects a treatment conversation, not a blanket removal guarantee. Final equipment must be sized for the home, and any contaminant-reduction claim must match the exact model&apos;s verified performance for current water conditions.
            </p>
            <Link href={report.recommendation.servicePath}>See this treatment option →</Link>
          </section>
        </div>
      ) : null}

      {privateWell ? (
        <div className={baseStyles.wellResult} ref={resultRef} tabIndex={-1}>
          <div className={baseStyles.sectionIntro}>
            <span>2</span>
            <div>
              <small>Private well</small>
              <h2>Your ZIP cannot replace a test of your well.</h2>
            </div>
          </div>
          <p>Private-well conditions vary property by property. We can price the Standard Complete Home package, but treatment recommendations beyond that start with property-specific water information.</p>
        </div>
      ) : null}

      {hasResult ? (
        <section className={baseStyles.priceSection} aria-labelledby="package-price-heading">
          <div className={baseStyles.priceHeader}>
            <div>
              <small>See your package price</small>
              <h2 id="package-price-heading">Choose the configuration you want priced.</h2>
              <p>The water report identifies the treatment path. Household size, bathrooms, peak demand, incoming water conditions and installation details determine final equipment sizing.</p>
            </div>
            <div className={baseStyles.offerPrice}>
              <span>Standard Complete Home offer</span>
              <del>$4,995</del>
              <strong>$3,495</strong>
            </div>
          </div>

          <div className={baseStyles.tierGrid} role="radiogroup" aria-label="Configuration to price">
            {(Object.keys(tierCopy) as Tier[]).map((option) => (
              <button
                type="button"
                role="radio"
                aria-checked={tier === option}
                className={tier === option ? baseStyles.tierSelected : undefined}
                onClick={() => {
                  setTier(option);
                  setQuoteReady(false);
                }}
                key={option}
              >
                <span>{tier === option ? "✓" : ""}</span>
                <strong>{tierCopy[option].title}</strong>
                <b>{tierCopy[option].price}</b>
                <small>{tierCopy[option].note}</small>
              </button>
            ))}
          </div>

          <div className={baseStyles.includedBox}>
            <strong>The confirmed $3,495 Standard offer includes:</strong>
            <ul>
              <li>Whole-home water softener</li>
              <li>Reverse-osmosis drinking-water system</li>
              <li>Kitchen RO faucet</li>
              <li>Standard installation</li>
            </ul>
            <p>Financing is available through Hearth, subject to approval and lender terms.</p>
          </div>

          <form className={baseStyles.quoteForm} onSubmit={submitQuote}>
            <div className={baseStyles.formHeading}>
              <span>4</span>
              <div>
                <small>Personalize the quote</small>
                <h3>Two home details help size the quote path.</h3>
                <p>Standard, Plus and Dual Tank are not assigned from ZIP alone.</p>
              </div>
            </div>
            <div className={baseStyles.fieldGrid}>
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
                <span>People in home</span>
                <select required value={householdSize} onChange={(event) => setHouseholdSize(event.target.value)}>
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6+">6+</option>
                </select>
              </label>
              <label>
                <span>Name</span>
                <input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <label>
                <span>Phone</span>
                <input required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </label>
              <label className={baseStyles.fullField}>
                <span>Installation address</span>
                <input required autoComplete="street-address" value={address} onChange={(event) => setAddress(event.target.value)} />
              </label>
              <label className={baseStyles.fullField}>
                <span>Email <em>optional</em></span>
                <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
            </div>
            <button className={baseStyles.quoteButton} type="submit">Show my quote path <span aria-hidden="true">→</span></button>
            <small className={baseStyles.localPrivacy}>Your details stay on this page until you choose to call or send the prefilled quote request by text.</small>
          </form>

          {quoteReady ? (
            <div className={baseStyles.quoteResult} aria-live="polite">
              <div>
                <span>Your preliminary quote path</span>
                <h3>{tierCopy[tier].title} configuration</h3>
                <p>{treatmentPath}</p>
              </div>
              <div className={baseStyles.quoteAmount}>
                {tier === "standard" ? (
                  <>
                    <del>$4,995</del>
                    <strong>$3,495</strong>
                    <small>Standard package · standard installation</small>
                  </>
                ) : (
                  <>
                    <strong>Personalized</strong>
                    <small>We confirm the {tierCopy[tier].title} upgrade price after sizing and installation review.</small>
                  </>
                )}
              </div>
              <div className={baseStyles.quoteActions}>
                <a href={smsHref} onClick={() => track("water_quote_text", { tier, pws_id: provider?.pwsId ?? null })}>
                  Text my quote request
                </a>
                <a href={PHONE_HREF} onClick={() => track("water_check_call", { placement: "quote_result", tier })}>
                  Call {PHONE_DISPLAY}
                </a>
              </div>
              <p className={baseStyles.exclusions}>
                Standard installation only. Sales tax, permits, electrical work, trenching, code upgrades, removal of existing equipment, major plumbing modifications, difficult or nonstandard installations, and work outside standard installation are additional when required and must be separately quoted.
              </p>
            </div>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}
