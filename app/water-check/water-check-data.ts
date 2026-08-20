export const PHONE_DISPLAY = "(510) 725-5120";
export const PHONE_HREF = "tel:+15107255120";

export type MatchMethod = "zcta-boundary" | "postal-point";

export interface WaterSystem {
  pwsId: string;
  name: string;
  county: string | null;
  population: number | null;
  serviceConnections: number | null;
  federalClassification: string | null;
  stateClassification: string | null;
  city: string | null;
  postalCode: string | null;
  verificationStatus: string | null;
  verifiedDate: string | null;
  boundaryType: string | null;
  activityStatus: string | null;
  centerMatch: boolean;
}

export interface ZipLookupResponse {
  zip: string;
  areaLabel: string;
  matchMethod: MatchMethod;
  systems: WaterSystem[];
  totalSystems: number;
  truncated: boolean;
  generatedAt: string;
  notices: string[];
}

export interface ViolationRecord {
  id: string;
  contaminantCode: string | null;
  contaminantName: string;
  violationCode: string | null;
  violationName: string;
  violationType: string | null;
  measure: string | null;
  compliancePeriodStart: string | null;
  compliancePeriodEnd: string | null;
  latestEnforcementAction: string | null;
  latestEnforcementDate: string | null;
}

export interface ViolationSummary {
  lookbackYears: number;
  distinctRecords: number;
  mclOrTreatmentTechniqueRecords: number;
  records: ViolationRecord[];
  status: "records-returned" | "no-records-returned" | "source-unavailable";
  sourceNote: string;
}

export interface SystemDetailResponse {
  system: WaterSystem;
  violations: ViolationSummary;
  generatedAt: string;
  officialLinks: {
    californiaDrinkingWaterWatch: string;
    epaViolationData: string;
  };
}

export interface ArcGisWaterSystemAttributes {
  WATER_SYSTEM_NUMBER?: unknown;
  SABL_PWSID?: unknown;
  WATER_SYSTEM_NAME?: unknown;
  COUNTY?: unknown;
  POPULATION?: unknown;
  SERVICE_CONNECTIONS?: unknown;
  FEDERAL_CLASSIFICATION?: unknown;
  STATE_CLASSIFICATION?: unknown;
  ADDRESS_CITY_NAME?: unknown;
  ADDRESS_ZIP_CODE?: unknown;
  VERIFIED_STATUS?: unknown;
  DT_VERIFIED?: unknown;
  BOUNDARY_TYPE?: unknown;
  ACTIVITY_STATUS_CD?: unknown;
}

export interface EpaViolationRow {
  pwsid?: unknown;
  vioid?: unknown;
  ccode?: unknown;
  cname?: unknown;
  vcode?: unknown;
  vname?: unknown;
  vtype?: unknown;
  violmeasure?: unknown;
  enfactionname?: unknown;
  enfdate?: unknown;
  compperbegindate?: unknown;
  compperenddate?: unknown;
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function numberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function normalizeZip(value: string): string | null {
  const normalized = value.trim();
  return /^\d{5}$/.test(normalized) ? normalized : null;
}

export function isCaliforniaZipRange(zip: string): boolean {
  const value = Number(zip);
  return Number.isInteger(value) && value >= 90001 && value <= 96162;
}

export function toIsoDate(value: unknown): string | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  const raw = text(value);
  if (!raw) return null;

