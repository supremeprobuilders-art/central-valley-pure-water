export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const DWW_BASE = "https://sdwis.waterboards.ca.gov/PDWW/JSP";
const SEARCH_ENDPOINT = `${DWW_BASE}/SearchDispatch`;
const ANALYTE_FORM_ENDPOINT = `${DWW_BASE}/NMonitoringResultsByAnalyteForm.jsp`;
const RESULT_ENDPOINT = `${DWW_BASE}/WSamplingResultsByStoret.jsp`;
const LOOKBACK_MONTHS = 24;
const MAX_POINT_FETCHES = 6;
const MAX_POINTS_IN_REPORT = 3;
const MAX_ANALYTES_IN_REPORT = 24;
const REQUEST_TIMEOUT_MS = 18_000;
const MAX_RESPONSE_BYTES = 8_000_000;

interface ApiErrorBody {
  error: { code: string; message: string };
}

type PointContext = "delivered" | "source" | "other";
type PointKind = "distribution" | "treated" | "purchased" | "blend" | "source" | "other";
type AnalyteStatus =
  | "above-listed-mcl"
  | "detected-below-listed-mcl"
  | "detected-no-listed-mcl"
  | "source-detection";
type RecommendationKey =
  | "complete-home"
  | "reverse-osmosis"
  | "water-softener"
  | "whole-home-filtration"
  | "assessment";

interface ResolvedSystem {
  internalId: string;
  pwsId: string;
  systemName: string;
  detailUrl: string;
}

interface SamplingPoint {
  value: string;
  facilityId: string;
  samplingPointId: string;
  wsfNumber: string;
  name: string;
  label: string;
  context: PointContext;
  kind: PointKind;
  score: number;
}

interface MonitoringSample {
  analyteNumber: string;
  analyteName: string;
  sampleDate: string;
  detectedLevel: number | null;
  lessThan: boolean;
  reportingLevel: number | null;
  countingError: number | null;
  mcl: number | null;
  dlr: number | null;
  unit: string;
  labSampleId: string | null;
  lab: string | null;
  method: string | null;
  pointName: string;
  pointContext: PointContext;
  pointKind: PointKind;
  detected: boolean;
}

interface PointResult {
  point: SamplingPoint;
  samples: MonitoringSample[];
  officialUrl: string;
}

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

interface Recommendation {
  key: RecommendationKey;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  evidence: string[];
  offerFit: boolean;
  confidence: "moderate" | "limited";
  servicePath: string;
}

interface WaterReportResponse {
  pwsId: string;
  systemName: string;
  generatedAt: string;
  lookback: {
    months: number;
    start: string;
    end: string;
  };
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
  recommendation: Recommendation;
  notices: string[];
  officialLinks: {
    systemDetail: string;
    monitoringResults: string;
    dataDictionary: string;
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control":
        status === 200
          ? "public, s-maxage=86400, stale-while-revalidate=604800"
          : "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function apiError(code: string, message: string, status: number): Response {
  const body: ApiErrorBody = { error: { code, message } };
  return jsonResponse(body, status);
}

function decodeHtml(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, decimal: string) =>
      String.fromCodePoint(Number.parseInt(decimal, 10)),
    )
    .replace(/\s+/g, " ")
    .trim();
}

function decodeJsString(value: string): string {
  try {
    return decodeHtml(JSON.parse(`"${value}"`) as string);
  } catch {
    return decodeHtml(value.replace(/\\"/g, '"').replace(/\\'/g, "'"));
  }
}

