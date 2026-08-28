"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { referralFinancingUrl } from "../site-config";

type WaterRecord = {
  code: string;
  name: string;
  category: string;
  unit: string;
  max: number;
  average: number;
  latest: number;
  benchmark: number | null;
  legalLimit: number | null;
  multiplier: number | null;
  sampleCount: number;
  firstDate: string;
  latestDate: string;
  context: string;
};

type Provider = {
  pwsId: string;
  name: string;
  county: string;
  population: number;
  serviceConnections: number;
  source: string;
  owner: string;
  saferStatus: string;
  records: WaterRecord[];
  officialReportUrl: string;
  utilityReportUrl?: string;
  verification?: {
    level: string;
    label: string;
    checks: string[];
  };
};

type WaterReport = {
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

type LeadForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  contactConsent: boolean;
  website: string;
};

type AddressSuggestion = {
  text: string;
  magicKey: string;
};

type ContaminantCopy = {
  title: string;
  summary: string;
  riskLabel: string;
  riskDetail: string;
};

const contaminantCopy: Record<string, ContaminantCopy> = {
  "1,2,3-Trichloropropane": {
    title: "1,2,3-TCP in drinking water",
    summary: "A manufactured chemical tied to older soil fumigants and industrial uses.",
    riskLabel: "Long-term concern: cancer risk",
    riskDetail: "California's health goal for 1,2,3-TCP is based on cancer risk from long-term exposure.",
  },
  "1,2-Dibromo-3-chloropropane (DBCP)": {
    title: "DBCP in drinking water",
    summary: "A chemical formerly used in agricultural soil fumigants.",
    riskLabel: "Long-term concern: fertility, kidneys and cancer",
    riskDetail: "EPA information links long-term exposure above standards with fertility and kidney effects and a possible increase in cancer risk.",
  },
  Arsenic: {
    title: "Arsenic in drinking water",
    summary: "A naturally occurring element that can enter groundwater from rocks and soil.",
    riskLabel: "Long-term concern: cancer and organ effects",
    riskDetail: "EPA links long-term arsenic exposure with several cancers, including bladder, lung and skin cancer, plus skin and circulation problems.",
  },
  "Chromium (hexavalent)": {
    title: "Hexavalent chromium in drinking water",
    summary: "A form of chromium that can come from natural deposits or industrial activity.",
    riskLabel: "Long-term concern: cancer and liver effects",
    riskDetail: "California's health assessment considers cancer risk and chronic liver effects when setting health-protective drinking-water goals.",
  },
  "Combined uranium": {
    title: "Uranium in drinking water",
    summary: "A naturally occurring element that can dissolve into groundwater.",
    riskLabel: "Long-term concern: kidney damage",
    riskDetail: "EPA and ATSDR identify the kidneys as the main concern from ingesting elevated water-soluble uranium.",
  },
  "Haloacetic acids (HAA5)": {
    title: "Haloacetic acids in drinking water",
    summary: "Byproducts that can form when disinfectants react with natural material in water.",
    riskLabel: "Long-term concern: increased cancer risk",
    riskDetail: "EPA regulates HAA5 because long-term exposure to disinfection byproducts may increase health risks, including cancer risk.",
  },
  Hardness: {
    title: "Hard minerals in the water",
    summary: "Hardness mainly reflects dissolved calcium and magnesium.",
    riskLabel: "Home concern: scale, spotting and buildup",
    riskDetail: "Hardness is mainly a plumbing, appliance and cleaning concern—not a cancer warning.",
  },
  Nitrate: {
    title: "Nitrate in drinking water",
    summary: "Nitrate can enter groundwater from fertilizer, septic systems, animal waste and natural deposits.",
    riskLabel: "Urgent concern for infants: low blood oxygen",
    riskDetail: "EPA says high nitrate is most serious for infants and can cause blue baby syndrome, shortness of breath and bluish skin.",
  },
  "Total trihalomethanes (TTHMs)": {
    title: "Trihalomethanes in drinking water",
    summary: "A group of byproducts that can form during water disinfection.",
    riskLabel: "Long-term concern: cancer and organ effects",
    riskDetail: "EPA information links some disinfection byproducts with increased cancer risk and possible liver, kidney, nervous-system and reproductive effects.",
  },
};

function formatNumber(value: number) {
  if (value >= 100) return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (value >= 10) return value.toLocaleString("en-US", { maximumFractionDigits: 1 });
  if (value >= 1) return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return value.toLocaleString("en-US", { maximumSignificantDigits: 3 });
}

function formatDate(value: string) {
  if (!value) return "Date unavailable";
  const [year, month, day] = value.split("-");
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" })
    .format(new Date(Number(year), Number(month) - 1, Number(day)));
}

function sourceLabel(source: string) {
  const labels: Record<string, string> = {
    GW: "Groundwater",
    GWP: "Groundwater / purchased water",
    SW: "Surface water",
    SWP: "Surface / purchased water",
    GU: "Groundwater influenced by surface water",
  };
  return labels[source] || source || "Utility-reported mixed source";
}

function treatmentPath(record: WaterRecord) {
  if (record.name === "Hardness") {
    return { name: "Whole-home water softening", note: "Included for hardness, scale, and mineral spotting", tone: "included" };
  }
  if (record.name === "Haloacetic acids (HAA5)" || record.name === "Total trihalomethanes (TTHMs)") {
    return { name: "Whole-home carbon filtration review", note: "Add-on review for disinfection byproducts", tone: "review" };
  }
  return { name: "Kitchen reverse-osmosis review", note: "Drinking-water treatment path; final model certification is verified in the quote", tone: "included" };
}

function includedTreatment(record: WaterRecord) {
  if (record.name === "Hardness") return "Whole-home softening";
  if (record.name === "Haloacetic acids (HAA5)" || record.name === "Total trihalomethanes (TTHMs)") {
    return "Whole-home carbon + kitchen RO";
  }
  return "Kitchen reverse osmosis";
}

