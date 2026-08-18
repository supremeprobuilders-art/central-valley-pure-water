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
  serviceSlugs: string[];
  relatedAreas: string[];
};

export const areaPages: AreaPage[] = [
  {
    slug: "modesto",
    city: "Modesto",
    county: "Stanislaus County",
    title: "Water Softener & Reverse Osmosis Installation in Modesto",
    eyebrow: "Modesto water system installation",
    metaTitle: "Water Softener Installation Modesto | Central Valley Pure Water",
    metaDescription:
      "Compare water softeners, whole-home filtration, and reverse osmosis installation in Modesto. Call Central Valley Pure Water for current pricing.",
    hero:
      "Work with a Modesto-based team to separate whole-home hardness, filtration, and kitchen drinking-water goals before choosing equipment.",
    overviewTitle: "A local starting point for better water at home",
    overview: [
      "Central Valley Pure Water is based at 1620 N Carpenter Rd, Suite A5 in Modesto. The location is an office and warehouse by appointment, not a retail showroom. Homeowners can begin by phone so the team can understand the property, water source, and installation conditions before recommending a system.",
      "A water softener, whole-home filter, and under-sink reverse osmosis system serve different purposes. The first useful decision is whether the concern affects water throughout the home, drinking water at the kitchen sink, or both. From there, household demand, main-line access, drainage, power, cabinet space, and service clearance shape the installation plan.",
    ],
    highlights: [
      "Modesto-based team",
      "City and private-well pathways",
      "Whole-home and kitchen options",
      "Current pricing by phone",
    ],
    helpfulFor: [
      "You see mineral spotting or scale and want to discuss whole-home softening.",
      "You want a dedicated reverse osmosis faucet for drinking and cooking water.",
      "You are comparing a softener, filtration, and a complete-home configuration.",
      "You want the plumbing layout reviewed before equipment and pricing are finalized.",
    ],
    decisions: [
      {
        title: "Whole home or kitchen",
        copy: "Hardness treatment starts at the incoming water line, while reverse osmosis is usually planned at the kitchen sink. Define the result you want at each location.",
      },
      {
        title: "City water or private well",
        copy: "Confirm the property source at the start. Private-well recommendations may require current property-specific water information before equipment is selected.",
      },
      {
        title: "Installation access",
        copy: "Main-line location, drainage, power, equipment space, cabinet conditions, and future maintenance access can change the recommended layout and scope.",
      },
    ],
    process: [
      {
        title: "Call the Modesto team",
        copy: "Share the property address, water source, household size, and what you notice in showers, fixtures, laundry, or drinking water.",
      },
      {
        title: "Review the installation",
        copy: "The team considers the incoming water line, equipment location, kitchen cabinet, drainage, power, and any non-standard work.",
      },
      {
        title: "Compare the recommendation",
        copy: "Review what each component is intended to do, the installation scope, current pricing, and financing availability.",
      },
      {
        title: "Schedule and verify",
        copy: "Choose an installation appointment. The completed system is checked and its basic operation and maintenance access are explained.",
      },
    ],
    faqs: [
      {
        question: "Where is Central Valley Pure Water located in Modesto?",
        answer:
          "The office and warehouse is at 1620 N Carpenter Rd, Suite A5, Modesto, CA 95351. It is appointment only and is not a retail showroom.",
      },
      {
        question: "Do you install both water softeners and reverse osmosis systems in Modesto?",
        answer:
          "Yes. Whole-home water softening and under-sink reverse osmosis can be discussed separately or as a coordinated home package, depending on the property and goals.",
      },
      {
        question: "Does a Modesto home need the same system as a nearby private-well property?",
        answer:
          "Not necessarily. City-water and private-well properties follow different planning paths, and private-well treatment should be based on current information for that property.",
      },
      {
        question: "How do I get current Modesto installation pricing?",
        answer:
          "Call (510) 725-5120 with the property location, water source, household needs, and any installation photos or water information you already have.",
      },
    ],
    serviceSlugs: ["water-softeners", "reverse-osmosis", "whole-home-water-filtration"],
    relatedAreas: ["turlock", "manteca"],
  },
  {
    slug: "stockton",
    city: "Stockton",
    county: "San Joaquin County",
    title: "Water Filtration & Softener Installation in Stockton",
    eyebrow: "Stockton whole-home water options",
    metaTitle: "Water Filtration Stockton CA | Central Valley Pure Water",
    metaDescription:
      "Compare whole-home water filtration, softeners, and reverse osmosis installation in Stockton. Call for a source-aware recommendation and pricing.",
    hero:
      "Choose a Stockton water system by separating hardness, whole-home filtration, and drinking-water goals—not by starting with a generic package.",
    overviewTitle: "Match the system to the job it needs to do",
    overview: [
      "Stockton homeowners often compare several categories at once: whole-home water softening, point-of-entry filtration, and reverse osmosis at the kitchen sink. These systems are not interchangeable. A useful proposal should explain which fixtures each component serves and connect every component to a stated household goal.",
      "The property water source also needs to be confirmed rather than assumed. Homes within Stockton and properties outside the urban core can have different source and installation circumstances. Central Valley Pure Water reviews the address, household demand, plumbing access, available space, and the concerns behind the call before presenting equipment and current pricing.",
    ],
    highlights: [
      "Stockton service availability",
      "Source-aware system planning",
      "Whole-home and point-of-use choices",
      "Installation scope explained first",
    ],
    helpfulFor: [
      "You are unsure whether the right starting point is softening or filtration.",
      "You want treatment serving showers, laundry, and fixtures throughout the home.",
      "You want separate drinking-water treatment at the kitchen sink.",
      "You want equipment capacity and installation access considered together.",
    ],
    decisions: [
      {
        title: "Treatment objective",
        copy: "Describe the visible symptom or practical goal first. Hardness, whole-home filtration, and drinking water should remain separate decisions until the plan is clear.",
      },
      {
        title: "Property water source",
        copy: "Confirm whether the address receives municipal water or uses a private well. Do not use utility-wide assumptions as a substitute for property-specific information.",
      },
      {
        title: "Capacity and flow",
        copy: "Household occupancy, simultaneous water use, fixture demand, and available plumbing access help determine a practical whole-home configuration.",
      },
    ],
    process: [
      {
        title: "Describe the Stockton property",
        copy: "Provide the address, source, household size, and whether the priority is hardness, filtration, kitchen drinking water, or a combination.",
      },
      {
        title: "Separate the treatment paths",
        copy: "The team explains which options work at the main line and which are dedicated to a single drinking-water faucet.",
      },
      {
        title: "Confirm site conditions",
        copy: "Photos or an on-site review may be used to evaluate space, drainage, power, plumbing, equipment removal, and unusual work.",
      },
      {
        title: "Review scope and pricing",
        copy: "Compare the proposed equipment, standard installation, exclusions, current pricing, and available next steps before scheduling.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between a Stockton water softener and whole-home filter?",
        answer:
          "A softener is selected primarily for hardness minerals. Whole-home filtration is a broader category selected around a defined filtration objective. A recommendation should explain the purpose of each component.",
      },
      {
        question: "Can reverse osmosis be installed without a whole-home system?",
        answer:
          "Yes. An under-sink reverse osmosis system can be considered as a dedicated drinking-water option even when no whole-home equipment is installed.",
      },
      {
        question: "Do you serve private-well properties near Stockton?",
        answer:
          "Call with the property address and water source to confirm availability. Private-well recommendations begin with current information about that individual property.",
      },
      {
        question: "What can change a Stockton installation quote?",
        answer:
          "Equipment capacity, plumbing access, drainage, electrical needs, trenching, code work, removal, major plumbing changes, and difficult conditions can affect the final scope.",
      },
    ],
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
];

export const areaPageBySlug = Object.fromEntries(
  areaPages.map((page) => [page.slug, page]),
) as Record<string, AreaPage>;
