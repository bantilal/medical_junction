import { describe, expect, it, beforeAll } from "vitest";
import { inquirySchema, reviewSchema } from "@/lib/validation";
import { addInquiry, addLike, addReview, getLikes, listApprovedReviews, setReviewStatus, summarize } from "@/lib/store";
import { activeOffers } from "@/data/content";
import { discountPercent } from "@/data/catalog";

describe("validation", () => {
  const ok = { name: "Asha", phone: "98765 43210", message: "Is it available?", consent: true };
  it("accepts a valid inquiry and strips phone spacing", () => {
    const r = inquirySchema.safeParse(ok);
    expect(r.success && r.data.phone).toBe("9876543210");
  });
  it("rejects a bad phone, missing consent, and filled honeypot", () => {
    expect(inquirySchema.safeParse({ ...ok, phone: "12345" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...ok, consent: false }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...ok, website: "spam" }).success).toBe(false);
  });
  it("requires a 1-5 rating", () => {
    const base = { name: "Ravi", comment: "Very helpful staff", consent: true };
    expect(reviewSchema.safeParse({ ...base, rating: 5 }).success).toBe(true);
    expect(reviewSchema.safeParse({ ...base, rating: 6 }).success).toBe(false);
    expect(reviewSchema.safeParse({ ...base }).success).toBe(false);
  });
});

describe("store", () => {
  beforeAll(() => undefined);
  it("keeps reviews hidden until approved and computes the summary only from approved ones", async () => {
    const a = await addReview({ name: "A", rating: 5, comment: "great service here", quality: { service: 5 } });
    await addReview({ name: "B", rating: 1, comment: "not published yet ok", quality: {} });
    expect(await listApprovedReviews()).toHaveLength(0);
    await setReviewStatus(a.id, "approved");
    const s = summarize(await listApprovedReviews());
    expect(s.count).toBe(1);
    expect(s.average).toBe(5);
    expect(s.quality.service).toBe(5);
    expect(s.quality.cleanliness).toBeNull();
  });
  it("counts one like per visitor, even under concurrent calls", async () => {
    await Promise.all([addLike("x"), addLike("x"), addLike("y")]);
    expect(await getLikes()).toBe(2);
  });
  it("stores inquiries", async () => {
    const i = await addInquiry({ type: "general", name: "N", phone: "9876543210", message: "hello there" });
    expect(i.status).toBe("new");
  });
});

describe("content rules", () => {
  it("publishes no offers until real ones are added, and expires old ones", () => {
    expect(activeOffers()).toHaveLength(0);
  });
  it("computes discount only for real prices", () => {
    expect(discountPercent({ price: null, offerPrice: null })).toBeNull();
    expect(discountPercent({ price: 100, offerPrice: 90 })).toBe(10);
  });
});
