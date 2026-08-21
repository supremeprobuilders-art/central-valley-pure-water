# Central Valley Pure Water — Daily SEO Runbook

Last updated: 2026-08-21

This file is the persistent operating brief for the daily 8:00 AM Central Valley Pure Water SEO workflow. GitHub `main` and the production site are the source of truth.

## Primary objective

Increase qualified calls to `(510) 725-5120` by building trustworthy organic visibility for Central Valley water-treatment searches and the no-signup **Free California Water Check**.

The checker is a statewide public-record utility. Central Valley Pure Water's sales and installation claims must remain limited to the confirmed service area. Do not imply statewide installation coverage merely because the checker accepts California ZIP codes.

## Required Free Water Check work in every daily run

### 1. Production QA before promotion

Verify the following on `https://www.cvpurewater.com` before publishing content or sending the report:

- Homepage loads and visibly links to `/water-check`.
- `/water-check` returns HTTP 200 and retains its canonical URL.
- A valid California ZIP returns likely public water systems.
- A ZIP with overlapping systems allows provider selection.
- The selected provider loads system facts, recent official monitoring records, sampling context, listed-limit comparisons, and a best-fit system path.
- The private-well path remains available and does not use public-system records as a substitute for property testing.
- An out-of-state ZIP is rejected with a clear California-only message.
- Phone links use `(510) 725-5120` and `tel:+15107255120`.
- Mobile navigation, ZIP input, provider cards, report tables/cards, recommendation CTA, and sticky call action remain usable.
- `/sitemap.xml` includes `/water-check`; `/robots.txt` points to the canonical sitemap.
- Production runtime logs contain no new checker errors.

If a material production problem is found, fix and redeploy it before promoting the tool or describing the run as complete.

### 2. Search-intent research

Monitor and expand original content around high-intent searches such as:

- California water quality by ZIP code
- what is in my tap water
- local water quality report
- public water system ID / PWSID lookup
- how to read a Consumer Confidence Report
- city water quality report
- hard water by city
- water softener versus reverse osmosis
- city water versus private well
- Modesto, Stockton, Tracy, Manteca, Turlock, Sacramento, Elk Grove, and Merced water quality

Use current search evidence and official local sources. Do not create pages solely to increase page count.

### 3. Content and internal-linking requirements

- Add contextual links to `/water-check` from relevant city, service, educational, area-hub, and call-for-pricing pages.
- Use clear calls to action such as **Check Your Water Free** or **See Public Water Records by ZIP**.
- Keep the homepage phone-first. The checker supports the call conversion; it does not replace the primary phone CTA.
- Publish provider- or city-level resources only when they include substantial original interpretation, current official sources, and a useful homeowner decision path.
- Do not mass-publish thin ZIP pages, doorway pages, or near-duplicate city pages.
- Keep query-string results canonical to `/water-check`; do not index a separate page for every ZIP lookup.
- Link educational content to the most relevant service path rather than every commercial page.

### 4. Data and claims rules

Use only approved public sources, including:

- California State Water Resources Control Board / Drinking Water Watch
- California official Electronic Data Transfer library and data dictionaries
- U.S. EPA SDWIS public records
- Utility Consumer Confidence Reports
- U.S. Census ZIP Code Tabulation Area data for area matching

Do not scrape, copy, republish, or commercially reuse EWG's database, text, graphics, scores, or presentation.

Always state the material limitations:

- The checker summarizes public monitoring records; it is not a new laboratory test of the user's faucet.
- ZIP boundaries and water-service boundaries do not align exactly. The homeowner must confirm the provider and PWSID on the current bill.
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

### 5. Conversion and analytics tracking

Monitor these funnel events when analytics is connected:

- `water_check_start`
- `water_check_success`
- `water_check_error`
- `water_system_select`
- private-well selections
- `water_monitoring_report_view`
- `water_monitoring_report_error`
- `water_recommendation_view`
- `water_check_call`

Report:

- organic impressions and clicks to `/water-check`
- successful lookup rate
- source-unavailable and API-error rates
- provider selections
- report views
- recommendation views by system category
- phone clicks and qualified calls assisted by the checker
- indexing and coverage status
- page speed and mobile usability issues

Protect privacy. Report aggregate data and, where geographic grouping is needed, use only the first three ZIP digits. Do not store unnecessary full-ZIP analytics.

### 6. Daily email report requirements

Send the verified daily SEO report to `mark@recollectivegroup.com` and CC `Motuma@spbinc.co`.

Include a dedicated **Free Water Check** section covering:

- production QA performed and whether it passed
- checker fixes or improvements deployed
- new or updated supporting content
- internal links added
- search visibility and traffic metrics when connected
- lookup, report, recommendation, and phone-conversion metrics when connected
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

As of 2026-08-21, the production checker, statewide California ZIP matching, provider selection, private-well fallback, recent public monitoring report, listed-limit context, system recommendation, homepage integration, canonical metadata, sitemap entry, and phone conversion paths are live. Continue to monitor official-source availability and production runtime health every day.