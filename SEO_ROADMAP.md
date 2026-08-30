# Central Valley Pure Water SEO Roadmap

Last updated: 2026-08-30

## Strategy pivot — Free Water Report acquisition engine (2026-08-24)

### What the strategy was

- The site was organized primarily around service pages and city pages for water softeners, whole-home filtration, reverse osmosis, city water, well water, and commercial treatment.
- The Free Water Check was an important feature, but it was one pathway among several.
- Most local pages were designed to answer product-selection or installation questions and then drive a phone call.

### What the strategy is now

- The Free Water Report is the primary organic-acquisition offer and the front door to the site.
- The core promise is: **See your local public water report, likely supplier, relevant findings, recommended system path, installed price, and financing option in about two minutes—free, with no signup and no in-home sales appointment required to view the report.**
- Be precise that this is a plain-language summary of public utility monitoring records, not a laboratory sample from the visitor's tap. Property details and current source verification still control final system fit.
- Give useful report value before requesting contact information. Lead capture belongs after the visitor sees the supplier, report context, system path, household-sizing questions, and price.
- Optimize for homeowners with purchase intent: people searching about hard-water signs, scale, spots, taste or odor, local contaminants, system cost, installed pricing, financing, water softeners, whole-home filtration, and reverse osmosis.
- Use the report to bridge informational search intent into commercial intent without forcing a sales-representative conversation.

### Primary keyword architecture

**Report-discovery intent**
- free water quality report by ZIP code
- water quality by ZIP code
- what is in my tap water
- tap water report
- city water quality report
- contaminants in [city] water
- water hardness by ZIP code
- is [city] tap water safe
- [city] water report
- Consumer Confidence Report explained

**Buyer intent**
- water softener price installed
- water softener installation [city]
- whole-house water filtration system
- whole-house water filter price
- reverse osmosis system installation
- complete home water system
- water treatment system financing
- monthly payments for water filtration
- best water system for hard water
- water softener and reverse osmosis package

**Local launch markets**
- Modesto, Stockton, Tracy, Manteca, Turlock, Sacramento, Elk Grove, and Merced first.
- Expand outward only after the launch-market pages and measurement prove the report-to-lead path.

### Target buyer

- Owner-occupant homeowners, recent homebuyers, families, and property decision-makers in the approved service area.
- Visitors already showing a problem or purchase signal: scale, spotted dishes, dry-feeling water, taste/odor concerns, appliance protection, drinking-water concerns, system replacement, installed-price research, or financing research.
- Prioritize qualified purchase intent over raw traffic, page count, or broad awareness.

### Content and conversion model

1. Searcher lands on a substantial city/report page or directly on /water-check.
2. ZIP lookup identifies the likely public water supplier while asking the homeowner to confirm the provider.
3. The report explains selected recent public monitoring results in plain language, with dates, units, comparisons, and official sources.
4. The system section explains what the proposed components are intended to address and what must still be property-verified; do not claim universal contaminant removal.
5. Household size and bathroom count determine the starting system tier and installed price:
   - Standard installed: $3,495.
   - Standard Plus installed: $3,995.
   - Dual Tank Full installed: $5,495.
   - Three or more bathrooms plus four or more people selects Dual Tank.
6. Show financing availability and the verified financing path after pricing, with lender terms controlling.
7. Offer call, text, or optional lead capture only after the visitor receives useful report and price information.

## Operating principles

- GitHub `main` is the source of truth.
- Vercel project `central-valley-pure-water` is the production host.
- Preserve the approved homepage design while making the report-first path the primary conversion flow and the phone path immediately available.
- Make the Free Water Report the primary organic-acquisition offer and route supporting content into the report-to-system-to-price-to-financing funnel.
- Publish only original pages with distinct search intent and useful local context.
- Use confirmed business facts and qualified claims only.
- Prioritize production reliability and technical SEO before content expansion.

## Current production baseline

