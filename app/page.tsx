import Image from "next/image";
import Link from "next/link";

import { AffiliatePartners } from "./affiliate-partners";
import { MobileMenu } from "./mobile-menu";

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
  { name: "Merced", href: null },
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
        <strong>Special pricing available now</strong>
        <span>Financing available · Call for your quote</span>
        <a href={phoneHref}>Call {phoneDisplay}</a>
      </div>

      <header className="site-header">
        <a className="brand" href="#top">
          <BrandMark />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
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
          <p className="eyebrow light-eyebrow"><span /> Central Valley water experts</p>
          <h1>Better water for<br /><em>your whole home.</em></h1>
          <p className="hero-lede">
            Water softeners, whole-home solutions, and reverse osmosis drinking
            systems—professionally installed by a local Central Valley team.
          </p>
          <div className="hero-actions">
            <PhoneButton>Call now for pricing</PhoneButton>
            <a className="button button-ghost" href="#systems">
              See our systems <span aria-hidden="true">↓</span>
            </a>
          </div>
          <ul className="hero-notes" aria-label="Service highlights">
            <li><span>✓</span> Special pricing available</li>
            <li><span>✓</span> Financing available</li>
            <li><span>✓</span> City &amp; well water</li>
          </ul>
        </div>
        <aside className="hero-offer">
          <span className="hero-offer-label">Current offer</span>
          <strong>Special system pricing</strong>
          <p>Call today for current pricing and a quote for your home.</p>
          <a href={phoneHref}>Get my price <span>→</span></a>
        </aside>
      </section>

      <section className="trust-strip" aria-label="Why homeowners call Central Valley Pure Water">
        <div><strong>Local</strong><span>Modesto-based team</span></div>
        <div><strong>Professional</strong><span>Clean installation</span></div>
        <div><strong>Simple</strong><span>Clear system guidance</span></div>
        <div><strong>Flexible</strong><span>Financing available</span></div>
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
        <PhoneButton className="button-dark">Talk to a water specialist</PhoneButton>
      </section>

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
            <p>One call can help you understand the options.</p>
          </div>
          <PhoneButton>Get a quote by phone</PhoneButton>
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
          <p className="eyebrow eyebrow-centered"><span /> Easy from start to finish</p>
          <h2>One call. Three <em>simple steps.</em></h2>
        </div>
        <div className="process-grid">
          <article>
            <span className="process-step">01</span>
            <div className="process-icon" aria-hidden="true">☎</div>
            <h3>Tell us what you notice</h3>
            <p>Call with your water source, household needs, and the concerns you are seeing at home.</p>
          </article>
          <article>
            <span className="process-step">02</span>
            <div className="process-icon" aria-hidden="true">⌂</div>
            <h3>Get a clear recommendation</h3>
            <p>We review your setup and explain practical system options, pricing, and financing availability.</p>
          </article>
          <article>
            <span className="process-step">03</span>
            <div className="process-icon" aria-hidden="true">✓</div>
            <h3>Schedule installation</h3>
            <p>Choose an appointment and our team will complete, test, and explain your new water system.</p>
          </article>
        </div>
      </section>

      <section className="quote-band">
        <div>
          <span>Limited-time special pricing</span>
          <h2>Get your home&apos;s price today.</h2>
          <p>Financing is available for qualified customers, subject to lender approval.</p>
        </div>
        <a className="quote-band-call" href={phoneHref}>
          <small>Tap or click to call</small>
          <strong>{phoneDisplay}</strong>
          <span>Get a quote now →</span>
        </a>
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
            <p>Start with a quick call. We will ask about your water source, household, current plumbing, and what you are noticing before discussing options.</p>
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
            <p>Call us at {phoneDisplay}. We will discuss the system you are interested in and provide current pricing based on the equipment and installation conditions.</p>
          </details>
          <details>
            <summary>Is financing available?<span>+</span></summary>
            <p>Financing is available for qualified customers and is subject to lender approval. Call us and we will explain the next step.</p>
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
