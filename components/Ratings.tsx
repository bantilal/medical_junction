import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Stars } from "./StarRating";
import { LikeButton } from "./LikeButton";
import { site } from "@/config/site";
import type { RatingSummary, Review } from "@/lib/store";

const QUALITY_LABELS: Record<string, string> = {
  genuineness: "Genuine products",
  service: "Staff & pharmacist service",
  cleanliness: "Cleanliness & storage",
  value: "Value for money",
};

export function RatingSummaryCard({ s, likes }: { s: RatingSummary; likes: number }) {
  const has = s.count > 0;
  return (
    <div className="card grid gap-8 p-6 sm:p-8 md:grid-cols-[auto_1fr_1fr] md:items-center">
      <div className="text-center md:px-4">
        {has ? (
          <>
            <p className="font-heading text-6xl font-extrabold text-brand-900">{s.average.toFixed(1)}</p>
            <div className="mt-1 flex justify-center"><Stars value={s.average} size={20} /></div>
            <p className="mt-1 text-sm text-muted">{s.count} verified review{s.count > 1 ? "s" : ""}</p>
          </>
        ) : (
          <>
            <p className="font-heading text-xl font-bold text-brand-900">No reviews yet</p>
            <p className="mt-1 max-w-[14rem] text-sm text-muted">Ratings appear here after customers share real experiences.</p>
          </>
        )}
        <div className="mt-4 flex justify-center"><LikeButton initial={likes} /></div>
      </div>

      <div aria-label="Rating breakdown">
        {[5, 4, 3, 2, 1].map((n) => {
          const c = s.distribution[n as 1 | 2 | 3 | 4 | 5];
          const pct = has ? (c / s.count) * 100 : 0;
          return (
            <div key={n} className="flex items-center gap-3 py-1 text-sm">
              <span className="w-10 text-muted">{n} star</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-brand-100"><div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} /></div>
              <span className="w-6 text-right text-muted">{c}</span>
            </div>
          );
        })}
      </div>

      <div>
        <p className="mb-3 font-heading text-sm font-semibold text-brand-900">Quality scores</p>
        <ul className="space-y-2.5">
          {(Object.keys(QUALITY_LABELS) as (keyof typeof QUALITY_LABELS)[]).map((k) => {
            const v = s.quality[k as keyof RatingSummary["quality"]];
            return (
              <li key={k} className="flex items-center justify-between gap-3 text-sm">
                <span>{QUALITY_LABELS[k]}</span>
                <span className="flex items-center gap-2">
                  {v ? <><Stars value={v} size={14} /><b className="w-7 text-right">{v.toFixed(1)}</b></> : <span className="text-muted">-</span>}
                </span>
              </li>
            );
          })}
        </ul>
        {site.address.googleReviewUrl && (
          <a href={site.address.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline">
            Also review us on Google <ExternalLink size={14} aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}

export function ReviewList({ reviews, limit }: { reviews: Review[]; limit?: number }) {
  const list = limit ? reviews.slice(0, limit) : reviews;
  if (!list.length)
    return (
      <p className="card p-8 text-center text-muted">
        Be the first to share your experience. <Link className="font-semibold text-brand-700 underline" href="/reviews#write">Write a review</Link>
      </p>
    );
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {list.map((r) => (
        <li key={r.id} className="card p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-heading font-semibold text-brand-900">{r.name}</p>
            <Stars value={r.rating} size={15} />
          </div>
          {r.product && <p className="mt-0.5 text-xs font-medium text-brand-600">About: {r.product}</p>}
          <p className="mt-3 text-sm leading-relaxed text-ink/90">{r.comment}</p>
          <p className="mt-3 text-xs text-muted">{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
        </li>
      ))}
    </ul>
  );
}
