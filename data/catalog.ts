/**
 * Product catalogue. Edit here (or move to a database in Phase 2).
 * RULES: only add real products the shop stocks. `price` / `offerPrice` are in rupees and stay
 * `null` until verified. Never add prescription-only (Schedule H/H1/X) medicines or health claims.
 * The items below are ILLUSTRATIVE starter entries - replace them with real stock and photos.
 */
export type CategorySlug = "medicines" | "healthcare-products" | "personal-care" | "wellness-essentials";
export type ArtKind =
  | "pills" | "thermometer" | "sanitizer" | "firstaid" | "bpmonitor" | "glucometer"
  | "vitamin" | "mask" | "bandage" | "toothpaste" | "soap" | "ors";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  art: ArtKind;
  tone: "green" | "blue" | "teal" | "amber";
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  brand?: string;
  summary: string;
  description: string;
  art: ArtKind;
  image?: string; // /images/products/xyz.jpg once you have real photos
  price: number | null;
  offerPrice: number | null;
  availability: "in-stock" | "check-with-store";
  featured?: boolean;
  needsPharmacist?: boolean;
  details: string[];
}

export const categories: Category[] = [
  {
    slug: "medicines",
    name: "Medicines",
    short: "Trusted medicines for better health",
    description:
      "General and over-the-counter medicines from authorised suppliers. Prescription medicines are dispensed only against a valid prescription and under pharmacist supervision.",
    art: "pills",
    tone: "green",
  },
  {
    slug: "healthcare-products",
    name: "Healthcare Products",
    short: "Stay prepared, stay healthy",
    description: "Monitoring devices, first aid and everyday healthcare equipment for the home.",
    art: "glucometer",
    tone: "blue",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    short: "Care for you, every day",
    description: "Hygiene and daily-care essentials for the whole family.",
    art: "sanitizer",
    tone: "teal",
  },
  {
    slug: "wellness-essentials",
    name: "Wellness Essentials",
    short: "Boost your wellness naturally",
    description: "Everyday nutrition and wellness supplements. Supplements do not replace a balanced diet.",
    art: "vitamin",
    tone: "amber",
  },
];

