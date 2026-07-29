# Central Valley Pure Water SEO Roadmap

Last updated: 2026-07-29

## Operating principles

- GitHub `main` is the source of truth.
- Vercel project `central-valley-pure-water` is the production host.
- Preserve the approved homepage design and phone-first conversion flow.
- Publish only original pages with distinct search intent and useful local context.
- Use confirmed business facts and qualified claims only.
- Prioritize production reliability and technical SEO before content expansion.

## Current production baseline

- Approved mobile-first homepage restored in GitHub.
- Core offer pathways: complete home system, water softener, reverse osmosis, and property-specific well water systems.
- Primary conversion: calls to `(510) 725-5120`.
- LocalBusiness structured data, canonical metadata, Open Graph data, and mobile call actions are present.
- Runtime error scan was clean on 2026-07-29.

## Completed

### Sprint 1 — Source recovery and technical SEO foundation

- Restored the approved production source in GitHub.
- Added a crawlable `/robots.txt` route with the canonical sitemap location.
- Added a standards-compliant `/sitemap.xml` route.
- Created this living roadmap to prevent duplicate or disconnected sprint work.
- Audited Vercel project state, deployment history, runtime errors, domain attachment, and GitHub source state.

## Current blockers

- `cvpurewater.com` and `www.cvpurewater.com` are not attached to the Vercel project.
- The newest successful Vercel deployment is a preview, not production.
- Vercel project metadata does not show a durable Git-backed production deployment.
- Until the custom domain and production source workflow are verified, new city/service clusters must not be published.

## Next sprint

### Production delivery and verification

1. Connect `supremeprobuilders-art/central-valley-pure-water` to the existing Vercel project.
2. Set `main` as the production branch.
3. Attach `cvpurewater.com` and `www.cvpurewater.com`.
4. Verify DNS, TLS, primary-domain redirect, and the latest production alias.
5. Verify `/robots.txt`, `/sitemap.xml`, canonical tags, click-to-call, mobile navigation, and runtime health on the custom domain.
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

1. Modesto
2. Stockton
3. Tracy
4. Manteca
5. Turlock
6. Sacramento
7. Elk Grove
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
