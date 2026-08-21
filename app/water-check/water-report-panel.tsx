"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  PHONE_DISPLAY,
  PHONE_HREF,
  formatCount,
  formatDate,
  type WaterSystem,
} from "./water-check-data";
import styles from "./water-report-panel.module.css";

type PointContext = "delivered" | "source" | "other";
type PointKind = "distribution" | "treated" | "purchased" | "blend" | "source" | "other";
type AnalyteStatus =
  | "above-listed-mcl"
  | "detected-below-listed-mcl"
  | "detected-no-listed-mcl"
  | "source-detection";

interface ReportAnalyte {
  id: string;
  analyteNumber: string;
  name: string;
  category: string;
  unit: string;
  status: AnalyteStatus;
  context: PointContext;
  sampleCount: number;
  detectionCount: number;
  latestSampleDate: string | null;
  latestDetected: number | null;
  minDetected: number | null;
  maxDetected: number | null;
  listedMcl: number | null;
  maxPercentOfListedMcl: number | null;
  reportingLevel: number | null;
  samplePoints: string[];
  resultSummary: string;
  comparisonSummary: string;
  explanation: string;
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
  points: Array<{
    name: string;
    context: PointContext;
    kind: PointKind;
    recordsReviewed: number;
    latestSampleDate: string | null;
    officialUrl: string;
  }>;
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

interface ApiErrorBody {
  error?: { message?: string };
}

function track(event: string, details: Record<string, unknown> = {}) {
  const browserWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };
  browserWindow.dataLayer?.push({ event, ...details });
}

