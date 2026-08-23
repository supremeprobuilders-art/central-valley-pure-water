# Central Valley Pure Water — Daily SEO Runbook

Last updated: 2026-08-23

This file is the persistent operating brief for the daily 8:00 AM Central Valley Pure Water SEO workflow. GitHub `main` and the production site are the source of truth.

## Primary objective

Increase qualified calls to `(510) 725-5120` by building trustworthy organic visibility for Central Valley water-treatment searches and the no-signup **Free California Water Check**.

The checker is a statewide California public-record utility. Central Valley Pure Water's sales and installation claims must remain limited to the confirmed service area. Do not imply statewide installation coverage merely because the checker accepts California ZIP codes.

## Required Free Water Check work in every daily run

### 1. Production QA before promotion

Verify the following on `https://www.cvpurewater.com` before publishing content or sending the report:

- Homepage loads and visibly links to `/water-check`.
- `/water-check` returns HTTP 200 and retains its canonical URL.
- A valid California ZIP returns likely public water systems.
- The strongest ZIP-area provider is selected automatically; the homeowner can still change the provider when the current bill shows a different system.
- A ZIP with overlapping systems allows provider selection.
- The selected provider loads recent official monitoring records, sampling context, California health-goal comparisons where compatible, separate listed-MCL context, and a treatment starting point.
- Every displayed `X times` health comparison is calculated from the selected public monitoring result divided by the compatible California OEHHA Public Health Goal. Never hard-code a dramatic multiplier.
- The private-well path remains available and does not use public-system records as a substitute for property testing.
- An out-of-state ZIP is rejected with a clear California-only message.
- The Standard / Plus / Dual Tank quote path remains usable. Do not auto-assign Plus or Dual Tank from ZIP alone; household demand and installation details are required for final sizing.
- Phone links use `(510) 725-5120` and `tel:+15107255120`.
- Mobile navigation, ZIP input, provider card, large comparison metric, analyte rows, treatment CTA, quote controls, and sticky call action remain usable.
- `/sitemap.xml` includes `/water-check`; `/robots.txt` points to the canonical sitemap.
- Production runtime logs contain no new checker errors.

If a material production problem is found, fix and redeploy it before promoting the tool or describing the run as complete.

### 2. Modesto-first statewide QA and SEO expansion

The checker itself supports California ZIP codes statewide. QA, supporting content, and organic promotion should expand outward from Modesto rather than attempting to mass-publish every ZIP at once.

Priority ring 1 — Modesto / Stanislaus County:

- Modesto: `95350`, `95351`, `95354`, `95355`, `95356`, `95357`, `95358`
- Ceres: `95307`
- Riverbank: `95367`
- Oakdale: `95361`
- Turlock: `95380`, `95382`
- Patterson: `95363`

Priority ring 2 — San Joaquin / Tracy corridor:

- Stockton: `95202`, `95207`
- Manteca: `95336`, `95337`
- Ripon: `95366`
- Lathrop: `95330`
- Tracy: `95376`, `95377`, `95391`
- Lodi: `95240`

Priority ring 3 — Sacramento / Elk Grove:

- Sacramento: `95814`, `95823`, `95828`
- Elk Grove: `95624`, `95758`
- Galt: `95632`

Priority ring 4 — Bay Area public-tool reach:

- Pleasanton: `94566`
- Livermore: `94550`
- Fremont: `94536`
- San Jose: `95112`
- Walnut Creek: `94596`
- Oakland: `94607`
- San Francisco: `94103`

Priority ring 5 — Fresno through Bakersfield public-tool reach:

- Fresno: `93721`
- Clovis: `93612`
- Bakersfield: `93301`, `93304`, `93309`

Each ring is a QA and SEO-priority list, not a claim that every ZIP is inside the installation service area. The dynamic checker should continue accepting all California ZIP codes.

### 3. Search-intent research

Monitor and expand original content around high-intent searches such as:

- California water quality by ZIP code
- water contaminants by ZIP code
- what is in my tap water
- local water quality report
- public water system ID / PWSID lookup
- how to read a Consumer Confidence Report
- California Public Health Goal versus MCL
- arsenic in Modesto water
- chromium-6 in Central Valley water
- PFAS in California drinking water
- city water quality report
- hard water by city
- water softener versus reverse osmosis
- city water versus private well
- Modesto, Stockton, Tracy, Manteca, Turlock, Sacramento, Elk Grove, Merced, Fresno, and Bakersfield water quality

Use current search evidence and official local sources. Do not create pages solely to increase page count.

### 4. Content and internal-linking requirements

- Add contextual links to `/water-check` from relevant city, service, educational, area-hub, and call-for-pricing pages.
- Use clear calls to action such as **Check Your Water Free**, **See Your Water Report**, or **See the Math for Your ZIP**.
- Keep the homepage phone-first. The checker supports the call conversion; it does not replace the primary phone CTA.
- Publish provider- or city-level resources only when they include substantial original interpretation, current official sources, and a useful homeowner decision path.
- Do not mass-publish thin ZIP pages, doorway pages, or near-duplicate city pages.
- Keep query-string results canonical to `/water-check`; do not index a separate page for every ZIP lookup.
- Link educational content to the most relevant service path rather than every commercial page.

