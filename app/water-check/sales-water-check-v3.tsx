"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { formatBenchmarkValue, formatHealthMultiplier, getHealthComparison, type HealthComparison } from "./health-benchmarks";
import { PHONE_DISPLAY, PHONE_HREF, type WaterSystem, type ZipLookupResponse } from "./water-check-data";
import baseStyles from "./sales-water-check.module.css";
import healthStyles from "./health-report.module.css";

const styles = {
  ...baseStyles,
  healthHero: healthStyles.hero,
  healthHeroMain: healthStyles.heroMain,
  healthEyebrow: healthStyles.eyebrow,
  healthHeroStats: healthStyles.stats,
  benchmarkDisclosure: healthStyles.disclosure,
  healthRows: healthStyles.rows,
  healthRowName: healthStyles.name,
  healthRowMetric: healthStyles.metric,
  healthRowLegal: healthStyles.legal,
};

type Tier = "standard" | "plus" | "dual";
type PointContext = "delivered" | "source" | "other";
type AnalyteStatus = "above-listed-mcl" | "detected-below-listed-mcl" | "detected-no-listed-mcl" | "source-detection";

interface ApiErrorBody { error?: { message?: string } }

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
  officialLinks: { systemDetail: string; monitoringResults: string; dataDictionary: string };
}

interface AnalyteWithHealth { analyte: ReportAnalyte; health: HealthComparison | null }

const tierCopy: Record<Tier, { title: string; price: string; note: string }> = {
  standard: { title: "Standard", price: "$3,495", note: "Current Complete Home promotional package" },
  plus: { title: "Plus", price: "Personalized", note: "Upgrade quote after household-demand sizing" },
  dual: { title: "Dual Tank", price: "Personalized", note: "Dual-tank quote after household-demand sizing" },
};

function track(event: string, details: Record<string, unknown> = {}) {
  const browserWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  browserWindow.dataLayer?.push({ event, ...details });
}

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal, headers: { Accept: "application/json" } });
  const body = (await response.json().catch(() => ({}))) as T & ApiErrorBody;
  if (!response.ok) throw new Error(body.error?.message ?? "We could not load this water report right now.");
  return body;
}

function supplierName(value: string): string {
  return value.toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase()).replace(/\bOf\b/g, "of").replace(/\bThe\b/g, "the");
}

function formatDate(value: string | null): string {
  if (!value) return "Not listed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not listed";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function formatNumber(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  if (Math.abs(value) >= 100) return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(value) >= 1) return value.toLocaleString("en-US", { maximumFractionDigits: 3 });
  return value.toLocaleString("en-US", { maximumSignificantDigits: 4 });
}

function formatMclRatio(percent: number): string {
  const multiple = percent / 100;
  if (multiple >= 100) return `${Math.round(multiple).toLocaleString("en-US")}×`;
  if (multiple >= 10) return `${multiple.toFixed(1).replace(/\.0$/, "")}×`;
  if (multiple >= 1) return `${multiple.toFixed(2).replace(/0$/, "").replace(/\.0$/, "")}×`;
  return `${Math.round(percent)}%`;
}

function healthRatioLabel(health: HealthComparison): string {
  return health.multiplier >= 1
    ? `${formatHealthMultiplier(health.multiplier)} the CA Public Health Goal`
    : `${formatHealthMultiplier(health.multiplier)} of the CA Public Health Goal`;
}

function healthFor(analyte: ReportAnalyte): HealthComparison | null {
  return getHealthComparison({ name: analyte.name, unit: analyte.unit, maxDetected: analyte.maxDetected, listedMcl: analyte.listedMcl });
}

function recommendationLabel(key: string): string {
  switch (key) {
    case "complete-home": return "Complete Home System";
    case "reverse-osmosis": return "Complete Home path with kitchen RO focus";
    case "water-softener": return "Whole-home softening path";
    case "whole-home-filtration": return "Whole-home filtration path";
    default: return "Water specialist review";
  }
}