function parseNumber(value: string | null | undefined): number | null {
  if (!value) return null;
  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned || cleaned === "—" || cleaned.toUpperCase() === "ND") return null;
  const match = cleaned.match(/-?(?:\d+(?:\.\d+)?|\.\d+)(?:[Ee][+-]?\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function toIsoDate(value: string): string | null {
  const match = value.trim().match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return null;
  const [, month, day, year] = match;
  const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function formatQueryDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function subtractMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() - months);
  return result;
}

async function fetchText(url: string): Promise<{ text: string; finalUrl: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent":
          "Central Valley Pure Water public-data integration/1.0 (+https://www.cvpurewater.com)",
      },
    });

    if (!response.ok) {
      throw new Error(`DWW_HTTP_${response.status}`);
    }

    const contentLength = Number(response.headers.get("content-length") ?? 0);
    if (contentLength > MAX_RESPONSE_BYTES) throw new Error("DWW_RESPONSE_TOO_LARGE");

    const text = await response.text();
    if (text.length > MAX_RESPONSE_BYTES) throw new Error("DWW_RESPONSE_TOO_LARGE");
    return { text, finalUrl: response.url };
  } finally {
    clearTimeout(timeout);
  }
}

function extractInternalId(value: string): string | null {
  const decoded = decodeHtml(value);
  return decoded.match(/[?&]tinwsys_is_number=(\d+)/i)?.[1] ?? null;
}

async function resolveSystem(pwsId: string, suppliedName: string): Promise<ResolvedSystem> {
  const query = new URLSearchParams({
    SourceWaterType: "All",
    WaterSystemStatus: "All",
    WaterSystemType: "All",
    action: "Search For Water Systems",
    county: "",
    name: "",
    number: pwsId,
  });
  const { text, finalUrl } = await fetchText(`${SEARCH_ENDPOINT}?${query.toString()}`);

  let internalId = extractInternalId(finalUrl);
  let detailUrl = finalUrl;
  let systemName = suppliedName;

  const anchorPattern = /<a\b[^>]*href=["']([^"']*WaterSystemDetail\.jsp\?[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of text.matchAll(anchorPattern)) {
    if (decodeHtml(match[2]).toUpperCase() !== pwsId) continue;
    internalId = extractInternalId(match[1]);
    detailUrl = new URL(decodeHtml(match[1]), DWW_BASE).toString();
    break;
  }

  const exactNamePattern = new RegExp(
    `${pwsId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*</a>\\s*</td>\\s*<td[^>]*>([\\s\\S]*?)</td>`,
    "i",
  );
  const nameMatch = text.match(exactNamePattern);
  if (nameMatch) systemName = decodeHtml(nameMatch[1]) || systemName;

  if (!internalId) throw new Error("DWW_SYSTEM_NOT_FOUND");

  if (!detailUrl.includes("WaterSystemDetail.jsp")) {
    const detailQuery = new URLSearchParams({
      tinwsys_is_number: internalId,
      tinwsys_st_code: "CA",
      wsnumber: pwsId,
    });
    detailUrl = `${DWW_BASE}/WaterSystemDetail.jsp?${detailQuery.toString()}`;
  }

  return { internalId, pwsId, systemName, detailUrl };
}

function classifyPoint(name: string, facilityId: string, samplingPointId: string): {
  context: PointContext;
  kind: PointKind;
  score: number;
} {
  const normalized = `${name} ${facilityId} ${samplingPointId}`.toUpperCase();

  if (/\bLCR\b|LEAD\s*(AND|&)?\s*COPPER/.test(normalized)) {
    return { context: "other", kind: "other", score: -10_000 };
  }

  let score = 0;
  let context: PointContext = "other";
  let kind: PointKind = "other";

  if (/DISTRIBUT|\bDIST\b|\bTANK\b|RESERVOIR/.test(normalized)) {
    context = "delivered";
    kind = "distribution";
    score += 700;
  }
  if (/PURCHASED[ -]*TREATED|PURCHASED WATER/.test(normalized)) {
    context = "delivered";
    kind = "purchased";
    score += 680;
  } else if (/FINISHED|POST[ -]*TREAT|TREATED|EFFLUENT|OUTLET/.test(normalized)) {
    context = "delivered";
    kind = "treated";
    score += 650;
  } else if (/BLEND|ENTRY POINT|EPTDS/.test(normalized)) {
    context = "delivered";
    kind = "blend";
    score += 620;
  }

  if (/\bDST\b/.test(facilityId.toUpperCase())) score += 160;
  if (/RAW|UNTREATED|INFLUENT/.test(normalized)) {
    context = "source";
    kind = "source";
    score -= 420;
  } else if (context === "other" && /\bWELL\b|SOURCE|INTAKE|SPRING/.test(normalized)) {
    context = "source";
    kind = "source";
    score += 120;
  }

  if (!name.trim()) score -= 1_000;
  return { context, kind, score };
}

