import Image from "next/image";
import Link from "next/link";

import { AffiliatePartners } from "./affiliate-partners";
import { MobileMenu } from "./mobile-menu";
import { WaterCheckLauncher } from "./water-check/water-check-launcher";

const phoneDisplay = "(510) 725-5120";
const phoneHref = "tel:+15107255120";

const systems = [
  {
    number: "01",
    label: "Most popular",
    title: "Complete Home System",
    copy: "A coordinated whole-home softener and under-sink reverse osmosis system for better water throughout the house.",
    bullets: [
      "Whole-home water softening",
      "Dedicated kitchen RO faucet",
      "Professional standard installation",
    ],
    image: "/systems/complete-home-package.webp",
    imageAlt:
      "Complete home water package with whole-home treatment equipment and an under-sink reverse osmosis system",
    imageNote: "Whole-home softening + kitchen RO",
    accent: "popular",
    href: "/services/whole-home-water-filtration",
  },
  {
    number: "02",
    label: "Hard water solution",
    title: "Water Softener",
    copy: "A whole-home system sized for your household and installed where water enters the home.",
    bullets: [
      "Helps reduce scale buildup",
      "Softer-feeling water at every tap",
      "Configured for your home",
    ],
    image: "/systems/water-softener.webp",
    imageAlt: "Modern whole-home water softener equipment",
    imageNote: "Whole-home water softening",
    accent: "softener",
    href: "/services/water-softeners",
  },
  {
    number: "03",
    label: "Kitchen drinking water",
    title: "Reverse Osmosis",
    copy: "A space-saving drinking water system with a dedicated faucet right at your kitchen sink.",
    bullets: [
      "Fresh, great-tasting drinking water",
      "Clean under-sink installation",
      "Easy filter access",
    ],
    image: "/systems/reverse-osmosis.webp",
    imageAlt:
      "Under-sink reverse osmosis drinking water system with storage tank and dedicated faucet",
    imageNote: "Under-sink RO + dedicated faucet",
    accent: "ro",
    href: "/services/reverse-osmosis",
  },
  {
    number: "04",
    label: "Property-specific solution",
    title: "Well Water Systems",
    copy: "Private-well water varies by property. We assess your water concerns and home setup before recommending equipment.",
    bullets: [
      "Recommendation based on assessment",
      "Whole-home treatment options",
      "Clear installation plan",
    ],
    image: "/systems/well-water-system.webp",
    imageAlt: "Representative multi-stage private well water treatment system",
    imageNote: "Configured after a property assessment",
    accent: "well",
    href: "/services/well-water-treatment",
  },
];

const reviews = [
  {
    quote:
      "The installation was clean and professional. The crew explained how the system worked, and we noticed the difference in our water right away. We’d definitely recommend them.",
    name: "Jason A.",
    city: "Stockton, CA",
  },
  {
    quote:
      "We had hard water throughout the house, and the new softener has made a noticeable difference. The process was smooth and the system looks great.",
    name: "Jessica L.",
    city: "Tracy, CA",
  },
  {
    quote:
      "Very professional experience. The installation was completed in one day, and the under-sink drinking water system has been a great addition to our kitchen.",
    name: "Harwinder L.",
    city: "Manteca, CA",
  },
  {
    quote:
      "The team was knowledgeable, friendly, and didn’t pressure us. They helped us choose the right system for our home and the installation exceeded our expectations.",
    name: "Oliver S.",
    city: "Fresno, CA",
  },
];