function ContaminantCard({
  record,
  onSeeSystem,
  onViewReport,
}: {
  record: WaterRecord;
  onSeeSystem: () => void;
  onViewReport: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const isHardness = record.name === "Hardness";
  const hasHealthGoal = record.benchmark !== null && record.multiplier !== null;
  const gpg = isHardness ? record.max / 17.1 : null;
  const plainCopy = contaminantCopy[record.name] ?? {
    title: `${record.name} in drinking water`,
    summary: "A reported drinking-water result from the matched public water system.",
    riskLabel: "Why it matters: long-term exposure concern",
    riskDetail: "Open the official state record for the complete utility monitoring context.",
  };
  const aboveLegalReference = record.legalLimit !== null && record.max > record.legalLimit;
  const treatment = treatmentPath(record);
  const comparisonText = isHardness
    ? `About ${formatNumber(gpg ?? 0)} grains per gallon. This is a scale and buildup concern, not a health-goal comparison.`
    : hasHealthGoal
      ? record.legalLimit !== null
        ? `The city-reported high result is ${formatNumber(record.multiplier!)}× the health-based goal and ${aboveLegalReference ? "above" : "below"} the listed federal or state legal maximum.`
        : `The city-reported high result is ${formatNumber(record.multiplier!)}× the health-based goal. No enforceable legal maximum is listed for this comparison.`
      : `The city-reported high result was ${formatNumber(record.max)} ${record.unit}. No health-based multiplier is listed.`;

  return (
    <article className={`contaminant-flip-card${flipped ? " is-flipped" : ""}${record.multiplier && record.multiplier >= 1 ? " elevated" : ""}`}>
      <div className="contaminant-flip-inner">
        <section className="contaminant-face contaminant-front" aria-hidden={flipped}>
          <div className="contaminant-front-copy">
            <span className="contaminant-card-kicker">{isHardness ? "Reported water condition" : "Reported contaminant"}</span>
            <h3>{plainCopy.title}</h3>
            <p>{plainCopy.riskLabel}</p>
          </div>
          <div className="multiplier-callout">
            <strong>{isHardness ? "Hard" : hasHealthGoal ? `${formatNumber(record.multiplier!)}×` : "Found"}</strong>
            <span>{isHardness ? "water result" : hasHealthGoal ? "above the health-based goal" : "in reported monitoring"}</span>
          </div>
          <div className="front-result-line">
            <span>City reported high</span>
            <strong>{formatNumber(record.max)} {record.unit}</strong>
          </div>
          <button className="flip-details-button" type="button" onClick={() => setFlipped(true)} tabIndex={flipped ? -1 : 0}>
            More details <span aria-hidden="true">↻</span>
          </button>
        </section>

        <section className="contaminant-face contaminant-back" aria-hidden={!flipped}>
          <div className="contaminant-back-heading">
            <div><span>Simple breakdown</span><h3>{record.name}</h3></div>
            <button type="button" aria-label={`Return to ${record.name} result`} onClick={() => setFlipped(false)} tabIndex={flipped ? 0 : -1}>×</button>
          </div>
          <p className="contaminant-definition"><strong>What it is:</strong> {plainCopy.summary}</p>
          <div className="health-risk-callout">
            <span>Possible health concern</span>
            <strong>{plainCopy.riskLabel}</strong>
            <p>{plainCopy.riskDetail}</p>
          </div>
          <div className={`result-comparison${isHardness ? " single" : ""}`}>
            <div><small>City reported high</small><strong>{formatNumber(record.max)} <span>{record.unit}</span></strong></div>
            {!isHardness && hasHealthGoal && <div><small>Health-based goal</small><strong>{formatNumber(record.benchmark!)} <span>{record.unit}</span></strong></div>}
            {!isHardness && record.legalLimit !== null && <div><small>Federal/state legal max</small><strong>{formatNumber(record.legalLimit)} <span>{record.unit}</span></strong></div>}
          </div>
          <div className="plain-comparison-box">
            <strong>{isHardness ? "What this means" : `${hasHealthGoal ? `${formatNumber(record.multiplier!)}×` : "Reported"}—in plain English`}</strong>
            <p>{comparisonText} The “×” number compares the city result with the health-based goal; it is not the number of contaminants.</p>
          </div>
          <div className={`compact-treatment ${treatment.tone}`}>
            <span>Included system treatment path</span>
            <strong>{includedTreatment(record)}</strong>
            <small>{treatment.note}</small>
          </div>
          <div className="contaminant-actions">
            <a href="#verified-source-report" onClick={(event) => { event.preventDefault(); onViewReport(); }} tabIndex={flipped ? 0 : -1}>View verified report <span aria-hidden="true">↓</span></a>
            <button type="button" onClick={onSeeSystem} tabIndex={flipped ? 0 : -1}>See our system fix <span aria-hidden="true">↓</span></button>
          </div>
          <p className="compact-record-note">{record.sampleCount} reported detection{record.sampleCount === 1 ? "" : "s"} reviewed · latest selected record {formatDate(record.latestDate)} · {record.context}</p>
        </section>
      </div>
    </article>
  );
}

function blankLeadForm(): LeadForm {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    contactConsent: false,
    website: "",
  };
}

