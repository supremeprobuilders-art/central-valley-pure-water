export type AreaFaq = {
  question: string;
  answer: string;
};

export type AreaPage = {
  slug: string;
  city: string;
  county: string;
  title: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  overviewTitle: string;
  overview: string[];
  highlights: string[];
  helpfulFor: string[];
  decisions: { title: string; copy: string }[];
  process: { title: string; copy: string }[];
  faqs: AreaFaq[];
  sources?: { label: string; href: string; note: string }[];
  report?: {
    zip: string;
    modified: string;
    reviewed: string;
    title: string;
    intro: string;
    facts: { value: string; label: string; copy: string }[];
    limitation: string;
  };
  serviceSlugs: string[];
  relatedAreas: string[];
};

export const areaPages: AreaPage[] = [
  {
    slug: "modesto",
    city: "Modesto",
    county: "Stanislaus County",
    title: "Free Modesto Water Report & Installed System Prices",
    eyebrow: "Modesto water quality by ZIP code",
    metaTitle: "Modesto Water Report & Installed Prices | CV Pure Water",
    metaDescription:
      "See Modesto’s 2025 public water report, likely supplier, hardness context, system path, installed prices, and financing by ZIP—free, with no signup.",
    hero:
      "Enter a Modesto ZIP to see the likely public-water supplier, a plain-English public-record summary, a suitable system path, and installed pricing before any optional contact.",
    overviewTitle: "What the 2025 Modesto water report can—and cannot—tell you",
    overview: [
      "The City of Modesto’s 2025 Consumer Confidence Report covers Modesto System 5010010, including Empire. The City says the system met applicable federal and state drinking-water standards. It also reports that approximately 40% of the water supplied in 2025 came from groundwater wells and 60% from surface water treated at the Modesto Reservoir plant before mixing in the distribution system.",
      "The same report lists utility-wide monitoring results, including average hardness of 199 parts per million as calcium carbonate and a reported range of 33–388 ppm. That range matters: a citywide average cannot establish the hardness or other conditions at one house. The free Water Report uses public records to create a practical starting point, then asks you to confirm the provider and PWSID on the current bill.",
      "This is not a laboratory test of water from your tap. Current provider records, source blending, the home’s plumbing and goals, household and bathroom sizing, installation conditions, and model-specific performance still control the final recommendation.",
    ],
    highlights: [
      "Free report before signup",
      "2025 City records explained",
      "All installed prices visible",
      "Financing available",
    ],
    helpfulFor: [
      "You see scale or spotting and want to compare the city’s reported hardness context with whole-home softening.",
      "You are researching what is in Modesto tap water and want the official public report explained in plain English.",
      "You want to compare a whole-home path with dedicated reverse osmosis for drinking and cooking water.",
      "You want installed pricing and financing availability before speaking with a sales representative.",
    ],
    decisions: [
      {
        title: "Confirm the provider",
        copy: "ZIP codes and utility boundaries do not match exactly. Check the supplier and PWSID on the current water bill before relying on a utility report.",
      },
      {
        title: "Separate the goals",
        copy: "Softening, whole-home filtration, and kitchen reverse osmosis do different jobs. The proposed components should be tied to the stated issue without claiming universal contaminant removal.",
      },
      {
        title: "Size and verify",
        copy: "Household size, bathrooms, main-line access, drainage, power, cabinet space, and model-specific performance shape the final equipment and installation scope.",
      },
    ],
    process: [
      {
        title: "Enter a Modesto ZIP",
        copy: "Start the free Water Report without creating an account. The lookup shows the likely supplier and asks you to confirm it against the current water bill.",
      },
      {
        title: "Read the public-record summary",
        copy: "Review dated monitoring context and official sources in plain English, including the difference between an enforceable MCL and a non-enforceable public-health goal where relevant.",
      },
      {
        title: "See the system and installed price",
        copy: "Choose household size and bathrooms to see the starting configuration: Standard $3,495, Standard Plus $3,995, or Dual Tank Full $5,495 installed.",
      },
      {
        title: "Choose the next step",
        copy: "Review financing availability, call, text, or optionally share contact details after receiving the report and price. Lender terms control financing; property verification controls the final scope.",
      },
    ],
    faqs: [
      {
        question: "Is the Modesto Water Report free and available without signup?",
        answer:
          "Yes. Enter a California city or ZIP to see the likely public-water supplier, public-record context, a suitable system starting point, installed pricing, and financing availability before any optional contact request.",
      },
      {
        question: "What does the City of Modesto’s 2025 water report say?",
        answer:
          "The report covers Modesto System 5010010, including Empire. The City says the system met applicable standards and reports a 2025 supply mix of approximately 40% groundwater and 60% surface water. Read the official report for its complete tables and qualifications.",
      },
      {
        question: "How hard is Modesto water?",
        answer:
          "The City’s 2025 utility-wide table reports average hardness of 199 ppm as calcium carbonate, with a 33–388 ppm range. That does not predict one address because provider boundaries, wells, surface-water blending, season, and distribution conditions can vary.",
      },
      {
        question: "Is this a laboratory test of my Modesto tap water?",
        answer:
          "No. It is a plain-English summary of relevant public utility monitoring records. A tap-specific question may require appropriate property sampling, and any final equipment recommendation still requires provider, source, property, installation, and model-performance confirmation.",
      },
      {
        question: "What are the installed water-system prices in Modesto?",
        answer:
          "The confirmed starting installed prices are Standard $3,495, Standard Plus $3,995, and Dual Tank Full $5,495. Three or more bathrooms plus four or more people selects Dual Tank Full. Property conditions and final scope still control the final recommendation.",
      },
      {
        question: "Is financing available for a Modesto water system?",
        answer:
          "Yes. Financing is available after you see the installed-price path. Approval, payment, rate, term, and other conditions are determined by the lender.",
      },
    ],
    sources: [
      {
        label: "City of Modesto 2025 Consumer Confidence Report",
        href: "https://www.modestogov.com/DocumentCenter/View/26815/Modesto-Consumer-Confidence-Report-2025",
        note: "Official report for Modesto System 5010010, including Empire, with 2025 source, monitoring, hardness, and compliance information.",
      },
      {
        label: "City of Modesto Consumer Confidence Reports",
        href: "https://www.modestogov.com/856/Consumer-Confidence-Reports",
        note: "Official City index for current and prior annual drinking-water reports across Modesto-operated systems.",
      },
    ],
    report: {
      zip: "95351",
      modified: "2026-08-28",
      reviewed: "Official 2025 report reviewed August 28, 2026",
      title: "A two-minute starting point for a Modesto address",
      intro:
        "Use the City’s utility-wide report as context, then run the free ZIP lookup to confirm the likely supplier and continue to household sizing, installed price, financing, and optional contact.",
      facts: [
        {
          value: "5010010",
          label: "Reported public-water system",
          copy: "The official 2025 report identifies the Modesto system and notes that it includes Empire. Confirm this PWSID on the current bill.",
        },
        {
          value: "40% / 60%",
          label: "2025 source mix",
          copy: "The City reports approximately 40% groundwater and 60% treated surface water, which then mix in the distribution system.",
        },
        {
          value: "199 ppm",
          label: "Average reported hardness",
          copy: "The utility-wide range was 33–388 ppm as CaCO3. An address-specific result can differ from the reported average.",
        },
        {
          value: "Standards met",
          label: "City compliance statement",
          copy: "The City says its water met applicable federal and state standards; detection does not automatically mean a violation or tap-specific risk.",
        },
      ],
      limitation:
        "Public monitoring records are not a laboratory sample from your faucet. Provider confirmation, the current official source, property plumbing and goals, household sizing, installation conditions, and model-specific performance still control the final recommendation.",
    },
    serviceSlugs: ["water-softeners", "reverse-osmosis", "whole-home-water-filtration"],
    relatedAreas: ["turlock", "manteca"],
  },
  {
    slug: "stockton",
    city: "Stockton",
    county: "San Joaquin County",
    title: "Free Stockton Water Report & Installed System Prices",
    eyebrow: "Stockton water quality by ZIP code",
    metaTitle: "Stockton Water Report & Installed Prices | CV Pure Water",
    metaDescription:
      "Check the likely Stockton water provider, current public report context, system path, installed prices, and financing by ZIP—free, with no signup.",
    hero:
      "Enter a Stockton ZIP to identify the likely provider, review current public monitoring context, and continue to system sizing and installed pricing before any optional contact.",
    overviewTitle: "Start with the provider—not a citywide assumption",
    overview: [
      "Stockton does not have one public-water report that applies to every address. The City directs residents to an address lookup because service may come from the City of Stockton Municipal Utilities Department, California Water Service, or another local provider. A ZIP is a useful starting point, but the provider name and public-water-system ID on the current bill control which report should be reviewed.",
      "California Water Service’s 2025 Stockton District report is one current example. Cal Water says its Stockton system used local groundwater plus water purchased from Stockton East Water District and met every applicable primary and secondary federal and state water-quality standard in 2025. Its source-specific table reports different hardness values for groundwater and purchased surface water, illustrating why a single Stockton-wide hardness number can be misleading.",
      "The free Water Report summarizes selected public utility records; it is not a laboratory test of water from a Stockton faucet. Provider confirmation, the latest official report, source blending, property plumbing and goals, household and bathroom sizing, installation conditions, and model-specific performance still control the final recommendation.",
    ],
    highlights: [
      "Provider confirmation first",
      "2025 public records explained",
      "All installed prices visible",
      "Financing available",
    ],
    helpfulFor: [
      "You do not know which water utility serves the Stockton address or which annual report applies.",
      "You see scale or spotting and want to compare the provider’s hardness context with whole-home softening.",
      "You want to separate whole-home filtration from dedicated reverse osmosis for drinking and cooking water.",
      "You want installed pricing and financing availability before speaking with a sales representative.",
    ],
    decisions: [
      {
        title: "Confirm the provider",
        copy: "Use the City’s address lookup and the current water bill to verify the utility and PWSID. ZIP and city boundaries alone cannot identify the controlling report with certainty.",
      },
      {
        title: "Separate the treatment goals",
        copy: "Softening, whole-home filtration, and kitchen reverse osmosis perform different jobs. Match each proposed component to the stated concern without claiming universal contaminant removal.",
      },
      {
        title: "Size and verify the property",
        copy: "Household size, bathrooms, main-line access, drainage, power, cabinet space, and model-specific performance shape the final equipment and installation scope.",
      },
    ],
    process: [
      {
        title: "Enter a Stockton ZIP",
        copy: "Start the free report without an account. The lookup shows a likely supplier and asks you to confirm it against the current water bill.",
      },
      {
        title: "Review dated public records",
        copy: "See plain-English provider context and official source links. Utility-wide monitoring does not predict the water at one faucet.",
      },
      {
        title: "Size the starting system",
        copy: "Choose household size and bathrooms to see Standard $3,495, Standard Plus $3,995, or Dual Tank Full $5,495 installed. Three or more bathrooms plus four or more people selects Dual Tank Full.",
      },
      {
        title: "Choose the next step",
        copy: "Review financing availability, call, text, or optionally share contact details after receiving the report and price. Lender terms and final property verification control.",
      },
    ],
    faqs: [
      {
        question: "Who provides water to my Stockton address?",
        answer:
          "Stockton has more than one water service provider. Use the City’s official address lookup, then confirm the provider name and public-water-system ID on the current bill before relying on a water-quality report.",
      },
      {
        question: "What does Cal Water’s 2025 Stockton report say?",
        answer:
          "For the Cal Water Stockton District—not every Stockton address—the utility reports that it used local groundwater plus purchased Stockton East Water District water and met every applicable primary and secondary federal and state water-quality standard in 2025. Read the official report for the full tables and qualifications.",
      },
      {
        question: "How hard is Stockton water?",
        answer:
          "There is no single reliable citywide number. Cal Water’s 2025 Stockton District table reports groundwater hardness from 22–290 ppm with a 150 ppm average, while its purchased surface-water column reports a 38.9 ppm average. Those source-specific values do not predict one address or apply to a different provider.",
      },
      {
        question: "Is this a laboratory test of my Stockton tap water?",
        answer:
          "No. It is a plain-English summary of relevant public utility monitoring records. Tap-specific questions may require appropriate property sampling, and provider, source, plumbing, installation, and model-performance confirmation still control the final recommendation.",
      },
      {
        question: "What are the installed water-system prices in Stockton?",
        answer:
          "The confirmed starting installed prices are Standard $3,495, Standard Plus $3,995, and Dual Tank Full $5,495. Three or more bathrooms plus four or more people selects Dual Tank Full. Property conditions and final scope still control.",
      },
      {
        question: "Is financing available for a Stockton water system?",
        answer:
          "Yes. Financing is available after you see the installed-price path. Approval, payment, rate, term, and other conditions are determined by the lender.",
      },
    ],
    sources: [
      {
        label: "City of Stockton water quality and provider resources",
        href: "https://www.stocktonca.gov/services/water,_sewer___stormwater/water_quality.php",
        note: "Official City page linking the current 2025 annual report, public-health-goals report, and address-based water-provider lookup.",
      },
      {
        label: "City of Stockton address and provider lookup",
        href: "https://www.stocktonca.gov/aya",
        note: "Official address lookup used to identify the water service provider before selecting an annual report.",
      },
      {
        label: "Cal Water Stockton 2025 Water Quality Report",
        href: "https://www.calwater.com/ccrs/stk-stk-2025/",
        note: "Current official Cal Water report for its Stockton District, including 2025 compliance, source, and source-specific hardness context.",
      },
    ],
    report: {
      zip: "95205",
      modified: "2026-08-30",
      reviewed: "Official 2025 sources reviewed August 30, 2026",
      title: "A provider-first starting point for a Stockton address",
      intro:
        "Use the City’s provider lookup and current utility records as context, then run the free ZIP lookup to identify the likely supplier and continue to system sizing, installed price, financing, and optional contact.",
      facts: [
        {
          value: "Multiple",
          label: "Water providers in Stockton",
          copy: "The City directs residents to an address lookup because one provider and report do not apply across every Stockton address.",
        },
        {
          value: "23,926",
          label: "Cal Water tests in 2025",
          copy: "Cal Water reports 23,926 tests on 3,432 samples for 237 constituents in its Stockton District—not all Stockton providers.",
        },
        {
          value: "150 / 38.9 ppm",
          label: "Cal Water source averages",
          copy: "The 2025 table reports 150 ppm average groundwater hardness and 38.9 ppm for purchased surface water; an address-specific result can differ.",
        },
        {
          value: "Standards met",
          label: "Cal Water compliance statement",
          copy: "Cal Water says its Stockton District met every applicable primary and secondary federal and state standard in 2025.",
        },
      ],
      limitation:
        "These facts apply to the cited provider records, not every Stockton address or an individual faucet. Confirm the provider and current report; property details and model-specific performance still control the final recommendation.",
    },
    serviceSlugs: ["whole-home-water-filtration", "water-softeners", "reverse-osmosis"],
    relatedAreas: ["manteca", "tracy"],
  },
  {
    slug: "tracy",
    city: "Tracy",
    county: "San Joaquin County",
    title: "Reverse Osmosis & Water Softener Installation in Tracy",
    eyebrow: "Tracy kitchen and whole-home systems",
    metaTitle: "Reverse Osmosis Tracy CA | Central Valley Pure Water",
    metaDescription:
      "Plan reverse osmosis, water softener, or complete-home system installation in Tracy. Call Central Valley Pure Water for current pricing and scope.",
    hero:
      "Plan dedicated drinking water at the kitchen sink, whole-home hardness treatment, or a coordinated combination for your Tracy home.",
    overviewTitle: "Two locations, two different treatment decisions",
    overview: [
      "Reverse osmosis is commonly installed beneath the kitchen sink and supplies a dedicated faucet for drinking and cooking water. A water softener is installed on the home’s incoming line to address hardness throughout the house. Tracy homeowners comparing both should evaluate the kitchen and main-line locations separately before treating them as one package.",
      "Under-sink cabinet space, feed and drain access, faucet placement, and future filter changes shape the reverse osmosis installation. Main-line access, drainage, power, household demand, and equipment clearance shape the whole-home side. Reviewing both locations before equipment selection produces a clearer proposal and avoids assuming every home has the same layout.",
    ],
    highlights: [
      "Dedicated kitchen RO options",
      "Whole-home softener planning",
      "Complete-home coordination",
      "Serviceable equipment layouts",
    ],
    helpfulFor: [
      "You want a dedicated faucet for drinking and cooking water.",
      "You see whole-home hard-water signs such as spotting or scale.",
      "You are comparing a standalone RO system with a coordinated package.",
      "You want cabinet and main-line access checked before installation.",
    ],
    decisions: [
      {
        title: "Kitchen cabinet layout",
        copy: "Confirm room for the RO components, feed connection, drain connection, faucet placement, tubing, and reasonable access for future filter service.",
      },
      {
        title: "Main-line conditions",
        copy: "A whole-home system needs a practical installation location with appropriate plumbing, drainage, power where required, clearance, and weather protection.",
      },
      {
        title: "One project or phases",
        copy: "A softener and RO can be coordinated in one scope or considered separately. The proposal should make the purpose and price of each component clear.",
      },
    ],
    process: [
      {
        title: "Choose the first goal",
        copy: "Decide whether the immediate priority is kitchen drinking water, whole-home hardness, or a combined installation.",
      },
      {
        title: "Share layout details",
        copy: "Provide photos or arrange a review of the kitchen cabinet, sink, incoming water line, equipment area, drainage, and power conditions.",
      },
      {
        title: "Review the Tracy proposal",
        copy: "Confirm the equipment role, installation scope, exclusions, current pricing, financing availability, and maintenance access.",
      },
      {
        title: "Install and explain",
        copy: "After installation, the system is checked and the homeowner is shown the faucet, shutoffs, basic operation, and service access.",
      },
    ],
    faqs: [
      {
        question: "Where is a reverse osmosis system installed in a Tracy home?",
        answer:
          "Residential reverse osmosis systems are commonly installed beneath the kitchen sink and connected to a dedicated drinking-water faucet. The exact layout depends on cabinet and plumbing conditions.",
      },
      {
        question: "Does a kitchen RO system soften the whole Tracy home?",
        answer:
          "No. Kitchen RO is point-of-use drinking-water treatment. Whole-home hardness is addressed separately with a water softener installed on the incoming line.",
      },
      {
        question: "Can water softener and RO installation be quoted together?",
        answer:
          "Yes. They can be reviewed as a coordinated project, with the equipment and installation scope for each location shown clearly.",
      },
      {
        question: "How do I prepare for a Tracy reverse osmosis quote?",
        answer:
          "Have photos of the sink cabinet, faucet area, feed and drain plumbing, plus the property address and expected household use when you call.",
      },
    ],
    serviceSlugs: ["reverse-osmosis", "water-softeners", "whole-home-water-filtration"],
    relatedAreas: ["manteca", "stockton"],
  },
  {
    slug: "manteca",
    city: "Manteca",
    county: "San Joaquin County",
    title: "Whole-Home Water Systems in Manteca",
    eyebrow: "Manteca complete-home planning",
    metaTitle: "Water Softener Manteca CA | Central Valley Pure Water",
    metaDescription:
      "Compare water softeners, whole-home filtration, and kitchen reverse osmosis systems in Manteca. Call for a clear installation scope and price.",
    hero:
      "Coordinate whole-home water softening and dedicated kitchen reverse osmosis without losing sight of what each system is intended to do.",
    overviewTitle: "Build a complete-home plan one purpose at a time",
    overview: [
      "A complete-home project can include a softener serving the incoming water line and a reverse osmosis system serving a dedicated kitchen faucet. Manteca homeowners should still evaluate each component independently: the softener is sized around whole-home demand and hardness goals, while the RO system is planned around drinking-water use and the kitchen layout.",
      "Whole-home filtration may also be considered when there is a separate, defined filtration objective. Central Valley Pure Water reviews the water source, household demand, plumbing, drainage, power, equipment footprint, and service access so the proposal explains the role and installation requirements of every component rather than presenting an unexplained bundle.",
    ],
    highlights: [
      "Complete-home system planning",
      "Household-specific softener sizing",
      "Dedicated kitchen RO",
      "One coordinated installation scope",
    ],
    helpfulFor: [
      "You want whole-home hardness treatment and dedicated drinking water.",
      "You are comparing a complete package with standalone equipment.",
      "You want capacity based on household demand rather than a generic label.",
      "You want standard installation and possible extra work identified clearly.",
    ],
    decisions: [
      {
        title: "Purpose of each component",
        copy: "Keep whole-home hardness, broad filtration, and kitchen drinking water as distinct objectives so every proposed component has a clear job.",
      },
      {
        title: "Household demand",
        copy: "Occupancy, usage patterns, fixtures, and expected flow help shape whole-home equipment capacity and the practical installation layout.",
      },
      {
        title: "Standard versus added work",
        copy: "Permits, electrical work, trenching, code upgrades, removal, major plumbing changes, and difficult conditions may be outside standard installation.",
      },
    ],
    process: [
      {
        title: "List the goals by location",
        copy: "Separate what you want at showers and fixtures from what you want at the kitchen drinking-water faucet.",
      },
      {
        title: "Review both installation areas",
        copy: "Assess the main line and equipment space along with the sink cabinet, faucet location, feed connection, and drain access.",
      },
      {
        title: "Compare the complete scope",
        copy: "Review the equipment roles, capacity, standard installation, exclusions, current price, and financing availability together.",
      },
      {
        title: "Complete one coordinated install",
        copy: "The approved components are installed, checked, and explained as one planned project with access for future service.",
      },
    ],
    faqs: [
      {
        question: "What is included in a complete-home water system for a Manteca property?",
        answer:
          "A complete-home plan may combine whole-home softening with a dedicated under-sink reverse osmosis system. The exact equipment and installation scope depend on the property and goals.",
      },
      {
        question: "Is whole-home filtration the same as water softening?",
        answer:
          "No. A softener is selected primarily for hardness minerals. Filtration uses different media and should be selected around a defined filtration objective.",
      },
      {
        question: "Can I install only a water softener in Manteca?",
        answer:
          "Yes. Softening, filtration, and reverse osmosis can be considered separately. A combined project is an option, not an automatic requirement.",
      },
      {
        question: "What information helps with Manteca system pricing?",
        answer:
          "Share the address, water source, household size, main-line and equipment-area photos, kitchen cabinet photos, and the goals you want each system to address.",
      },
    ],
    serviceSlugs: ["water-softeners", "whole-home-water-filtration", "reverse-osmosis"],
    relatedAreas: ["stockton", "tracy", "modesto"],
  },
  {
    slug: "turlock",
    city: "Turlock",
    county: "Stanislaus County",
    title: "City & Well Water Treatment in Turlock",
    eyebrow: "Turlock source-aware system planning",
    metaTitle: "Water Treatment Turlock CA | Central Valley Pure Water",
    metaDescription:
      "Plan city-water or private-well treatment, softening, filtration, and reverse osmosis in Turlock. Call for a property-specific recommendation.",
    hero:
      "Start with the Turlock property’s actual water source, current information, household goals, and installation conditions before selecting equipment.",
    overviewTitle: "City water and private wells require different first steps",
    overview: [
      "For a Turlock property on municipal water, the planning conversation can begin with the household goal: whole-home hardness, a defined filtration objective, dedicated drinking water, or a combination. The current utility water report is the appropriate source for system-wide information, while the home’s plumbing and the resident’s goals shape any in-home installation.",
      "A private well is property-specific. Available test results, flow and pressure considerations, household demand, plumbing access, equipment space, and the concern being evaluated all matter. When the recommendation depends on water chemistry, appropriate current testing should come before equipment claims. That assessment-first path protects the homeowner from buying a universal package that is not tied to the property.",
    ],
    highlights: [
      "City and well pathways kept separate",
      "Assessment before well equipment",
      "Whole-home and drinking-water options",
      "Property-specific installation plan",
    ],
    helpfulFor: [
      "Your Turlock property uses city water and you want to compare in-home options.",
      "Your property uses a private well and you have current water information.",
      "You want to separate hardness, filtration, and drinking-water decisions.",
      "You want the well system, demand, plumbing, and equipment space reviewed together.",
    ],
    decisions: [
      {
        title: "Confirm the source",
        copy: "Establish municipal water or private well at the beginning. The information required and the responsible treatment path differ between them.",
      },
      {
        title: "Use current evidence",
        copy: "Private-well concerns that depend on water chemistry should be supported by appropriate current testing before a treatment claim is made.",
      },
      {
        title: "Plan for demand and service",
        copy: "Household use, flow and pressure, plumbing, drainage, power, footprint, protection, and maintenance access influence the final configuration.",
      },
    ],
    process: [
      {
        title: "Identify city or well water",
        copy: "Share the property address and confirm the source. For a well, gather recent water information and the basics of the well and pressure system.",
      },
      {
        title: "Define the treatment objective",
        copy: "Explain what the household is noticing and whether the priority affects the whole home, kitchen drinking water, or a verified well-water condition.",
      },
      {
        title: "Develop the property plan",
        copy: "Review equipment role, capacity, order, plumbing, utilities, space, service access, installation assumptions, and exclusions.",
      },
      {
        title: "Approve scope before installation",
        copy: "Compare the recommendation and current pricing, ask questions, and schedule only after the property-specific scope is clear.",
      },
    ],
    faqs: [
      {
        question: "Do you work with both city and private-well properties in Turlock?",
        answer:
          "Yes, subject to service availability and project scope. The planning process is different: private-well recommendations may require current property-specific testing and system information.",
      },
      {
        question: "Can well-water equipment be selected from appearance, taste, or odor alone?",
        answer:
          "Not for concerns that depend on water chemistry. Appropriate current testing should support those decisions before a treatment claim is made.",
      },
      {
        question: "Where should a Turlock city-water customer start?",
        answer:
          "Start with the household goal—hardness, whole-home filtration, or kitchen drinking water—then review the home’s installation conditions and current utility information.",
      },
      {
        question: "Can a Turlock well-water plan include softening or reverse osmosis?",
        answer:
          "Those options may be considered when they match the property’s current information and household goals. They should not be assumed as a universal well package.",
      },
    ],
    serviceSlugs: ["well-water-treatment", "city-water-systems", "water-softeners"],
    relatedAreas: ["modesto", "manteca"],
  },
  {
    slug: "sacramento",
    city: "Sacramento",
    county: "Sacramento County",
    title: "Water Softener & Filtration Planning in Sacramento",
    eyebrow: "Sacramento water system installation",
    metaTitle: "Water Softener Sacramento CA | Central Valley Pure Water",
    metaDescription:
      "Compare water softeners, whole-home filtration, and reverse osmosis for a Sacramento home using current utility information and property goals.",
    hero:
      "Start with your Sacramento address, water provider, and household goal—then choose softening, whole-home filtration, kitchen reverse osmosis, or a coordinated plan.",
    overviewTitle: "Use the water report as context, not a one-size-fits-all prescription",
    overview: [
      "The City of Sacramento’s current Consumer Confidence Report covers water quality results from 2025 and was published June 1, 2026. It states that City-supplied water meets or exceeds federal and state drinking water standards. The report also explains that about 80 percent of the City’s supply comes from the American and Sacramento rivers and about 20 percent comes from groundwater wells, while the mix reaching an individual customer can change with supply, demand, and season.",
      "That system-wide report is a useful first reference, but it does not select equipment for an individual home. Confirm the provider shown on the property’s water bill, review the current report for that provider, and define the result the household wants. Mineral scale and spotting point to a softening conversation; a defined taste, odor, or whole-home filtration goal follows a filtration path; drinking and cooking water at one sink may call for a point-of-use reverse osmosis discussion. Some homes may compare more than one path, while others may decide no in-home treatment is needed.",
    ],
    highlights: [
      "Current utility report reviewed first",
      "Softening and filtration kept distinct",
      "Whole-home and kitchen options",
      "Address-specific installation planning",
    ],
    helpfulFor: [
      "You want to understand whether a softener or filter matches the result you actually want.",
      "You notice spotting or scale and want to discuss a whole-home hardness solution.",
      "You want a dedicated reverse osmosis faucet for drinking and cooking water.",
      "You want the provider, plumbing layout, household demand, and maintenance access reviewed before choosing equipment.",
    ],
    decisions: [
      {
        title: "Confirm the provider",
        copy: "Use the water bill and service address to identify the utility. Read that provider’s current water-quality report instead of applying a citywide assumption to every property.",
      },
      {
        title: "Name the treatment goal",
        copy: "Hardness reduction, a defined whole-home filtration objective, and dedicated drinking water are separate jobs. A clear proposal connects each component to one of those jobs.",
      },
      {
        title: "Check the installation path",
        copy: "Main-line access, pipe size, drainage, power, equipment clearance, kitchen cabinet space, and future service access influence what can be installed and quoted.",
      },
    ],
    process: [
      {
        title: "Bring the address and goal",
        copy: "Share the Sacramento property address, water provider, household size, and whether the priority is scale, a defined filtration concern, drinking water, or a combination.",
      },
      {
        title: "Review current information",
        copy: "Use the provider’s latest public report for system-wide context. If the decision depends on conditions inside the home, discuss whether more property-specific information is appropriate.",
      },
      {
        title: "Map the equipment location",
        copy: "Review the incoming water line and, when reverse osmosis is considered, the kitchen cabinet, faucet placement, feed, drain, and filter-service clearance.",
      },
      {
        title: "Compare scope and pricing",
        copy: "Ask what each component is intended to do, what installation includes, which conditions could change the scope, and the current price before scheduling.",
      },
    ],
    faqs: [
      {
        question: "Does every Sacramento home need a water softener?",
        answer:
          "No. Start with the household’s goal, the property’s water provider, and the conditions you are trying to address. A softener is a hardness-focused option, not a universal requirement.",
      },
      {
        question: "Is a whole-home filter the same as a water softener?",
        answer:
          "No. A softener is selected primarily to reduce hardness minerals. Whole-home filtration is selected around a defined filtration objective. A proposal should explain the purpose of each component rather than treating the terms as interchangeable.",
      },
      {
        question: "What does Sacramento’s current city water report say?",
        answer:
          "The City’s report published June 1, 2026 covers 2025 results, says City-supplied water meets or exceeds federal and state drinking water standards, and describes a supply drawn mainly from the American and Sacramento rivers with a smaller groundwater share. Check the official report for full results and updates.",
      },
      {
        question: "Can I install reverse osmosis without a whole-home system?",
        answer:
          "Yes. Under-sink reverse osmosis can be considered as a dedicated drinking-and-cooking-water option. Cabinet space, feed and drain access, faucet placement, and future filter access should be reviewed first.",
      },
      {
        question: "How do I get current Sacramento installation pricing?",
        answer:
          "Call (510) 725-5120 with the address, water provider, household goals, and photos of the likely main-line or under-sink installation locations. Pricing depends on equipment, capacity, access, and project scope.",
      },
    ],
    sources: [
      {
        label: "City of Sacramento 2025 Consumer Confidence Report",
        href: "https://www.cityofsacramento.gov/utilities/water-quality/consumer-confidence-report",
        note: "Published June 1, 2026; includes the City’s current annual water-quality results, source summary, and service-area information.",
      },
      {
        label: "City of Sacramento drinking water quality information",
        href: "https://www.cityofsacramento.gov/utilities/water-quality",
        note: "Official updates, contacts, and current drinking-water resources from the City Department of Utilities.",
      },
    ],
    serviceSlugs: ["water-softeners", "whole-home-water-filtration", "reverse-osmosis"],
    relatedAreas: ["elk-grove", "stockton", "tracy", "manteca"],
  },
  {
    slug: "elk-grove",
    city: "Elk Grove",
    county: "Sacramento County",
    title: "Water Softener Installation & Replacement in Elk Grove",
    eyebrow: "Elk Grove installation and replacement planning",
    metaTitle: "Water Softener Elk Grove CA | Central Valley Pure Water",
    metaDescription:
      "Plan a water softener installation or replacement in Elk Grove, with whole-home filtration and kitchen RO options reviewed separately. Call for pricing.",
    hero:
      "Compare a first-time installation with replacement of existing equipment, then keep softening, whole-home filtration, and kitchen drinking water tied to clear household goals.",
    overviewTitle: "A replacement is not automatically a like-for-like installation",
    overview: [
      "An Elk Grove home with an existing softener, filter, bypass, or plumbing loop may look ready for a straightforward equipment swap. Before anything is reused, the proposal should identify what is present, whether it is part of the active plumbing path, where it drains, whether power is available, and whether the location leaves practical room for operation and future service. A first-time installation follows the same review without assuming that a loop or drain already exists.",
      "Water information also needs to match the service address. Elk Grove Water District and Sacramento County Water Agency publish separate annual water-quality resources for customers in their systems. Confirm the provider shown on the property’s bill and read that provider’s current report; if the bill names a different supplier, use that supplier’s report instead. A utility report gives system-wide context, while the home’s goals, plumbing, existing equipment, household demand, and installation conditions determine whether an in-home project makes sense.",
    ],
    highlights: [
      "First-time and replacement paths",
      "Existing equipment reviewed before reuse",
      "Provider-specific report links",
      "Service access planned up front",
    ],
    helpfulFor: [
      "You are replacing an older softener or filter and want the existing plumbing reviewed before assuming it can be reused.",
      "You are planning a first whole-home system and need to identify the incoming line, drainage, power, and equipment space.",
      "You want to compare hardness treatment with a defined whole-home filtration objective.",
      "You want kitchen reverse osmosis considered separately from the main-line project.",
    ],
    decisions: [
      {
        title: "Install or replace",
        copy: "Document the current equipment, bypass, plumbing connections, drain route, shutoffs, power, and clearance. Replacement scope should not be based on the old tank footprint alone.",
      },
      {
        title: "Reuse or rebuild",
        copy: "Existing loops and connections may be useful, but their condition, size, routing, and suitability should be reviewed before they are included in a proposal.",
      },
      {
        title: "One job or several",
        copy: "Softening, whole-home filtration, and under-sink reverse osmosis serve different locations and goals. Compare each component’s role, installation needs, and price separately.",
      },
    ],
    process: [
      {
        title: "Confirm the Elk Grove address",
        copy: "Share the service address, provider shown on the water bill, household size, and whether this is a first installation, replacement, or addition to an existing system.",
      },
      {
        title: "Photograph the current layout",
        copy: "Capture the equipment, nearby piping, bypass and shutoffs, drain path, outlet, incoming water line, and surrounding clearance without moving or disconnecting anything.",
      },
      {
        title: "Define each treatment goal",
        copy: "Separate whole-home hardness, a specific filtration objective, and kitchen drinking water so every proposed component has a clear job.",
      },
      {
        title: "Review the written scope",
        copy: "Confirm removal, reuse, new plumbing, drainage, power assumptions, equipment placement, service access, exclusions, and current pricing before scheduling.",
      },
    ],
    faqs: [
      {
        question: "Can an existing Elk Grove water softener loop be reused?",
        answer:
          "Possibly, but reuse should be confirmed after the loop’s condition, pipe size, routing, shutoffs, bypass arrangement, drain access, and equipment clearance are reviewed.",
      },
      {
        question: "Do I need to replace a softener with the same type or size?",
        answer:
          "Not automatically. The current household, water source, desired result, flow needs, installation conditions, and service access should be reviewed before new equipment is selected.",
      },
      {
        question: "Which water-quality report applies to an Elk Grove address?",
        answer:
          "Start with the provider named on the property’s current water bill. Elk Grove Water District and Sacramento County Water Agency publish separate reports, and another provider’s report should be used if that provider appears on the bill.",
      },
      {
        question: "Can kitchen reverse osmosis be added during a softener replacement?",
        answer:
          "It can be considered in the same project, but it remains a separate under-sink installation with its own cabinet space, feed, drain, faucet, filter access, and pricing requirements.",
      },
      {
        question: "How do I get current Elk Grove installation pricing?",
        answer:
          "Call (510) 725-5120 with the address, provider, household goals, and photos of existing equipment or the proposed installation areas. Final pricing depends on equipment and project scope.",
      },
    ],
    sources: [
      {
        label: "Elk Grove Water District publications and water-quality reports",
        href: "https://www.egwd.org/publications/",
        note: "Official district page for current Consumer Confidence Reports, public-health-goal reporting, and water-planning documents.",
      },
      {
        label: "Sacramento County Water Agency Consumer Confidence Reports",
        href: "https://waterresources.saccounty.gov/us/en/water-agency/consumer-confidence-report.html",
        note: "Official 2025 reporting page with separate resources for Sacramento County Water Agency service systems, including areas associated with Elk Grove addresses.",
      },
    ],
    serviceSlugs: ["water-softeners", "whole-home-water-filtration", "reverse-osmosis"],
    relatedAreas: ["sacramento", "stockton", "manteca"],
  },
  {
    slug: "merced",
    city: "Merced",
    county: "Merced County",
    title: "Merced Water Report & Home System Planning",
    eyebrow: "Merced water quality and buyer guidance",
    metaTitle: "Merced Water Report & Water Systems | Central Valley Pure Water",
    metaDescription:
      "Start with Merced’s official 2025 water report, then compare softening, whole-home filtration, RO, installed prices, and financing by ZIP.",
    hero:
      "Use the current provider report as a starting point, then separate whole-home hardness, a defined filtration objective, and dedicated kitchen drinking water before choosing equipment.",
    overviewTitle: "Start with the provider report, then plan for the property",
    overview: [
      "The City of Merced publishes an annual Consumer Confidence Report with water-quality and test-result information for its drinking-water system. Its current official page links the Reporting Year 2025 report in English, Spanish, and Hmong. That City report applies only when the current water bill confirms the City of Merced as the supplier; ZIP codes and city names do not establish the provider for every address.",
      "A public utility report gives system-wide context rather than a laboratory result from one home’s faucet. For a useful project plan, identify the household’s actual concern, confirm whether it affects the whole home or only drinking and cooking water, and review the incoming line, drainage, power, equipment clearance, kitchen cabinet, and existing equipment. Those property details and model-specific performance still control the final recommendation.",
      "The free Water Report connects those steps without requiring signup before value: enter a ZIP, confirm the likely supplier, review relevant public records, see a suitable system starting point, add household and bathroom sizing, and view installed pricing and financing availability before optional contact.",
    ],
    highlights: [
      "Current official report link",
      "Provider confirmation first",
      "Whole-home and kitchen paths",
      "Installed prices before contact",
    ],
    helpfulFor: [
      "You recently bought a Merced home and want a clear starting point before comparing equipment.",
      "You see scale or spotting and want to understand whether whole-home softening fits the stated goal.",
      "You want dedicated reverse osmosis for drinking and cooking water considered separately from a main-line system.",
      "You are replacing existing equipment and want the plumbing, drain, bypass, power, and service access reviewed before reuse.",
    ],
    decisions: [
      {
        title: "Provider and source",
        copy: "Confirm the supplier and PWSID on the current bill. Use that provider’s current report rather than assuming the City report applies to every Merced ZIP or nearby property.",
      },
      {
        title: "Whole home or kitchen",
        copy: "Softening and whole-home filtration begin at the incoming line; reverse osmosis is usually a dedicated kitchen drinking-water path. Keep each goal and component explicit.",
      },
      {
        title: "New or replacement",
        copy: "Existing tanks, loops, bypasses, drains, outlets, and cabinet connections should be documented and checked before assuming they can be reused safely or economically.",
      },
    ],
    process: [
      {
        title: "Run the free ZIP lookup",
        copy: "Enter the property ZIP without signing up, then compare the likely supplier with the name and PWSID on the current water bill.",
      },
      {
        title: "Review official context",
        copy: "Read the provider’s current public report and its complete tables. Treat utility-wide findings as context, not a tap-specific test or proof that one system is appropriate.",
      },
      {
        title: "Define and size the path",
        copy: "Separate hardness, whole-home filtration, and kitchen drinking water, then provide household and bathroom counts to see the starting configuration and installed price.",
      },
      {
        title: "Verify before installation",
        copy: "Review financing if useful, then confirm provider, source information, property conditions, final equipment, model-specific performance, installation scope, and exclusions.",
      },
    ],
    faqs: [
      {
        question: "Where can I find the current City of Merced water report?",
        answer:
          "The City’s official Consumer Confidence Report page links its Reporting Year 2025 report in English, Spanish, and Hmong. Confirm that the City of Merced is the provider shown on the current bill before applying that report to the address.",
      },
      {
        question: "Does the City report test the water from my Merced faucet?",
        answer:
          "No. It reports public-system monitoring information. Plumbing and conditions at one property are not established by a utility-wide report, and a tap-specific question may require appropriate property sampling.",
      },
      {
        question: "Is a water softener the same as a whole-home filter?",
        answer:
          "No. A softener is selected around a hardness objective, while whole-home filtration should be selected around a defined filtration objective. Kitchen reverse osmosis is a separate point-of-use drinking-water path.",
      },
      {
        question: "What are the installed water-system prices for Merced homes?",
        answer:
          "The confirmed starting installed prices are Standard $3,495, Standard Plus $3,995, and Dual Tank Full $5,495. Three or more bathrooms plus four or more people selects Dual Tank Full. Final property scope still controls the recommendation.",
      },
      {
        question: "Is financing available for a Merced water system?",
        answer:
          "Yes. Financing is available, with approval, rate, payment, term, and other conditions controlled by the lender. The free Water Report shows the installed-price path before optional contact.",
      },
    ],
    sources: [
      {
        label: "City of Merced Consumer Confidence Report page",
        href: "https://www.cityofmerced.gov/utilities-services/water/water-quality-control/ccr-water-quality-report",
        note: "Official City page linking the Reporting Year 2025 Consumer Confidence Report in English, Spanish, and Hmong, plus archived reports.",
      },
    ],
    serviceSlugs: ["water-softeners", "whole-home-water-filtration", "reverse-osmosis"],
    relatedAreas: ["modesto", "turlock", "manteca"],
  },
];

export const areaPageBySlug = Object.fromEntries(
  areaPages.map((page) => [page.slug, page]),
) as Record<string, AreaPage>;
