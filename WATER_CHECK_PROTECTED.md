# Protected Water Check production baseline

`/water-check` is the owner-approved customer funnel and must remain identical in behavior and presentation to the approved Central Valley Pure Water Water Check baseline.

Protected files:

- `app/water-check/page.tsx`
- `app/water-check/water-check-tool.tsx`
- `app/water-check/approved-water-check.css`
- `app/api/water-report/route.ts`
- `app/api/address-suggestions/route.ts`
- `app/api/water-leads/route.ts`
- the two approved product-image URLs used by `water-check-tool.tsx`

SEO, content, city-page, schema, internal-linking, and automated growth work must not edit, replace, redesign, roll back, rename, delete, or regenerate any protected file. SEO may link to `/water-check` from other pages and may improve supporting pages without changing this funnel.

Only an explicit owner request to change the Water Check authorizes edits. Any authorized change must preserve the ZIP-to-provider report, on-page contaminant details, household and bathroom sizing, installed pricing, financing path, referral code, lead routing, mobile behavior, and official-source links unless the owner specifically requests otherwise.

Before every production deployment, run the rendered test named `renders the protected approved Water Check funnel`. A failed protection test blocks deployment.