function scrollToSection(element: Element | null, offset = 18) {
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

export function WaterCheckTool({ initialZip, initialReferralCode }: { initialZip: string; initialReferralCode: string }) {
  const [zip, setZip] = useState(initialZip);
  const [report, setReport] = useState<WaterReport | null>(null);
  const [people, setPeople] = useState<number | null>(2);
  const [bathrooms, setBathrooms] = useState<number | null>(2);
  const [peopleChosen, setPeopleChosen] = useState(false);
  const [bathroomsChosen, setBathroomsChosen] = useState(false);
  const [lead, setLead] = useState<LeadForm>(blankLeadForm);
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [leadError, setLeadError] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [addressSuggestionsOpen, setAddressSuggestionsOpen] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [loading, setLoading] = useState(Boolean(initialZip));
  const [error, setError] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [addressMatching, setAddressMatching] = useState(false);
  const [addressMatchError, setAddressMatchError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const sizingRef = useRef<HTMLElement>(null);
  const bathroomsRef = useRef<HTMLFieldSetElement>(null);
  const sizingResultRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const matchRef = useRef<HTMLElement>(null);
  const sourceReportRef = useRef<HTMLElement>(null);
  const [sourceReportOpen, setSourceReportOpen] = useState(false);
  const financingUrl = referralFinancingUrl(initialReferralCode);

  useEffect(() => {
    const query = lead.propertyAddress.trim();
    if (query.length < 3 || !report?.zip) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setAddressLoading(true);
      try {
        const response = await fetch(
          `/api/address-suggestions?q=${encodeURIComponent(query)}&zip=${encodeURIComponent(report.zip)}`,
          { signal: controller.signal },
        );
        const data = await response.json() as { suggestions?: AddressSuggestion[] };
        if (!response.ok) throw new Error("Address suggestions unavailable");
        setAddressSuggestions(data.suggestions ?? []);
        setAddressSuggestionsOpen((data.suggestions ?? []).length > 0);
      } catch (requestError) {
        if (!(requestError instanceof DOMException && requestError.name === "AbortError")) {
          setAddressSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) setAddressLoading(false);
      }
    }, 260);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [lead.propertyAddress, report?.zip]);

  const resetFunnel = useCallback(() => {
    setPeople(2);
    setBathrooms(2);
    setPeopleChosen(false);
    setBathroomsChosen(false);
    setLead(blankLeadForm());
    setLeadStatus("idle");
    setLeadError("");
    setAddressSuggestions([]);
    setAddressSuggestionsOpen(false);
    setAddressLoading(false);
    setServiceAddress("");
    setAddressMatching(false);
    setAddressMatchError("");
  }, []);

  const runCheck = async (requestedZip: string) => {
    if (!/^9\d{4}$/.test(requestedZip)) {
      setError("Enter a valid 5-digit California ZIP code.");
      setReport(null);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/water-report?zip=${encodeURIComponent(requestedZip)}`);
      const data = await response.json() as WaterReport & { error?: string };
      if (!response.ok) throw new Error(data.error || "We could not load that water report.");
      setReport(data);
      resetFunnel();
    } catch (requestError) {
      setReport(null);
      setError(requestError instanceof Error ? requestError.message : "We could not load that water report.");
    } finally {
      setLoading(false);
    }
  };

  const matchExactAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!report?.zip || serviceAddress.trim().length < 5) {
      setAddressMatchError("Enter the property street address.");
      return;
    }
    setAddressMatching(true);
    setAddressMatchError("");
    try {
      const geocodeUrl = new URL("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates");
      geocodeUrl.search = new URLSearchParams({
        SingleLine: `${serviceAddress.trim()}, ${report.zip}, California, USA`,
        category: "Address",
        countryCode: "USA",
        outFields: "Match_addr,Addr_type,City,Region,Postal,CountryCode",
        maxLocations: "1",
        f: "json",
      }).toString();
      const geocodeResponse = await fetch(geocodeUrl, { signal: AbortSignal.timeout(20000) });
      if (!geocodeResponse.ok) throw new Error("The address matcher is temporarily unavailable. Please try again.");
      const geocode = await geocodeResponse.json() as {
        candidates?: Array<{
          address: string;
          location: { x: number; y: number };
          attributes?: { City?: string; Postal?: string };
        }>;
      };
      const candidate = geocode.candidates?.[0];
      if (!candidate || !Number.isFinite(candidate.location.x) || !Number.isFinite(candidate.location.y)) {
        throw new Error("We could not locate that property address. Check the street number and name, then try again.");
      }
      if (candidate.attributes?.Postal && candidate.attributes.Postal !== report.zip) {
        throw new Error(`That address matched ZIP ${candidate.attributes.Postal}, not ${report.zip}. Check the ZIP and try again.`);
      }

      const response = await fetch(`/api/water-report?zip=${encodeURIComponent(report.zip)}&lat=${encodeURIComponent(candidate.location.y)}&lon=${encodeURIComponent(candidate.location.x)}`);
      const data = await response.json() as WaterReport & { error?: string };
      if (!response.ok) throw new Error(data.error || "We could not match that property address.");
      const exactReport = {
        ...data,
        location: {
          label: candidate.address,
          city: candidate.attributes?.City || data.location?.city || "",
        },
      };
      setReport(exactReport);
      setLead((current) => ({ ...current, propertyAddress: candidate.address || serviceAddress.trim() }));
    } catch (requestError) {
      setAddressMatchError(requestError instanceof Error ? requestError.message : "We could not match that property address.");
    } finally {
      setAddressMatching(false);
    }
  };

  useEffect(() => {
    if (!initialZip) return;
    let cancelled = false;

    fetch(`/api/water-report?zip=${encodeURIComponent(initialZip)}`)
      .then(async (response) => {
        const data = await response.json() as WaterReport & { error?: string };
        if (!response.ok) throw new Error(data.error || "We could not load that water report.");
        return data;
      })
      .then((data) => {
        if (!cancelled) {
          setReport(data);
          resetFunnel();
        }
      })
      .catch((requestError: unknown) => {
        if (!cancelled) setError(requestError instanceof Error ? requestError.message : "We could not load that water report.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [initialZip, resetFunnel]);

  useEffect(() => {
    if (!report) return;
    const timer = window.setTimeout(() => scrollToSection(resultRef.current), 120);
    return () => window.clearTimeout(timer);
  }, [report]);

  const provider = report?.providers[0] ?? null;
  const records = provider
    ? [...provider.records]
        .sort((a, b) => (b.multiplier ?? (b.name === "Hardness" ? -1 : -2)) - (a.multiplier ?? (a.name === "Hardness" ? -1 : -2)))
    : [];
  const concernRecords = records.filter((record) => record.multiplier !== null && record.multiplier >= 1);
  const otherRecords = records.filter((record) => record.multiplier === null || record.multiplier < 1);
  const topConcernRecords = concernRecords.slice(0, 3);
  const remainingRecords = [...concernRecords.slice(3), ...otherRecords];
  const hardnessRecord = records.find((record) => record.name === "Hardness") ?? null;
  const wholeHomeConcernRecords = concernRecords.filter((record) => record.name === "Haloacetic acids (HAA5)" || record.name === "Total trihalomethanes (TTHMs)");
  const drinkingConcernRecords = concernRecords.filter((record) => record.name !== "Haloacetic acids (HAA5)" && record.name !== "Total trihalomethanes (TTHMs)");
  const highDemand = (people ?? 0) >= 5 || (bathrooms ?? 0) >= 4 || ((people ?? 0) >= 4 && (bathrooms ?? 0) >= 3);
  const compactHousehold = (people ?? 0) <= 2 && (bathrooms ?? 0) <= 2;
  const privateWell = report?.privateWellPath ?? false;
  const dualRecommended = !privateWell && highDemand;
  const matchedSystemName = privateWell
    ? "Private Well Treatment Plan"
    : dualRecommended
      ? "Dual-Tank Complete Home System"
      : compactHousehold
        ? "Standard Complete Home System"
        : "Standard Plus Complete Home System";
  const matchedSystemImage = privateWell
    ? "/systems/well-water-system.webp"
    : dualRecommended
      ? "https://central-valley-pure-water.supreme-pro-2342.chatgpt.site/systems/cvpw-dual-tank-clean.png"
      : "https://central-valley-pure-water.supreme-pro-2342.chatgpt.site/systems/cvpw-standard-package-clean.png";
  const installedPrice = privateWell ? null : dualRecommended ? 5495 : compactHousehold ? 3495 : 3995;
  const installedPriceLabel = installedPrice === null
    ? "Final price after water and property review"
    : `$${installedPrice.toLocaleString("en-US")} installed`;
  const isUpgrade = !privateWell && matchedSystemName !== "Standard Complete Home System";
  const sizingConfirmed = peopleChosen && bathroomsChosen && people !== null && bathrooms !== null;
  const coverageItems = privateWell
    ? [
        ["Property address captured", "We use the exact address to finish the water-source match."],
        ["Current lab test reviewed", "A current property-specific test comes before final equipment selection."],
        ["Whole-home treatment plan", "Equipment is matched to the actual well-water results and household demand."],
        ["Installation and payment review", "Final scope, price, and available financing are provided together."],
      ]
    : [
        ["Whole-home hardness & scale stage", hardnessRecord ? `Included · matched to ${formatNumber(hardnessRecord.max / 17.1)} gpg highest result.` : "Included in the complete-home package."],
        ["Activated carbon treatment media", wholeHomeConcernRecords.length ? `Included treatment path for the whole-home concerns shown in the report.` : "Included for the whole-home carbon treatment path."],
        ["Kitchen reverse-osmosis stage", drinkingConcernRecords.length ? `Included drinking-water path for the concerns shown above.` : "Included as the dedicated kitchen drinking-water path."],
        [dualRecommended ? "Dual-tank household capacity" : compactHousehold ? "Standard household capacity" : "Standard Plus household capacity", `Matched to ${people === 6 ? "6+" : people} people and ${bathrooms === 5 ? "5+" : bathrooms} bathrooms.`],
      ];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runCheck(zip);
  };

  const selectPeople = (value: number) => {
    setPeople(value);
    setPeopleChosen(true);
    setLeadStatus("idle");
    setLeadError("");
    window.setTimeout(() => scrollToSection(bathroomsChosen ? sizingResultRef.current : bathroomsRef.current, bathroomsChosen ? 24 : 120), 100);
  };

  const selectBathrooms = (value: number) => {
    setBathrooms(value);
    setBathroomsChosen(true);
    setLeadStatus("idle");
    setLeadError("");
    window.setTimeout(() => scrollToSection(peopleChosen ? sizingResultRef.current : solutionRef.current), 100);
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (people === null || bathrooms === null || !report) {
      setLeadError("Choose the number of people and bathrooms first.");
      return;
    }

    setLeadStatus("submitting");
    setLeadError("");
    try {
      const response = await fetch("/api/water-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          fullName: `${lead.firstName} ${lead.lastName}`.trim(),
          zip: report.zip,
          city: report.location?.city ?? "",
          people,
          bathrooms,
          privateWell,
          providerName: provider?.name ?? "Private well / property-specific water test",
          waterSystemId: provider?.pwsId ?? "PRIVATE-WELL",
          systemSize: matchedSystemName,
          installedQuote: installedPriceLabel,
          referralCode: initialReferralCode,
          referralPage: initialReferralCode ? `/r/${initialReferralCode}` : "",
        }),
      });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "We could not save your match.");
      setLeadStatus("success");
      window.setTimeout(() => scrollToSection(matchRef.current), 100);
    } catch (requestError) {
      setLeadStatus("idle");
      setLeadError(requestError instanceof Error ? requestError.message : "We could not save your match.");
    }
  };

  const showSourceReport = () => {
    setSourceReportOpen(true);
    window.setTimeout(() => scrollToSection(sourceReportRef.current, 92), 70);
  };

  return (
    <>
      {initialReferralCode && (
        <div className="referral-active-banner" role="status">
          <span aria-hidden="true">✓</span>
          <p><strong>Partner referral active</strong><small>Your referral code will stay attached to your water check, quote, and financing step.</small></p>
        </div>
      )}
      <section className="water-check-hero">
        <div className="water-check-intro">
          <p className="eyebrow light-eyebrow"><span /> California water report</p>
          <h1>What&apos;s in your water?<br /><em>See the full report.</em></h1>
          <p>Enter your ZIP once. Your likely public water system and complete on-page report will open automatically—no utility selection and no signup.</p>
          <form className="zip-check-form" onSubmit={submit}>
            <label htmlFor="water-check-zip">California ZIP code</label>
            <div>
              <input
                id="water-check-zip"
                name="zip"
                value={zip}
                onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))}
                inputMode="numeric"
                autoComplete="postal-code"
                pattern="9[0-9]{4}"
                placeholder="Enter 5-digit ZIP"
                aria-describedby="water-check-help"
                required
              />
              <button type="submit" disabled={loading}>{loading ? "Checking…" : "Show my water results"}<span aria-hidden="true">→</span></button>
            </div>
            <small id="water-check-help">Free · No signup · Utility data first</small>
          </form>
          <div className="water-check-error" role="alert" aria-live="polite">{error}</div>
        </div>
        <aside className="water-check-steps" aria-label="How the water check works">
          <div><span>1</span><strong>Enter ZIP</strong><small>We match the utility</small></div>
          <div><span>2</span><strong>Read report</strong><small>Every result stays here</small></div>
          <div><span>3</span><strong>Get your match</strong><small>Size the home and save the result</small></div>
        </aside>
      </section>

      {!report && !loading && (
        <section className="water-check-proof">
          <div><strong>Auto matched</strong><span>No water-provider dropdown</span></div>
          <div><strong>Official records</strong><span>State monitoring results simplified</span></div>
          <div><strong>Clear next step</strong><span>System, price, then financing</span></div>
        </section>
      )}

      {loading && (
        <section className="water-check-loading" aria-live="polite">
          <span aria-hidden="true" />
          <div><strong>Building your water report…</strong><p>Matching ZIP {zip} to the likely water system and reported test results.</p></div>
        </section>
      )}

      {report && (
        <div className="water-report" ref={resultRef}>
          <section className="water-report-head">
            <div>
              <p className="eyebrow"><span /> Your ZIP result</p>
              <h2>{provider ? `${provider.name} Water Report` : `${report.location?.city || report.zip} Water Report`}</h2>
              <p>ZIP {report.zip} · {report.location?.label || "California"}</p>
            </div>
            <button type="button" onClick={() => { setReport(null); setError(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Check another ZIP</button>
          </section>

          {privateWell ? (
            <section className="provider-card private-well-card">
              <div className="provider-icon" aria-hidden="true">⌂</div>
              <div>
                <span className="provider-kicker">{report.addressVerificationRequired ? "ZIP crosses water-service boundaries" : "Exact property source check"}</span>
                <h3>{report.addressVerificationRequired ? "Enter the property address—no contact info required" : "Property-specific water source"}</h3>
                <p>{report.verificationReason || "Enter the property address so we can finish the source match without guessing."} {report.addressVerificationRequired ? "This address is used only to match the water service here; name, phone and email are not required." : "If the home uses a private well, the system is based on a current property-specific lab test."}</p>
                {report.addressVerificationRequired && (
                  <form className="service-address-match" onSubmit={matchExactAddress}>
                    <label htmlFor="service-address">Property street address</label>
                    <div>
                      <input
                        id="service-address"
                        value={serviceAddress}
                        onChange={(event) => setServiceAddress(event.target.value)}
                        autoComplete="street-address"
                        placeholder={`Street address in ${report.zip}`}
                        required
                      />
                      <button type="submit" disabled={addressMatching}>{addressMatching ? "Matching…" : "Match my water source"}</button>
                    </div>
                    {addressMatchError && <small role="alert">{addressMatchError}</small>}
                  </form>
                )}
              </div>
            </section>
          ) : provider && (
            <>
              <section className="provider-card auto-provider-card">
                <div className="provider-icon" aria-hidden="true">✓</div>
                <div className="provider-copy">
                  <span className="provider-kicker">Automatically matched from ZIP {report.zip}</span>
                  <h3>{provider.name}</h3>
                  <p>{provider.county} · System {provider.pwsId} · {sourceLabel(provider.source)}</p>
                  <small className="provider-auto-note">✓ {provider.verification?.label || "State service-area and monitoring record matched"}. Your exact address is captured with the quote so overlapping ZIP boundaries can be resolved without another dropdown.</small>
                </div>
                <div className="provider-actions">
                  <div className="provider-match-badge">
                    <strong>{provider.population ? provider.population.toLocaleString("en-US") : "Local"}</strong>
                    <span>{provider.population ? "people served" : "public water system"}</span>
                  </div>
                  <button className="utility-report-button" type="button" onClick={() => scrollToSection(document.getElementById("report-overview"), 92)}>
                    Read this utility report <span aria-hidden="true">↓</span>
                  </button>
                  <a className="official-report-link secondary" href="#verified-source-report" onClick={(event) => { event.preventDefault(); showSourceReport(); }}>
                    View verified report here <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </section>

              <nav className="utility-report-nav" aria-label="Explore this utility report">
                <button type="button" onClick={() => scrollToSection(document.getElementById("report-overview"), 92)}>Overview</button>
                <button type="button" onClick={() => scrollToSection(document.getElementById("report-contaminants"), 92)}>Contaminants</button>
                <button type="button" onClick={() => scrollToSection(document.getElementById("report-coverage"), 92)}>What filters cover</button>
                <button type="button" onClick={() => scrollToSection(sizingRef.current, 18)}>Your system</button>
              </nav>

              <section className="report-summary" id="report-overview" aria-label="Water report summary">
                <div className="results-popout">
                  <small>Important water result</small>
                  <strong>{concernRecords.length}</strong>
                  <span><b>contaminant{concernRecords.length === 1 ? "" : "s"} above a health-based goal</b> reported in this water</span>
                </div>
                <div>
                  <small>Easy risk breakdown</small>
                  <strong>Tap each result</strong>
                  <span>See the possible health concern, reported amount and matched treatment.</span>
                </div>
                <div>
                  <small>Monitoring period</small>
                  <strong>{report.dataPeriod}</strong>
                  <span>State dataset updated through {formatDate(report.updatedThrough)}</span>
                </div>
              </section>

              <section className="report-section" id="report-contaminants">
                <div className="report-section-heading">
                  <div>
                    <p className="eyebrow"><span /> Your water report</p>
                    <h2>What was found—and why it matters</h2>
                  </div>
                  <p>Tap any item for its possible health risk, the city result, the health goal and the part of your full package matched to it.</p>
                </div>

                {topConcernRecords.length ? (
                  <div className="contaminant-list">
                    {topConcernRecords.map((record) => <ContaminantCard record={record} onSeeSystem={() => scrollToSection(solutionRef.current)} onViewReport={showSourceReport} key={record.code} />)}
                  </div>
                ) : (
                  <div className="no-records-card">
                    <strong>No displayed result is above its health-based goal.</strong>
                    <p>The matched system may still have reported hardness or other results without a health-goal comparison.</p>
                  </div>
                )}

                {remainingRecords.length > 0 && (
                  <details className="full-report-drawer" onToggle={(event) => {
                    const drawer = event.currentTarget;
                    if (drawer.open) window.setTimeout(() => scrollToSection(drawer, 100), 40);
                  }}>
                    <summary>
                      <span><strong>See the complete water report</strong><small>{remainingRecords.length} more reported result{remainingRecords.length === 1 ? "" : "s"}</small></span>
                      <b aria-hidden="true">+</b>
                    </summary>
                    <div className="contaminant-list other-results-list">
                      {remainingRecords.map((record) => <ContaminantCard record={record} onSeeSystem={() => scrollToSection(solutionRef.current)} onViewReport={showSourceReport} key={record.code} />)}
                    </div>
                  </details>
                )}

                <details className="report-explainer" onToggle={(event) => {
                  const explainer = event.currentTarget;
                  if (explainer.open) window.setTimeout(() => scrollToSection(explainer, 100), 40);
                }}>
                  <summary>Why can a number be many times a health goal but still be under a legal limit?<span>+</span></summary>
                  <p>A health-based goal is a screening value. A legal limit is an enforceable regulatory value. They answer different questions, so this report shows them separately. One high result also does not by itself prove a utility violation because compliance can use location-based or running averages.</p>
                </details>
                <p className="health-context-note">Health notes describe possible effects linked to long-term exposure. They are not a diagnosis, and this utility-wide report is not a test of your individual faucet.</p>

                {sourceReportOpen && (
                  <section className="verified-source-report" id="verified-source-report" ref={sourceReportRef} aria-labelledby="verified-report-heading">
                    <div className="verified-report-heading">
                      <div>
                        <p className="eyebrow"><span /> Verified report source</p>
                        <h3 id="verified-report-heading">{provider.name}</h3>
                        <p>California public water system {provider.pwsId} · {provider.county} County · {sourceLabel(provider.source)}</p>
                      </div>
                      <button type="button" onClick={() => setSourceReportOpen(false)} aria-label="Close verified report">×</button>
                    </div>
                    <div className="verified-report-facts">
                      <div><small>ZIP matched</small><strong>{report.zip}</strong></div>
                      <div><small>People served</small><strong>{provider.population ? provider.population.toLocaleString("en-US") : "Local system"}</strong></div>
                      <div><small>Monitoring period</small><strong>{report.dataPeriod}</strong></div>
                    </div>
                    <div className="verified-report-results" aria-label="Verified water report results">
                      {records.map((record) => (
                        <article key={`source-${record.code}`}>
                          <div><strong>{record.name}</strong><small>{record.sampleCount} detection{record.sampleCount === 1 ? "" : "s"} reviewed · latest {formatDate(record.latestDate)}</small></div>
                          <div><small>City high</small><strong>{formatNumber(record.max)} {record.unit}</strong></div>
                          <div><small>Health goal</small><strong>{record.benchmark === null ? "Not listed" : `${formatNumber(record.benchmark)} ${record.unit}`}</strong></div>
                          <div><small>Legal max</small><strong>{record.legalLimit === null ? "Not listed" : `${formatNumber(record.legalLimit)} ${record.unit}`}</strong></div>
                        </article>
                      ))}
                    </div>
                    <div className="verified-report-links" aria-label="Official water report links">
                      {provider.utilityReportUrl && (
                        <a href={provider.utilityReportUrl} target="_blank" rel="noopener noreferrer">Open the utility&apos;s annual water report <span aria-hidden="true">↗</span></a>
                      )}
                      <a href={provider.officialReportUrl} target="_blank" rel="noopener noreferrer">Open the California water-system record <span aria-hidden="true">↗</span></a>
                    </div>
                    <p className="verified-report-source-note">Source: California Drinking Water Watch, the matched public water system&apos;s monitoring record, and the utility&apos;s annual report when published online. Official links open separately so this result stays in place.</p>
                  </section>
                )}

                <section className="technology-coverage" id="report-coverage" aria-labelledby="coverage-heading">
                  <div className="technology-coverage-heading">
                    <p className="eyebrow"><span /> Your full-package checklist</p>
                    <h3 id="coverage-heading">Included treatment for your reported water</h3>
                    <p>Every check below shows the treatment stage included in the full package for that reported concern. No sideways scrolling.</p>
                  </div>
                  <div className="coverage-list-simple" aria-label="Reported concerns and included treatment stages">
                    {records.map((record) => (
                      <article key={`coverage-${record.code}`}>
                        <span className="technology-covered" aria-hidden="true">✓</span>
                        <div>
                          <strong>{contaminantCopy[record.name]?.title || record.name}</strong>
                          <small>{contaminantCopy[record.name]?.riskLabel || "Reported water concern"}</small>
                        </div>
                        <b>{includedTreatment(record)}</b>
                      </article>
                    ))}
                  </div>
                  <p className="coverage-certification-note">The exact quoted model and certification are confirmed before finalizing contaminant-reduction claims.</p>
                </section>

                <button className="report-next-button" type="button" onClick={() => scrollToSection(sizingRef.current)}>
                  See my included system <span aria-hidden="true">↓</span>
                </button>
              </section>
            </>
          )}

          {!report.addressVerificationRequired && <section className="system-match-section" ref={sizingRef}>
            <div className="system-match-heading">
              <p className="eyebrow light-eyebrow"><span /> Step 2 · Full package preselected</p>
              <h2>Your ZIP matched the full package.</h2>
              <p>Now choose people and bathrooms. We only change the tank capacity so the package can keep up with your home.</p>
            </div>

            <div className="default-system-strip">
              <span aria-hidden="true">✓</span>
              <div><strong>Full package preselected for ZIP {report.zip}</strong><small>Whole-home softening, carbon treatment and kitchen reverse osmosis are included. Household demand chooses the tank size.</small></div>
            </div>

            <div className="household-questions">
              <fieldset>
                <legend>People in the home</legend>
                <div>{[1, 2, 3, 4, 5, 6].map((value) => <button type="button" aria-pressed={people === value} onClick={() => selectPeople(value)} key={value}>{value === 6 ? "6+" : value}</button>)}</div>
              </fieldset>
              <fieldset ref={bathroomsRef}>
                <legend>Bathrooms</legend>
                <div>{[1, 2, 3, 4, 5].map((value) => <button type="button" aria-pressed={bathrooms === value} onClick={() => selectBathrooms(value)} key={value}>{value === 5 ? "5+" : value}</button>)}</div>
              </fieldset>
            </div>
            <p className="household-sizing-note">Four people with three bathrooms automatically selects dual tanks. Larger households or four-plus bathrooms do too.</p>

            {sizingConfirmed && (
              <div className="sizing-confirmation" ref={sizingResultRef} role="status" aria-live="polite">
                <span aria-hidden="true">✓</span>
                <div>
                  <small>Your home is sized</small>
                  <strong>{matchedSystemName}</strong>
                  <p>{people === 6 ? "6+" : people} people · {bathrooms === 5 ? "5+" : bathrooms} bathrooms · full treatment package</p>
                </div>
                <button type="button" onClick={() => scrollToSection(contactRef.current)}>Get installed price <span aria-hidden="true">↓</span></button>
              </div>
            )}

            {people !== null && bathrooms !== null && (
              <section className="solution-preview" ref={solutionRef}>
                <div className="solution-preview-image">
                  <Image
                    src={matchedSystemImage}
                    alt={privateWell ? "Representative private well water treatment equipment" : dualRecommended ? "Central Valley Pure Water dual-tank complete home system" : "Central Valley Pure Water standard complete home system package"}
                    width={privateWell ? 1100 : dualRecommended ? 1012 : 1123}
                    height={privateWell ? 825 : dualRecommended ? 1555 : 1401}
                    sizes="(max-width: 800px) 100vw, 36vw"
                    unoptimized
                  />
                  <div className="product-image-caption"><strong>Central Valley Pure Water</strong><span>{dualRecommended ? "Dual-tank treatment package" : "Complete-home treatment package"}</span></div>
                </div>
                <div className="solution-preview-copy">
                  <span className={`match-badge${isUpgrade ? " upgrade" : ""}`}>{isUpgrade ? "Capacity automatically upgraded" : "Preselected full package"}</span>
                  <h3>{matchedSystemName}</h3>
                  <p>{privateWell
                    ? "Private-well equipment is selected only after a current property-specific water test and installation review."
                    : dualRecommended
                      ? `Sized for a ${people === 6 ? "6+" : people}-person, ${bathrooms === 5 ? "5+" : bathrooms}-bathroom household with higher continuous demand.`
                      : `A complete-home starting point for a ${people}-person, ${bathrooms}-bathroom household: whole-home softening plus dedicated kitchen drinking water.`}</p>

                  {!privateWell && (
                    <div className="system-process" aria-label="How the selected system treats the water">
                      <div><span>1</span><p><strong>Whole-home conditioning</strong><small>Softening targets hardness, scale, spotting, and mineral buildup throughout the home.</small></p></div>
                      <div><span>2</span><p><strong>Carbon treatment</strong><small>Activated carbon provides the whole-home treatment path for applicable taste, odor, chlorine, and disinfection-byproduct concerns.</small></p></div>
                      <div><span>3</span><p><strong>Kitchen reverse osmosis</strong><small>A dedicated drinking-water stage is matched to the report concerns shown in the checklist above.</small></p></div>
                    </div>
                  )}

                  <div className="solution-checklist" aria-label="Included system coverage">
                    {coverageItems.map(([title, note]) => (
                      <div className="checked" key={title}>
                        <span className="coverage-check" aria-hidden="true">✓</span>
                        <div><strong>{title}</strong><small>{note}</small></div>
                      </div>
                    ))}
                  </div>

                  <p className="solution-certification-note">Specific contaminant-reduction coverage is confirmed against the exact proposed model&apos;s certifications before the quote is finalized.</p>
                  <button type="button" onClick={() => scrollToSection(contactRef.current)}>
                    Get my installed, out-the-door price <span aria-hidden="true">↓</span>
                  </button>
                </div>
              </section>
            )}

            <div className="lead-capture-wrap" ref={contactRef}>
              {people !== null && bathrooms !== null ? (
                <form className="water-lead-form" onSubmit={submitLead}>
                  <div className="lead-form-heading">
                    <p className="eyebrow"><span /> Step 3 · Installed price</p>
                    <h3>Get your out-the-door price.</h3>
                    <p>Enter five quick details. We send the selected system, standard installation and any property-specific extras in one clear recap.</p>
                  </div>

                  <div className="lead-form-summary" aria-label="Selected household details">
                    <div><small>People</small><strong>{people === 6 ? "6+" : people}</strong></div>
                    <div><small>Bathrooms</small><strong>{bathrooms === 5 ? "5+" : bathrooms}</strong></div>
                    <div><small>Package</small><strong>{dualRecommended ? "Dual tank" : compactHousehold ? "Standard" : "Standard Plus"}</strong></div>
                    <div><small>ZIP</small><strong>{report.zip}</strong></div>
                    <div className="lead-summary-price locked"><small>Installed price</small><strong>Shown after submission</strong></div>
                  </div>

                  <div className="lead-form-fields">
                    <label>First name
                      <input name="given-name" value={lead.firstName} onChange={(event) => setLead({ ...lead, firstName: event.target.value })} autoComplete="off" autoCapitalize="words" enterKeyHint="next" required />
                    </label>
                    <label>Last name
                      <input name="family-name" value={lead.lastName} onChange={(event) => setLead({ ...lead, lastName: event.target.value })} autoComplete="off" autoCapitalize="words" enterKeyHint="next" required />
                    </label>
                    <label>Phone number
                      <input name="tel" value={lead.phone} onChange={(event) => setLead({ ...lead, phone: event.target.value })} type="tel" inputMode="tel" autoComplete="off" placeholder="(209) 555-0123" enterKeyHint="next" required />
                    </label>
                    <label>Email
                      <input name="email" value={lead.email} onChange={(event) => setLead({ ...lead, email: event.target.value })} type="email" inputMode="email" autoComplete="off" enterKeyHint="next" required />
                    </label>
                    <label className="address-autocomplete">Property address
                      <span className="address-input-wrap">
                        <input
                          name="address-line1"
                          value={lead.propertyAddress}
                          onChange={(event) => {
                            const propertyAddress = event.target.value;
                            setLead({ ...lead, propertyAddress });
                            if (propertyAddress.trim().length < 3) {
                              setAddressSuggestions([]);
                              setAddressLoading(false);
                            }
                            setAddressSuggestionsOpen(propertyAddress.trim().length >= 3);
                          }}
                          onFocus={() => setAddressSuggestionsOpen(addressSuggestions.length > 0)}
                          onBlur={() => window.setTimeout(() => setAddressSuggestionsOpen(false), 160)}
                          role="combobox"
                          aria-expanded={addressSuggestionsOpen}
                          aria-controls="property-address-suggestions"
                          aria-autocomplete="list"
                          autoComplete="off"
                          autoCapitalize="words"
                          placeholder="Start typing your street address"
                          enterKeyHint="done"
                          required
                        />
                        {addressLoading && <span className="address-loading">Finding…</span>}
                        {addressSuggestionsOpen && addressSuggestions.length > 0 && (
                          <span className="address-suggestions" id="property-address-suggestions" role="listbox">
                            {addressSuggestions.map((suggestion) => (
                              <button
                                type="button"
                                role="option"
                                aria-selected="false"
                                key={`${suggestion.magicKey}-${suggestion.text}`}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => {
                                  setLead({ ...lead, propertyAddress: suggestion.text });
                                  setAddressSuggestions([]);
                                  setAddressSuggestionsOpen(false);
                                }}
                              >
                                <span aria-hidden="true">⌖</span>{suggestion.text}
                              </button>
                            ))}
                          </span>
                        )}
                      </span>
                      <small className="address-help">Choose a suggestion so we receive the full address.</small>
                    </label>
                    <label className="lead-honeypot" aria-hidden="true">Website
                      <input value={lead.website} onChange={(event) => setLead({ ...lead, website: event.target.value })} tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <label className="lead-consent">
                    <input checked={lead.contactConsent} onChange={(event) => setLead({ ...lead, contactConsent: event.target.checked })} type="checkbox" required />
                    <span>I agree Central Valley Pure Water may contact me by phone, text, or email about this water report and an installation estimate. Consent is not a condition of purchase. Message and data rates may apply.</span>
                  </label>

                  <button className="lead-submit-button" type="submit" disabled={leadStatus !== "idle"}>
                    {leadStatus === "submitting" ? "Building your installed price…" : leadStatus === "success" ? "Price request sent" : "Get my installed price & payment options"}<span aria-hidden="true">→</span>
                  </button>
                  <p className="lead-form-privacy">Your information is used to follow up on this request. We do not sell your contact information.</p>
                  <div className="lead-form-error" role="alert" aria-live="polite">{leadError}</div>
                </form>
              ) : (
                <div className="lead-form-locked">
                  <span aria-hidden="true">↓</span>
                  <strong>Choose both household details above</strong>
                  <p>Then your recommended system appears before the quote form.</p>
                </div>
              )}
            </div>

            {leadStatus === "success" && (
              <article className="quote-result-card" ref={matchRef}>
                <div className="quote-result-main">
                  <span className="match-badge">Installed-price recap</span>
                  <p>Your preselected full package</p>
                  <h3>{matchedSystemName}</h3>
                  <div className="quote-price">
                    <small>{privateWell ? "Personalized out-the-door installed price" : "Your selected complete-home package"}</small>
                    <strong>{installedPriceLabel}</strong>
                    {!privateWell && <span>Includes the full selected system and standard installation after property confirmation.</span>}
                  </div>
                  <p className="offer-includes">{privateWell
                    ? "Equipment and pricing are finalized after current well testing and a property review."
                    : "Includes the matched whole-home package, kitchen reverse osmosis, RO faucet and standard installation. Property-specific extras are shown separately before scheduling."}</p>
                  <a className="quote-call-button" href="tel:+15107255120">Call (510) 725-5120 <span>→</span></a>
                </div>
                <div className="financing-option-card">
                  <span>Payment option</span>
                  <h4>Financing options available</h4>
                  <p>See personalized payment options for the installed price shown above. Approval and available terms vary.</p>
                  <ul>
                    <li><span>✓</span> Use the installed price above</li>
                    <li><span>✓</span> Check personalized options without affecting your credit score</li>
                    <li><span>✓</span> Compare available lender terms securely</li>
                  </ul>
                  <a href={financingUrl} target="_blank" rel="noopener noreferrer">See my financing options <span>→</span></a>
                </div>
              </article>
            )}

            {leadStatus === "success" && (
              <div className="match-disclosures">
                <strong>What this match does not assume</strong>
                <p>A ZIP-code report is utility-wide information, not a sample from your faucet. The recommendation is a starting point, not a promise that one system removes every reported substance. Specific reduction claims depend on the exact equipment and certification. Tax, permits, electrical work, trenching, code upgrades, removal of existing equipment, major plumbing modifications, and difficult installations may cost extra. Financing is subject to approval and available terms.</p>
              </div>
            )}
          </section>}

          <section className="water-data-sources">
            <div><p className="eyebrow"><span /> Transparent data</p><h2>Where this report comes from</h2></div>
            <div>
              <p>The likely supplier is matched from California public water-system service-area records. Test results come from California drinking-water monitoring files for {report.dataPeriod}. Health-based goals are screening comparisons, while legal-limit references are regulatory comparison points.</p>
              <p>This is utility-wide information—not a test of your individual faucet. Water can also change through treatment, blending, distribution, and the plumbing inside a home.</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
