# Addendum for the Existing Daily SEO Task

Effective date: 2026-08-20

Keep the existing schedule, email delivery method, recipients, verification requirement, and all prior Central Valley Pure Water SEO instructions unchanged. Append the instructions below to the existing task.

## New permanent campaign: Free California Water Check

Treat `https://www.cvpurewater.com/water-check` as a cornerstone organic-search and conversion asset. The objective is to earn qualified traffic from California homeowners researching local water, help them identify the correct public water system without a signup wall, and convert appropriate visitors into phone calls.

### Mandatory pre-report verification on every run

Before sending the daily report:

1. Confirm the production `/water-check` page returns a successful HTML response.
2. Confirm the canonical points to `/water-check`, not to a query-string ZIP URL.
3. Confirm the page still contains the no-signup message, phone number, source caveats, and pricing exclusions.
4. Run at least one sample public-system lookup through the production API.
5. Confirm an invalid or non-California ZIP returns a clear controlled error.
6. Confirm the homepage, desktop navigation, mobile navigation, footer, sitemap, and relevant city/service pages still link to the checker.
7. Review production runtime errors and source-unavailable responses before claiming the feature works.
8. Do not email the report until the checks above are complete. Report any failure plainly and include the exact affected route.

### Search demand and query research

Monitor and prioritize qualified query families such as:

- California water quality by ZIP code
- water quality report by ZIP
- tap water report California
- who is my water provider
- public water system lookup California
- Consumer Confidence Report lookup
- Modesto water quality report
- Stockton water quality report
- Tracy water quality report
- Manteca water quality report
- Turlock water quality report
- Sacramento water quality report
- Elk Grove water quality report
- Merced water quality report
- city water versus private well
- hard water versus water filtration

Use current Search Console data once connected. Until then, use current search-result research and record the source and date. Do not present estimated volume as verified traffic.

### Content strategy

Use the checker as the hub for a defensible educational cluster:

1. How California ZIP codes and water-service boundaries differ
2. How to identify the PWSID on a water bill
3. How to read a Consumer Confidence Report
4. What EPA violation records do and do not mean
5. City water versus private-well testing
6. Hard-water symptoms versus drinking-water concerns
7. Water softener versus whole-home filtration versus kitchen RO
8. Original city explainers for approved service markets using current official local sources

Every supporting page must have a distinct purpose, original local context, and a useful decision path. Do not mass-publish thin pages for every ZIP code. Do not index query-string result URLs. Do not create doorway pages that simply swap a ZIP or city name.

### Internal-linking requirements

- Link the checker from the homepage, service hub, area hub, relevant city pages, educational resources, and call-for-pricing page where context supports it.
- Link water-check explanations back to the most relevant service page rather than every commercial page.
- Use descriptive anchor text such as “check possible public water systems by ZIP,” not repetitive exact-match anchors on every page.
- Preserve the phone-first CTA hierarchy.

### Trust and source rules

- Use official California State Water Board, U.S. Census Bureau, EPA, utility, and current Consumer Confidence Report sources.
- Show the source organization and source date on every data-backed article.
- Never scrape, republish, or commercially reuse EWG data.
- Never imply that a ZIP lookup is a laboratory test at the tap.
- Never turn a historical violation into a current danger claim.
- Never infer that one home system removes a listed contaminant without verified product-specific performance evidence.
- Never invent health claims, savings claims, certifications, review counts, warranty terms, financing rates, contaminant-removal percentages, or comparative prices.

### Conversion optimization

Track and report the checker funnel when analytics becomes available:

- Water-check landing sessions
- `water_check_start`
- `water_check_success`
- Lookup success rate
- Source-unavailable rate
- Average possible-system count
- `water_system_select`
- Private-well selections
- `water_recommendation_view`
- Recommendation mix by concern
- `water_check_call`
- Call conversion rate from the checker
- Mobile versus desktop completion rate
- Top entry pages and assisted conversions

Use only aggregate reporting. Do not include full ZIP codes or other unnecessary location details in analytics reports.

### Technical SEO monitoring

Check and report:

- Indexability of `/water-check`
- Canonical consistency
- Sitemap inclusion
- Query-parameter duplication
- Core Web Vitals and mobile usability
- Structured-data validity
- API latency and error rate
- Upstream source health
- Broken official-source links
- JavaScript/runtime errors
- Internal-link count and orphan status
- Search Console impressions, clicks, CTR, average position, and indexed status once connected

### Daily report section

Add a permanent **Free Water Check** section to the existing daily SEO email containing:

- Production status: pass/fail
- Sample ZIP tested
- API/source status
- New search queries or trends found
- Content/internal-link work completed
- Pages changed and production URLs
- Before/after QA evidence
- Analytics funnel metrics when available
- Search Console metrics when available
- Errors, limitations, and exact next action

Do not report a change as completed unless it is published, visually checked, functionally tested, and confirmed on the production domain.

### Paid Meta support

Use the checker as an optional no-signup landing page for California Central Valley Meta campaigns. Position it as a free public-record lookup, not a contamination scare campaign. Test direct-response creative around identifying the possible provider, understanding public records, and choosing the right water conversation. Keep the primary page CTA as the phone call and disclose that the lookup is not a laboratory test.
