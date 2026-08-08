export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  overviewTitle: string;
  overview: string[];
  highlights: string[];
  goodFit: string[];
  decisions: { title: string; copy: string }[];
  process: { title: string; copy: string }[];
  faqs: ServiceFaq[];
  related: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "water-softeners",
    title: "Whole-Home Water Softeners",
    shortTitle: "Water Softeners",
    eyebrow: "Hard-water system planning",
    metaTitle: "Water Softener Installation | Central Valley Pure Water",
    metaDescription: "Whole-home water softener guidance and professional installation for Central Valley homes. Call Central Valley Pure Water for current pricing.",
    hero: "Reduce the everyday signs of hard water with a system selected for your household, plumbing layout, and water use.",
    overviewTitle: "A practical whole-home approach to hard water",
    overview: [
      "A water softener is installed on the home’s incoming water line so treated water can reach showers, sinks, laundry, and water-using equipment. The goal is different from drinking-water filtration: a softener is selected primarily to address hardness minerals and the scale, spotting, and cleaning challenges associated with them.",
      "Sizing matters. Household occupancy, estimated demand, available installation space, plumbing access, and the condition of the existing water line all influence the recommendation. Central Valley Pure Water reviews those details before presenting equipment and installation pricing, so the proposal is tied to the home rather than a one-size-fits-all package.",
    ],
    highlights: ["Whole-home treatment", "Household-specific sizing", "Professional installation", "Current pricing by phone"],
    goodFit: [
      "You regularly see white scale or mineral spotting on fixtures and glass.",
      "Soap and cleaning routines feel harder than they should.",
      "You want one system serving the home rather than separate filters at each tap.",
      "You want installation conditions reviewed before choosing equipment.",
    ],
    decisions: [
      { title: "Capacity and demand", copy: "The system should be selected around expected household use instead of a generic equipment label." },
      { title: "Installation location", copy: "Main-line access, drainage, power availability, clearance, and protection from weather can affect the plan." },
      { title: "Ongoing ownership", copy: "Ask how the system regenerates, what routine supplies it uses, and what maintenance access will be needed." },
    ],
    process: [
      { title: "Describe the symptoms", copy: "Tell us what you notice, where it appears, and whether the property uses city or private-well water." },
      { title: "Review the home", copy: "We consider household demand, plumbing access, available space, and installation conditions." },
      { title: "Compare the recommendation", copy: "You receive a clear system and installation proposal with current pricing." },
      { title: "Install and explain", copy: "The system is installed, checked, and explained before the appointment is complete." },
    ],
    faqs: [
      { question: "What does a water softener address?", answer: "A water softener is designed primarily for hardness minerals. Homeowners commonly consider one when they are dealing with scale, mineral spotting, or hard-water cleaning concerns." },
      { question: "Is a softener the same as a drinking-water filter?", answer: "No. Water softening and drinking-water filtration serve different purposes. Many homes pair a whole-home softener with a dedicated reverse osmosis system at the kitchen sink." },
      { question: "How is a softener sized?", answer: "Sizing depends on household demand and water conditions, along with the equipment configuration. We review the home before making a recommendation." },
      { question: "Can I get a price without choosing equipment first?", answer: "Yes. Call and describe your home and goals. We will explain the information needed to prepare current pricing for the system and installation." },
    ],
    related: ["whole-home-water-filtration", "city-water-systems", "reverse-osmosis"],
  },
  {
    slug: "whole-home-water-filtration",
    title: "Whole-Home Water Filtration",
    shortTitle: "Whole-Home Filtration",
    eyebrow: "Treatment at the point of entry",
    metaTitle: "Whole-Home Water Filtration | Central Valley Pure Water",
    metaDescription: "Explore whole-home water filtration planned around your water source, goals, plumbing, and household demand. Call for a Central Valley quote.",
    hero: "Plan a coordinated treatment system for the water entering your home—with equipment chosen around your source and the concerns you want to address.",
    overviewTitle: "Filtration starts with the purpose of the system",
    overview: [
      "Whole-home filtration is a broad category, not a single universal product. Different media and configurations are intended for different water conditions. A useful recommendation begins with the water source, what the household is noticing, and whether the goal concerns the whole house, drinking water, hardness, or a combination of needs.",
      "Central Valley Pure Water separates those decisions so homeowners can understand what each component is intended to do. A complete-home plan may combine whole-home treatment with softening and a dedicated reverse osmosis drinking-water system, but equipment is proposed only after the property and goals are reviewed.",
    ],
    highlights: ["Point-of-entry planning", "City and well pathways", "Coordinated equipment", "Clear installation scope"],
    goodFit: [
      "You want to discuss water concerns affecting more than one fixture.",
      "You are comparing filtration, softening, and drinking-water options.",
      "Your property has a private well and needs a property-specific plan.",
      "You want the equipment layout and maintenance access considered together.",
    ],
    decisions: [
      { title: "Water source", copy: "Municipal and private-well properties begin with different information and should not receive the same default recommendation." },
      { title: "Treatment objective", copy: "Define whether the priority is hardness, taste and odor, sediment, drinking water, or another verified concern." },
      { title: "System sequence", copy: "When multiple components are appropriate, their order, flow requirements, and service access need to work as one installation." },
    ],
    process: [
      { title: "Clarify the goal", copy: "We separate whole-home, hardness, and drinking-water goals before discussing equipment." },
      { title: "Review source and setup", copy: "We consider city or well water, plumbing access, household demand, and installation space." },
      { title: "Build the treatment plan", copy: "The recommendation identifies the role of each proposed component and the installation scope." },
      { title: "Install for serviceability", copy: "Equipment is placed with operation, maintenance access, and the home’s layout in mind." },
    ],
    faqs: [
      { question: "Does every home need the same whole-home filter?", answer: "No. Whole-home filtration should be selected around the water source, verified conditions, household demand, and the result the homeowner wants." },
      { question: "Can filtration and softening be combined?", answer: "They can be part of one coordinated plan when both are appropriate. Each component has a different role, so the proposal should explain why it is included." },
      { question: "Will whole-home filtration replace reverse osmosis?", answer: "Not necessarily. Reverse osmosis is typically a dedicated drinking-water system at one faucet, while whole-home equipment serves water entering the property." },
      { question: "How do I get a recommendation?", answer: "Call with your water source, household needs, and the concerns you are noticing. We will explain the next step and current pricing process." },
    ],
    related: ["water-softeners", "well-water-treatment", "reverse-osmosis"],
  },
  {
    slug: "reverse-osmosis",
    title: "Reverse Osmosis Drinking Water Systems",
    shortTitle: "Reverse Osmosis",
    eyebrow: "Dedicated kitchen drinking water",
    metaTitle: "Reverse Osmosis Systems | Central Valley Pure Water",
    metaDescription: "Under-sink reverse osmosis drinking-water systems with a dedicated faucet and professional installation. Call for Central Valley pricing.",
    hero: "Add a dedicated drinking-water system at the kitchen sink with a clean under-counter installation and an easy-to-use faucet.",
    overviewTitle: "Point-of-use treatment where you fill the glass",
    overview: [
      "A reverse osmosis system is typically installed beneath the kitchen sink and supplies a dedicated drinking-water faucet. This keeps the system focused on water used for drinking and cooking rather than treating every gallon entering the home.",
      "The right setup depends on cabinet space, feed-water connection, drain access, faucet placement, household use, and maintenance access. Central Valley Pure Water reviews those details and explains the proposed configuration before installation. Filter and membrane replacement intervals depend on the equipment and water use, so ownership guidance is part of the conversation.",
    ],
    highlights: ["Under-sink installation", "Dedicated faucet", "Multi-stage treatment", "Maintenance access"],
    goodFit: [
      "You want a dedicated source of drinking and cooking water at the kitchen sink.",
      "You prefer point-of-use treatment rather than sending drinking-water treatment to every fixture.",
      "You want the faucet, tank, tubing, and filter access planned as one installation.",
      "You are considering a complete-home package with both softening and kitchen RO.",
    ],
    decisions: [
      { title: "Cabinet and faucet space", copy: "The system needs practical room for its components, connections, and future filter changes." },
      { title: "Water use", copy: "Household drinking and cooking habits help determine the appropriate configuration and storage approach." },
      { title: "Maintenance plan", copy: "Replacement schedules vary, so the proposal should identify the system-specific filters and access needs." },
    ],
    process: [
      { title: "Review your kitchen", copy: "We confirm sink, cabinet, feed line, drain, and faucet-placement conditions." },
      { title: "Select the configuration", copy: "The recommendation is based on space, expected use, and the equipment layout." },
      { title: "Install the system", copy: "Components and tubing are placed for a clean installation and reasonable service access." },
      { title: "Test and explain", copy: "The installed system is checked and you are shown how it operates and what maintenance to expect." },
    ],
    faqs: [
      { question: "Where is a reverse osmosis system installed?", answer: "Residential RO systems are commonly installed under the kitchen sink and connected to a dedicated faucet for drinking and cooking water." },
      { question: "Does RO soften the entire home?", answer: "No. A kitchen RO system is a point-of-use drinking-water system. Whole-home hardness is addressed separately with a water softener." },
      { question: "Will the system fit under any sink?", answer: "Cabinet space and existing plumbing vary. We review the available space, drain access, and faucet location before confirming the installation plan." },
      { question: "How often are filters replaced?", answer: "Intervals depend on the specific system, water conditions, and use. We explain the applicable maintenance guidance for the equipment proposed." },
    ],
    related: ["water-softeners", "whole-home-water-filtration", "city-water-systems"],
  },
  {
    slug: "city-water-systems",
    title: "City Water Treatment Systems",
    shortTitle: "City Water Systems",
    eyebrow: "Options for municipal-water homes",
    metaTitle: "City Water Systems | Central Valley Pure Water",
    metaDescription: "Water softening, whole-home filtration, and kitchen reverse osmosis options for Central Valley homes on municipal water. Call for pricing.",
    hero: "Choose treatment around the concerns you notice at home while recognizing that municipal water and private wells require different planning paths.",
    overviewTitle: "Start with your household goal—not a generic package",
    overview: [
      "Municipal water is treated by the local supplier before it reaches the property. In-home treatment is therefore a household decision about specific goals such as hardness, mineral spotting, taste or odor preferences, and dedicated drinking water. Those goals may point to a softener, a whole-home filter, reverse osmosis, or a coordinated combination.",
      "Central Valley Pure Water asks what you are noticing, confirms that the property is on city water, and reviews the installation layout before presenting options. The recommendation explains which part of the home each system serves and avoids treating softening, filtration, and reverse osmosis as interchangeable products.",
    ],
    highlights: ["Municipal-water pathway", "Hardness options", "Whole-home choices", "Kitchen RO options"],
    goodFit: [
      "Your home receives water from a municipal utility.",
      "You want to address scale or spotting with a whole-home softener.",
      "You are evaluating filtration for water throughout the home.",
      "You want dedicated drinking water at the kitchen sink.",
    ],
    decisions: [
      { title: "Whole home or one faucet", copy: "Decide whether the goal affects water entering the house or only drinking water at the kitchen sink." },
      { title: "Hardness or filtration", copy: "A softener and a filter do different jobs. The proposal should connect each component to a stated purpose." },
      { title: "Property layout", copy: "Main-line access, drainage, power, cabinet space, and service clearances shape the installation." },
    ],
    process: [
      { title: "Confirm city water", copy: "We establish the water source and discuss the specific issues or preferences behind your call." },
      { title: "Separate the goals", copy: "Hardness, whole-home filtration, and drinking water are evaluated as distinct needs." },
      { title: "Review installation", copy: "We consider the main line, available space, kitchen conditions, and household demand." },
      { title: "Present clear options", copy: "You receive a practical recommendation and current pricing for the selected scope." },
    ],
    faqs: [
      { question: "Is city water the same in every Central Valley community?", answer: "No. Water sources, treatment, distribution, and household plumbing can vary. The homeowner’s goals and property setup still need to be reviewed." },
      { question: "Do I need both a softener and a filter?", answer: "Not automatically. The right equipment depends on whether the goal is hardness reduction, filtration, drinking water, or a combination." },
      { question: "Can I add reverse osmosis without a whole-home system?", answer: "Yes. A dedicated under-sink RO system can be considered separately for drinking and cooking water." },
      { question: "Where can I review my utility’s water information?", answer: "Your municipal supplier’s current consumer confidence or water quality report is the appropriate source for utility-specific information. We can then discuss in-home treatment goals." },
    ],
    related: ["water-softeners", "whole-home-water-filtration", "reverse-osmosis"],
  },
  {
    slug: "well-water-treatment",
    title: "Private Well Water Treatment",
    shortTitle: "Well Water Treatment",
    eyebrow: "Property-specific treatment planning",
    metaTitle: "Well Water Treatment | Central Valley Pure Water",
    metaDescription: "Property-specific private-well water treatment planning for Central Valley homes. Assessment comes before equipment selection. Call for pricing.",
    hero: "Private-well water varies by property. Begin with the source, current information, household concerns, and installation conditions before selecting equipment.",
    overviewTitle: "A well-water system should follow evidence",
    overview: [
      "Private wells are not a single, uniform water source. Conditions can differ between neighboring properties and may change over time. A treatment recommendation should therefore begin with current information about the individual well and a clear description of what the household is experiencing.",
      "Central Valley Pure Water does not treat a private-well customer as a standard city-water installation. We review available testing information, flow and pressure considerations, plumbing access, household demand, equipment space, and the stated treatment goal. When a concern requires laboratory confirmation, testing should come before claims about what equipment is appropriate.",
    ],
    highlights: ["Assessment before equipment", "Property-specific configuration", "Whole-home options", "Serviceable installation plan"],
    goodFit: [
      "Your property relies on a private domestic well.",
      "You have current water information or are prepared to obtain appropriate testing.",
      "You want a recommendation tied to verified conditions rather than a universal package.",
      "You need the treatment equipment planned around the well system and home layout.",
    ],
    decisions: [
      { title: "Current water information", copy: "Use appropriate testing for concerns that cannot be identified reliably by appearance, taste, or odor alone." },
      { title: "Flow and pressure", copy: "Treatment equipment must be considered alongside the home’s expected demand and the well system’s operating conditions." },
      { title: "Equipment sequence", copy: "When more than one treatment step is appropriate, order and service access need to be planned together." },
    ],
    process: [
      { title: "Describe the property", copy: "Share the water source, household demand, well-system basics, and what you are noticing." },
      { title: "Review available evidence", copy: "We consider current testing or explain when additional information is needed before equipment selection." },
      { title: "Plan the system", copy: "The proposal identifies the purpose, order, space, and installation needs of each component." },
      { title: "Install and document", copy: "The completed setup is checked and the homeowner receives operating and maintenance guidance." },
    ],
    faqs: [
      { question: "Can you recommend well-water equipment without testing?", answer: "Some installation and household details can be discussed first, but concerns that depend on water chemistry should be supported by appropriate current testing before a treatment claim is made." },
      { question: "Is there one system for every private well?", answer: "No. Well conditions and property setups vary, so there is no responsible universal package for every private-well home." },
      { question: "Can a well-water plan include softening or RO?", answer: "Those systems may be considered when they match the verified conditions and household goals. They should be part of a property-specific plan rather than assumed automatically." },
      { question: "What should I have ready when I call?", answer: "Share the property location, household size, available water reports, well or pressure-system information you have, and the concerns you want to discuss." },
    ],
    related: ["whole-home-water-filtration", "water-softeners", "reverse-osmosis"],
  },
  {
    slug: "commercial-water-treatment",
    title: "Commercial Water Treatment",
    shortTitle: "Commercial Treatment",
    eyebrow: "Planning for business properties",
    metaTitle: "Commercial Water Treatment | Central Valley Pure Water",
    metaDescription: "Commercial water treatment planning for Central Valley properties, based on use, demand, source, equipment access, and service needs. Call to discuss scope.",
    hero: "Build a water-treatment scope around how the property uses water, peak demand, equipment access, and the operational goal—not a residential package scaled by guesswork.",
    overviewTitle: "Commercial projects need an operating profile",
    overview: [
      "A commercial recommendation starts with the property’s use. Occupancy, fixtures, operating hours, peak flow, water source, available space, drainage, power, and service access can all affect equipment selection. A small office, a tenant space, and a larger facility should not receive the same default configuration.",
      "Central Valley Pure Water begins by defining the treatment objective and the information required to evaluate it. The proposal can then identify equipment, installation responsibilities, exclusions, and maintenance access in a way that owners and property managers can review before scheduling work.",
    ],
    highlights: ["Use-based scoping", "Demand review", "Installation coordination", "Maintenance access"],
    goodFit: [
      "You manage a commercial property with a defined water-treatment objective.",
      "You need equipment considered alongside occupancy, fixtures, and operating hours.",
      "You want a written installation scope with project-specific assumptions.",
      "You need service access and ongoing ownership considered before installation.",
    ],
    decisions: [
      { title: "Use and demand", copy: "Document normal and peak water use, operating schedules, critical fixtures, and expected occupancy." },
      { title: "Site conditions", copy: "Confirm water source, main-line access, footprint, drainage, power, protection, and delivery access." },
      { title: "Ownership plan", copy: "Identify who will monitor supplies, schedule maintenance, and keep equipment accessible after installation." },
    ],
    process: [
      { title: "Define the objective", copy: "The owner or manager explains the property use, problem to solve, and operational requirements." },
      { title: "Collect site information", copy: "We review demand, source, plumbing, utilities, space, access, and any available water information." },
      { title: "Prepare the scope", copy: "The proposal describes equipment, installation assumptions, exclusions, and pricing." },
      { title: "Coordinate installation", copy: "Scheduling and site access are planned to fit the approved commercial scope." },
    ],
    faqs: [
      { question: "What commercial properties do you evaluate?", answer: "Call with the property type, location, water use, and treatment goal. We will confirm whether the project is within our service and equipment scope." },
      { question: "Can you quote from fixture count alone?", answer: "Fixture count helps, but operating hours, peak demand, source, site conditions, and the treatment objective may also be necessary." },
      { question: "Do commercial systems need maintenance planning?", answer: "Yes. Supplies, monitoring, access, and service responsibilities should be considered before equipment placement is finalized." },
      { question: "How do I start a commercial quote?", answer: "Call with the property address, use, point of contact, water source, known demand information, and the result you want the system to support." },
    ],
    related: ["whole-home-water-filtration", "water-softeners", "well-water-treatment"],
  },
];

