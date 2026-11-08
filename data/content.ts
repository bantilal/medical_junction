/** Offers, FAQs and trust copy. Offers must be real and approved by the shop. */
export interface Offer {
  id: string;
  title: string;
  description: string;
  badge?: string; // e.g. "10% OFF"
  validUntil?: string; // ISO date; offer disappears automatically afterwards
  category?: string;
  active: boolean;
}

/**
 * No offers are published yet on purpose. Add real offers here (active: true) when you are ready.
 * Medicine advertising rules in India restrict promoting prescription medicines, so offers should
 * normally cover personal care, wellness and healthcare devices only.
 */
export const offers: Offer[] = [
  // {
  //   id: "opening-week",
  //   title: "Grand Opening Week",
  //   description: "Special savings on personal care and wellness essentials during opening week.",
  //   badge: "OPENING OFFER",
  //   validUntil: "2026-12-31",
  //   active: true,
  // },
];

export function activeOffers(now = new Date()): Offer[] {
  return offers.filter((o) => o.active && (!o.validUntil || new Date(o.validUntil + "T23:59:59") >= now));
}

export const faqs = [
  {
    q: "Do you sell prescription medicines?",
    a: "Prescription medicines are dispensed only against a valid prescription from a registered medical practitioner and under the supervision of a registered pharmacist. We do not dispense prescription medicines through this website.",
  },
  {
    q: "Can I order online?",
    a: "Not yet. This website is for information - browse products, then call, WhatsApp or visit us to check availability.",
  },
  {
    q: "How do I know a product is genuine?",
    a: "We buy from authorised distributors, keep purchase records, and you are welcome to check the batch number and expiry date on any product before you buy.",
  },
  {
    q: "Are the prices on the website final?",
    a: "Prices and offers are shown only when confirmed by the shop and can change. Please confirm the current price in store or on call.",
  },
  {
    q: "Where is Medical Junction located?",
    a: "We are in Hanumangarh, Rajasthan. See the Contact page for the address, map and directions.",
  },
  {
    q: "Can your pharmacist give medical advice?",
    a: "Our pharmacist can explain how to use a product and answer general questions. For diagnosis or treatment, please consult your doctor.",
  },
];

export const qualityPoints = [
  { title: "Authorised suppliers", text: "Products are sourced from authorised distributors and manufacturers, with purchase records kept." },
  { title: "Batch & expiry checks", text: "Every product is checked for batch number, manufacturing and expiry date before it reaches the shelf." },
  { title: "Proper storage", text: "Medicines and health products are stored as the manufacturer directs - away from heat, moisture and sunlight." },
  { title: "Licensed & compliant", text: "We follow the Drugs and Cosmetics Act requirements that apply to retail pharmacies. Licence details are shown below when published." },
  { title: "Pharmacist guidance", text: "Ask our pharmacist about usage, storage and safety of any product." },
  { title: "Customer safety first", text: "Prescription medicines only on a valid prescription. We would rather say no than risk your health." },
];