async function getReport(system: WaterSystem, signal: AbortSignal): Promise<WaterReportResponse> {
  const query = new URLSearchParams({
    pws: system.pwsId,
    name: system.name,
  });
  const response = await fetch(`/api/water-report?${query.toString()}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  const body = (await response.json().catch(() => ({}))) as WaterReportResponse & ApiErrorBody;

  if (!response.ok) {
    throw new Error(
      body.error?.message ?? "The current monitoring records could not be loaded.",
    );
  }

  return body;
}

function contextLabel(context: WaterReportResponse["monitoringContext"]): string {
  switch (context) {
    case "delivered":
      return "Treated or distribution records";
    case "mixed":
      return "Treated and source-water records";
    case "source":
      return "Source-water records only";
    default:
      return "Public monitoring records";
  }
}

function pointContextLabel(context: PointContext): string {
  if (context === "delivered") return "Treated / distribution";
  if (context === "source") return "Source water";
  return "Other monitoring point";
}

function statusCopy(analyte: ReportAnalyte): { label: string; tone: string } {
  switch (analyte.status) {
    case "above-listed-mcl":
      return { label: "Above listed MCL in selected result", tone: styles.statusAlert };
    case "detected-below-listed-mcl":
      return { label: "Detected below listed MCL", tone: styles.statusMeasured };
    case "source-detection":
      return { label: "Detected in source water", tone: styles.statusSource };
    default:
      return { label: "Detected · no MCL listed", tone: styles.statusNeutral };
  }
}

function formatPercent(value: number | null): string {
  if (value === null) return "Not available";
  if (value >= 100) return `${Math.round(value).toLocaleString()}%`;
  if (value >= 10) return `${value.toFixed(0)}%`;
  return `${value.toFixed(1)}%`;
}

function recommendationTone(key: string): string {
  if (key === "complete-home") return styles.recommendationComplete;
  if (key === "reverse-osmosis") return styles.recommendationRo;
  if (key === "water-softener") return styles.recommendationSoftener;
  if (key === "whole-home-filtration") return styles.recommendationFilter;
  return styles.recommendationAssessment;
}

export function WaterReportPanel({ system }: { system: WaterSystem }) {
  const [report, setReport] = useState<WaterReportResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setReport(null);
    setError("");
    setLoading(true);

    void getReport(system, controller.signal)
      .then((data) => {
        setReport(data);
        track("water_monitoring_report_view", {
          pws_id: data.pwsId,
          detected_analytes: data.summary.detectedAnalytes,
          listed_mcl_exceedances: data.summary.aboveListedMcl,
          recommendation: data.recommendation.key,
          monitoring_context: data.monitoringContext,
        });
      })
      .catch((caught) => {
        if (controller.signal.aborted) return;
        setError(
          caught instanceof Error
            ? caught.message
            : "The current monitoring records could not be loaded.",
        );
        track("water_monitoring_report_error", { pws_id: system.pwsId });
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [system.name, system.pwsId]);

  if (loading) {
    return (
      <section className={styles.loadingPanel} aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <div>
          <strong>Loading actual water-test records…</strong>
          <p>Checking recent California Drinking Water Watch monitoring results.</p>
        </div>
      </section>
    );
  }

  if (error || !report) {
    return (
      <section className={styles.errorPanel} role="alert">
        <span aria-hidden="true">!</span>
        <div>
          <strong>Monitoring results are temporarily unavailable.</strong>
          <p>{error || "The official source did not return a usable report."}</p>
          <a
            href="https://sdwis.waterboards.ca.gov/PDWW/"
            target="_blank"
            rel="noreferrer"
          >
            Open California Drinking Water Watch <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>
    );
  }

  const hasResults = report.status === "records-returned" && report.analytes.length > 0;

  return (
    <section className={styles.panel} aria-labelledby={`water-report-${report.pwsId}`}>
      <div className={styles.reportHeader}>
        <div>
          <p className={styles.kicker}><span /> Actual water-test results on file</p>
          <h3 id={`water-report-${report.pwsId}`}>Your water quality report</h3>
          <p>
            Recent public monitoring records for <strong>{report.systemName}</strong>,
            covering the last {report.lookback.months} months.
          </p>
        </div>
        <div className={styles.headerBadges}>
          <span>{contextLabel(report.monitoringContext)}</span>
          <span>Updated {formatDate(report.generatedAt)}</span>
        </div>
      </div>

      <div className={styles.summaryGrid}>
        <div>
          <span>Detected analytes</span>
          <strong>{formatCount(report.summary.detectedAnalytes)}</strong>
          <small>Across selected recent records</small>
        </div>
        <div>
          <span>Test records reviewed</span>
          <strong>{formatCount(report.summary.recordsReviewed)}</strong>
          <small>Detected and non-detected results</small>
        </div>
        <div>
          <span>Sampling points</span>
          <strong>{formatCount(report.summary.pointsReviewed)}</strong>
          <small>Representative locations selected</small>
        </div>
        <div className={report.summary.aboveListedMcl > 0 ? styles.summaryAlert : ""}>
          <span>Above listed MCL</span>
          <strong>{formatCount(report.summary.aboveListedMcl)}</strong>
          <small>Selected treated/distribution results</small>
        </div>
      </div>

      <div className={styles.contextNotice}>
        <span aria-hidden="true">i</span>
        <div>
          <strong>{contextLabel(report.monitoringContext)}</strong>
          <p>
            These are real public laboratory-monitoring records, but they are not a
            sample collected from your faucet. Confirm the provider on your bill and
            review the utility&apos;s current Consumer Confidence Report.
          </p>
        </div>
      </div>

      {report.summary.aboveListedMcl > 0 ? (
        <div className={styles.mclNotice}>
          <span aria-hidden="true">!</span>
          <p>
            At least one selected treated or distribution result was above the MCL
            printed in the state result row. That does not automatically establish the
            utility&apos;s formal compliance status; check current utility notices before
            making a treatment decision.
          </p>
        </div>
      ) : null}

      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.kicker}><span /> What was detected</p>
          <h3>Detected analytes and listed limits</h3>
        </div>
        <span className={styles.latestDate}>
          Latest selected sample: {formatDate(report.summary.latestSampleDate)}
        </span>
      </div>

      {hasResults ? (
        <div className={styles.analyteGrid}>
          {report.analytes.map((analyte) => {
            const status = statusCopy(analyte);
            return (
              <article className={styles.analyteCard} key={analyte.id}>
                <div className={styles.analyteTopline}>
                  <span className={`${styles.statusBadge} ${status.tone}`}>{status.label}</span>
                  <span className={styles.category}>{analyte.category}</span>
                </div>
                <h4>{analyte.name}</h4>
                <div className={styles.measurement}>
                  <span>Detected range</span>
                  <strong>{analyte.resultSummary}</strong>
                </div>
                <dl>
                  <div>
                    <dt>Listed MCL</dt>
                    <dd>
                      {analyte.listedMcl === null
                        ? "Not listed"
                        : `${analyte.listedMcl.toLocaleString()} ${analyte.unit}`}
                    </dd>
                  </div>
                  <div>
                    <dt>Highest vs. MCL</dt>
                    <dd>{formatPercent(analyte.maxPercentOfListedMcl)}</dd>
                  </div>
                  <div>
                    <dt>Detections</dt>
                    <dd>{analyte.detectionCount} of {analyte.sampleCount} selected results</dd>
                  </div>
                  <div>
                    <dt>Latest selected sample</dt>
                    <dd>{formatDate(analyte.latestSampleDate)}</dd>
                  </div>
                </dl>
                <p className={styles.comparison}>{analyte.comparisonSummary}</p>
                <p className={styles.explanation}>{analyte.explanation}</p>
                <details>
                  <summary>Sampling locations <span aria-hidden="true">+</span></summary>
                  <ul>
                    {analyte.samplePoints.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </details>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyPanel}>
          <span aria-hidden="true">i</span>
          <div>
            <strong>No recent detected analytes were returned from the selected points.</strong>
            <p>
              That does not mean every analyte was tested at every location or that the
              water at your tap has been tested. Use the official links below and the
              utility&apos;s current report for confirmation.
            </p>
          </div>
        </div>
      )}

      <details className={styles.coverageDetails}>
        <summary>
          Monitoring locations used in this report <span aria-hidden="true">+</span>
        </summary>
        <div className={styles.pointList}>
          {report.points.map((point) => (
            <article key={`${point.name}-${point.officialUrl}`}>
              <div>
                <strong>{point.name}</strong>
                <span>{pointContextLabel(point.context)}</span>
              </div>
              <p>
                {formatCount(point.recordsReviewed)} records · latest selected sample {formatDate(point.latestSampleDate)}
              </p>
              <a href={point.officialUrl} target="_blank" rel="noreferrer">
                Open source results <b aria-hidden="true">↗</b>
              </a>
            </article>
          ))}
        </div>
      </details>

      <section
        className={`${styles.recommendation} ${recommendationTone(report.recommendation.key)}`}
        aria-labelledby={`system-fit-${report.pwsId}`}
      >
        <div className={styles.recommendationCopy}>
          <span className={styles.recommendationLabel}>{report.recommendation.label}</span>
          <h3 id={`system-fit-${report.pwsId}`}>{report.recommendation.title}</h3>
          <p>{report.recommendation.description}</p>

          {report.recommendation.evidence.length > 0 ? (
            <div className={styles.evidenceList} aria-label="Report findings informing this recommendation">
              {report.recommendation.evidence.map((evidence) => <span key={evidence}>{evidence}</span>)}
            </div>
          ) : null}

          <ul className={styles.recommendationBullets}>
            {report.recommendation.bullets.map((bullet) => (
              <li key={bullet}><span aria-hidden="true">✓</span>{bullet}</li>
            ))}
          </ul>

          <div className={styles.recommendationActions}>
            <a
              className={styles.callButton}
              href={PHONE_HREF}
              onClick={() => track("water_report_call", {
                pws_id: report.pwsId,
                recommendation: report.recommendation.key,
              })}
            >
              <span aria-hidden="true">☎</span> Call {PHONE_DISPLAY}
            </a>
            <Link href={report.recommendation.servicePath}>
              Review this system path <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <aside className={styles.fitCard}>
          {report.recommendation.offerFit ? (
            <>
              <span>Current complete-home offer</span>
              <small>Regularly $4,995</small>
              <strong>$3,495</strong>
              <ul>
                <li>Whole-home water softener</li>
                <li>Reverse-osmosis drinking-water system</li>
                <li>Kitchen RO faucet</li>
                <li>Standard installation</li>
              </ul>
              <p>Financing available through Hearth, subject to approval and lender terms.</p>
            </>
          ) : (
            <>
              <span>Recommended system conversation</span>
              <strong>Call for pricing</strong>
              <p>
                We confirm the water source, household goals, equipment specifications,
                and installation conditions before quoting the recommended path.
              </p>
              <small>
                Financing available through Hearth, subject to approval and lender terms.
              </small>
            </>
          )}
          <em>
            Recommendation confidence: {report.recommendation.confidence}. Public records
            do not replace testing at the property.
          </em>
        </aside>
      </section>

      <div className={styles.disclosures}>
        <details>
          <summary>Report limitations and official sources <span aria-hidden="true">+</span></summary>
          <ul>
            {report.notices.map((notice) => <li key={notice}>{notice}</li>)}
          </ul>
          <div className={styles.sourceLinks}>
            <a href={report.officialLinks.systemDetail} target="_blank" rel="noreferrer">
              Official system details <span aria-hidden="true">↗</span>
            </a>
            <a href={report.officialLinks.monitoringResults} target="_blank" rel="noreferrer">
              Official monitoring search <span aria-hidden="true">↗</span>
            </a>
            <a href={report.officialLinks.dataDictionary} target="_blank" rel="noreferrer">
              California data information <span aria-hidden="true">↗</span>
            </a>
          </div>
        </details>
        <p>
          The $3,495 offer includes the listed equipment and standard installation.
          Tax, permits, electrical work, trenching, code upgrades, removal of existing
          equipment, major plumbing modifications, and difficult or nonstandard
          installations are not included and may cost extra.
        </p>
      </div>
    </section>
  );
}