- Approved mobile-first homepage restored in GitHub and refocused on the free Water Report as the primary organic entry point.
- Core offer pathways: water softeners, whole-home filtration, reverse osmosis, city-water systems, property-specific well-water treatment, and commercial treatment.
- Primary acquisition path: homepage or city/service content → `/water-check` → supplier confirmation → public-record context → treatment starting point → installed price → financing/call.
- The direct call path to `(510) 725-5120` remains available throughout the funnel.
- LocalBusiness, Service, FAQPage, BreadcrumbList, CollectionPage, and ItemList structured data are present on applicable pages.
- Canonical metadata, Open Graph data, crawlable service navigation, and mobile call actions are present.
- A crawlable service-area hub and substantial city pages are present for Modesto, Stockton, Tracy, Manteca, and Turlock.
- The production runtime error scan was clean on 2026-08-16.
- Source-backed Sacramento, Elk Grove, and Merced pages are live, bringing the area cluster to eight city pages.
- The owner-approved Water Check was restored to GitHub `main` and verified on production on 2026-08-30. `WATER_CHECK_PROTECTED.md`, the full protected route tree, API dependencies, product assets, and the rendered regression test are now mandatory release gates for every SEO sprint.

## Completed

### Sprint 1 — Source recovery and technical SEO foundation

- Restored the approved production source in GitHub.
- Added a crawlable `/robots.txt` route with the canonical sitemap location.
- Added a standards-compliant `/sitemap.xml` route.
- Created this living roadmap to prevent duplicate or disconnected sprint work.
- Audited Vercel project state, deployment history, runtime errors, domain attachment, and GitHub source state.

### Sprint 2 — Production crawlability and canonical alignment

- Published the GitHub `main` artifact to Vercel production.
- Attached `cvpurewater.com` and `www.cvpurewater.com` with `www` as the 200-response primary domain and a permanent apex redirect.
- Published `/robots.txt` and `/sitemap.xml`; both return 200 on the primary domain.
- Aligned canonical metadata, robots host, sitemap URLs, and LocalBusiness URL with `https://www.cvpurewater.com`.
- Removed development-only preview metadata from production.
- Reused the optimized WebP hero for social metadata and removed two redundant 786 KB PNG assets without changing the approved design.
- Verified the homepage phone CTA, TypeScript build, static route generation, production aliases, and runtime health.

### Sprint 3 — Core service cluster

- Launched a crawlable `/services` hub with six distinct core-service pathways.
- Published service pages for water softeners, whole-home filtration, reverse osmosis, city-water systems, private-well treatment, and commercial treatment.
- Published `/call-for-pricing` to explain quote inputs and installation factors without inventing prices or relying on an unconfirmed form destination.
- Added page-specific titles, descriptions, canonicals, Open Graph metadata, visible breadcrumbs, phone CTAs, FAQs, and contextual related-service links.
- Added Service, FAQPage, BreadcrumbList, CollectionPage, and ItemList structured data where the visible content supports it.
- Expanded the XML sitemap from the homepage to nine canonical URLs and connected the homepage cards and footer to the new cluster.
- Preserved the approved homepage design while extending its navigation and conversion paths.
- Verified the full artifact with Vercel's production build, TypeScript checks, and static generation for all 13 framework routes.

### Sprint 4 — Initial city cluster

- Published a regional `/areas` hub with clear service-coverage language and no unsupported local-office claims.
- Published substantial, intent-specific pages for Modesto, Stockton, Tracy, Manteca, and Turlock rather than thin city-name swaps.
- Assigned a distinct primary emphasis to each page: Modesto local softener and RO installation, Stockton whole-home filtration selection, Tracy kitchen RO planning, Manteca complete-home coordination, and Turlock city-versus-well assessment.
- Added page-specific metadata, canonical URLs, Open Graph data, visible breadcrumbs, phone CTAs, FAQs, and WebPage, Service, Place-aware areaServed, FAQPage, and BreadcrumbList structured data.
- Connected the homepage service-area grid to the five live city routes and added the service-area hub to shared service navigation.
- Expanded the XML sitemap from 9 to 15 canonical URLs and added rendered-route tests for the hub and every city page.
- Preserved the approved homepage design and kept the Modesto office as the only published business address.
- Merged the verified city cluster through GitHub PR #1 at commit `fb018c2` and published Vercel production deployment `dpl_374ySvFGHA7FkA5A7prYy2pR6JL6`.
- Verified the homepage, `/areas`, all five city pages, `/robots.txt`, and the 15-URL sitemap on the public canonical domain; the post-deploy runtime error scan was clean.

### Sprint 5 — Sacramento decision page

