import {
  dedupeAndSortSystems,
  isCaliforniaZipRange,
  mapWaterSystemAttributes,
  normalizeZip,
  summarizeViolations,
  type ArcGisWaterSystemAttributes,
  type EpaViolationRow,
  type MatchMethod,
  type SystemDetailResponse,
  type WaterSystem,
  type ZipLookupResponse,
} from "../../water-check/water-check-data";

const CENSUS_ZCTA_QUERY =
  "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/MapServer/2/query";
const CALIFORNIA_WATER_BOUNDARY_QUERY =
  "https://gispublic.waterboards.ca.gov/portalserver/rest/services/Drinking_Water/California_Drinking_Water_System_Area_Boundaries/FeatureServer/0/query";
const ARCGIS_GEOCODER =
  "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates";
const EPA_VIOLATION_BASE = "https://data.epa.gov/efservice/SDW_VIOL_ENFORCEMENT/PWSID";
const MAX_SYSTEMS = 25;
const REQUEST_TIMEOUT_MS = 9_000;

const WATER_SYSTEM_FIELDS = [
  "WATER_SYSTEM_NUMBER",
  "SABL_PWSID",
  "WATER_SYSTEM_NAME",
  "COUNTY",
  "POPULATION",
  "SERVICE_CONNECTIONS",
  "FEDERAL_CLASSIFICATION",
  "STATE_CLASSIFICATION",
  "ADDRESS_CITY_NAME",
  "ADDRESS_ZIP_CODE",
  "VERIFIED_STATUS",
  "DT_VERIFIED",
  "BOUNDARY_TYPE",
  "ACTIVITY_STATUS_CD",
].join(",");

interface ArcGisFeature<TAttributes> {
  attributes: TAttributes;
  geometry?: {
    rings?: number[][][];
    x?: number;
    y?: number;
  };
}

interface ArcGisResponse<TAttributes> {
  features?: ArcGisFeature<TAttributes>[];
  exceededTransferLimit?: boolean;
  error?: { message?: string; details?: string[] };
}

interface CensusZctaAttributes {
  ZCTA5?: string;
  NAME?: string;
  INTPTLAT?: string;
  INTPTLON?: string;
}

interface GeocodeCandidate {
  address?: string;
  location?: { x?: number; y?: number };
  attributes?: { City?: string; Region?: string; Postal?: string; Country?: string };
  score?: number;
}

interface GeocodeResponse {
  candidates?: GeocodeCandidate[];
  error?: { message?: string };
}

function isCaliforniaRegion(value: string | undefined): boolean {
  const region = value?.trim().toUpperCase();
  return region === "CA" || region === "CALIFORNIA";
}

function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control":
        status === 200
          ? "public, s-maxage=21600, stale-while-revalidate=86400"
          : "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function apiError(code: string, message: string, status: number): Response {
  return jsonResponse({ error: { code, message } }, status);
}

async function fetchJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...init.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream request failed with ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function postArcGis<T>(
  endpoint: string,
  parameters: Record<string, string>,
): Promise<ArcGisResponse<T>> {
  const body = new URLSearchParams({ f: "json", ...parameters });
  const data = await fetchJson<ArcGisResponse<T>>(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body,
  });

  if (data.error) {
    throw new Error(data.error.message ?? "ArcGIS request failed");
  }

  return data;
}

async function getZcta(zip: string): Promise<ArcGisFeature<CensusZctaAttributes> | null> {
  const data = await postArcGis<CensusZctaAttributes>(CENSUS_ZCTA_QUERY, {
    where: `ZCTA5='${zip}'`,
    outFields: "ZCTA5,NAME,INTPTLAT,INTPTLON",
    returnGeometry: "true",
    outSR: "4326",
    geometryPrecision: "5",
    maxAllowableOffset: "0.0005",
  });

  return data.features?.[0] ?? null;
}

async function geocodePostalCode(zip: string): Promise<GeocodeCandidate | null> {
  const query = new URLSearchParams({
    f: "json",
    singleLine: `${zip}, California, USA`,
    category: "Postal",
    countryCode: "USA",
    maxLocations: "3",
    outFields: "City,Region,Postal,Country",
    forStorage: "false",
  });
  const data = await fetchJson<GeocodeResponse>(`${ARCGIS_GEOCODER}?${query.toString()}`);

  return (
    data.candidates?.find(
      (candidate) =>
        isCaliforniaRegion(candidate.attributes?.Region) &&
        candidate.attributes?.Postal?.startsWith(zip) &&
        typeof candidate.location?.x === "number" &&
        typeof candidate.location?.y === "number",
    ) ?? null
  );
}

