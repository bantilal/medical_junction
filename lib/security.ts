import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";

/** Simple in-memory sliding-window rate limit (per server instance). */
const hits = new Map<string, number[]>();
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    hits.set(key, arr);
    return false;
  }
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.length || now - v[v.length - 1] > windowMs) hits.delete(k);
  return true;
}

export async function clientId(): Promise<string> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "local";
  return createHash("sha256").update(`${ip}|${h.get("user-agent") ?? ""}|mj-salt`).digest("hex").slice(0, 32);
}

/** Reject cross-site form posts (CSRF) - the Origin host must match the Host header. */
export async function sameOrigin(): Promise<boolean> {
  const h = await headers();
  const origin = h.get("origin");
  if (!origin) return true; // same-origin GET-less fetches from some clients; cookies are SameSite=Strict anyway
  try {
    return new URL(origin).host === h.get("host");
  } catch {
    return false;
  }
}

// ---------- admin session (stateless, HMAC-signed cookie) ----------
const COOKIE = "mj_admin";
const secret = () => process.env.ADMIN_SESSION_SECRET || "";

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && secret().length >= 16);
}
export function checkPassword(input: string): boolean {
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(process.env.ADMIN_PASSWORD ?? "").digest();
  return adminConfigured() && timingSafeEqual(a, b);
}
export function makeSession(): string {
  const exp = Date.now() + 1000 * 60 * 60 * 8;
  const sig = createHmac("sha256", secret()).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}
export function verifySession(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = createHmac("sha256", secret()).update(exp).digest("hex");
  return sig.length === good.length && timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}
export const ADMIN_COOKIE = COOKIE;