function parseSamplingPoints(html: string): SamplingPoint[] {
  const block = html.match(/var\s+tags\s*=\s*\[([\s\S]*?)\]\s*;/i)?.[1];
  if (!block) return [];

  const points: SamplingPoint[] = [];
  const seen = new Set<string>();
  const itemPattern = /value:\s*"((?:\\.|[^"])*)"[\s\S]*?label:\s*"((?:\\.|[^"])*)"[\s\S]*?desc:\s*"((?:\\.|[^"])*)"/gi;

  for (const match of block.matchAll(itemPattern)) {
    const value = decodeJsString(match[1]);
    const label = decodeJsString(match[2]);
    const name = decodeJsString(match[3]);
    const pieces = value.split("-");
    if (pieces.length < 3) continue;
    const wsfNumber = pieces.pop() ?? "";
    const samplingPointId = pieces.pop() ?? "";
    const facilityId = pieces.join("-");
    if (!facilityId || !samplingPointId || !/^\d+$/.test(wsfNumber)) continue;
    if (seen.has(value)) continue;
    seen.add(value);

    const classification = classifyPoint(name, facilityId, samplingPointId);
    points.push({
      value,
      facilityId,
      samplingPointId,
      wsfNumber,
      name: name || label || value,
      label,
      ...classification,
    });
  }

  return points;
}

function choosePointCandidates(points: SamplingPoint[]): SamplingPoint[] {
  const eligible = points
    .filter((point) => point.score > -5_000)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

  const chosen: SamplingPoint[] = [];
  const perKind = new Map<PointKind, number>();
  const kindLimits: Record<PointKind, number> = {
    distribution: 2,
    treated: 2,
    purchased: 1,
    blend: 1,
    source: 2,
    other: 1,
  };

  for (const point of eligible) {
    const count = perKind.get(point.kind) ?? 0;
    if (count >= kindLimits[point.kind]) continue;
    chosen.push(point);
    perKind.set(point.kind, count + 1);
    if (chosen.length >= MAX_POINT_FETCHES) break;
  }

  for (const point of eligible) {
    if (chosen.length >= MAX_POINT_FETCHES) break;
    if (!chosen.some((candidate) => candidate.value === point.value)) chosen.push(point);
  }

  return chosen;
}

function extractCells(rowHtml: string): string[] {
  const cells: string[] = [];
  const pattern = /<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi;
  for (const match of rowHtml.matchAll(pattern)) cells.push(decodeHtml(match[1]));
  return cells;
}

function parseMonitoringRows(html: string, point: SamplingPoint): MonitoringSample[] {
  const samples: MonitoringSample[] = [];
  const rowPattern = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;

  for (const rowMatch of html.matchAll(rowPattern)) {
    const cells = extractCells(rowMatch[1]);
    if (cells.length < 14) continue;
    const sampleDate = toIsoDate(cells[2]);
    if (!sampleDate || !cells[0] || !cells[1]) continue;

    const detectedLevel = parseNumber(cells[3]);
    const lessThan = cells[4].includes("<");
    const unit = cells[9].trim().toUpperCase() || "NOT LISTED";

    samples.push({
      analyteNumber: cells[0].trim(),
      analyteName: cells[1].trim(),
      sampleDate,
      detectedLevel,
      lessThan,
      reportingLevel: parseNumber(cells[5]),
      countingError: parseNumber(cells[6]),
      mcl: parseNumber(cells[7]),
      dlr: parseNumber(cells[8]),
      unit,
      labSampleId: cells[10] || null,
      lab: cells[11] || null,
      method: cells[13] || null,
      pointName: point.name,
      pointContext: point.context,
      pointKind: point.kind,
      detected: detectedLevel !== null && !lessThan,
    });
  }

  return samples;
}