function polygonGeometry(feature: ArcGisFeature<CensusZctaAttributes>): string | null {
  const rings = feature.geometry?.rings;
  if (!Array.isArray(rings) || rings.length === 0) return null;
  return JSON.stringify({ rings, spatialReference: { wkid: 4326 } });
}

function pointGeometry(longitude: number, latitude: number): string {
  return JSON.stringify({
    x: longitude,
    y: latitude,
    spatialReference: { wkid: 4326 },
  });
}

async function queryWaterSystems(
  geometry: string,
  geometryType: "esriGeometryPolygon" | "esriGeometryPoint",
): Promise<ArcGisResponse<ArcGisWaterSystemAttributes>> {
  return postArcGis<ArcGisWaterSystemAttributes>(CALIFORNIA_WATER_BOUNDARY_QUERY, {
    where: "1=1",
    geometry,
    geometryType,
    inSR: "4326",
    spatialRel: "esriSpatialRelIntersects",
    outFields: WATER_SYSTEM_FIELDS,
    returnGeometry: "false",
    resultRecordCount: "200",
  });
}

function mapSystems(
  features: ArcGisFeature<ArcGisWaterSystemAttributes>[] | undefined,
  centerMatches: ReadonlySet<string>,
): WaterSystem[] {
  return (features ?? [])
    .map((feature) => mapWaterSystemAttributes(feature.attributes, centerMatches))
    .filter((system): system is WaterSystem => system !== null)
    .filter((system) => system.activityStatus === null || system.activityStatus.toUpperCase() === "A");
}

async function lookupZip(zip: string): Promise<ZipLookupResponse> {
  let zcta: ArcGisFeature<CensusZctaAttributes> | null = null;
  let censusBoundaryUnavailable = false;

  try {
    zcta = await getZcta(zip);
  } catch {
    censusBoundaryUnavailable = true;
  }

  let matchMethod: MatchMethod;
  let areaGeometry: string;
  let areaGeometryType: "esriGeometryPolygon" | "esriGeometryPoint";
  let centerLongitude: number;
  let centerLatitude: number;
  let areaLabel = `ZIP ${zip}`;

  const zctaGeometry = zcta ? polygonGeometry(zcta) : null;
  const zctaLongitude = Number(zcta?.attributes.INTPTLON);
  const zctaLatitude = Number(zcta?.attributes.INTPTLAT);

  if (
    zcta &&
    zctaGeometry &&
    Number.isFinite(zctaLongitude) &&
    Number.isFinite(zctaLatitude)
  ) {
    matchMethod = "zcta-boundary";
    areaGeometry = zctaGeometry;
    areaGeometryType = "esriGeometryPolygon";
    centerLongitude = zctaLongitude;
    centerLatitude = zctaLatitude;
  } else {
    const geocoded = await geocodePostalCode(zip);
    if (!geocoded?.location || !isCaliforniaRegion(geocoded.attributes?.Region)) {
      throw new Error("ZIP_NOT_FOUND");
    }

    matchMethod = "postal-point";
    centerLongitude = geocoded.location.x as number;
    centerLatitude = geocoded.location.y as number;
    areaGeometry = pointGeometry(centerLongitude, centerLatitude);
    areaGeometryType = "esriGeometryPoint";
    const city = geocoded.attributes?.City?.trim();
    areaLabel = city ? `${city}, CA ${zip}` : `ZIP ${zip}`;
  }

  const centerGeometry = pointGeometry(centerLongitude, centerLatitude);
  const areaResult = await queryWaterSystems(areaGeometry, areaGeometryType);
  let centerResult: ArcGisResponse<ArcGisWaterSystemAttributes> = areaResult;

  if (areaGeometryType !== "esriGeometryPoint") {
    try {
      centerResult = await queryWaterSystems(centerGeometry, "esriGeometryPoint");
    } catch {
      centerResult = { features: [] };
    }
  }

  const centerIds = new Set(
    (centerResult.features ?? [])
      .map((feature) => {
        const value =
          feature.attributes.WATER_SYSTEM_NUMBER ?? feature.attributes.SABL_PWSID;
        return typeof value === "string" ? value.trim() : "";
      })
      .filter((value) => /^CA\d{7}$/.test(value)),
  );

  const systems = dedupeAndSortSystems(mapSystems(areaResult.features, centerIds));
  const truncated = Boolean(areaResult.exceededTransferLimit) || systems.length > MAX_SYSTEMS;
  const visibleSystems = systems.slice(0, MAX_SYSTEMS);
  const notices = [
    "ZIP codes and water-system boundaries do not align exactly. Confirm the provider shown on your water bill.",
    "The California boundary layer is still being verified and may not include every public system.",
  ];

  if (matchMethod === "postal-point") {
    notices.push(
      censusBoundaryUnavailable
        ? "The Census ZIP boundary source was temporarily unavailable, so this lookup used a representative postal location."
        : "This ZIP does not have a Census ZIP Code Tabulation Area, so the match uses a representative postal location instead of a ZIP boundary.",
    );
  }

  return {
    zip,
    areaLabel,
    matchMethod,
    systems: visibleSystems,
    totalSystems: systems.length,
    truncated,
    generatedAt: new Date().toISOString(),
    notices,
  };
}