### 5. Data and claims rules

Use approved public sources, including:

- California State Water Resources Control Board / Drinking Water Watch
- California Office of Environmental Health Hazard Assessment Public Health Goals
- California official Electronic Data Transfer library and data dictionaries
- U.S. EPA SDWIS public records
- Utility Consumer Confidence Reports
- U.S. Census ZIP Code Tabulation Area data for area matching

Do not scrape, copy, republish, or commercially reuse EWG's database, text, graphics, scores, health-guideline values, or presentation. EWG may be studied for general customer-flow ideas only.

For compatible chemicals, calculate the displayed health multiple as:

`highest selected monitoring result ÷ California OEHHA Public Health Goal`

Always show or preserve the underlying measurement, benchmark, unit, sampling context, and separate regulatory MCL context. If no compatible PHG is available, do not invent a health multiple; use available listed-MCL context or state that no direct benchmark comparison is available.

Always state the material limitations:

- A PHG is a health-based goal, not an enforceable legal limit and not by itself a dividing line between safe and dangerous water.
- The checker summarizes selected public monitoring records; it is not a new laboratory test of the user's faucet.
- Ratios use the highest selected compatible result, not a utility-wide average or a prediction of household exposure.
- ZIP boundaries and water-service boundaries do not align exactly. The homeowner should confirm the provider and PWSID on the current bill.
- A public system can use many wells, plants, blends, tanks, and distribution locations; selected records may not represent every tap or every day.
- A single monitoring result above a listed limit is not automatically the utility's formal compliance determination.
- Source-water records must be labeled separately from treated or distribution records.
- Equipment recommendations are starting points. Confirm current water conditions, property installation requirements, and model-specific certified performance before making treatment claims.

Never invent or overstate:

- contaminant-removal or reduction claims
- health claims
- certifications
- warranty terms
- financing rates or approval odds
- savings claims
- review counts
- comparison prices
- statewide installation coverage

### 6. Conversion and analytics tracking

Monitor these funnel events when analytics is connected:

- `water_check_start`
- `water_check_success`
- `water_check_error`
- `water_system_auto_select`
- `water_system_select`
- private-well selections
- `water_monitoring_report_view`
- `water_monitoring_report_error`
- `water_quote_view`
- `water_quote_text`
- `water_check_call`

Report:

- organic impressions and clicks to `/water-check`
- successful lookup rate
- source-unavailable and API-error rates
- automatic provider match rate and manual provider changes
- report views
- health-benchmark comparison coverage
- quote views by Standard / Plus / Dual Tank selection
- phone and text clicks assisted by the checker
- indexing and coverage status
- page speed and mobile usability issues

Protect privacy. Report aggregate data and, where geographic grouping is needed, use only the first three ZIP digits. Do not store unnecessary full-ZIP analytics.

### 7. Daily email report requirements

Send the verified daily SEO report to `mark@recollectivegroup.com` and CC `Motuma@spbinc.co`.

Include a dedicated **Free Water Check** section covering:

- production QA performed and whether it passed
- Modesto-first ZIPs and regional rings checked that day
- checker fixes or improvements deployed
- new or updated supporting content
- internal links added
- search visibility and traffic metrics when connected
- lookup, report, quote, and phone/text conversion metrics when connected
- indexing, source-data, latency, or runtime problems
- next recommended organic action
- practical Meta ad angles promoting the no-signup checker; paid-ad recommendations remain Meta-only

Before sending, verify that every claimed task is actually complete and live, every cited URL works, the phone number is correct, the deployment is healthy, and the report does not claim access to analytics that are not connected.

## Confirmed offer and conversion facts

- Regular price: `$4,995`
- Current offer: `$3,495`
- Includes whole-home water softener, reverse-osmosis drinking-water system, kitchen RO faucet, and standard installation
- Financing available through Hearth, subject to approval
- Primary conversion: `CALL (510) 725-5120`

Appropriately disclose that tax, permits, electrical work, trenching, code upgrades, removal of existing equipment, major plumbing modifications, and difficult installations are not included in standard installation.

## Current launch status

As of 2026-08-23, the production checker supports California ZIP matching statewide, automatic likely-provider selection, manual provider correction, private-well fallback, selected recent public monitoring records, calculated California OEHHA health-goal comparisons where compatible, separate listed-MCL context, treatment starting points, Standard / Plus / Dual Tank quote paths, homepage integration, canonical metadata, sitemap entry, and phone/text conversion paths.

Continue expanding QA and SEO outward from Modesto while preserving the distinction between statewide public-tool coverage and the company's confirmed installation service area.