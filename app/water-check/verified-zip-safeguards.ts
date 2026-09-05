export type VerifiedZipSafeguard = {
  zip: string;
  locality: string;
  county: string;
  reason: string;
  censusEvidenceUrl: string;
  serviceAreaEvidenceUrl: string;
  verifiedOn: string;
};

export type VerifiedWaterSystem = {
  name: string;
  county: string;
  population: number;
  serviceConnections: number;
  source: string;
  owner: string;
  officialReportUrl: string;
  utilityReportUrl?: string;
};

const censusQueryBase =
  "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/MapServer/2/query";

const serviceAreaLayer =
  "https://gispublic.waterboards.ca.gov/portalserver/rest/services/Hosted/CA_water_systems/FeatureServer/2";

const nonGeographicModestoReason =
  "This postal ZIP has no Census ZIP-area polygon to compare with public-water service boundaries. Enter the property street address so the exact state service area—or a rural or private-well path—can be matched without guessing.";

export const verifiedZipSafeguards: Record<string, VerifiedZipSafeguard> =
  {
    ...Object.fromEntries(
      ["95352", "95353", "95397"].map((zip) => [
        zip,
        {
          zip,
          locality: "Modesto",
          county: "Stanislaus",
          reason: nonGeographicModestoReason,
          censusEvidenceUrl: `${censusQueryBase}?where=ZCTA5%3D%27${zip}%27&outFields=ZCTA5&returnGeometry=false&f=json`,
          serviceAreaEvidenceUrl: serviceAreaLayer,
          verifiedOn: "2026-09-01",
        },
      ]),
    ),
    "95356": {
      zip: "95356",
      locality: "Modesto",
      county: "Stanislaus",
      reason:
        "This ZIP crosses multiple public-water systems in Modesto, Salida, Del Rio and Escalon, including small community and mobile-home systems, plus rural or private-well properties. Enter the property street address for the exact source.",
      censusEvidenceUrl: `${censusQueryBase}?where=ZCTA5%3D%2795356%27&outFields=ZCTA5&returnGeometry=true&outSR=4326&f=json`,
      serviceAreaEvidenceUrl: serviceAreaLayer,
      verifiedOn: "2026-09-05",
    },
  };

export function guardedZipReport(zip: string) {
  const safeguard = verifiedZipSafeguards[zip];
  if (!safeguard) return null;

  return {
    zip,
    location: {
      label: `${safeguard.locality}, California ${zip}`,
      city: safeguard.locality,
    },
    providers: [],
    privateWellPath: true,
    addressVerificationRequired: true,
    exactAddressMatched: false,
    verificationReason: safeguard.reason,
    dataPeriod: "Address verification required",
    updatedThrough: safeguard.verifiedOn,
  };
}