async function getSystemFromState(pwsId: string): Promise<WaterSystem | null> {
  const data = await postArcGis<ArcGisWaterSystemAttributes>(
    CALIFORNIA_WATER_BOUNDARY_QUERY,
    {
      where: `WATER_SYSTEM_NUMBER='${pwsId}' OR SABL_PWSID='${pwsId}'`,
      outFields: WATER_SYSTEM_FIELDS,
      returnGeometry: "false",
      resultRecordCount: "20",
    },
  );

  const systems = dedupeAndSortSystems(mapSystems(data.features, new Set([pwsId])));
  return systems[0] ?? null;
}

async function getEpaViolations(pwsId: string): Promise<EpaViolationRow[] | null> {
  try {
    const data = await fetchJson<unknown>(
      `${EPA_VIOLATION_BASE}/${encodeURIComponent(pwsId)}/JSON`,
    );
    return Array.isArray(data) ? (data as EpaViolationRow[]) : [];
  } catch {
    return null;
  }
}

async function lookupSystem(pwsId: string): Promise<SystemDetailResponse> {
  const [system, violationRows] = await Promise.all([
    getSystemFromState(pwsId),
    getEpaViolations(pwsId),
  ]);

  if (!system) throw new Error("SYSTEM_NOT_FOUND");

  return {
    system,
    violations: summarizeViolations(violationRows),
    generatedAt: new Date().toISOString(),
    officialLinks: {
      californiaDrinkingWaterWatch: "https://sdwis.waterboards.ca.gov/PDWW/",
      epaViolationData: `${EPA_VIOLATION_BASE}/${encodeURIComponent(pwsId)}/JSON`,
    },
  };
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const requestedPwsId = url.searchParams.get("pws")?.trim().toUpperCase();

  try {
    if (requestedPwsId) {
      if (!/^CA\d{7}$/.test(requestedPwsId)) {
        return apiError("INVALID_SYSTEM", "Enter a valid California public water system ID.", 400);
      }
      return jsonResponse(await lookupSystem(requestedPwsId));
    }

    const zip = normalizeZip(url.searchParams.get("zip") ?? "");
    if (!zip) {
      return apiError("INVALID_ZIP", "Enter a five-digit ZIP code.", 400);
    }
    if (!isCaliforniaZipRange(zip)) {
      return apiError("OUTSIDE_CALIFORNIA", "This free water check currently covers California ZIP codes only.", 400);
    }

    return jsonResponse(await lookupZip(zip));
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "ZIP_NOT_FOUND") {
      return apiError(
        "ZIP_NOT_FOUND",
        "We could not confirm that ZIP as a California postal area. Check the number and try again.",
        404,
      );
    }
    if (message === "SYSTEM_NOT_FOUND") {
      return apiError(
        "SYSTEM_NOT_FOUND",
        "That public water system was not found in the California boundary source.",
        404,
      );
    }

    console.error("water-check lookup failed", error);
    return apiError(
      "SOURCE_UNAVAILABLE",
      "One of the official data sources is temporarily unavailable. Please try again or call us for help.",
      503,
    );
  }
}