export function SalesWaterCheckV3() {
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
  const [bathrooms, setBathrooms] = useState("");
  const [householdSize, setHouseholdSize] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

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
      const data = await getJson<WaterReportResponse>(`/api/water-report?${query.toString()}`, controller.signal);
      setReport(data);
      const health = data.analytes.map(healthFor).filter((value): value is HealthComparison => value !== null);
      track("water_monitoring_report_view", {
        pws_id: data.pwsId,
        detected_analytes: data.summary.detectedAnalytes,
        phg_comparisons: health.length,
        highest_phg_multiple: health.length ? Math.max(...health.map((item) => item.multiplier)) : null,
        listed_mcl_exceedances: data.summary.aboveListedMcl,
      });
      window.setTimeout(() => resultRef.current?.focus(), 0);
    } catch (caught) {
      if (!controller.signal.aborted) {
        setReportError(caught instanceof Error ? caught.message : "We could not load this water report right now.");
        track("water_monitoring_report_error", { pws_id: system.pwsId });
      }
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
      const data = await getJson<ZipLookupResponse>(`/api/water-check?zip=${encodeURIComponent(normalized)}`, controller.signal);
      setLookup(data);
      setZip(normalized);
      if (updateAddress) window.history.replaceState({}, "", `/water-check?zip=${encodeURIComponent(normalized)}`);
      track("water_check_success", { zip_prefix: normalized.slice(0, 3), system_count: data.totalSystems, match_method: data.matchMethod });
      const likely = data.systems.find((system) => system.centerMatch) ?? data.systems[0] ?? null;
      if (likely) {
        setProvider(likely);
        track("water_system_auto_select", { pws_id: likely.pwsId, center_match: likely.centerMatch });
        await loadReport(likely);
      } else {
        setShowProviders(true);
      }
    } catch (caught) {
      if (!controller.signal.aborted) {
        setError(caught instanceof Error ? caught.message : "We could not check this ZIP code right now.");
        track("water_check_error", { placement: "water_check_page" });
      }
    } finally {
      if (!controller.signal.aborted) setLookupLoading(false);
    }
  }, [loadReport]);

  useEffect(() => {
    const initialZip = new URLSearchParams(window.location.search).get("zip")?.trim() ?? "";
    if (/^\d{5}$/.test(initialZip)) {
      setZip(initialZip);
      track("water_check_start", { zip_prefix: initialZip.slice(0, 3), placement: "water_check_query" });
      void runLookup(initialZip, false);
    }
    return () => {
      lookupController.current?.abort();
      reportController.current?.abort();
    };
  }, [runLookup]);

  function submitLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    track("water_check_start", { zip_prefix: zip.trim().slice(0, 3), placement: "water_check_page" });
    void runLookup(zip);
  }

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
    setReportLoading(false);
    setReportError("");
    setQuoteReady(false);
    track("water_system_select", { source: "private_well" });
  }

  const analyzed = useMemo<AnalyteWithHealth[]>(() => report?.analytes.map((analyte) => ({ analyte, health: healthFor(analyte) })) ?? [], [report]);

  const primaryHealth = useMemo(() => {
    return analyzed
      .filter((item): item is AnalyteWithHealth & { health: HealthComparison } => item.health !== null)
      .sort((a, b) => {
        const delivered = Number(b.analyte.context === "delivered") - Number(a.analyte.context === "delivered");
        return delivered || b.health.multiplier - a.health.multiplier;
      })[0] ?? null;
  }, [analyzed]);

  const primaryMcl = useMemo(() => {
    return report
      ? [...report.analytes].filter((item) => item.maxPercentOfListedMcl !== null).sort((a, b) => (b.maxPercentOfListedMcl ?? 0) - (a.maxPercentOfListedMcl ?? 0))[0] ?? null
      : null;
  }, [report]);

  const topAnalytes = useMemo(() => {
    return [...analyzed].sort((a, b) => {
      const healthDifference = (b.health?.multiplier ?? -1) - (a.health?.multiplier ?? -1);
      return healthDifference || (b.analyte.maxPercentOfListedMcl ?? -1) - (a.analyte.maxPercentOfListedMcl ?? -1);
    }).slice(0, 6);
  }, [analyzed]);

  const treatmentPath = report ? recommendationLabel(report.recommendation.key) : "Private-well assessment";
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

  function buildQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuoteReady(true);
    track("water_quote_view", { tier, pws_id: provider?.pwsId ?? null, bathrooms, household_size: householdSize });
  }

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
          <label htmlFor="water-report-zip">California ZIP code</label>
          <div>
            <input id="water-report-zip" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} pattern="[0-9]{5}" placeholder="95351" value={zip} onChange={(event) => { setZip(event.target.value.replace(/\D/g, "").slice(0, 5)); if (error) setError(""); }} aria-invalid={Boolean(error)} />
            <button type="submit" disabled={lookupLoading || reportLoading}>{lookupLoading || reportLoading ? "Checking…" : "Check my water"}<b aria-hidden="true">→</b></button>
          </div>
          {error ? <p role="alert" className={styles.error}>{error}</p> : null}
          <small>Free. No signup. California public water-system records.</small>
        </form>
      </div>

      {lookup && provider ? (
        <div className={styles.providerCard}>
          <div><span className={styles.checkIcon} aria-hidden="true">✓</span><div><small>Likely water supplier for {lookup.zip}</small><strong>{supplierName(provider.name)}</strong><span>{provider.pwsId}{provider.county ? ` · ${supplierName(provider.county)} County` : ""}</span></div></div>
          <button type="button" onClick={() => setShowProviders((current) => !current)}>Not your supplier? Change</button>
        </div>
      ) : null}

      {lookup && showProviders ? (
        <div className={styles.providerPicker}>
          <strong>Choose your provider</strong>
          <div className={styles.providerOptions}>{lookup.systems.map((system) => <button key={system.pwsId} type="button" onClick={() => void changeProvider(system)}><span>{supplierName(system.name)}</span><small>{system.pwsId}{system.centerMatch ? " · Best ZIP match" : ""}</small></button>)}</div>
          <button className={styles.wellButton} type="button" onClick={usePrivateWell}>I use a private well</button>
        </div>
      ) : null}

      {lookup && !provider && !privateWell && lookup.systems.length === 0 ? <div className={styles.providerPicker}><strong>No clear public-water boundary found.</strong><p>This may be a private-well property or a gap in the public boundary layer.</p><button className={styles.wellButton} type="button" onClick={usePrivateWell}>I use a private well</button></div> : null}
      {reportLoading ? <div className={styles.loading} role="status"><i aria-hidden="true" />Calculating your report from selected recent public monitoring records…</div> : null}
      {reportError ? <div className={styles.reportError} role="alert"><strong>We found your supplier, but the monitoring source is temporarily unavailable.</strong><p>{reportError}</p><a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a></div> : null}

      {report ? (
        <div className={styles.resultStack} ref={resultRef} tabIndex={-1}>
          <div className={styles.sectionIntro}><span>2</span><div><small>Your water snapshot</small><h2>Here&apos;s what the math shows.</h2></div></div>
          <div className={styles.healthHero}>
            <div className={styles.healthHeroMain}>
              <span className={styles.healthEyebrow}>Largest health-based comparison in selected results</span>
              {primaryHealth?.health ? <>
                <strong>{formatHealthMultiplier(primaryHealth.health.multiplier)}</strong>
                <h3>{primaryHealth.analyte.name}</h3>
                <p>Highest selected result: <b>{formatNumber(primaryHealth.health.sampleValue)} {primaryHealth.health.unit}</b> ÷ CA Public Health Goal: <b>{formatBenchmarkValue(primaryHealth.health.benchmarkInSampleUnit)} {primaryHealth.health.unit}</b></p>
                <small>{primaryHealth.analyte.context === "source" ? "Source-water monitoring record" : "Treated / distribution monitoring record"}{primaryHealth.analyte.listedMcl !== null ? ` · Separate listed MCL: ${formatNumber(primaryHealth.analyte.listedMcl)} ${primaryHealth.analyte.unit}` : ""}</small>
              </> : primaryMcl?.maxPercentOfListedMcl !== null && primaryMcl ? <>
                <strong>{formatMclRatio(primaryMcl.maxPercentOfListedMcl)}</strong><h3>{primaryMcl.name}</h3><p>Highest selected result compared with the MCL printed in the state record.</p><small>No compatible California PHG comparison was available for the detected analytes shown.</small>
              </> : <><strong>—</strong><h3>No direct benchmark comparison available</h3><p>The selected monitoring results still appear below with their measured levels and context.</p></>}
            </div>
            <div className={styles.healthHeroStats}>
              <article><strong>{report.summary.detectedAnalytes}</strong><span>detected analytes in selected recent records</span></article>
              <article><strong>{report.summary.aboveListedMcl}</strong><span>selected results above a listed MCL</span></article>
              <article><strong>{formatDate(report.summary.latestSampleDate)}</strong><span>latest selected sample date</span></article>
            </div>
          </div>

          <div className={styles.benchmarkDisclosure}>
            <strong>What does “X times” mean?</strong>
            <p>It is actual arithmetic: the highest selected monitoring result divided by the California OEHHA Public Health Goal for that chemical, when a compatible PHG is available. A PHG is a health-based goal, not an enforceable legal limit and not a line between “safe” and “dangerous.” The separate MCL is the regulatory standard. This is not a sample from your home.</p>
            <a href="https://oehha.ca.gov/public-health-goals-phgs" target="_blank" rel="noreferrer">California OEHHA Public Health Goals ↗</a>
          </div>

          <div className={styles.detectedList}>
            <div className={styles.detectedHeading}><div><small>Detected in selected records</small><h3>See the calculation for each item.</h3></div><span>{report.summary.recordsReviewed.toLocaleString()} records reviewed</span></div>
            <div className={styles.healthRows}>
              {topAnalytes.map(({ analyte, health }) => <article key={analyte.id}>
                <div className={styles.healthRowName}><strong>{analyte.name}</strong><span>{analyte.resultSummary}</span><small>{analyte.context === "source" ? "Source-water record" : "Treated / distribution record"}</small></div>
                <div className={styles.healthRowMetric}>{health ? <><strong>{formatHealthMultiplier(health.multiplier)}</strong><b>{healthRatioLabel(health)}</b><small>{formatNumber(health.sampleValue)} {health.unit} ÷ {formatBenchmarkValue(health.benchmarkInSampleUnit)} {health.unit}</small></> : analyte.maxPercentOfListedMcl !== null ? <><strong>{formatMclRatio(analyte.maxPercentOfListedMcl)}</strong><b>{analyte.maxPercentOfListedMcl >= 100 ? "the listed MCL" : "of the listed MCL"}</b><small>No compatible California PHG found for this item.</small></> : <><strong>Detected</strong><b>No direct health-benchmark ratio</b><small>No compatible PHG or listed MCL comparison available.</small></>}</div>
                <div className={styles.healthRowLegal}><span>Legal-limit context</span><strong>{analyte.listedMcl !== null ? `${formatNumber(analyte.listedMcl)} ${analyte.unit} listed MCL` : "No MCL listed in selected row"}</strong></div>
              </article>)}
            </div>
            <details className={styles.details}><summary>See source details and report limitations <span aria-hidden="true">+</span></summary><div><p>We reviewed {report.summary.recordsReviewed.toLocaleString()} selected records across {report.summary.pointsReviewed} representative sampling points over the last {report.lookback.months} months. The ratio uses the highest selected result, not a utility-wide average.</p><ul>{report.notices.map((notice) => <li key={notice}>{notice}</li>)}</ul><a href={report.officialLinks.monitoringResults} target="_blank" rel="noreferrer">Open the official California monitoring records ↗</a></div></details>
          </div>

          <section className={styles.matchCard} aria-labelledby="system-match-heading">
            <div className={styles.sectionIntroLight}><span>3</span><div><small>Your treatment starting point</small><h2 id="system-match-heading">{recommendationLabel(report.recommendation.key)}</h2></div></div>
            <p>{report.recommendation.description}</p>
            {report.recommendation.evidence.length ? <div className={styles.evidence}><span>Report items used in this starting recommendation:</span><div>{report.recommendation.evidence.slice(0, 5).map((item) => <b key={item}>{item}</b>)}</div></div> : null}
            <p className={styles.matchDisclosure}>The report selects a treatment conversation, not a blanket removal guarantee. Final equipment must be sized for the home, and any contaminant-reduction claim must match the exact model&apos;s verified performance for current water conditions.</p>
            <Link href={report.recommendation.servicePath}>See this treatment option →</Link>
          </section>
        </div>
      ) : null}

      {privateWell ? <div className={styles.wellResult} ref={resultRef} tabIndex={-1}><div className={styles.sectionIntro}><span>2</span><div><small>Private well</small><h2>Your ZIP cannot replace a test of your well.</h2></div></div><p>Private-well conditions vary property by property. We can price the Standard Complete Home package, but treatment recommendations beyond that start with property-specific water information.</p></div> : null}

      {hasResult ? <section className={styles.priceSection} aria-labelledby="package-price-heading">
        <div className={styles.priceHeader}><div><small>See your package price</small><h2 id="package-price-heading">Choose the configuration you want priced.</h2><p>The water report identifies the treatment path. Household size, bathrooms, peak demand, incoming water conditions and installation details determine final equipment sizing.</p></div><div className={styles.offerPrice}><span>Standard Complete Home offer</span><del>$4,995</del><strong>$3,495</strong></div></div>
        <div className={styles.tierGrid} role="radiogroup" aria-label="Configuration to price">{(Object.keys(tierCopy) as Tier[]).map((option) => <button type="button" role="radio" aria-checked={tier === option} className={tier === option ? styles.tierSelected : undefined} onClick={() => { setTier(option); setQuoteReady(false); }} key={option}><span>{tier === option ? "✓" : ""}</span><strong>{tierCopy[option].title}</strong><b>{tierCopy[option].price}</b><small>{tierCopy[option].note}</small></button>)}</div>
        <div className={styles.includedBox}><strong>The confirmed $3,495 Standard offer includes:</strong><ul><li>Whole-home water softener</li><li>Reverse-osmosis drinking-water system</li><li>Kitchen RO faucet</li><li>Standard installation</li></ul><p>Financing is available through Hearth, subject to approval and lender terms.</p></div>
        <form className={styles.quoteForm} onSubmit={buildQuote}>
          <div className={styles.formHeading}><span>4</span><div><small>Personalize the quote</small><h3>Two home details help size the quote path.</h3><p>Standard, Plus and Dual Tank are not assigned from ZIP alone.</p></div></div>
          <div className={styles.fieldGrid}>
            <label><span>Bathrooms</span><select required value={bathrooms} onChange={(event) => setBathrooms(event.target.value)}><option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5+">5+</option></select></label>
            <label><span>People in home</span><select required value={householdSize} onChange={(event) => setHouseholdSize(event.target.value)}><option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6+">6+</option></select></label>
            <label><span>Name</span><input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label><span>Phone</span><input required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} /></label>
            <label className={styles.fullField}><span>Installation address</span><input required autoComplete="street-address" value={address} onChange={(event) => setAddress(event.target.value)} /></label>
            <label className={styles.fullField}><span>Email <em>optional</em></span><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          </div>
          <button className={styles.quoteButton} type="submit">Show my quote path <span aria-hidden="true">→</span></button><small className={styles.localPrivacy}>Your details stay on this page until you choose to call or send the prefilled quote request by text.</small>
        </form>
        {quoteReady ? <div className={styles.quoteResult} aria-live="polite"><div><span>Your preliminary quote path</span><h3>{tierCopy[tier].title} configuration</h3><p>{treatmentPath}</p></div><div className={styles.quoteAmount}>{tier === "standard" ? <><del>$4,995</del><strong>$3,495</strong><small>Standard package · standard installation</small></> : <><strong>Personalized</strong><small>We confirm the {tierCopy[tier].title} upgrade price after sizing and installation review.</small></>}</div><div className={styles.quoteActions}><a href={smsHref} onClick={() => track("water_quote_text", { tier, pws_id: provider?.pwsId ?? null })}>Text my quote request</a><a href={PHONE_HREF} onClick={() => track("water_check_call", { placement: "quote_result", tier })}>Call {PHONE_DISPLAY}</a></div><p className={styles.exclusions}>Standard installation only. Sales tax, permits, electrical work, trenching, code upgrades, removal of existing equipment, major plumbing modifications, difficult or nonstandard installations, and work outside standard installation are additional when required and must be separately quoted.</p></div> : null}
      </section> : null}
    </section>
  );
}
