/**
 * Single source of truth for everything shop-specific.
 * Edit THIS file (not the pages) when the shop's details change.
 * Items marked TODO are not yet confirmed - the site hides or softens them until you fill them in.
 */
export const site = {
  name: "Medical Junction",
  tagline: "Your Health, Our Priority",
  description:
    "Medical Junction - pharmacy and healthcare store in Hanumangarh, Rajasthan. Medicines, healthcare products, personal care and wellness essentials.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",

  /** "opening-soon" | "open" - changes the announcement bar and hero badge */
  status: "open" as "opening-soon" | "open",
  openingDate: null as string | null, // e.g. "2026-12-01"  (TODO: confirm)

  contact: {
    phones: [{ label: "80059 33533", tel: "+918005933533" }],
    whatsapp: "918005933533", // international format, no +
    email: "" as string, // TODO: add shop e-mail
  },

  address: {
    // TODO: replace with the full street address - used on the site, in the map and in Google structured data.
    line1: "Medical Junction",
    area: "",
    city: "Hanumangarh",
    region: "Rajasthan",
    postalCode: "",
    country: "IN",
    /** Exact coordinates make the map pin and Google local result exact. TODO: add from Google Maps (right-click the shop > copy coordinates). */
    geo: { lat: 29.60889037181122, lng: 74.2953545803483 } as { lat: number; lng: number } | null,
    /** Text Google Maps searches for. Replace with the full address or the shop's Google Maps name. */
    mapQuery: "Medical Junction, Hanumangarh, Rajasthan",
    /** Paste the shop's "Share > Copy link" URL from Google Maps here once the listing exists. */
    mapsUrl: "" as string,
    /** Paste "Write a review" link from Google Business Profile here to collect Google reviews. */
    googleReviewUrl: "" as string,
  },

  hours: [
    // TODO: confirm real timings. Schema.org day names.
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "21:30" },
    { days: ["Sunday"], opens: "10:00", closes: "14:00" },
  ] as { days: string[]; opens: string; closes: string }[],
  hoursConfirmed: false,

  /** Drug licence details, shown in the Quality section only when filled in. TODO */
  licence: {
    drugLicenceNo: "" as string,
    gstin: "" as string,
    pharmacist: "" as string,
    pharmacistRegNo: "" as string,
  },

  social: {
    instagram: "" as string,
    facebook: "" as string,
    youtube: "" as string,
  },

  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/offers", label: "Offers" },
    { href: "/quality", label: "Quality" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export function fullAddress(): string {
  const a = site.address;
  return [a.line1, a.area, a.city, a.region, a.postalCode].filter(Boolean).join(", ");
}

export function mapsEmbedUrl(): string {
  const g = site.address.geo;
  const q = g ? `${g.lat},${g.lng}` : site.address.mapQuery;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`;
}

export function mapsLink(): string {
  if (site.address.mapsUrl) return site.address.mapsUrl;
  const g = site.address.geo;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(g ? `${g.lat},${g.lng}` : site.address.mapQuery)}`;
}

export function directionsLink(): string {
  const g = site.address.geo;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(g ? `${g.lat},${g.lng}` : site.address.mapQuery)}`;
}

export function whatsappLink(text = "Hello Medical Junction, I would like to ask about a product."): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
