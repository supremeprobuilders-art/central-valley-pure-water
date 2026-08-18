# Central Valley Pure Water SEO Roadmap

Last updated: 2026-08-18

## Operating principles

- GitHub `main` is the source of truth.
- Vercel project `central-valley-pure-water` is the production host.
- Preserve the approved homepage design and phone-first conversion flow.
- Publish only original pages with distinct search intent and useful local context.
- Use confirmed business facts and qualified claims only.
- Prioritize production reliability and technical SEO before content expansion.

## Current production baseline

- Approved mobile-first homepage restored in GitHub.
- Core offer pathways: water softeners, whole-home filtration, reverse osmosis, city-water systems, property-specific well-water treatment, and commercial treatment.
- Primary conversion: calls to `(510) 725-5120`.
- LocalBusiness, Service, FAQPage, BreadcrumbList, CollectionPage, and ItemList structured data are present on applicable pages.
- Canonical metadata, Open Graph data, crawlable service navigation, and mobile call actions are present.
- A crawlable service-area hub and substantial city pages are present for Modesto, Stockton, Tracy, Manteca, and Turlock.
- The production runtime error scan was clean on 2026-08-16.
- A source-backed Sacramento decision page is live, bringing the area cluster to six city pages.
- An installation-and-replacement-focused Elk Grove page is live, bringing the area cluster to seven city pages.

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

## Current blockers

- Vercel project metadata does not yet show native Git-triggered deployments from GitHub `main`; the automation currently deploys the exact repository artifact through the authenticated Vercel connection.
- The GoHighLevel form destination and required fields are not confirmed, so the quote form remains deferred.
- Google Search Console, Google Analytics 4, call tracking, and Google Business Profile insights are not connected, so verified impressions, clicks, sessions, calls, and leads cannot yet be reported.

## Next sprint

### Complete the launch-market cluster and strengthen measurement

1. Research and publish a substantial Merced page with one distinct primary decision path and current official-source support.
2. Review selective city links from the most relevant core service pages after Merced completes the approved launch-market cluster.
3. Submit the expanded sitemap and record the indexing baseline after Search Console is connected.
4. Add selective city links from the most relevant core service pages after the remaining launch page is live.
5. Publish the first cornerstone resource around hard-water signs and the softener-versus-filtration decision, then link it to Modesto, Stockton, and Manteca.
6. Add a short GoHighLevel-ready quote form only after the destination and required fields are confirmed.

## Prioritized content backlog

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

- Hard water signs and scale buildup
- Water softener sizing and ownership guidance
- Reverse osmosis maintenance
- City water versus private-well treatment
- Well water assessment and treatment planning
- System maintenance and filter replacement
- Water treatment buying guides

## Internal-linking plan

- Core service pages link to relevant city pages and buying guides.
- City pages link to core services, nearby service areas, FAQs, and the call-for-pricing page.
- Educational resources link to the most relevant service page rather than every commercial page.
- Breadcrumbs and BreadcrumbList schema will be added when the first multi-level content cluster launches.

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

## Lessons learned

- Source recovery alone does not create a durable deployment workflow; Git integration, production branch, custom-domain attachment, and live verification must all be confirmed.
- Technical crawlability must precede city-page expansion.
- Current public search visibility is too limited to justify a high-volume local page sprint without first fixing production ownership and measurement.
- Current service-result pages emphasize installation and product categories; the durable opportunity is clearer decision support that separates hardness, whole-home filtration, drinking water, city water, and private-well needs.
- Private-well search results frequently make broad treatment claims. Publishing an assessment-first page tied to current property information protects accuracy and creates a stronger trust signal.
- A phone-first pricing page can improve conversion clarity now, while the unconfirmed GoHighLevel destination remains a legitimate blocker for form submission.
- A city cluster is more defensible when each page owns a distinct household decision and links to the relevant service path; repeating one generic template across every city would create weak local value and cannibalization risk.
