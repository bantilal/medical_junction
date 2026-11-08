import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Tiny JSON-file store behind a repository interface.
 * Fine for a single-server shop site. To move to Postgres/Supabase later, only this file changes.
 * Writes are serialised and atomic (write temp file, then rename).
 */
const DIR = path.resolve(/*turbopackIgnore: true*/ process.env.DATA_DIR ?? "./data");

export type InquiryType = "product" | "general" | "location" | "offer";
export interface Inquiry {
  id: string;
  createdAt: string;
  type: InquiryType;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  message: string;
  status: "new" | "done";
}

export interface QualityScores {
  genuineness?: number;
  service?: number;
  cleanliness?: number;
  value?: number;
}
export interface Review {
  id: string;
  createdAt: string;
  name: string;
  rating: number;
  comment: string;
  product?: string;
  quality: QualityScores;
  status: "pending" | "approved" | "rejected";
}
interface Likes {
  count: number;
  voters: string[]; // salted hashes only - no raw IPs stored
}

const locks = new Map<string, Promise<unknown>>();

async function read<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(path.join(DIR, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function mutate<T, R>(file: string, fallback: T, fn: (data: T) => R | Promise<R>): Promise<R> {
  const prev = locks.get(file) ?? Promise.resolve();
  const run = prev.then(async () => {
    await fs.mkdir(DIR, { recursive: true });
    const data = await read<T>(file, fallback);
    const result = await fn(data);
    const tmp = path.join(DIR, `${file}.${randomUUID()}.tmp`);
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
    await fs.rename(tmp, path.join(DIR, file));
    return result;
  });
  locks.set(file, run.catch(() => undefined));
  return run;
}

// ---------- inquiries ----------
export async function addInquiry(i: Omit<Inquiry, "id" | "createdAt" | "status">): Promise<Inquiry> {
  const row: Inquiry = { ...i, id: randomUUID(), createdAt: new Date().toISOString(), status: "new" };
  await mutate<Inquiry[], void>("inquiries.json", [], (d) => { d.unshift(row); });
  return row;
}
export const listInquiries = () => read<Inquiry[]>("inquiries.json", []);
export async function setInquiryStatus(id: string, status: Inquiry["status"]) {
  return mutate<Inquiry[], boolean>("inquiries.json", [], (d) => {
    const r = d.find((x) => x.id === id);
    if (!r) return false;
    r.status = status;
    return true;
  });
}
export async function deleteInquiry(id: string) {
  return mutate<Inquiry[], boolean>("inquiries.json", [], (d) => {
    const i = d.findIndex((x) => x.id === id);
    if (i < 0) return false;
    d.splice(i, 1);
    return true;
  });
}

// ---------- reviews ----------
export async function addReview(r: Omit<Review, "id" | "createdAt" | "status">): Promise<Review> {
  const row: Review = { ...r, id: randomUUID(), createdAt: new Date().toISOString(), status: "pending" };
  await mutate<Review[], void>("reviews.json", [], (d) => { d.unshift(row); });
  return row;
}
export const listAllReviews = () => read<Review[]>("reviews.json", []);
export async function listApprovedReviews(): Promise<Review[]> {
  return (await listAllReviews()).filter((r) => r.status === "approved");
}
export async function setReviewStatus(id: string, status: Review["status"]) {
  return mutate<Review[], boolean>("reviews.json", [], (d) => {
    const r = d.find((x) => x.id === id);
    if (!r) return false;
    r.status = status;
    return true;
  });
}
export async function deleteReview(id: string) {
  return mutate<Review[], boolean>("reviews.json", [], (d) => {
    const i = d.findIndex((x) => x.id === id);
    if (i < 0) return false;
    d.splice(i, 1);
    return true;
  });
}

export interface RatingSummary {
  count: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  quality: Record<keyof QualityScores, number | null>;
}
export function summarize(reviews: Review[]): RatingSummary {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as RatingSummary["distribution"];
  let sum = 0;
  for (const r of reviews) {
    distribution[r.rating as 1 | 2 | 3 | 4 | 5]++;
    sum += r.rating;
  }
  const avg = (k: keyof QualityScores) => {
    const v = reviews.map((r) => r.quality[k]).filter((x): x is number => typeof x === "number");
    return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10 : null;
  };
  return {
    count: reviews.length,
    average: reviews.length ? Math.round((sum / reviews.length) * 10) / 10 : 0,
    distribution,
    quality: { genuineness: avg("genuineness"), service: avg("service"), cleanliness: avg("cleanliness"), value: avg("value") },
  };
}

// ---------- likes ----------
export async function getLikes(): Promise<number> {
  return (await read<Likes>("likes.json", { count: 0, voters: [] })).count;
}
/** Returns the new count and whether this visitor's like was newly added. */
export async function addLike(voterHash: string) {
  return mutate<Likes, { count: number; added: boolean }>("likes.json", { count: 0, voters: [] }, (d) => {
    if (d.voters.includes(voterHash)) return { count: d.count, added: false };
    d.voters.push(voterHash);
    if (d.voters.length > 20000) d.voters.shift();
    d.count += 1;
    return { count: d.count, added: true };
  });
}

