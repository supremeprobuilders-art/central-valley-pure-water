export interface BenchmarkInput {
  name: string;
  unit: string;
  maxDetected: number | null;
  listedMcl: number | null;
}

export interface HealthBenchmark {
  label: string;
  shortLabel: string;
  valueMgL: number;
  source: "California OEHHA";
  sourceUrl: string;
  note?: string;
}

export interface HealthComparison {
  benchmark: HealthBenchmark;
  benchmarkInSampleUnit: number;
  multiplier: number;
  sampleValue: number;
  unit: string;
}

const OEHHA_PHG_URL = "https://oehha.ca.gov/public-health-goals-phgs";

const phg = (valueMgL: number, note?: string): HealthBenchmark => ({
  label: "California Public Health Goal",
  shortLabel: "CA Public Health Goal",
  valueMgL,
  source: "California OEHHA",
  sourceUrl: OEHHA_PHG_URL,
  note,
});

// Values below are California Office of Environmental Health Hazard Assessment
// Public Health Goals (PHGs). PHGs are health-based goals, not enforceable MCLs.
// Keep this table conservative: if a name/measurement basis is ambiguous, do not
// calculate a health multiple and fall back to the state row's listed MCL instead.
const BENCHMARKS: Array<{ match: RegExp; benchmark: HealthBenchmark }> = [
  { match: /^ARSENIC$/i, benchmark: phg(0.000004) },
  { match: /CHROMIUM\s*(VI|6|HEXAVALENT)|HEXAVALENT\s+CHROMIUM/i, benchmark: phg(0.00002) },
  { match: /BROMODICHLOROMETHANE|DICHLOROBROMOMETHANE/i, benchmark: phg(0.00006) },
  { match: /^BROMOFORM$/i, benchmark: phg(0.0005) },
  { match: /^CHLOROFORM$/i, benchmark: phg(0.0004) },
  { match: /DIBROMOCHLOROMETHANE|CHLORODIBROMOMETHANE/i, benchmark: phg(0.0001) },
  { match: /^BENZENE$/i, benchmark: phg(0.00015) },
  { match: /^CADMIUM$/i, benchmark: phg(0.00004) },
  { match: /^BROMATE$/i, benchmark: phg(0.0001) },
  { match: /^ATRAZINE$/i, benchmark: phg(0.00015) },
  { match: /^ANTIMONY$/i, benchmark: phg(0.001) },
  { match: /^BARIUM$/i, benchmark: phg(2) },
  { match: /^BERYLLIUM/i, benchmark: phg(0.001) },
  { match: /^CARBOFURAN$/i, benchmark: phg(0.0007) },
  { match: /^CARBON TETRACHLORIDE$/i, benchmark: phg(0.0001) },
  { match: /^CHLORDANE$/i, benchmark: phg(0.00003) },
  { match: /^CHLORITE$/i, benchmark: phg(0.05) },
  { match: /^CHLOROBENZENE$/i, benchmark: phg(0.07) },
  { match: /^ALACHLOR$/i, benchmark: phg(0.004) },
  { match: /^ALUMINUM$/i, benchmark: phg(0.6) },
  { match: /^BENTAZON$/i, benchmark: phg(0.2) },
  { match: /BENZO\s*\(?A\)?\s*PYRENE/i, benchmark: phg(0.000007) },
  { match: /^PERCHLORATE$/i, benchmark: phg(0.001) },
  { match: /^FLUORIDE$/i, benchmark: phg(1) },
  { match: /1,?2,?3[-\s]*TRICHLOROPROPANE|123[-\s]*TCP/i, benchmark: phg(0.0000007) },
  { match: /1,?2[-\s]*DIBROMO[-\s]*3[-\s]*CHLOROPROPANE|\bDBCP\b/i, benchmark: phg(0.0000017) },
  { match: /1,?2[-\s]*DICHLOROETHANE/i, benchmark: phg(0.0004) },
  { match: /1,?2[-\s]*DICHLOROPROPANE/i, benchmark: phg(0.0005) },
  { match: /1,?1,?2[-\s]*TRICHLOROETHANE/i, benchmark: phg(0.0003) },
  { match: /1,?1,?1[-\s]*TRICHLOROETHANE/i, benchmark: phg(1) },
  { match: /PENTACHLOROPHENOL|\bPCP\b/i, benchmark: phg(0.0003) },
  { match: /^PICLORAM$/i, benchmark: phg(0.166) },
  { match: /N[-\s]*NITROSODIMETHYLAMINE|\bNDMA\b/i, benchmark: phg(0.000003) },
  { match: /^OXAMYL$/i, benchmark: phg(0.026) },
  { match: /^HEXACHLOROBENZENE$/i, benchmark: phg(0.00003) },
  { match: /^ETHYLBENZENE$/i, benchmark: phg(0.3) },
  { match: /NITRATE/i, benchmark: phg(10, "10 mg/L as nitrogen; nitrate may also be reported as 45 mg/L as nitrate.") },
  { match: /NITRITE/i, benchmark: phg(1, "1 mg/L as nitrogen.") },
];