function buildResultsUrl(
  system: ResolvedSystem,
  point: SamplingPoint,
  start: Date,
  end: Date,
): string {
  const query = new URLSearchParams({
    SystemName: system.systemName,
    SystemNumber: system.pwsId.slice(2),
    tinwsys_is_number: system.internalId,
    begin_date: formatQueryDate(start),
    end_date: formatQueryDate(end),
    mDWW: "",
    FacilityID: point.facilityId,
    SamplingPointID: point.samplingPointId,
    WSFNumber: point.wsfNumber,
    SamplingPointName: point.name,
    Analyte: "",
    ChemicalName: "",
  });
  return `${RESULT_ENDPOINT}?${query.toString()}`;
}

async function fetchPointResult(
  system: ResolvedSystem,
  point: SamplingPoint,
  start: Date,
  end: Date,
): Promise<PointResult> {
  const officialUrl = buildResultsUrl(system, point, start, end);
  const { text } = await fetchText(officialUrl);
  return { point, samples: parseMonitoringRows(text, point), officialUrl };
}

function categoryFor(name: string): string {
  const value = name.toUpperCase();
  if (/HARDNESS|CALCIUM|MAGNESIUM|ALKALINITY/.test(value)) return "Hard-water minerals";
  if (/PFOA|PFOS|PFAS|PERFLUOR|HFPO|ADONA|PFHXS|PFNA/.test(value)) return "PFAS";
  if (/NITRATE|NITRITE|ARSENIC|URANIUM|CHROMIUM|PERCHLORATE|FLUORIDE/.test(value)) {
    return "Inorganic contaminant";
  }
  if (/TRIHALOMETHANE|HALOACETIC|CHLOROFORM|BROMOFORM|BROMODICHLORO|DIBROMOCHLORO/.test(value)) {
    return "Disinfection byproduct";
  }
  if (/BENZENE|TOLUENE|XYLENE|TRICHLORO|TETRACHLORO|DICHLORO|VINYL CHLORIDE|METHYL TERT|MTBE/.test(value)) {
    return "Volatile organic compound";
  }
  if (/PESTICIDE|HERBICIDE|ATRAZINE|SIMAZINE|DIBROMO-3-CHLOROPROPANE|ETHYLENE DIBROMIDE/.test(value)) {
    return "Pesticide or agricultural chemical";
  }
  if (/IRON|MANGANESE|COLOR|ODOR|TURBIDITY|CHLORINE|CHLORAMINE/.test(value)) {
    return "Aesthetic or operational indicator";
  }
  if (/TDS|TOTAL DISSOLVED|SODIUM|CHLORIDE|SULFATE/.test(value)) return "Dissolved mineral indicator";
  return "Other monitored analyte";
}

function explanationFor(analyte: ReportAnalyte): string {
  if (analyte.context === "source") {
    return "This detection came from a source-water sampling point. Treatment, blending, or a different delivery path may change what reaches a home.";
  }
  if (analyte.status === "above-listed-mcl") {
    return "At least one selected monitoring result was above the MCL printed in the state result row. Compliance determinations may use additional samples or averaging, so confirm the current status with the utility.";
  }
  if (analyte.status === "detected-below-listed-mcl") {
    return "The analyte was detected in the selected records, and the highest selected result was below the MCL printed in those state records.";
  }
  return "The analyte was detected, but the selected state result rows did not list an MCL for a direct comparison.";
}

function numberText(value: number | null): string {
  if (value === null) return "Not listed";
  if (Math.abs(value) >= 100) return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(value) >= 1) return value.toLocaleString("en-US", { maximumFractionDigits: 3 });
  return value.toLocaleString("en-US", { maximumSignificantDigits: 4 });
}