const serviceAreas = [
  { name: "Modesto", href: "/areas/modesto" },
  { name: "Stockton", href: "/areas/stockton" },
  { name: "Tracy", href: "/areas/tracy" },
  { name: "Manteca", href: "/areas/manteca" },
  { name: "Turlock", href: "/areas/turlock" },
  { name: "Sacramento", href: "/areas/sacramento" },
  { name: "Elk Grove", href: "/areas/elk-grove" },
  { name: "Merced", href: "/areas/merced" },
];

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand-mark${inverse ? " inverse" : ""}`} aria-label="Central Valley Pure Water">
      <span className="brand-waves" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand-type">
        <strong>Central Valley</strong>
        <span>Pure Water</span>
      </span>
    </span>
  );
}

function PhoneButton({
  className = "",
  children = "Call for pricing",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a className={`button button-call ${className}`} href={phoneHref}>
      <span className="call-icon" aria-hidden="true">☎</span>
      <span>{children}</span>
    </a>
  );
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Central Valley Pure Water LLC",
    url: "https://www.cvpurewater.com",
    telephone: "+1-510-725-5120",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1620 N Carpenter Rd Suite A5",
      addressLocality: "Modesto",
      addressRegion: "CA",
      postalCode: "95351",
      addressCountry: "US",
    },
    areaServed: serviceAreas.map((city) => ({
      "@type": "City",
      name: `${city.name}, California`,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    makesOffer: systems.map((system) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: system.title,
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="offer-bar">
        <span className="offer-pulse" aria-hidden="true" />
        <strong>Free Water Report</strong>
        <span>No signup · See your system and installed price in about 2 minutes</span>
        <Link href="/water-check">Check my ZIP</Link>
      </div>

      <header className="site-header">
        <a className="brand" href="#top">
          <BrandMark />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/water-check">Free water check</Link>
          <a href="#systems">Systems</a>
          <a href="#reviews">Reviews</a>
          <a href="#how-it-works">How it works</a>
          <a href="#service-area">Service area</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-call" href={phoneHref}>
          <span>Call for special pricing</span>
          <strong>{phoneDisplay}</strong>
        </a>
        <MobileMenu phoneDisplay={phoneDisplay} phoneHref={phoneHref} />
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/cvpurewater-hero.webp"
          >
            <source
              src="https://videos.pexels.com/video-files/7677492/7677492-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow light-eyebrow"><span /> Free California water report by ZIP</p>
          <h1>See what&apos;s in your water.<br /><em>Then get your price.</em></h1>
          <p className="hero-lede">
            Enter your ZIP to find the likely water supplier, understand selected
            public monitoring records, match a practical system, and see installed
            pricing and financing options—without signing up or speaking to a sales rep first.
          </p>
          <div className="hero-actions">
            <Link className="button button-call" href="/water-check">
              Get my free Water Report <span aria-hidden="true">→</span>
            </Link>
            <PhoneButton className="button-ghost">Call with questions</PhoneButton>
          </div>
          <ul className="hero-notes" aria-label="Service highlights">
            <li><span>✓</span> No signup required</li>
            <li><span>✓</span> No in-home appointment to view report</li>
            <li><span>✓</span> Financing available</li>
          </ul>
        </div>
        <aside className="hero-offer">
          <span className="hero-offer-label">About 2 minutes</span>
          <strong>Your Water Report + price</strong>
          <p>See public water-record context, a system starting point, installed pricing, and financing options before sharing contact information.</p>
          <Link href="/water-check">Start free <span>→</span></Link>
        </aside>
      </section>

      <section className="trust-strip" aria-label="Why homeowners use the free Water Report">
        <div><strong>Free</strong><span>No signup required</span></div>
        <div><strong>Local</strong><span>Likely supplier by ZIP</span></div>
        <div><strong>Clear</strong><span>Public records in plain English</span></div>
        <div><strong>Complete</strong><span>System, price, and financing</span></div>
      </section>

      <section className="problem-strip">
        <div className="section-heading compact">
          <p className="eyebrow"><span /> Sound familiar?</p>
          <h2>Hard water shows up <em>everywhere.</em></h2>
        </div>
        <div className="problem-list">
          <span>White spots &amp; scale</span>
          <span>Dry-feeling skin</span>
          <span>Odd taste or odor</span>
          <span>Well-water concerns</span>
        </div>
        <Link className="button button-call button-dark" href="/water-check">Check my water by ZIP</Link>
      </section>

      <WaterCheckLauncher />

      <section className="section systems-section" id="systems">
        <div className="section-heading centered">
          <p className="eyebrow eyebrow-centered"><span /> Water systems for Central Valley homes</p>
          <h2>Find the right system for <em>your water.</em></h2>
          <p>
            Start with what you are noticing at home. We will help you narrow
            down the right system and explain the installation before work begins.
          </p>
        </div>

        <div className="system-grid">
          {systems.map((system) => (
            <article className={`system-card ${system.accent}`} key={system.title}>
              <div className="system-topline">
                <span className="system-number">{system.number}</span>
                <span className="system-label">{system.label}</span>
              </div>
              <figure className="system-media">
                <Image
                  src={system.image}
                  alt={system.imageAlt}
                  width="1100"
                  height="825"
                  sizes="(max-width: 860px) calc(100vw - 90px), (max-width: 1280px) 44vw, 550px"
                  loading="lazy"
                  unoptimized
                />
                <figcaption>
                  <span aria-hidden="true" />
                  {system.imageNote}
                </figcaption>
              </figure>
              <h3>{system.title}</h3>
              <p>{system.copy}</p>
              <ul>
                {system.bullets.map((bullet) => (
                  <li key={bullet}><span>✓</span>{bullet}</li>
                ))}
              </ul>
              <div className="card-footer">
                <div><small>Special pricing</small><strong>Call for price</strong></div>
                <a className="card-detail" href={system.href} aria-label={`Learn more about ${system.title}`}>
                  Details <span>→</span>
                </a>
                <a href={phoneHref} aria-label={`Call for ${system.title} pricing`}>
                  Call now <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="system-image-note">
          System images are representative. Equipment, sizing, and configuration
          may vary based on your home, water source, and installation conditions.
        </p>

        <div className="systems-cta">
          <div>
            <strong>Not sure which system fits your home?</strong>
            <p>Start with your free Water Report, then see the system and installed-price path.</p>
          </div>
          <Link className="button button-call" href="/water-check">See my system match</Link>
        </div>
      </section>

      <section className="lifestyle-panel">
        <div className="lifestyle-copy">
          <p className="eyebrow light-eyebrow"><span /> Water that fits your life</p>
          <h2>From the first glass to every shower.</h2>
          <p>
            Better water should feel simple. Our team helps Central Valley
            homeowners choose a practical system, understand the price, and
            schedule a professional installation.
          </p>
          <PhoneButton>Call for today&apos;s special pricing</PhoneButton>
        </div>
        <div className="lifestyle-facts">
          <div><strong>Whole home</strong><span>Water softening at every tap</span></div>
          <div><strong>At the sink</strong><span>Dedicated RO drinking water</span></div>
          <div><strong>One local team</strong><span>Guidance, installation, follow-through</span></div>
        </div>
      </section>

      <section className="section reviews-section" id="reviews">
        <div className="reviews-heading">
          <div className="section-heading">
            <p className="eyebrow"><span /> Customer experiences</p>
            <h2>What Central Valley homeowners <em>are saying.</em></h2>
          </div>
          <div className="reviews-callout">
            <span>Ready for your own water upgrade?</span>
            <a href={phoneHref}>Call {phoneDisplay} <b>→</b></a>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <figure className="review-card" key={review.name}>
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>{review.quote}</blockquote>
              <figcaption>
                <span className="review-initials" aria-hidden="true">
                  {review.name.split(" ").map((part) => part[0]).join("")}
                </span>
                <span><strong>{review.name}</strong><small>{review.city}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section process-section" id="how-it-works">
        <div className="section-heading centered">
          <p className="eyebrow eyebrow-centered"><span /> Useful information before contact</p>
          <h2>One ZIP. Three <em>simple steps.</em></h2>
        </div>
        <div className="process-grid">
          <article>
            <span className="process-step">01</span>
            <div className="process-icon" aria-hidden="true">⌖</div>
            <h3>Enter your ZIP</h3>
            <p>We identify the likely public water supplier. Confirm it against the provider shown on your current bill.</p>
          </article>
          <article>
            <span className="process-step">02</span>
            <div className="process-icon" aria-hidden="true">≋</div>
            <h3>Read the public-data report</h3>
            <p>See selected monitoring context in plain English and a system starting point with clear limitations.</p>
          </article>
          <article>
            <span className="process-step">03</span>
            <div className="process-icon" aria-hidden="true">$</div>
            <h3>See price and financing</h3>
            <p>Use household and bathroom details to see the installed-price path, then call, finance, or request follow-up.</p>
          </article>
        </div>
      </section>

      <section className="quote-band">
        <div>
          <span>Free · No signup · About two minutes</span>
          <h2>See your report, system, and installed price.</h2>
          <p>No in-home sales appointment or lab sample is required to view the public-data report. Financing is available; lender terms control.</p>
        </div>
        <Link className="quote-band-call" href="/water-check">
          <small>Start with your ZIP</small>
          <strong>Free Water Report</strong>
          <span>See my report →</span>
        </Link>
      </section>

      <section className="section local-section" id="service-area">
        <div className="local-copy">
          <p className="eyebrow"><span /> Local water system installation</p>
          <h2>Serving California&apos;s <em>Central Valley.</em></h2>
          <p>
            Central Valley Pure Water is based in Modesto and serves homeowners
            across the region with water softeners, reverse osmosis drinking
            water systems, whole-home packages, and property-specific well-water solutions.
          </p>
          <div className="location-card">
            <span aria-hidden="true">⌖</span>
            <div>
              <strong>Modesto office &amp; warehouse</strong>
              <p>1620 N Carpenter Rd, Suite A5<br />Modesto, CA 95351</p>
              <small>Appointment only · Not a retail showroom</small>
            </div>
          </div>
          <PhoneButton className="local-call">Check service availability</PhoneButton>
        </div>
        <div className="areas-card">
          <p>Featured service areas</p>
          <div className="city-grid">
            {serviceAreas.map((city) => city.href ? (
              <Link href={city.href} key={city.name} aria-label={`Explore water systems in ${city.name}`}>
                {city.name}<b>→</b>
              </Link>
            ) : (
              <a href={phoneHref} key={city.name} aria-label={`Call about water systems in ${city.name}`}>
                {city.name}<b>→</b>
              </a>
            ))}
          </div>
          <p className="areas-note">
            Looking for a water softener or reverse osmosis system near you?
            Call to confirm service in your neighborhood.
          </p>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading centered">
          <p className="eyebrow eyebrow-centered"><span /> Straight answers</p>
          <h2>Water system <em>questions.</em></h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>How do I know which water system I need?<span>+</span></summary>
            <p>Start with the <Link href="/water-check">free Water Report</Link>. It identifies the likely supplier, summarizes selected public monitoring context, and shows a practical system starting point. Final fit still depends on the current provider, home demand, plumbing, and exact equipment.</p>
          </details>
          <details>
            <summary>Do you install both water softeners and reverse osmosis systems?<span>+</span></summary>
            <p>Yes. We offer whole-home water softening, under-sink reverse osmosis drinking water systems, and complete packages that combine both.</p>
          </details>
          <details>
            <summary>Do you work with city and private-well water?<span>+</span></summary>
            <p>Yes. Private-well conditions vary by property, so well-water recommendations begin with an assessment of the home and water concerns.</p>
          </details>
          <details>
            <summary>How do I get the current special price?<span>+</span></summary>
            <p>The free Water Report shows the installed-price path after household sizing: Standard $3,495, Standard Plus $3,995, and Dual Tank Full $5,495. Standard-installation scope and exclusions apply; property conditions can change the final written proposal.</p>
          </details>
          <details>
            <summary>Is financing available?<span>+</span></summary>
            <p>Yes. Review <Link href="/financing">financing options</Link> after pricing. Approval, rates, terms, fees, and monthly payments depend on the lender and applicant.</p>
          </details>
          <details>
            <summary>What can add to installation cost?<span>+</span></summary>
            <p>Tax, permits, electrical work, trenching, code upgrades, removal of existing equipment, major plumbing changes, and difficult installation conditions are not included in standard installation and may cost extra.</p>
          </details>
        </div>
        <div className="faq-call">
          <div><strong>Still have a question?</strong><span>Talk directly with our local team.</span></div>
          <a href={phoneHref}>Call {phoneDisplay} <span>→</span></a>
        </div>
      </section>

      <AffiliatePartners />

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <BrandMark inverse />
            <p>Water softening, reverse osmosis, and whole-home water solutions for California&apos;s Central Valley.</p>
            <a href={phoneHref}>{phoneDisplay}</a>
          </div>
          <div>
            <h3>Systems</h3>
            <Link href="/services">Compare all services</Link>
            <Link href="/services/water-softeners">Water softeners</Link>
            <Link href="/services/reverse-osmosis">Reverse osmosis</Link>
            <Link href="/services/well-water-treatment">Well water solutions</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/water-check">Free California water check</Link>
            <a href="#reviews">Customer reviews</a>
            <a href="#how-it-works">How it works</a>
            <Link href="/areas">Service areas</Link>
            <a href="#affiliates">Affiliate partners</a>
            <a href="#faq">FAQ</a>
            <a href="/call-for-pricing">Call for pricing</a>
          </div>
          <div>
            <h3>Visit</h3>
            <p>1620 N Carpenter Rd<br />Suite A5<br />Modesto, CA 95351</p>
            <small>Office &amp; warehouse<br />Appointment only</small>
            <p className="footer-hours">Mon–Fri · 8 AM–6 PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Central Valley Pure Water LLC. All rights reserved.</p>
          <p>Special pricing subject to system selection and installation conditions.</p>
        </div>
      </footer>

      <a className="mobile-call-bar" href={phoneHref}>
        <span aria-hidden="true">☎</span>
        <span><small>Special pricing · Tap to call</small><strong>{phoneDisplay}</strong></span>
      </a>
    </main>
  );
}
