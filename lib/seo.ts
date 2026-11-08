import type { Metadata } from "next";
import { site, fullAddress, mapsLink } from "@/config/site";
import type { RatingSummary } from "@/lib/store";

export const abs = (p = "/") => new URL(p, site.url).toString();

/** Trim to a search-snippet length without cutting a word in half. */
export function clip(s: string, max = 155): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

export function pageMeta(opts: { title: string; description: string; path: string; image?: string }): Metadata {
  const description = clip(opts.description);
  // Pages that define their own openGraph replace the parent's, so the share image is set explicitly.
  const image = { url: opts.image ?? "/opengraph-image", width: 1200, height: 630, alt: `${site.name} - ${site.tagline}` };
  return {
    title: opts.title,
    description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: `${opts.title} | ${site.name}`,
      description,
      url: opts.path,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: `${opts.title} | ${site.name}`, description, images: [image.url] },
  };
}

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Pharmacy structured data. Rating is included ONLY when real approved reviews exist. */
export function pharmacyJsonLd(rating?: RatingSummary) {
  const a = site.address;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": abs("/#pharmacy"),
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: abs("/"),
    image: [abs("/images/store-interior.webp"), abs("/opengraph-image")],
    logo: abs("/icon.svg"),
    telephone: site.contact.phones[0]?.tel,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: [a.line1, a.area].filter(Boolean).join(", "),
      addressLocality: a.city,
      addressRegion: a.region,
      ...(a.postalCode ? { postalCode: a.postalCode } : {}),
      addressCountry: a.country,
    },
    ...(a.geo ? { geo: { "@type": "GeoCoordinates", latitude: a.geo.lat, longitude: a.geo.lng } } : {}),
    hasMap: mapsLink(),
    areaServed: { "@type": "City", name: a.city },
    priceRange: "$$",
    sameAs: Object.values(site.social).filter(Boolean),
  };
  if (site.hoursConfirmed) {
    data.openingHoursSpecification = site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days].sort((x, y) => DAY_ORDER.indexOf(x) - DAY_ORDER.indexOf(y)),
      opens: h.opens,
      closes: h.closes,
    }));
  }
  if (rating && rating.count > 0) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.average,
      reviewCount: rating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }
  void fullAddress;
  return data;
}

/** Rating-only fragment sharing the Pharmacy @id; emitted only when real approved reviews exist. */
export const ratingJsonLd = (r: RatingSummary) =>
  r.count > 0
    ? {
        "@context": "https://schema.org",
        "@type": "Pharmacy",
        "@id": abs("/#pharmacy"),
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.average, reviewCount: r.count, bestRating: 5, worstRating: 1 },
      }
    : null;

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": abs("/#website"),
  url: abs("/"),
  name: site.name,
  inLanguage: "en-IN",
  publisher: { "@id": abs("/#pharmacy") },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
