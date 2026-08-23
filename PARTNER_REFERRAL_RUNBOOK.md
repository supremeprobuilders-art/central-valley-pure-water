# Central Valley Pure Water Partner Referral Runbook

## Objective

Create a low-friction referral channel for Realtors, home inspectors, contractors, builders, property managers, designers, and past customers.

Public offer: eligible partners receive a $100 referral reward after a referred homeowner completes and pays for an eligible Central Valley Pure Water installation. Rewards are subject to program terms and any employer, brokerage, licensing, tax, disclosure, or other rules that apply to the partner.

Do not tie a referral reward to financing approval, lender selection, loan amount, interest rate, or use of Hearth.

## Referral URL

Each approved partner receives a simple code and link:

`https://www.cvpurewater.com/r/{partner-code}`

The redirect route:

1. validates the code;
2. stores it in the first-party `cvpw_ref` cookie for 30 days;
3. redirects the homeowner to `/water-check?ref={partner-code}`.

Use lowercase letters, numbers, and hyphens only. Keep codes short and recognizable, for example `smithrealty` or `aceinspection`.

## QR code

Generate the QR from the exact partner URL above. The QR must resolve to the first-party `cvpurewater.com/r/{partner-code}` route, not directly to a third-party CRM or financing URL. This preserves attribution and lets the destination change later without reprinting the QR.

## CRM fields

Create these fields in HighLevel (or the active CRM):

- Referral Partner Code
- Referral Partner Name
- Referral Partner Email
- Referral Partner Phone
- Referral Partner Type
- Referral First Touch Date
- Referral Lead Status
- Referral Install Date
- Referral Reward Status
- Referral Reward Date
- Financing Interest (yes/no/unknown)
- Water Check Completed (yes/no)

Recommended lead statuses:

`New referral -> Contacted -> Quote/Assessment -> Scheduled -> Installed -> Paid -> Reward eligible -> Reward sent`

## Attribution rule

Use first-party referral attribution for 30 days. If the homeowner explicitly gives a different referral source later, the CRM record should be updated manually and the reason logged. Never overwrite a direct customer statement simply because a cookie exists.

## Partner notifications

### When a referred homeowner submits contact information

Subject: `Your CV Pure Water referral came in`

Body:

`[First Name] used your referral link. We have it from here. We’ll update you if the job reaches an eligible completed installation.`

Do not disclose the homeowner's water report, financing information, credit information, address, quote details, or other private customer information to the partner unless the homeowner has expressly authorized that disclosure.

### When an eligible installation is completed and paid

Subject: `$100 referral reward unlocked`

Body:

`Your referral completed an eligible CV Pure Water installation. Your $100 referral reward is ready for processing. Thanks for sending them our way.`

### When reward is sent

Subject: `Referral reward sent`

Body:

`Your $100 CV Pure Water referral reward has been sent. Keep using your same link for future referrals.`

## Homeowner follow-up

Homeowner messaging should remain short and phone-first. The partner should not receive financing decisions, APRs, loan amounts, credit information, or lender details.

## Financing

The public `/financing` route is designed for Hearth.

Use these environment variables only after the exact URLs are copied from the active Central Valley Pure Water Hearth account:

- `NEXT_PUBLIC_HEARTH_FINANCING_URL`
- `NEXT_PUBLIC_HEARTH_CALCULATOR_EMBED_URL`

Do not invent a financing link or calculator URL. Do not publish sample APRs, terms, approval odds, or monthly payments. Hearth and its lending partners determine available offers.

The financing page should always show the full project price before financing and make clear that financing is optional and subject to approval/lender terms.

## HighLevel automation

Once HighLevel is connected:

1. Create a Partner custom object/list or equivalent partner contact segment.
2. Create the fields above.
3. Create a workflow triggered when a lead is created with Referral Partner Code populated.
4. Resolve the partner by code and associate the records.
5. Send the partner the short "referral came in" email.
6. Notify the CV Pure Water sales owner immediately.
7. When opportunity status changes to Installed/Paid, verify eligibility before changing Reward Status to `eligible`.
8. Send the partner the reward-unlocked email.
9. After the reward is actually issued, set Reward Status to `sent`, store the date, and send the confirmation email.
10. Add a dashboard for referrals, installed referrals, conversion rate, rewards due, rewards sent, and revenue attributed by partner.

Do not automatically mark a reward paid based only on an opportunity status. A human or payment-system confirmation should be the final payout trigger.

## Partner terms to finalize before public promotion

- Exact reward form: gift card, check, electronic payment, or other method
- Eligible system/products
- Completed-and-paid definition
- Cancellation/refund/chargeback treatment
- Self-referrals and same-household rules
- Duplicate-referral attribution
- 30-day attribution window
- Maximum rewards, if any
- Tax reporting treatment
- Eligible/ineligible partner categories
- Required disclosures for licensed professionals and employer/brokerage approval
- Fraud/abuse rules
- Right to change or end the program

Have the final public terms reviewed for the actual referral categories used. Realtors, brokers, inspectors, contractors, and other licensed professionals may have additional duties or restrictions.

## Measurement

Track weekly:

- New approved partners
- Partner links activated
- Referred Water Check sessions
- Referred qualified leads
- Referred quotes
- Referred installs
- Referral-to-install conversion rate
- Revenue by partner
- Rewards due
- Rewards sent

The key metric is installed referrals per active partner, not the number of partner signups.