- Researched current Sacramento intent around water softeners, whole-home filtration, and reverse osmosis, plus competing pages that commonly collapse those categories into universal packages.
- Published a substantial `/areas/sacramento` page centered on provider verification and the softener-versus-filter-versus-kitchen-RO decision.
- Used the City of Sacramento’s 2025 Consumer Confidence Report, published June 1, 2026, for current local context; linked the official report visibly and stated that City-supplied water meets applicable standards.
- Added a reusable optional official-sources section to city pages, while keeping unsupported contaminant, health, savings, certification, warranty, and pricing claims out of the page.
- Linked Sacramento from the homepage, included it in the service-area hub and structured data, expanded the sitemap to 16 canonical URLs, and added rendered-route coverage.

### Sprint 6 — Elk Grove installation and replacement page

- Researched current Elk Grove intent around water softener installation and replacement, whole-home filtration, and reverse osmosis.
- Identified a result-page gap: prominent local pages lean on universal packages, free-testing offers, broad health language, and removal claims, while practical replacement and reuse decisions receive less attention.
- Published `/areas/elk-grove` around a distinct first-install-versus-replacement path, including existing loop, bypass, drainage, power, clearance, removal, and future-service considerations.
- Linked official Elk Grove Water District and Sacramento County Water Agency reporting resources and directed readers to confirm the provider on the current bill.
- Added page-specific metadata, canonical, visible breadcrumbs, phone CTAs, FAQs, supported structured data, service links, reciprocal Sacramento linking, homepage access, sitemap coverage, and rendered-route tests.
- Expanded the XML sitemap from 16 to 17 canonical URLs without adding unsupported provider, contaminant, health, savings, warranty, certification, review, or pricing claims.

### Sprint 7 — Free California Water Report

- Built and published an original, no-signup `/water-check` experience for California ZIP codes.
- Added a homepage hero pathway, substantial homepage ZIP launcher, desktop navigation, mobile navigation, footer link, canonical metadata, sitemap coverage, and rendered-route tests.
- Matched Census ZIP Code Tabulation Area geometry to California State Water Board public water-system service boundaries and prioritized systems containing the ZIP representative center.
- Added postal-point fallback for ZIPs without a Census boundary and a separate private-well path that remains available even when public systems overlap the ZIP.
- Added a selected-system water quality report that resolves the official California Drinking Water Watch record, reviews representative treated, distribution, blend, or source sampling points, summarizes recent laboratory results, displays listed MCL comparisons, and labels source-water context separately.
- Required users to confirm the provider and PWSID on the current water bill because ZIP boundaries and water-service boundaries do not align exactly.
- Added an evidence-based best-fit system path from detected analytes and hard-water indicators while requiring provider confirmation, current utility review, model-specific certified performance, and property installation verification.
- Added the confirmed `$3,495` complete-home offer, Hearth financing qualification, standard-installation scope, and all required exclusions.
- Added privacy-minimized funnel events for starts, successful lookups, errors, system selection, recommendation views, and calls. Analytics receives only the first three ZIP digits.
- Kept query-string lookups canonical to `/water-check`; no thin indexable ZIP pages are created.
- Documented the separate ETL/cache required for a trustworthy analyte-by-analyte report from California's very large official laboratory-result files. EWG data is not scraped or reused.
- Published the report flow with provider-confirmation, public-record limitations, installed pricing, financing, and direct-call paths. Connected measurement remains outstanding.

### Sprint 8 — Homepage report-first conversion and crawl-path upgrade

- Repositioned the homepage from a call-first product pitch to the free Water Report as the primary organic-acquisition offer without changing the approved visual system.
- Rewrote the homepage title, description, social metadata, top bar, hero, trust strip, problem bridge, system section, three-step process, quote band, and FAQs around the distinct report-discovery and installed-price intents.
- Made the visitor promise explicit: enter a California ZIP, see the likely supplier and relevant public-record context, then see the treatment starting point, confirmed installed prices, and financing path—free, with no signup or sales-representative conversation required before receiving value.
- Preserved the critical limitations: the report is not a tap-specific laboratory test; provider confirmation, current source review, property details, and model-specific performance control the final recommendation.
- Added visible confirmed package prices—Standard `$3,495`, Standard Plus `$3,995`, and Dual Tank Full `$5,495`—with final-scope language and lender-controlled financing terms.
- Changed the dominant homepage CTAs to `/water-check` while preserving a prominent click-to-call path to `(510) 725-5120`.
- Repaired the missing homepage link to the live Merced page, completing the crawl path to all eight approved launch markets.
- Expanded rendered HTML coverage for the report-first homepage copy, all three confirmed prices, and Merced internal linking.
- Cleared the existing React hook lint failures in Water Check state hydration and report fetching without changing the visitor-facing logic.
- Proved the dependency lock with a clean `npm ci --include=dev`, then passed the production build, artifact validation, full lint, and all rendered/API tests.