export const servicePageBySlug = Object.fromEntries(
  servicePages.map((page) => [page.slug, page]),
) as Record<string, ServicePage>;

export const pricingPage: ServicePage = {
  slug: "call-for-pricing",
  title: "Call for Water System Pricing",
  shortTitle: "Call for Pricing",
  eyebrow: "A quote based on your home",
  metaTitle: "Call for Water System Pricing | Central Valley Pure Water",
  metaDescription: "Call Central Valley Pure Water for current water softener, filtration, reverse osmosis, city-water, or well-water system pricing.",
  hero: "Get current pricing tied to the system, installation conditions, and goals for your property—not an equipment-only number that leaves out the scope.",
  overviewTitle: "What goes into a useful water-system quote",
  overview: [
    "Water-treatment pricing depends on what the system is intended to do and what it takes to install it correctly. Equipment type, capacity, plumbing access, drainage, power, available space, existing equipment, and property-specific work can all change the scope.",
    "A short call helps Central Valley Pure Water identify the right next step. Some straightforward projects can be narrowed down quickly; others, particularly private-well and commercial projects, may need additional property or water information before a responsible recommendation can be prepared.",
  ],
  highlights: ["Current system pricing", "Clear installation scope", "Financing available", "No-pressure phone conversation"],
  goodFit: [
    "You want to compare a softener, whole-home system, or kitchen RO option.",
    "You want equipment and standard installation discussed together.",
    "Your private-well property needs an assessment before equipment selection.",
    "You want to understand which conditions may change the final scope.",
  ],
  decisions: [
    { title: "System selection", copy: "Pricing begins with the type, capacity, and configuration appropriate for the stated goal." },
    { title: "Installation conditions", copy: "Main-line access, drainage, electrical needs, trenching, code work, removal, and unusual plumbing can affect price." },
    { title: "Optional financing", copy: "Financing is available for qualified customers and remains subject to lender approval and program terms." },
  ],
  process: [
    { title: "Call the local team", copy: "Tell us the property location, water source, household or business use, and what you are noticing." },
    { title: "Confirm the information", copy: "We identify whether photos, testing, demand details, or an on-site review are needed." },
    { title: "Review the proposal", copy: "The recommendation connects the equipment, installation scope, assumptions, and current pricing." },
    { title: "Choose the next step", copy: "Ask questions, discuss available financing, and schedule only when the scope makes sense to you." },
  ],
  faqs: [
    { question: "Why are fixed prices not listed for every system?", answer: "System capacity, configuration, and installation conditions vary. Current pricing is provided after the relevant property and scope details are understood." },
    { question: "What information should I have when I call?", answer: "Start with the property location, city or private-well source, household or business use, the concern you want to address, and any installation photos or water information already available." },
    { question: "Is financing available?", answer: "Financing is available for qualified customers, subject to lender approval and the applicable program terms." },
    { question: "Does standard installation cover every possible condition?", answer: "No. Permits, electrical work, trenching, code upgrades, equipment removal, major plumbing changes, and difficult site conditions may be outside a standard scope and priced separately." },
  ],
  related: ["water-softeners", "reverse-osmosis", "well-water-treatment"],
};
