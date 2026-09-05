import { sitesBackendOrigin } from "../../site-config";
import verifiedWaterSystemsJson from "../../water-check/verified-water-systems.json";
import {
  guardedZipReport,
  type VerifiedWaterSystem,
} from "../../water-check/verified-zip-safeguards";

const serviceAreaQuery =
  "https://gispublic.waterboards.ca.gov/portalserver/rest/services/Hosted/CA_water_systems/FeatureServer/2/query";

const verifiedWaterSystems = verifiedWaterSystemsJson as Record<string, VerifiedWaterSystem>;

type Provider = VerifiedWaterSystem & {
  pwsId: string;
  records: unknown[];
  saferStatus?: string;
  verification?: {
    level: string;
    label: string;
    checks: string[];
  };
};

type UpstreamReport = {
  zip: string;
  location: { label: string; city: string } | null;
  providers: Provider[];
  privateWellPath: boolean;
  addressVerificationRequired?: boolean;
  exactAddressMatched?: boolean;
  verificationReason?: string;
  dataPeriod: string;
  updatedThrough: string;
};

function exactPoint(searchParams: URLSearchParams) {
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (lat < 32 || lat > 43 || lon < -125 || lon > -113) return null;
  return { lat, lon };
}

function verifiedProvider(pwsId: string, records: unknown[] = []): Provider | null {
  const details = verifiedWaterSystems[pwsId];
  if (!details) return null;
  return {
    pwsId,
    ...details,
    records,
    saferStatus: "",
    verification: {
      level: "verified",
      label: "Exact state service-area match",
      checks: [
        "State service-area layer",
        "State Drinking Water Watch",
        details.utilityReportUrl ? "Current official water-quality report" : "Official report availability checked",
      ],
    },
  };
}

async function stateProviderAtPoint(lat: number, lon: number) {
  const pwsIds = Object.keys(verifiedWaterSystems);
  const query = new URL(serviceAreaQuery);
  query.search = new URLSearchParams({
    f: "json",
    where: `water_system_number IN (${pwsIds.map((id) => `'${id}'`).join(",")})`,
    outFields:
      "water_system_number,water_system_name,system_type,county,population,service_connections,primary_water_source,owner_type,service_area,safer_status",
    returnGeometry: "false",
    spatialRel: "esriSpatialRelIntersects",
    geometryType: "esriGeometryPoint",
    inSR: "4326",
    geometry: `${lon},${lat}`,
  }).toString();

  const response = await fetch(query, {
    headers: { accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) return null;
  const result = (await response.json()) as {
    features?: Array<{
      attributes?: {
        water_system_number?: string;
        service_connections?: number;
      };
    }>;
  };
  const matches = (result.features ?? [])
    .map((feature) => feature.attributes)
    .filter((attributes): attributes is { water_system_number: string; service_connections?: number } =>
      Boolean(attributes?.water_system_number && verifiedWaterSystems[attributes.water_system_number]),
    )
    .sort((a, b) => (a.service_connections ?? Number.MAX_SAFE_INTEGER) - (b.service_connections ?? Number.MAX_SAFE_INTEGER));

  return matches[0]?.water_system_number ?? null;
}

async function exactAddressReport(requestUrl: URL, lat: number, lon: number) {
  const upstreamUrl = new URL("/api/water-report", sitesBackendOrigin);
  upstreamUrl.search = requestUrl.search;
  let report: UpstreamReport | null = null;

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: { accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(25000),
    });
    if (upstream.ok) report = (await upstream.json()) as UpstreamReport;
  } catch {
    report = null;
  }

  const upstreamProvider = report?.providers?.[0];
  if (upstreamProvider) {
    const verified = verifiedProvider(upstreamProvider.pwsId, upstreamProvider.records ?? []);
    if (verified) {
      return {
        ...report,
        providers: [verified],
        privateWellPath: false,
        addressVerificationRequired: false,
        exactAddressMatched: true,
        verificationReason: "The property point falls inside this verified active public-water-system service area.",
      };
    }
    return report;
  }

  try {
    const pwsId = await stateProviderAtPoint(lat, lon);
    const provider = pwsId ? verifiedProvider(pwsId) : null;
    if (provider) {
      return {
        ...(report ?? guardedZipReport("95356")),
        providers: [provider],
        privateWellPath: false,
        addressVerificationRequired: false,
        exactAddressMatched: true,
        verificationReason: "The property point falls inside this verified active public-water-system service area.",
      };
    }
  } catch {
    // Preserve the upstream rural/private-well result if the live state layer is unavailable.
  }

  return report ?? guardedZipReport("95356");
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const zip = requestUrl.searchParams.get("zip")?.trim() ?? "";
  const point = exactPoint(requestUrl.searchParams);

  if (zip === "95356" && point) {
    const report = await exactAddressReport(requestUrl, point.lat, point.lon);
    return Response.json(report, {
      headers: { "cache-control": "no-store" },
    });
  }

  const report = guardedZipReport(zip);

  if (!report) {
    return Response.json(
      { error: "No verified ZIP safeguard is configured for this request." },
      { status: 404 },
    );
  }

  return Response.json(report, {
    headers: { "cache-control": "public, max-age=0, s-maxage=3600" },
  });
}