### Sprint 9 — No-signup installed-price and household-sizing repair

- Repaired the primary `/water-check` conversion path so all three owner-confirmed installed prices are visible before any contact fields: Standard `$3,495`, Standard Plus `$3,995`, and Dual Tank Full `$5,495`.
- Replaced the hidden “Personalized” Plus and Dual pricing states with the confirmed installed prices and removed the unsupported crossed-out comparison price.
- Separated the two required sizing inputs—bathrooms and people in the home—from the optional name, phone, address, and email fields, preserving the report-first, no-signup promise.
- Enforced the confirmed sizing rule in the price reveal: three or more bathrooms plus four or more people selects Dual Tank Full at `$5,495`.
- Added the financing path directly beside the sized installed price, kept the click-to-call route to `(510) 725-5120`, and moved the prefilled text request into a clearly optional disclosure after price.
- Added a dedicated `water_price_view` measurement event carrying the selected tier, displayed installed price, household size, bathroom count, and privacy-safe provider identifier.
- Updated the visible Water Check explanation, FAQ, and comparison panel so the three prices and sizing rule are consistent across the page.
- Validated the dependency lock with `npm ci --include=dev`, then passed lint, production build, artifact validation, all rendered/API tests, and exact-price rendered checks.
- Added a build-time decoder for connector-safe binary asset uploads so the authenticated Vercel deployment path can reconstruct the exact tracked font and image bytes before compiling, without storing duplicate encoded assets in GitHub.
- Confirmed the City of Modesto has published its official 2025 Consumer Confidence Report for Modesto System `5010010`; retained that primary source for the next report-led Modesto page sprint rather than publishing unsupported local claims.

### Sprint 10 — Report-led Modesto acquisition page

- Rebuilt `/areas/modesto` around the connected “Modesto water report” and installed-price intent while retaining distinct local installation value.
- Used the City of Modesto’s official 2025 Consumer Confidence Report for System `5010010`, including its approximately 40% groundwater/60% surface-water supply mix, 199 ppm average hardness and 33–388 ppm utility-wide range, and City compliance statement.
- Kept every local fact in utility-wide context, asked visitors to confirm the provider and PWSID on the current bill, and stated prominently that public monitoring records are not a laboratory test of the visitor’s tap.
- Added a dated report snapshot, visible official sources, supported FAQ content and schema, and clear limitations around property conditions, source blending, model-specific performance, and universal removal claims.
- Routed the hero, report summary, and main conversion band directly into `/water-check?zip=95351`, where the visitor can continue to supplier confirmation, household/bathroom sizing, all three installed prices, financing, call, text, and optional contact.
- Updated the service-area hub from stale five-city language to the eight approved launch markets and made the free Water Report its primary CTA.
- Repaired the broken homepage and area-hub route to `/areas/merced` by adding a substantial, distinct Merced page tied to the City’s official Reporting Year 2025 Consumer Confidence Report page, provider confirmation, home-system planning, installed pricing, and financing.
- Updated area sitemap modification dates and expanded rendered coverage to Merced plus Modesto-specific source, pricing, disclaimer, schema, financing, and internal-link checks.

### Sprint 11 — Provider-first Stockton report page

