import Image from "next/image";

const affiliatePartners = [
  {
    name: "Forma Design Consultants",
    type: "Design · Planning · Project Strategy",
    headline: "Plan the project before the build begins.",
    copy: "Forma helps California homeowners and investors move from an early idea to a clear project path, bringing architectural design, ADU planning, contractor sourcing, project strategy, and financing guidance together.",
    services: [
      "Architectural & ADU design",
      "Project strategy",
      "Contractor sourcing",
    ],
    href: "https://www.formadesignconsultants.com/",
    logo: "/partners/forma-design-consultants.webp",
    logoWidth: 600,
    logoHeight: 544,
    logoClassName: "affiliate-logo-forma",
  },
  {
    name: "Supreme Pro Builders",
    type: "Construction · Remodeling · Development",
    headline: "From plans to a professionally managed build.",
    copy: "Supreme Pro Builders is a California general contractor supporting residential and commercial projects—from kitchens and bathrooms to ADUs, additions, tenant improvements, and ground-up construction.",
    services: [
      "Residential remodeling",
      "ADUs & additions",
      "Commercial construction",
    ],
    href: "https://supremeprobuilders.com/",
    logo: "/partners/supreme-pro-builders.webp",
    logoWidth: 700,
    logoHeight: 267,
    logoClassName: "affiliate-logo-supreme",
  },
] as const;

export function AffiliatePartners() {
  return (
    <section
      className="section affiliate-section"
      id="affiliates"
      aria-labelledby="affiliates-title"
    >
      <div className="affiliate-heading">
        <div>
          <p className="eyebrow light-eyebrow">
            <span /> Trusted affiliate network
          </p>
          <h2 id="affiliates-title">
            Trusted partners for the <em>bigger project.</em>
          </h2>
        </div>
        <p>
          Better water can be one part of a larger home or property upgrade.
          When your project also needs design, planning, or construction
          expertise, these independent affiliate partners offer a clear next
          step.
        </p>
      </div>

      <div className="affiliate-grid">
        {affiliatePartners.map((partner) => (
          <article key={partner.name}>
            <a
              className="affiliate-card"
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${partner.name} website (opens in a new tab)`}
            >
              <span className="affiliate-card-topline">{partner.type}</span>
              <div className="affiliate-logo" aria-hidden="true">
                <Image
                  className={partner.logoClassName}
                  src={partner.logo}
                  alt=""
                  width={partner.logoWidth}
                  height={partner.logoHeight}
                  sizes="(max-width: 860px) calc(100vw - 88px), 520px"
                  unoptimized
                />
              </div>
              <div className="affiliate-card-copy">
                <h3>{partner.name}</h3>
                <strong>{partner.headline}</strong>
                <p>{partner.copy}</p>
                <ul className="affiliate-services" aria-label="Key services">
                  {partner.services.map((service) => (
                    <li key={service}>
                      <b aria-hidden="true">✓</b> {service}
                    </li>
                  ))}
                </ul>
                <span className="affiliate-link">
                  Visit official website <b aria-hidden="true">↗</b>
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>

      <p className="affiliate-disclaimer">
        Affiliate partners are independent businesses. Their services,
        proposals, agreements, pricing, and warranties are provided directly by
        each company.
      </p>
    </section>
  );
}