function cleanName(name: string): string {
  return name
    .toUpperCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedUnit(unit: string): string {
  return unit
    .toUpperCase()
    .replace(/Μ|µ/g, "U")
    .replace(/\s+/g, "")
    .replace("MCG/L", "UG/L");
}

function benchmarkInUnit(valueMgL: number, unit: string): number | null {
  switch (normalizedUnit(unit)) {
    case "MG/L":
    case "PPM":
      return valueMgL;
    case "UG/L":
    case "PPB":
      return valueMgL * 1_000;
    case "NG/L":
    case "PPT":
      return valueMgL * 1_000_000;
    default:
      return null;
  }
}

function nitrateBenchmark(input: BenchmarkInput, benchmark: HealthBenchmark): HealthBenchmark | null {
  if (!/NITRATE/i.test(input.name)) return benchmark;

  // California's nitrate PHG is 10 mg/L as nitrogen or 45 mg/L as nitrate.
  // The state result's listed MCL tells us which measurement basis is being used.
  if (input.listedMcl !== null) {
    const unit = normalizedUnit(input.unit);
    if ((unit === "MG/L" || unit === "PPM") && input.listedMcl >= 40) {
      return phg(45, "45 mg/L as nitrate (equivalent to 10 mg/L as nitrogen).") ;
    }
    if ((unit === "UG/L" || unit === "PPB") && input.listedMcl >= 40_000) {
      return phg(45, "45 mg/L as nitrate (equivalent to 10 mg/L as nitrogen).") ;
    }
  }
  return benchmark;
}

export function getHealthComparison(input: BenchmarkInput): HealthComparison | null {
  if (input.maxDetected === null || !Number.isFinite(input.maxDetected) || input.maxDetected < 0) return null;

  const name = cleanName(input.name);
  const entry = BENCHMARKS.find(({ match }) => match.test(name));
  if (!entry) return null;

  const benchmark = nitrateBenchmark(input, entry.benchmark);
  if (!benchmark || benchmark.valueMgL <= 0) return null;

  const converted = benchmarkInUnit(benchmark.valueMgL, input.unit);
  if (converted === null || converted <= 0) return null;

  return {
    benchmark,
    benchmarkInSampleUnit: converted,
    multiplier: input.maxDetected / converted,
    sampleValue: input.maxDetected,
    unit: input.unit,
  };
}

export function formatHealthMultiplier(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value >= 100) return `${Math.round(value).toLocaleString("en-US")}×`;
  if (value >= 10) return `${value.toFixed(1).replace(/\.0$/, "")}×`;
  if (value >= 1) return `${value.toFixed(2).replace(/0$/, "").replace(/\.0$/, "")}×`;
  return `${Math.round(value * 100)}%`;
}

export function formatBenchmarkValue(value: number): string {
  if (value >= 100) return value.toLocaleString("en-US", { maximumFractionDigits: 1 });
  if (value >= 1) return value.toLocaleString("en-US", { maximumFractionDigits: 3 });
  if (value >= 0.01) return value.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return value.toLocaleString("en-US", { maximumSignificantDigits: 3 });
}