function importanceScore(analyte: ReportAnalyte): number {
  let score = 0;
  if (analyte.status === "above-listed-mcl") score += 10_000;
  if (analyte.context === "delivered") score += 2_000;
  if (analyte.maxPercentOfListedMcl !== null) score += Math.min(analyte.maxPercentOfListedMcl, 1_500);
  if (/PFAS|Inorganic|Volatile|Pesticide|Disinfection/.test(analyte.category)) score += 800;
  if (/Hard-water|Dissolved mineral/.test(analyte.category)) score += 500;
  score += Math.min(analyte.detectionCount, 100);
  return score;
}

function aggregateAnalytes(pointResults: PointResult[]): {
  analytes: ReportAnalyte[];
  analytesReviewed: number;
  totalDetectedAnalytes: number;
  notDetectedAnalytes: number;
} {
  const grouped = new Map<string, MonitoringSample[]>();

  for (const result of pointResults) {
    for (const sample of result.samples) {
      const key = `${sample.analyteNumber}|${sample.unit}`;
      const bucket = grouped.get(key) ?? [];
      bucket.push(sample);
      grouped.set(key, bucket);
    }
  }

  const detectedAnalytes: ReportAnalyte[] = [];
  let notDetectedAnalytes = 0;

  for (const [id, samples] of grouped) {
    samples.sort((a, b) => b.sampleDate.localeCompare(a.sampleDate));
    const detections = samples.filter((sample) => sample.detected && sample.detectedLevel !== null);
    if (detections.length === 0) {
      notDetectedAnalytes += 1;
      continue;
    }

    const deliveredDetections = detections.filter((sample) => sample.pointContext === "delivered");
    const comparisonDetections = deliveredDetections.length > 0 ? deliveredDetections : detections;
    const values = comparisonDetections
      .map((sample) => sample.detectedLevel)
      .filter((value): value is number => value !== null);
    const maxDetected = Math.max(...values);
    const minDetected = Math.min(...values);
    const latestDetection = comparisonDetections[0];
    const mclSample = comparisonDetections.find((sample) => sample.mcl !== null) ?? null;
    const listedMcl = mclSample?.mcl ?? null;
    const context: PointContext =
      deliveredDetections.length > 0 ? "delivered" : comparisonDetections[0].pointContext;
    const maxPercentOfListedMcl =
      listedMcl && listedMcl > 0 ? (maxDetected / listedMcl) * 100 : null;

    let status: AnalyteStatus;
    if (context === "source") status = "source-detection";
    else if (listedMcl !== null && maxDetected > listedMcl) status = "above-listed-mcl";
    else if (listedMcl !== null) status = "detected-below-listed-mcl";
    else status = "detected-no-listed-mcl";

    const samplePoints = [...new Set(comparisonDetections.map((sample) => sample.pointName))];
    const analyte: ReportAnalyte = {
      id,
      analyteNumber: samples[0].analyteNumber,
      name: samples[0].analyteName,
      category: categoryFor(samples[0].analyteName),
      unit: samples[0].unit,
      status,
      context,
      sampleCount: samples.length,
      detectionCount: detections.length,
      latestSampleDate: samples[0]?.sampleDate ?? null,
      latestDetected: latestDetection.detectedLevel,
      minDetected,
      maxDetected,
      listedMcl,
      maxPercentOfListedMcl,
      reportingLevel: latestDetection.reportingLevel,
      samplePoints,
      resultSummary:
        minDetected === maxDetected
          ? `${numberText(maxDetected)} ${samples[0].unit}`
          : `${numberText(minDetected)}–${numberText(maxDetected)} ${samples[0].unit}`,
      comparisonSummary:
        context === "source"
          ? "Source-water detection; not a delivered-water compliance result"
          : listedMcl === null
            ? "No MCL was listed in the selected state result rows"
            : `${numberText(maxPercentOfListedMcl)}% of the listed MCL at the highest selected result`,
      explanation: "",
    };
    analyte.explanation = explanationFor(analyte);
    detectedAnalytes.push(analyte);
  }

  detectedAnalytes.sort((a, b) => importanceScore(b) - importanceScore(a) || a.name.localeCompare(b.name));

  return {
    analytes: detectedAnalytes.slice(0, MAX_ANALYTES_IN_REPORT),
    analytesReviewed: grouped.size,
    totalDetectedAnalytes: detectedAnalytes.length,
    notDetectedAnalytes,
  };
}