- Rebuilt `/areas/stockton` around the distinct “Stockton water report” and “water hardness by ZIP” intent without changing the protected Water Check.
- Used the City of Stockton’s current water-quality page and official address/provider lookup to explain why Stockton does not have one provider or annual report that applies to every address.
- Added a bounded 2025 California Water Service Stockton District snapshot: 23,926 tests on 3,432 samples for 237 constituents; local groundwater plus purchased Stockton East Water District water; a statement that applicable primary and secondary standards were met; and source-specific hardness context of 22–290 ppm with a 150 ppm groundwater average versus 38.9 ppm for purchased surface water.
- Kept every Cal Water fact expressly limited to that provider and report, required bill/PWSID confirmation, and stated that public utility records are not a laboratory test of an individual faucet.
- Routed Stockton report discovery into `/water-check?zip=95205`, household and bathroom sizing, Standard `$3,495`, Standard Plus `$3,995`, Dual Tank Full `$5,495`, financing, call, text, and optional contact.
- Removed hard-coded “Modesto” labels from the shared report-city template, added per-page `dateModified` schema, refreshed sitemap dates, and added Stockton rendered-route regression coverage.

## Current blockers

- Vercel project metadata does not yet show native Git-triggered deployments from GitHub `main`; the automation currently deploys the exact repository artifact through the authenticated Vercel connection.
- The GoHighLevel form destination and required fields are not confirmed, so the quote form remains deferred.
- Google Search Console, Google Analytics 4, call tracking, and Google Business Profile insights are not connected, so verified impressions, clicks, sessions, calls, and leads cannot yet be reported.
- Broader and faster detected-analyte coverage will require a first-party ingestion, normalization, and cache layer over official California laboratory-result data; direct request-time parsing would be too slow and could misrepresent raw-source detections.

## Next sprint

### Measure and extend the report-led local cluster

1. Connect or confirm Google Search Console and GA4/GTM so report impressions, organic clicks, report completions, price views, financing clicks, calls, optional contacts, and qualified leads can be reported rather than inferred.
2. Review initial Modesto indexation and engagement evidence before repeating the pattern; do not create mass-generated ZIP or city pages.
3. Review Stockton indexation and engagement evidence before repeating the report-page pattern. If research supports distinct value, strengthen `/areas/tracy` next around provider confirmation and kitchen RO versus whole-home hardness intent.
4. Keep the Water Report as the organic front door and use service pages only as supporting decision content.

### Daily sprint priority order

1. Repair any production, report-data, indexing, or conversion problem.
2. Improve the primary Water Report landing and result experience.
3. Publish or strengthen one high-value launch-market report page.
4. Publish or strengthen one purchase-intent page tied directly to report results.
5. Improve internal linking, schema, page titles/descriptions, or measurement.
6. Update this roadmap with completed work, verified results, blockers, and the next non-duplicate priority.

## Prioritized content backlog

### Report-led acquisition cluster

1. Free Water Report by ZIP — primary hub
2. Modesto water report — report-first local landing
3. Stockton water report
4. Tracy water report
5. Manteca water report
6. Turlock water report
7. Sacramento water report
8. Elk Grove water report
9. Merced water report
10. How ZIP codes and water-system boundaries differ
11. How to identify your water supplier and PWSID
12. How to read a Consumer Confidence Report
13. Public utility report versus an in-home laboratory test

### Purchase-intent cluster

1. Water softener installed price
2. Whole-house filtration installed price
3. Reverse-osmosis system installation
4. Complete-home water system packages
5. Standard versus Standard Plus versus Dual Tank
6. Water-system sizing by household and bathrooms
7. Water-treatment financing and monthly-payment options
8. Water-softener replacement and installation planning
9. City water versus private-well treatment path
10. Water-treatment buying guide

### Buyer-problem cluster

1. Hard-water signs, scale, and spotted dishes
2. Chlorine taste and odor questions
3. Drinking-water and kitchen RO questions
4. Appliance and fixture protection
5. Existing-system replacement
6. New-home water-system planning
7. System maintenance and filter replacement

### Existing service cluster — conversion support

1. Water softeners
2. Whole-home water filtration
3. Reverse osmosis drinking water systems
4. City water systems
5. Well water treatment
6. Commercial water treatment
7. Call for pricing

### Supporting local expansion

- Riverbank
- Oakdale
- Ceres
- Salida
- Ripon
- Lathrop
- Lodi
- Atwater
- Los Banos
- Patterson
- Newman

### Future expansion after launch-market evidence

- Fresno
- Clovis
- Madera
- Visalia
- Hanford
- Tulare



### Core service cluster