export const products: Product[] = [
  {
    slug: "vitamin-c-tablets",
    name: "Vitamin C Tablets",
    category: "wellness-essentials",
    summary: "Everyday vitamin supplement.",
    description: "A daily vitamin C supplement. Ask our pharmacist which brands and pack sizes we currently stock.",
    art: "vitamin",
    price: null, offerPrice: null, availability: "check-with-store", featured: true,
    details: ["Dietary supplement", "Not a substitute for a varied diet", "Check expiry and batch at the counter"],
  },
  {
    slug: "digital-thermometer",
    name: "Digital Thermometer",
    category: "healthcare-products",
    summary: "Quick-read digital body thermometer.",
    description: "A simple digital thermometer for home use. Ask in store for available brands and warranty details.",
    art: "thermometer",
    price: null, offerPrice: null, availability: "check-with-store", featured: true,
    details: ["For home use", "Follow the manufacturer's instructions", "Ask about warranty at the counter"],
  },
  {
    slug: "hand-sanitizer",
    name: "Hand Sanitizer",
    category: "personal-care",
    summary: "Alcohol-based hand sanitizer for daily hygiene.",
    description: "Hand sanitizers in pocket and family sizes. Check labels for alcohol content and keep away from children.",
    art: "sanitizer",
    price: null, offerPrice: null, availability: "check-with-store", featured: true,
    details: ["For external use only", "Keep away from children", "Avoid contact with eyes"],
  },
  {
    slug: "first-aid-kit",
    name: "First Aid Kit",
    category: "healthcare-products",
    summary: "Home and travel first aid essentials.",
    description: "Ready-made first aid kits and refills for home, office and travel.",
    art: "firstaid",
    price: null, offerPrice: null, availability: "check-with-store", featured: true,
    details: ["Home / travel / office kits", "Refills available on request", "Check contents and expiry dates regularly"],
  },
  {
    slug: "bp-monitor",
    name: "Blood Pressure Monitor",
    category: "healthcare-products",
    summary: "Digital blood pressure monitor for home use.",
    description: "Home BP monitors from reputed brands. Readings are for information - consult your doctor about results.",
    art: "bpmonitor",
    price: null, offerPrice: null, availability: "check-with-store",
    details: ["For home monitoring", "Discuss readings with your doctor", "Ask about calibration and warranty"],
  },
  {
    slug: "glucometer",
    name: "Glucometer & Strips",
    category: "healthcare-products",
    summary: "Blood glucose meters and test strips.",
    description: "Glucose meters and compatible strips. Please carry your doctor's advice - we are happy to explain how to use the device.",
    art: "glucometer",
    price: null, offerPrice: null, availability: "check-with-store", needsPharmacist: true,
    details: ["Compatible strips must match the meter", "Check strip expiry before use", "Pharmacist can demonstrate usage"],
  },
  {
    slug: "face-masks",
    name: "Face Masks",
    category: "personal-care",
    summary: "Disposable and reusable masks.",
    description: "Everyday protective masks for the family. Ask for sizes and types in store.",
    art: "mask",
    price: null, offerPrice: null, availability: "check-with-store",
    details: ["Disposable and reusable options", "Dispose of used masks safely"],
  },
  {
    slug: "bandages-dressings",
    name: "Bandages & Dressings",
    category: "healthcare-products",
    summary: "Adhesive bandages, gauze and dressings.",
    description: "Basic wound-care supplies for minor cuts and scrapes. For serious wounds, see a doctor.",
    art: "bandage",
    price: null, offerPrice: null, availability: "check-with-store",
    details: ["Sterile packs", "Check pack is sealed", "Seek medical help for deep wounds"],
  },
  {
    slug: "oral-care",
    name: "Oral Care",
    category: "personal-care",
    summary: "Toothpaste, brushes and mouth care.",
    description: "Daily oral-care products for adults and children from trusted brands.",
    art: "toothpaste",
    price: null, offerPrice: null, availability: "check-with-store",
    details: ["Adult and kids ranges", "Ask for dentist-recommended options"],
  },
  {
    slug: "soaps-body-wash",
    name: "Soaps & Body Wash",
    category: "personal-care",
    summary: "Gentle daily cleansing essentials.",
    description: "A range of soaps and body washes for everyday use.",
    art: "soap",
    price: null, offerPrice: null, availability: "check-with-store",
    details: ["Skin-friendly options on request"],
  },
  {
    slug: "oral-rehydration-salts",
    name: "Oral Rehydration Salts (ORS)",
    category: "medicines",
    summary: "Fluid and electrolyte replacement sachets.",
    description: "ORS sachets are commonly kept at home. Follow the label for preparation and consult a doctor if symptoms persist.",
    art: "ors",
    price: null, offerPrice: null, availability: "check-with-store", needsPharmacist: true,
    details: ["Prepare exactly as directed on the pack", "Consult a doctor if symptoms continue"],
  },
  {
    slug: "multivitamin",
    name: "Multivitamin Supplements",
    category: "wellness-essentials",
    summary: "Daily multivitamin and mineral supplements.",
    description: "Multivitamins for adults, seniors and children. Ask the pharmacist which option suits your needs.",
    art: "pills",
    price: null, offerPrice: null, availability: "check-with-store", needsPharmacist: true,
    details: ["Do not exceed the stated dose", "Not a substitute for a balanced diet"],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const featuredProducts = () => products.filter((p) => p.featured);

export function discountPercent(p: Pick<Product, "price" | "offerPrice">): number | null {
  if (p.price && p.offerPrice && p.offerPrice < p.price) return Math.round(((p.price - p.offerPrice) / p.price) * 100);
  return null;
}