function includesAny(value: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(value));
}

function buildRecommendation(
  analytes: ReportAnalyte[],
  monitoringContext: WaterReportResponse["monitoringContext"],
): Recommendation {
  const names = analytes.map((analyte) => analyte.name.toUpperCase());
  const hardEvidence = analytes.filter((analyte) => {
    const name = analyte.name.toUpperCase();
    if (!/HARDNESS/.test(name)) return false;
    if (analyte.unit !== "MG/L" || analyte.maxDetected === null) return true;
    return analyte.maxDetected >= 120;
  });
  const drinkingEvidence = analytes.filter((analyte) =>
    includesAny(analyte.name.toUpperCase(), [
      /NITRATE|NITRITE|ARSENIC|URANIUM|CHROMIUM|PERCHLORATE|FLUORIDE/,
      /PFOA|PFOS|PFAS|PERFLUOR|HFPO|PFHXS|PFNA/,
      /TRICHLORO|TETRACHLORO|DICHLORO|BENZENE|VINYL CHLORIDE|MTBE|METHYL TERT/,
      /DIBROMO-3-CHLOROPROPANE|ETHYLENE DIBROMIDE|ATRAZINE|SIMAZINE/,
      /TDS|TOTAL DISSOLVED|SODIUM/,
    ]),
  );
  const wholeHomeEvidence = analytes.filter((analyte) =>
    includesAny(analyte.name.toUpperCase(), [
      /IRON|MANGANESE|TURBIDITY|COLOR|ODOR/,
      /CHLORINE|CHLORAMINE|TRIHALOMETHANE|HALOACETIC|CHLOROFORM|BROMOFORM|BROMODICHLORO|DIBROMOCHLORO/,
    ]),
  );

  const evidenceNames = (items: ReportAnalyte[]) => [...new Set(items.map((item) => item.name))].slice(0, 5);
  const limited = monitoringContext === "source";
  const baseBullets = [
    "Confirm the provider and PWSID on the current water bill.",
    "Review the utility's current Consumer Confidence Report and any recent notices.",
    "Confirm model-specific certified reduction claims before relying on equipment for a listed analyte.",
  ];

  if (hardEvidence.length > 0 && drinkingEvidence.length > 0) {
    return {
      key: "complete-home",
      label: "Best-fit starting point from these records",
      title: "Complete Home System: whole-home softening plus kitchen RO",
      description:
        "The selected monitoring records include a hard-water indicator and drinking-water analytes that support discussing both whole-home conditioning and a dedicated kitchen drinking-water system.",
      bullets: baseBullets,
      evidence: [...evidenceNames(hardEvidence), ...evidenceNames(drinkingEvidence)].slice(0, 5),
      offerFit: true,
      confidence: limited ? "limited" : "moderate",
      servicePath: "/services/whole-home-water-filtration",
    };
  }

  if (drinkingEvidence.length > 0) {
    return {
      key: "reverse-osmosis",
      label: "Best-fit starting point from these records",
      title: "Kitchen reverse-osmosis assessment",
      description:
        "Recent selected records include drinking-water analytes that make a dedicated kitchen treatment conversation the strongest starting point. Exact performance depends on the selected model and current water conditions.",
      bullets: baseBullets,
      evidence: evidenceNames(drinkingEvidence),
      offerFit: false,
      confidence: limited ? "limited" : "moderate",
      servicePath: "/services/reverse-osmosis",
    };
  }

  if (hardEvidence.length > 0) {
    return {
      key: "water-softener",
      label: "Best-fit starting point from these records",
      title: "Whole-home water-softener assessment",
      description:
        "The selected monitoring records include a hardness indicator. A household assessment is still needed to size the softener and confirm plumbing, drainage, power, and installation conditions.",
      bullets: baseBullets,
      evidence: evidenceNames(hardEvidence),
      offerFit: false,
      confidence: limited ? "limited" : "moderate",
      servicePath: "/services/water-softeners",
    };
  }

  if (wholeHomeEvidence.length > 0) {
    return {
      key: "whole-home-filtration",
      label: "Best-fit starting point from these records",
      title: "Whole-home filtration assessment",
      description:
        "The selected records include aesthetic, operational, or disinfection-related indicators that support discussing a whole-home filtration path. The treatment media must be chosen for the current source and goals.",
      bullets: baseBullets,
      evidence: evidenceNames(wholeHomeEvidence),
      offerFit: false,
      confidence: limited ? "limited" : "moderate",
      servicePath: "/services/whole-home-water-filtration",
    };
  }

  return {
    key: "assessment",
    label: "Best-fit next step",
    title: "Confirm household goals before choosing equipment",
    description:
      names.length > 0
        ? "The selected records contain detections, but they do not create a clear softener, drinking-water, or whole-home equipment path by themselves."
        : "The selected recent monitoring records did not return enough detected analytes to make a responsible equipment recommendation from public data alone.",
    bullets: baseBullets,
    evidence: analytes.slice(0, 4).map((analyte) => analyte.name),
    offerFit: false,
    confidence: "limited",
    servicePath: "/call-for-pricing",
  };
}