1. Water softeners
2. Whole-home water filtration
3. Reverse osmosis drinking water systems
4. City water systems
5. Well water treatment
6. Commercial water treatment
7. Call for pricing

### Initial city cluster

1. Modesto — published
2. Stockton — published
3. Tracy — published
4. Manteca — published
5. Turlock — published
6. Sacramento — published
7. Elk Grove — published
8. Merced

### Supporting local expansion

- Riverbank
- Oakdale
- Ceres
- Salida
- Ripon
- Lathrop
- Lodi
- Atwater
- Los Banos
- Patterson
- Newman

### Future expansion after launch-market evidence

- Fresno
- Clovis
- Madera
- Visalia
- Hanford
- Tulare

### Educational and problem clusters

- Free California water check by ZIP
- How ZIP codes and public water-system boundaries differ
- How to find a PWSID and read a Consumer Confidence Report
- What EPA violation records do and do not establish
- Hard water signs and scale buildup
- Water softener sizing and ownership guidance
- Reverse osmosis maintenance
- City water versus private-well treatment
- Well water assessment and treatment planning
- System maintenance and filter replacement
- Water treatment buying guides

## Internal-linking plan

- Make /water-check the primary next step from homepage, city, service, pricing, financing, and educational content.
- Report-led city pages link directly into the ZIP lookup and explain what the visitor receives before any signup.
- Report results link to the relevant system explanation, installed-price path, financing page, and call/text action.
- Core service pages support the report funnel with product-specific answers rather than competing with it as isolated destinations.
- Educational resources link to the Water Report plus the single most relevant service or pricing page.
- Use descriptive anchors such as “free Modesto water report,” “check water quality by ZIP,” and “see installed system pricing,” without keyword stuffing.
- Keep breadcrumbs and BreadcrumbList schema consistent across report, city, service, pricing, and resource clusters.

## Schema plan

- Retain one accurate LocalBusiness entity on the homepage.
- Add Service schema to core service pages.
- Add BreadcrumbList to nested service, city, and resource pages.
- Add FAQPage only where the visible page contains genuine, page-specific FAQs.
- Do not add aggregate ratings, certifications, prices, or claims without verified source data.

## Measurement backlog

- Connect Google Search Console.
- Connect Google Analytics 4.
- Connect Bing Webmaster Tools.
- Connect Google Business Profile insights.
- Confirm GoHighLevel form destination and conversion events.
- Establish qualified-call and qualified-form-lead reporting before A/B testing.
- Track `water_check_start`, `water_check_success`, and `water_check_error`.
- Track `water_system_select`, private-well selections, and `water_recommendation_view`.
- Track `water_check_call` and the checker-assisted qualified-call rate.
- Monitor API latency, source-unavailable rate, and successful-lookup rate.
- Report only aggregate ZIP-prefix data; do not store unnecessary full-ZIP analytics.
- Add a permanent Free Water Report QA and performance section to the daily SEO report.
- Track water_price_view, financing clicks, optional lead submissions, and report-assisted qualified leads.
- Segment performance by launch city and aggregate ZIP prefix without storing unnecessary personal data.

## Lessons learned

- Source recovery alone does not create a durable deployment workflow; Git integration, production branch, custom-domain attachment, and live verification must all be confirmed.
- Technical crawlability must precede city-page expansion.
- Current public search visibility is too limited to justify a high-volume local page sprint without first fixing production ownership and measurement.
- Current service-result pages emphasize installation and product categories; the durable opportunity is clearer decision support that separates hardness, whole-home filtration, drinking water, city water, and private-well needs.
- Private-well search results frequently make broad treatment claims. Publishing an assessment-first page tied to current property information protects accuracy and creates a stronger trust signal.
- A phone-first pricing page can improve conversion clarity now, while the unconfirmed GoHighLevel destination remains a legitimate blocker for form submission.
- A city cluster is more defensible when each page owns a distinct household decision and links to the relevant service path; repeating one generic template across every city would create weak local value and cannibalization risk.
- ZIP codes are a useful entry point but are not authoritative utility boundaries; asking the homeowner to confirm the provider and PWSID is a trust and data-quality requirement.
- Public monitoring data needs sampling-point, treatment, blending, unit, qualifier, and date context before it can support analyte-level conclusions or product-specific claims.
