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
    title: "Free Tracy Water Report & Installed System Prices",
    eyebrow: "Tracy water quality and hardness by ZIP",
    metaTitle: "Tracy Water Report & Installed Prices | CV Pure Water",
    metaDescription:
      "See Tracy’s 2025 public water report, source-specific hardness context, likely supplier, system path, installed prices, and financing by ZIP—free.",
    hero:
      "Enter a Tracy ZIP to see the likely public-water supplier, dated City monitoring context, a suitable system path, and installed pricing before any optional contact.",
    overviewTitle: "Why Tracy’s changing water sources matter for a home-system plan",
    overview: [
      "The City of Tracy’s 2025 Water Quality Report says its supply came primarily from two treated surface-water sources, with smaller groundwater and aquifer-storage contributions. The report lists approximately 39% from the Delta-Mendota Canal, 56% from the Stanislaus River, 5% from groundwater, and 0.15% from aquifer storage and recovery. Because sources can blend and change, one citywide number cannot predict conditions at one address.",
      "The City’s secondary-standards table shows why hardness should be read by source. It lists total hardness of 31.0 mg/L for South San Joaquin Irrigation District treated surface water and a 264 mg/L well-water average, with a 58–390 mg/L well range. Those public utility figures can help frame scale and spotting questions, but they are not a laboratory test of water from your tap and do not establish the correct equipment by themselves.",
      "The report says water delivered from January 1 through December 31, 2025 met the applicable state and federal drinking-water requirements. That compliance statement and the hardness table answer different questions: regulatory compliance does not make hardness uniform, and hardness is not a reason to imply that every Tracy home needs the same system. Confirm the provider and current report, then verify the property, household demand, installation conditions, and model-specific performance.",
    ],
    highlights: [
      "Free report before signup",
      "2025 City sources explained",
      "Source-specific hardness context",
      "All installed prices visible",
    ],
    helpfulFor: [
      "You see scale or spotting and want to understand why Tracy’s reported hardness varies by source.",
      "You are searching what is in Tracy tap water and want the current City report summarized in plain English.",
      "You want to compare whole-home hardness treatment with dedicated kitchen reverse osmosis without treating them as the same job.",
      "You want installed pricing and financing availability before speaking with a sales representative.",
    ],
    decisions: [
      {
        title: "Confirm the provider",
        copy: "Start with the supplier and PWSID on the current bill. ZIP boundaries, city limits, utility service areas, and private-well properties do not always align.",
      },
      {
        title: "Separate hardness from drinking water",
        copy: "A whole-home softener and a dedicated kitchen reverse-osmosis system serve different purposes. Any recommended component should be tied to the stated goal without promising universal contaminant removal.",
      },
      {
        title: "Size and verify the property",
        copy: "Household size, bathrooms, main-line access, drainage, power, cabinet space, source conditions, and model-specific performance control the final equipment and scope.",
      },
    ],
    process: [
      {
        title: "Enter a Tracy ZIP",
        copy: "Start the free Water Report without creating an account. The lookup shows the likely supplier and asks you to confirm it against the current bill.",
      },
      {
        title: "Review the public record",
        copy: "See dated utility context in plain English, including source-specific hardness, while keeping the City’s complete report and qualifications available as the controlling source.",
      },
      {
        title: "Size the starting system",
        copy: "Choose household size and bathrooms to see Standard $3,495, Standard Plus $3,995, or Dual Tank Full $5,495 installed. Three or more bathrooms plus four or more people selects Dual Tank.",
      },
      {
        title: "Choose the next step",
        copy: "Review financing availability, call, text, or optionally share contact details after receiving the report and price. Lender terms control financing; property verification controls the final scope.",
      },
    ],
    faqs: [
      {
        question: "Is the Tracy Water Report free and available without signup?",
        answer:
          "Yes. Enter a California city or ZIP to see the likely public-water supplier, public-record context, a suitable system starting point, installed pricing, and financing availability before any optional contact request.",
      },
      {
        question: "What does Tracy’s 2025 water report say about its supply?",
        answer:
          "The City report lists approximately 39% Delta-Mendota Canal water, 56% Stanislaus River water, 5% groundwater, and 0.15% aquifer-storage supply for 2025. Source blending can vary, so confirm the provider and current utility information for the address.",
      },
      {
        question: "How hard is Tracy water?",
        answer:
          "The City’s 2025 table lists total hardness of 31.0 mg/L for South San Joaquin Irrigation District treated surface water and a 264 mg/L average for well water, with a 58–390 mg/L well range. That source-specific utility context is not a tap measurement and does not predict every Tracy address.",
      },
      {
        question: "Does the 2025 City report mean every Tracy home needs a water softener?",
        answer:
          "No. The report says the City’s delivered water met applicable drinking-water requirements and separately shows wide hardness differences by source. The homeowner’s provider, actual source conditions, goals, household demand, property layout, and model-specific performance still control the recommendation.",
      },
      {
        question: "Is this a laboratory test of my Tracy tap water?",
        answer:
          "No. It is a plain-English summary of public utility monitoring records. A tap-specific concern may require appropriate property sampling, and the final recommendation still requires provider, current-source, property, installation, and model-performance confirmation.",
      },
      {
        question: "What are the installed water-system prices in Tracy?",
        answer:
          "The confirmed installed prices are Standard $3,495, Standard Plus $3,995, and Dual Tank Full $5,495. Three or more bathrooms plus four or more people selects Dual Tank. Final scope depends on property verification, and financing is available subject to lender terms.",
      },
    ],
    sources: [
      {
        label: "City of Tracy 2025 Water Quality Report",
        href: "https://www.cityoftracy.org/files/assets/city/v/2/public-works/documents/utilities/water-quality/532-26a-tracy-2025-ccr.pdf",
        note: "The City’s current Consumer Confidence Report, created May 29, 2026, with 2025 source, compliance, and hardness tables.",
      },
      {
        label: "City of Tracy Water Quality & Supply",
        href: "https://www.cityoftracy.org/Departments/Public-Works/Water-Sewer-Stormwater/Water-Quality-Supply",
        note: "The City’s official report index and current water-quality, source, and supply resources.",
      },
    ],
    report: {
      zip: "95376",
      modified: "2026-08-31",
      reviewed: "Official 2025 City report, reviewed August 31, 2026",
      title: "A source-specific snapshot—not a test from your faucet",
      intro:
        "The City’s annual report combines treated surface-water and well-water information. These selected facts help explain why a provider and source check matters before choosing between kitchen RO, whole-home softening, or another path.",
      facts: [
        {
          value: "39% / 56%",
          label: "Two main surface sources",
          copy: "The City lists 39% from the Delta-Mendota Canal and 56% from the Stanislaus River in 2025, plus smaller groundwater and aquifer-storage contributions.",
        },
        {
          value: "31 / 264 mg/L",
          label: "Source-specific hardness",
          copy: "The table lists 31.0 mg/L for one treated surface-water source and a 264 mg/L well-water average, with wells ranging from 58 to 390 mg/L.",
        },
        {
          value: "Standards met",
          label: "2025 City compliance statement",
          copy: "The City says water delivered from January 1 through December 31, 2025 met applicable state and federal drinking-water requirements.",
        },
      ],
      limitation:
        "These are selected City utility facts, not a laboratory result for one faucet. Confirm the provider and current source; property details, household sizing, installation conditions, and model-specific performance still control the final recommendation.",
    },
    serviceSlugs: ["reverse-osmosis", "water-softeners", "whole-home-water-filtration"],
    relatedAreas: ["manteca", "stockton"],
  },
  {
    slug: "manteca",
    city: "Manteca",
    county: "San Joaquin County",
    title: "Free Manteca Water Report & Installed System Prices",
    eyebrow: "Manteca water quality by ZIP code",
    metaTitle: "Manteca Water Report & Installed Prices | CV Pure Water",
    metaDescription:
      "Check the likely Manteca water provider, current public-system context, system path, installed prices, and financing by ZIP—free, with no signup.",
    hero:
      "Enter a Manteca ZIP to see the likely public-water supplier, current official source context, a suitable complete-home path, and installed pricing before any optional contact.",
    overviewTitle: "Start with Manteca’s provider and mixed water sources",
    overview: [
      "California Drinking Water Watch identifies Manteca, City of as active public water system CA3910005. The State record lists purchased treated surface water from South San Joaquin Irrigation District alongside multiple active City wells. Confirm that provider name and PWSID on the current bill because ZIP codes and water-service boundaries are not authoritative utility boundaries.",
      "The City’s current Utilities Department page describes its supply as approximately 50% City groundwater and 50% purchased surface water from the South County Water Supply Project. The City’s Water System page says the system currently includes 17 groundwater wells and distributes water through approximately 330 miles of pipeline. Those system-level facts explain why one unsupported Manteca-wide hardness or contaminant number would be misleading.",
      "This free Water Report summarizes selected public records; it is not a laboratory test of water from your tap. Confirm the provider and current official report before relying on the summary. Property plumbing and goals, household and bathroom sizing, installation conditions, and model-specific performance still control the final recommendation.",
    ],
    highlights: [
      "Provider and PWSID first",
      "Mixed-source context explained",
      "All installed prices visible",
      "Financing available",
    ],
    helpfulFor: [
      "You are searching for a Manteca water report and want to confirm which public system serves the address.",
      "You see scale or spotting and want a responsible whole-home path without relying on an invented citywide hardness number.",
      "You want to separate whole-home softening or filtration from dedicated reverse osmosis for drinking and cooking.",
      "You want installed pricing and financing availability before speaking with a sales representative.",
    ],
    decisions: [
      {
        title: "Confirm the public system",
        copy: "Check the current bill for Manteca, City of and PWSID CA3910005. A nearby address, ZIP, or city name alone cannot prove which provider record controls.",
      },
      {
        title: "Separate the treatment goals",
        copy: "Softening, whole-home filtration, and kitchen reverse osmosis perform different jobs. Match each proposed component to a defined concern without claiming universal contaminant removal.",
      },
      {
        title: "Size and verify the property",
        copy: "Household size, bathrooms, main-line access, drainage, power, cabinet space, current source information, and model-specific performance shape the final equipment and installation scope.",
      },
    ],
    process: [
      {
        title: "Enter a Manteca ZIP",
        copy: "Start the free report without an account. The lookup shows a likely supplier and asks you to confirm it against the current water bill.",
      },
      {
        title: "Review current public context",
        copy: "See the PWSID, mixed groundwater and purchased-surface-water context, and official source links in plain English. Public system records do not predict one faucet.",
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
        question: "Who provides water to my Manteca address?",
        answer:
          "California Drinking Water Watch lists Manteca, City of as active public water system CA3910005. Confirm the provider and PWSID on the current bill because a ZIP code is only a starting point.",
      },
      {
        question: "Where does Manteca’s public water come from?",
        answer:
          "The City’s current Utilities Department page says approximately half comes from City groundwater wells and half is purchased surface water from the South County Water Supply Project. Source proportions and distribution conditions can change, so review the current City source and bill.",
      },
      {
        question: "How hard is Manteca water?",
        answer:
          "The current official pages used here establish a mixed groundwater and treated-surface-water system but do not support one address-specific hardness number. Confirm the provider, review its current report, and use appropriate property information before sizing hardness treatment.",
      },
      {
        question: "Is this a laboratory test of my Manteca tap water?",
        answer:
          "No. It is a plain-English summary of selected public utility and regulator records. A tap-specific question may require appropriate property sampling, and final equipment still requires provider, source, property, installation, and model-performance confirmation.",
      },
      {
        question: "What are the installed water-system prices in Manteca?",
        answer:
          "The confirmed starting installed prices are Standard $3,495, Standard Plus $3,995, and Dual Tank Full $5,495. Three or more bathrooms plus four or more people selects Dual Tank Full. Property conditions and final scope still control the final recommendation.",
      },
      {
        question: "Is financing available for a Manteca water system?",
        answer:
          "Yes. Financing is available after you see the installed-price path. Approval, payment, rate, term, and other conditions are determined by the lender.",
      },
    ],
    sources: [
      {
        label: "California Drinking Water Watch — Manteca, City of",
        href: "https://sdwis.waterboards.ca.gov/PDWW/JSP/WaterSystemDetail.jsp?tinwsys_is_number=4019&tinwsys_st_code=CA",
        note: "Official State Water Board system record for active PWSID CA3910005, including service population, active groundwater facilities, and purchased treated surface water.",
      },
      {
        label: "City of Manteca Utilities Department",
        href: "https://www.manteca.gov/415/Utilities-Department",
        note: "Current City overview of Manteca’s approximate groundwater and purchased-surface-water supply split and South County Water Supply Project source.",
      },
      {
        label: "City of Manteca Water System",
        href: "https://www.manteca.gov/263/Water-System",
        note: "Official system overview with current well and distribution context plus the City’s June 2026 final 2025 Urban Water Management Plan.",
      },
    ],
    report: {
      zip: "95337",
      modified: "2026-09-01",
      reviewed: "Official City and State records reviewed September 1, 2026",
      title: "A provider-first starting point for a Manteca address",
      intro:
        "Use current City and State records to confirm the public system and understand the mixed-source context, then continue to household sizing, installed price, financing, and optional contact.",
      facts: [
        {
          value: "CA3910005",
          label: "Active public-water system",
          copy: "California Drinking Water Watch identifies Manteca, City of as the active public system. Confirm the provider name and PWSID on the current bill.",
        },
        {
          value: "~50% / ~50%",
          label: "City’s current source overview",
          copy: "The City describes an approximate split between City groundwater wells and purchased surface water from the South County Water Supply Project.",
        },
        {
          value: "17 wells",
          label: "Current City system context",
          copy: "The City’s Water System page says the municipal system currently includes 17 groundwater wells and approximately 330 miles of distribution pipeline.",
        },
        {
          value: "Confirm first",
          label: "Address-level report rule",
          copy: "A ZIP can suggest a provider, but the current bill and PWSID determine which official report should be used for the property.",
        },
      ],
      limitation:
        "These are selected public-system facts, not a laboratory result for one faucet. Provider confirmation, the current official source, property plumbing and goals, household sizing, installation conditions, and model-specific performance still control the final recommendation.",
    },
    serviceSlugs: ["water-softeners", "whole-home-water-filtration", "reverse-osmosis"],
    relatedAreas: ["stockton", "tracy", "modesto"],
  },
  {
    slug: "turlock",
    city: "Turlock",
    county: "Stanislaus County",
    title: "Free Turlock Water Report & Installed System Prices",
    eyebrow: "Turlock water quality by ZIP code",
    metaTitle: "Turlock Water Report & Installed Prices | CV Pure Water",
    metaDescription:
      "Check the likely Turlock water provider, current public-system context, city-versus-well path, installed prices, and financing by ZIP—free.",
    hero:
      "Enter a Turlock ZIP to see the likely public-water supplier, current official system context, the municipal-versus-private-well path, and installed pricing before any optional contact.",
    overviewTitle: "Confirm Turlock city water or a private well first",
    overview: [
      "California Drinking Water Watch identifies Turlock, City of as active public water system CA5010019. The current State record lists purchased treated surface water from the Stanislaus Regional Water Authority alongside active City wells. Confirm the provider and PWSID on the current bill because a city name or ZIP code does not prove which utility record controls an address.",
      "The State facilities listing shows 14 active well facilities plus purchased treated surface water. That mixed-source context is useful, but it does not support applying one citywide hardness or contaminant number to every Turlock home. The State monitoring-results page also cautions that source results may not represent water served because sources can be unused, treated, or blended.",
      "A private well follows a separate, property-specific path; the City’s public-system record does not describe it. Appropriate current testing, flow and pressure, household demand, plumbing, equipment space, and the concern being evaluated should guide any well-water recommendation.",
      "This free Water Report summarizes selected public records; it is not a laboratory test of water from your tap. Provider confirmation, current source review, property details, household and bathroom sizing, installation conditions, and model-specific performance still control the final recommendation.",
    ],
    highlights: [
      "Provider and PWSID first",
      "Municipal and well paths separated",
      "All installed prices visible",
      "Financing available",
    ],
    helpfulFor: [
      "You are searching for a Turlock water report and want to confirm which public system serves the address.",
      "You see scale or spotting and want a responsible whole-home path without relying on one unsupported citywide hardness number.",
      "Your property uses a private well and you want current testing and property conditions reviewed before equipment selection.",
      "You want installed pricing and financing availability before speaking with a sales representative.",
    ],
    decisions: [
      {
        title: "Confirm municipal or private well",
        copy: "Check the current bill for Turlock, City of and PWSID CA5010019, or establish that the property uses a private well. The controlling evidence and responsible treatment path differ.",
      },
      {
        title: "Use current evidence",
        copy: "Review the current provider report for municipal water. Private-well concerns that depend on water chemistry should be supported by appropriate current property testing before a treatment claim is made.",
      },
      {
        title: "Size and verify the property",
        copy: "Household size, bathrooms, flow and pressure, plumbing, drainage, power, footprint, maintenance access, current source information, and model-specific performance shape the final configuration.",
      },
    ],
    process: [
      {
        title: "Enter a Turlock ZIP",
        copy: "Start the free report without an account. The lookup shows a likely supplier and asks you to confirm municipal service or a private well.",
      },
      {
        title: "Review the controlling evidence",
        copy: "For City water, confirm the PWSID and review current public records. For a private well, use appropriate current property testing and well-system information.",
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
        question: "Who provides water to my Turlock address?",
        answer:
          "California Drinking Water Watch lists Turlock, City of as active public water system CA5010019. Confirm the provider and PWSID on the current bill because a ZIP code is only a starting point and some properties use private wells.",
      },
      {
        question: "Where does Turlock’s public water come from?",
        answer:
          "The current State system and facilities records list purchased treated surface water from the Stanislaus Regional Water Authority plus multiple active City wells. Sources can be treated and blended, so confirm the provider and current report instead of assuming one source for every address.",
      },
      {
        question: "Is a 2025 Turlock Consumer Confidence Report available in the State database?",
        answer:
          "The current California Drinking Water Watch CCR page marks the 2025 report and certification as not available. This page therefore uses the current State system record and the City’s annual-report index without inventing a 2025 monitoring summary. Confirm the latest report directly with the provider.",
      },
      {
        question: "Does the Turlock public-water report apply to a private well?",
        answer:
          "No. A private well is property-specific and is not represented by the City public-system record. Appropriate current testing plus well, pressure, flow, household, plumbing, and installation details should guide the recommendation.",
      },
      {
        question: "What are the installed water-system prices in Turlock?",
        answer:
          "The confirmed starting installed prices are Standard $3,495, Standard Plus $3,995, and Dual Tank Full $5,495. Three or more bathrooms plus four or more people selects Dual Tank Full. Current source, property conditions, and final scope still control the recommendation.",
      },
      {
        question: "Is financing available for a Turlock water system?",
        answer:
          "Yes. Financing is available after you see the installed-price path. Approval, payment, rate, term, and other conditions are determined by the lender.",
      },
    ],
    sources: [
      {
        label: "California Drinking Water Watch — Turlock, City of",
        href: "https://sdwis.waterboards.ca.gov/PDWW/JSP/WaterSystemDetail.jsp?tinwsys_is_number=5565&tinwsys_st_code=CA",
        note: "Official State Water Board record for active PWSID CA5010019, including purchased treated surface water and active groundwater facilities.",
      },
      {
        label: "City of Turlock Water Quality Annual Reports",
        href: "https://www.cityofturlock.org/watersewergarbageservice/waterquality/waterqualityannualreport.asp",
        note: "Official City index for annual public water-quality reports and provider information.",
      },
      {
        label: "California Drinking Water Watch — 2025 CCR status",
        href: "https://sdwis.waterboards.ca.gov/PDWW/JSP/CCR.jsp?Year=2025&tinwsys_is_number=5565&tinwsys_st_code=CA",
        note: "Official State CCR index currently marking the 2025 report and certification as not available.",
      },
      {
        label: "California Drinking Water Watch — facilities",
        href: "https://sdwis.waterboards.ca.gov/PDWW/JSP/WaterSystemFacilities.jsp?tinwsys_is_number=5565&tinwsys_st_code=CA",
        note: "Current State listing of 14 active City well facilities plus purchased treated surface water from the Stanislaus Regional Water Authority.",
      },
    ],
    report: {
      zip: "95380",
      modified: "2026-09-02",
      reviewed: "Official City and State records reviewed September 2, 2026",
      title: "A source-aware starting point for a Turlock property",
      intro:
        "Confirm City water or a private well first, use the controlling current evidence, then continue to household sizing, installed price, financing, and optional contact.",
      facts: [
        {
          value: "CA5010019",
          label: "Active public-water system",
          copy: "California Drinking Water Watch identifies Turlock, City of as the active public system. Confirm the provider name and PWSID on the current bill.",
        },
        {
          value: "2 source paths",
          label: "Mixed municipal supply",
          copy: "The current State record lists purchased treated surface water from the Stanislaus Regional Water Authority plus active City wells.",
        },
        {
          value: "14 active wells",
          label: "Current State facilities listing",
          copy: "The facilities record lists 14 active City well facilities. Sources may be treated or blended, so this count is system context—not an address-specific water result.",
        },
        {
          value: "No 2025 file",
          label: "Current State CCR status",
          copy: "The State CCR page currently marks the 2025 report and certification as not available, so no unsupported 2025 monitoring claims are presented here.",
        },
      ],
      limitation:
        "These are selected public-system facts, not a laboratory result for one faucet. A private well requires separate property evidence. Provider confirmation, current source review, property details, household sizing, installation conditions, and model-specific performance still control the final recommendation.",
    },
    serviceSlugs: ["well-water-treatment", "city-water-systems", "water-softeners"],
    relatedAreas: ["modesto", "manteca", "merced"],
  },
  {
    slug: "sacramento",
    city: "Sacramento",
    county: "Sacramento County",
    title: "Free Sacramento Water Report & Installed System Prices",
    eyebrow: "Sacramento water quality by ZIP code",
    metaTitle: "Sacramento Water Report & Installed Prices | CV Pure Water",
    metaDescription:
      "Check the likely Sacramento water provider, 2025 City hardness context, installed system prices, and financing by ZIP—free, with no signup.",
    hero:
      "Enter a Sacramento ZIP to see the likely public-water supplier, a plain-English public-record summary, a suitable system path, and installed pricing before any optional contact.",
    overviewTitle: "Start with the Sacramento provider—not a citywide assumption",
    overview: [
      "Sacramento does not have one water provider or annual report that applies to every address. The City’s official water-purveyor map shows City of Sacramento Water alongside Sacramento County Water Agency, Sacramento Suburban Water District, California American Water, Golden State Water Company, and smaller systems. Use the ZIP lookup as a starting point, then confirm the provider and PWSID on the current bill.",
      "For an address served by City of Sacramento Main, California Drinking Water Watch identifies active public water system CA3410020. The City’s current Consumer Confidence Report was published June 1, 2026 and covers 2025 results. It says City-supplied water met or exceeded federal and state drinking-water standards and describes a supply drawn about 80% from the American and Sacramento rivers and about 20% from groundwater wells.",
      "The report lists a 2023–2025 system-average hardness of 83 mg/L as calcium carbonate, or 4.9 grains per gallon. Its source columns differ: 34 mg/L at the E.A. Fairbairn plant, 63 mg/L at the Sacramento River plant, and 15–154 mg/L across City groundwater. That range is public-system context—not a prediction for one faucet or a reason to prescribe the same equipment to every home.",
      "This free Water Report summarizes selected public records; it is not a laboratory test of water from your tap. Provider confirmation, the current official source, property plumbing and goals, household and bathroom sizing, installation conditions, and model-specific performance still control the final recommendation.",
    ],
    highlights: [
      "Provider and PWSID first",
      "2025 City records explained",
      "All installed prices visible",
      "Financing available",
    ],
    helpfulFor: [
      "You are searching for a Sacramento water report and want to confirm which public system serves the address.",
      "You notice spotting or scale and want to compare the City report’s source-specific hardness context with a whole-home softening path.",
      "You want to separate whole-home softening or filtration from dedicated reverse osmosis for drinking and cooking water.",
      "You want confirmed installed pricing and financing availability before speaking with a sales representative.",
    ],
    decisions: [
      {
        title: "Confirm the provider",
        copy: "Use the water bill and service address to identify the utility and PWSID. Read that provider’s current water-quality report instead of applying City of Sacramento data to every property in the region.",
      },
      {
        title: "Separate the treatment goals",
        copy: "Hardness reduction, a defined whole-home filtration objective, and dedicated drinking water are separate jobs. Match every proposed component to a stated concern without claiming universal contaminant removal.",
      },
      {
        title: "Size and verify the property",
        copy: "Household size, bathrooms, main-line access, pipe size, drainage, power, equipment clearance, kitchen cabinet space, current source information, and model-specific performance shape the final scope.",
      },
    ],
    process: [
      {
        title: "Enter a Sacramento ZIP",
        copy: "Start the free report without an account. The lookup shows a likely supplier and asks you to confirm it against the current water bill.",
      },
      {
        title: "Review current public context",
        copy: "See the provider, PWSID, dated source and hardness context, and official links in plain English. Public-system records do not predict one faucet.",
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
        question: "Who provides water to my Sacramento address?",
        answer:
          "The official purveyor map shows several systems in and around Sacramento. California Drinking Water Watch lists City of Sacramento Main as active public water system CA3410020, but the provider and PWSID on the current bill control which report applies to the property.",
      },
      {
        question: "What does Sacramento’s current City water report say?",
        answer:
          "The report published June 1, 2026 covers 2025 results, says City-supplied water met or exceeded federal and state drinking-water standards, and describes an approximate 80% river-water and 20% groundwater supply. Review the complete official report for all tables and qualifications.",
      },
      {
        question: "How hard is City of Sacramento water?",
        answer:
          "The City’s 2025 report lists a 2023–2025 system average of 83 mg/L as calcium carbonate, or 4.9 grains per gallon. Source values range from 34 and 63 mg/L at the two river-water plants to 15–154 mg/L across groundwater, so the average does not establish one address-specific result.",
      },
      {
        question: "Is this a laboratory test of my Sacramento tap water?",
        answer:
          "No. It is a plain-English summary of selected public utility records. A tap-specific question may require appropriate property sampling, and final equipment still requires provider, source, property, installation, household-sizing, and model-performance confirmation.",
      },
      {
        question: "What are the installed water-system prices in Sacramento?",
        answer:
          "The confirmed starting installed prices are Standard $3,495, Standard Plus $3,995, and Dual Tank Full $5,495. Three or more bathrooms plus four or more people selects Dual Tank Full. Property conditions and final scope still control the final recommendation.",
      },
      {
        question: "Is financing available for a Sacramento water system?",
        answer:
          "Yes. Financing is available after you see the installed-price path. Approval, payment, rate, term, and other conditions are determined by the lender.",
      },
    ],
    sources: [
      {
        label: "City of Sacramento 2025 Consumer Confidence Report",
        href: "https://www.cityofsacramento.gov/utilities/water-quality/consumer-confidence-report",
        note: "Published June 1, 2026; includes the City’s 2025 monitoring results, source summary, compliance statement, and source-specific hardness table.",
      },
      {
        label: "California Drinking Water Watch — City of Sacramento Main",
        href: "https://sdwis.waterboards.ca.gov/PDWW/JSP/WaterSystemDetail.jsp?tinwsys_is_number=3627&tinwsys_st_code=CA",
        note: "Official State Water Board record for active public water system CA3410020 and its current system classification.",
      },
      {
        label: "City of Sacramento Water Purveyor Map",
        href: "https://www.cityofsacramento.gov/content/dam/portal/dou/utilities/development-standards/Water_Purveyor_Map.pdf",
        note: "Official map showing why the provider must be confirmed at the address rather than inferred from the city or county name alone.",
      },
    ],
    report: {
      zip: "95814",
      modified: "2026-09-04",
      reviewed: "Official City and State records reviewed September 4, 2026",
      title: "A provider-first starting point for a Sacramento address",
      intro:
        "Confirm the provider and current report, then use the City record as applicable context before continuing to household sizing, installed price, financing, and optional contact.",
      facts: [
        {
          value: "CA3410020",
          label: "City public-water system",
          copy: "California Drinking Water Watch identifies City of Sacramento Main as an active system. Confirm this provider and PWSID on the current bill.",
        },
        {
          value: "80% / 20%",
          label: "Approximate City source mix",
          copy: "The 2025 report says about 80% comes from the American and Sacramento rivers and about 20% comes from groundwater wells.",
        },
        {
          value: "83 mg/L",
          label: "System-average hardness",
          copy: "The 2023–2025 average equals 4.9 grains per gallon. Reported source values differ, so one address may not match the average.",
        },
        {
          value: "Standards met",
          label: "2025 City compliance statement",
          copy: "The City says its supplied water met or exceeded federal and state drinking-water standards; that does not select one universal in-home system.",
        },
      ],
      limitation:
        "These are selected City public-system facts, not a laboratory result for one faucet. Provider confirmation, the current official source, property plumbing and goals, household sizing, installation conditions, and model-specific performance still control the final recommendation.",
    },
    serviceSlugs: ["water-softeners", "whole-home-water-filtration", "reverse-osmosis"],
    relatedAreas: ["elk-grove", "stockton", "modesto"],
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