  const slashDate = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/.exec(raw);
  if (slashDate) {
    const [, month, day, rawYear] = slashDate;
    const shortYear = Number(rawYear);
    const year =
      rawYear.length === 2
        ? shortYear >= 70
          ? 1900 + shortYear
          : 2000 + shortYear
        : shortYear;
    const date = new Date(Date.UTC(year, Number(month) - 1, Number(day)));
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  const normalized = raw.includes("T") ? raw : raw.replace(" ", "T");
  const hasTimeZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized);
  const date = new Date(hasTimeZone ? normalized : `${normalized}Z`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function mapWaterSystemAttributes(
  attributes: ArcGisWaterSystemAttributes,
  centerMatches: ReadonlySet<string> = new Set<string>(),
): WaterSystem | null {
  const pwsId = text(attributes.WATER_SYSTEM_NUMBER) ?? text(attributes.SABL_PWSID);
  const name = text(attributes.WATER_SYSTEM_NAME);

  if (!pwsId || !/^CA\d{7}$/.test(pwsId) || !name) return null;

  return {
    pwsId,
    name,
    county: text(attributes.COUNTY),
    population: numberOrNull(attributes.POPULATION),
    serviceConnections: numberOrNull(attributes.SERVICE_CONNECTIONS),
    federalClassification: text(attributes.FEDERAL_CLASSIFICATION),
    stateClassification: text(attributes.STATE_CLASSIFICATION),
    city: text(attributes.ADDRESS_CITY_NAME),
    postalCode: text(attributes.ADDRESS_ZIP_CODE),
    verificationStatus: text(attributes.VERIFIED_STATUS),
    verifiedDate: toIsoDate(attributes.DT_VERIFIED),
    boundaryType: text(attributes.BOUNDARY_TYPE),
    activityStatus: text(attributes.ACTIVITY_STATUS_CD),
    centerMatch: centerMatches.has(pwsId),
  };
}

function systemScore(system: WaterSystem): number {
  let score = 0;
  if (system.centerMatch) score += 1_000_000_000;
  if (system.verificationStatus?.toLowerCase() === "verified") score += 100_000_000;
  if (system.activityStatus?.toUpperCase() === "A") score += 10_000_000;
  const federalClassification = system.federalClassification?.trim().toUpperCase();
  if (federalClassification === "CWS" || federalClassification?.includes("COMMUNITY")) {
    score += 1_000_000;
  }
  if (system.boundaryType?.trim().toLowerCase() === "water service area") {
    score += 500_000;
  }
  score += Math.min(system.population ?? 0, 499_999);
  return score;
}

export function dedupeAndSortSystems(systems: WaterSystem[]): WaterSystem[] {
  const byPwsId = new Map<string, WaterSystem>();

  for (const system of systems) {
    if (system.boundaryType?.toLowerCase() === "wholesaler") continue;
    const existing = byPwsId.get(system.pwsId);
    if (!existing || systemScore(system) > systemScore(existing)) {
      byPwsId.set(system.pwsId, system);
    }
  }

  return [...byPwsId.values()].sort((a, b) => {
    const scoreDifference = systemScore(b) - systemScore(a);
    if (scoreDifference !== 0) return scoreDifference;
    return a.name.localeCompare(b.name);
  });
}

function rowDate(row: EpaViolationRow): string | null {
  return toIsoDate(row.compperenddate) ?? toIsoDate(row.enfdate) ?? toIsoDate(row.compperbegindate);
}

function isInsideLookback(isoDate: string | null, now: Date, lookbackYears: number): boolean {
  if (!isoDate) return false;
  const cutoff = new Date(Date.UTC(now.getUTCFullYear() - lookbackYears, now.getUTCMonth(), now.getUTCDate()));
  return new Date(isoDate).getTime() >= cutoff.getTime();
}

export function summarizeViolations(
  rows: EpaViolationRow[] | null,
  now = new Date(),
  lookbackYears = 10,
): ViolationSummary {
  if (rows === null) {
    return {
      lookbackYears,
      distinctRecords: 0,
      mclOrTreatmentTechniqueRecords: 0,
      records: [],
      status: "source-unavailable",
      sourceNote: "EPA violation data was temporarily unavailable. Check the official links for the latest record.",
    };
  }

  const grouped = new Map<string, ViolationRecord>();

  for (const row of rows) {
    const date = rowDate(row);
    if (!isInsideLookback(date, now, lookbackYears)) continue;

    const contaminantCode = text(row.ccode);
    const violationCode = text(row.vcode);
    const violationId = text(row.vioid);
    const periodStart = toIsoDate(row.compperbegindate);
    const periodEnd = toIsoDate(row.compperenddate);
    const key = [violationId, contaminantCode, violationCode, periodStart, periodEnd].join("|");
    const enforcementDate = toIsoDate(row.enfdate);
    const existing = grouped.get(key);

    const candidate: ViolationRecord = {
      id: key,
      contaminantCode,
      contaminantName: text(row.cname) ?? "Rule or contaminant not named",
      violationCode,
      violationName: text(row.vname) ?? "Violation record",
      violationType: text(row.vtype),
      measure: text(row.violmeasure),
      compliancePeriodStart: periodStart,
      compliancePeriodEnd: periodEnd,
      latestEnforcementAction: text(row.enfactionname),
      latestEnforcementDate: enforcementDate,
    };

    if (!existing) {
      grouped.set(key, candidate);
      continue;
    }

    const existingTime = existing.latestEnforcementDate
      ? new Date(existing.latestEnforcementDate).getTime()
      : Number.NEGATIVE_INFINITY;
    const candidateTime = enforcementDate
      ? new Date(enforcementDate).getTime()
      : Number.NEGATIVE_INFINITY;

    if (candidateTime > existingTime) {
      grouped.set(key, candidate);
    }
  }

  const records = [...grouped.values()].sort((a, b) => {
    const aDate = a.compliancePeriodEnd ?? a.latestEnforcementDate ?? "";
    const bDate = b.compliancePeriodEnd ?? b.latestEnforcementDate ?? "";
    return bDate.localeCompare(aDate);
  });

  if (records.length === 0) {
    return {
      lookbackYears,
      distinctRecords: 0,
      mclOrTreatmentTechniqueRecords: 0,
      records: [],
      status: "no-records-returned",
      sourceNote:
        "EPA's endpoint returned no distinct violation records in the selected lookback window. This is not a test of water at your tap and does not replace the utility's current Consumer Confidence Report.",
    };
  }

  const mclOrTreatmentTechniqueRecords = records.filter((record) => {
    const type = record.violationType?.toUpperCase();
    return type === "MCL" || type === "TT";
  }).length;

  return {
    lookbackYears,
    distinctRecords: records.length,
    mclOrTreatmentTechniqueRecords,
    records: records.slice(0, 12),
    status: "records-returned",
    sourceNote:
      "Records are grouped by violation and compliance period so multiple enforcement actions do not inflate the count. Up to the 12 most recent records are shown. Records may be historical or resolved; confirm current status with the utility and its Consumer Confidence Report.",
  };
}

export function formatCount(value: number | null): string {
  return value === null ? "Not listed" : new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(value: string | null): string {
  if (!value) return "Not listed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not listed";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