function newestDate(samples: MonitoringSample[]): string | null {
  return samples.reduce<string | null>(
    (latest, sample) => (!latest || sample.sampleDate > latest ? sample.sampleDate : latest),
    null,
  );
}

async function createWaterReport(pwsId: string, suppliedName: string): Promise<WaterReportResponse> {
  const now = new Date();
  const start = subtractMonths(now, LOOKBACK_MONTHS);
  const system = await resolveSystem(pwsId, suppliedName);
  const formQuery = new URLSearchParams({
    SamplingPointID: "",
    SamplingPointName: "",
    SystemName: system.systemName,
    begin_date: "",
    end_date: "",
    tinwsys_is_number: system.internalId,
    tinwsys_st_code: "CA",
    ws_number: pwsId.slice(2),
  });
  const { text: formHtml } = await fetchText(`${ANALYTE_FORM_ENDPOINT}?${formQuery.toString()}`);
  const points = parseSamplingPoints(formHtml);
  if (points.length === 0) throw new Error("DWW_SAMPLE_POINTS_NOT_FOUND");

  const candidates = choosePointCandidates(points);
  const fetchCandidateBatch = async (batch: SamplingPoint[]) => {
    const settled = await Promise.allSettled(
      batch.map((point) => fetchPointResult(system, point, start, now)),
    );
    return settled
      .filter((result): result is PromiseFulfilledResult<PointResult> => result.status === "fulfilled")
      .map((result) => result.value);
  };

  const firstBatch = await fetchCandidateBatch(candidates);
  if (firstBatch.length === 0) throw new Error("DWW_RESULTS_UNAVAILABLE");

  let fulfilledResults = firstBatch;
  let successful = fulfilledResults.filter((result) => result.samples.length > 0);

  if (successful.length === 0) {
    const candidateIds = new Set(candidates.map((point) => point.value));
    const fallbackCandidates = points
      .filter((point) => point.score > -5_000 && !candidateIds.has(point.value))
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      .slice(0, 4);
    if (fallbackCandidates.length > 0) {
      const fallbackBatch = await fetchCandidateBatch(fallbackCandidates);
      fulfilledResults = [...fulfilledResults, ...fallbackBatch];
      successful = fulfilledResults.filter((result) => result.samples.length > 0);
    }
  }

  successful.sort((a, b) => {
      const contextScore = (result: PointResult) =>
        result.point.context === "delivered" ? 2 : result.point.context === "source" ? 1 : 0;
      return contextScore(b) - contextScore(a) || b.point.score - a.point.score;
    });

  const selected = successful.slice(0, MAX_POINTS_IN_REPORT);
  const allSamples = selected.flatMap((result) => result.samples);
  const aggregated = aggregateAnalytes(selected);
  const contexts = new Set(selected.map((result) => result.point.context));
  let monitoringContext: WaterReportResponse["monitoringContext"] = "other";
  if (contexts.has("delivered") && contexts.has("source")) monitoringContext = "mixed";
  else if (contexts.has("delivered")) monitoringContext = "delivered";
  else if (contexts.has("source")) monitoringContext = "source";

  const aboveListedMcl = aggregated.analytes.filter(
    (analyte) => analyte.status === "above-listed-mcl",
  ).length;
  const recommendation = buildRecommendation(aggregated.analytes, monitoringContext);
  const monitoringResultsQuery = new URLSearchParams({
    tinwsys_is_number: system.internalId,
    tinwsys_st_code: "CA",
    begin_date: formatQueryDate(start),
    end_date: formatQueryDate(now),
  });

  const notices = [
    "This report summarizes selected recent public monitoring records, not a laboratory sample collected at your home.",
    "A public water system can use many wells, treatment plants, tanks, blends, and distribution locations. The selected records may not represent every tap or every day.",
    "A single result above a listed MCL is not, by itself, the utility's formal compliance determination. Confirm the current status with the utility and its Consumer Confidence Report.",
  ];
  if (monitoringContext === "source" || monitoringContext === "mixed") {
    notices.push(
      "Some selected records are source-water results collected before treatment or blending. They are labeled separately and should not be treated as delivered-water results.",
    );
  }
  if (successful.length > selected.length) {
    notices.push(
      `The state source returned records for ${successful.length} candidate sampling points; this report displays the ${selected.length} strongest representative matches to keep the report readable.`,
    );
  }

  return {
    pwsId,
    systemName: system.systemName,
    generatedAt: now.toISOString(),
    lookback: {
      months: LOOKBACK_MONTHS,
      start: start.toISOString(),
      end: now.toISOString(),
    },
    status: allSamples.length > 0 ? "records-returned" : "no-recent-records",
    monitoringContext,
    summary: {
      pointsReviewed: selected.length,
      recordsReviewed: allSamples.length,
      analytesReviewed: aggregated.analytesReviewed,
      detectedAnalytes: aggregated.totalDetectedAnalytes,
      aboveListedMcl,
      notDetectedAnalytes: aggregated.notDetectedAnalytes,
      latestSampleDate: newestDate(allSamples),
    },
    points: selected.map((result) => ({
      name: result.point.name,
      context: result.point.context,
      kind: result.point.kind,
      recordsReviewed: result.samples.length,
      latestSampleDate: newestDate(result.samples),
      officialUrl: result.officialUrl,
    })),
    analytes: aggregated.analytes,
    recommendation,
    notices,
    officialLinks: {
      systemDetail: system.detailUrl,
      monitoringResults: `${DWW_BASE}/NMonitoringResultsByAnalyte.jsp?${monitoringResultsQuery.toString()}`,
      dataDictionary: "https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/EDTlibrary.html",
    },
  };
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pwsId = url.searchParams.get("pws")?.trim().toUpperCase() ?? "";
  const systemName = url.searchParams.get("name")?.trim().slice(0, 180) ?? "";

  if (!/^CA\d{7}$/.test(pwsId)) {
    return apiError("INVALID_SYSTEM", "Enter a valid California public water system ID.", 400);
  }
  if (!systemName) {
    return apiError("MISSING_SYSTEM_NAME", "The selected public water system name is required.", 400);
  }

  try {
    return jsonResponse(await createWaterReport(pwsId, systemName));
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    console.error("water-report generation failed", { pwsId, message, error });

    if (message === "DWW_SYSTEM_NOT_FOUND") {
      return apiError(
        "SYSTEM_NOT_FOUND",
        "California Drinking Water Watch did not return a matching system record.",
        404,
      );
    }
    if (message === "DWW_SAMPLE_POINTS_NOT_FOUND") {
      return apiError(
        "NO_MONITORING_POINTS",
        "No public monitoring locations were returned for this system.",
        404,
      );
    }

    return apiError(
      "MONITORING_SOURCE_UNAVAILABLE",
      "California's monitoring-results source is temporarily unavailable. Please try again or open the official system links.",
      503,
    );
  }
}
