"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Trash2, X } from "lucide-react";
import { Stars } from "./StarRating";
import type { Inquiry, RatingSummary, Review } from "@/lib/store";

export function AdminLogin() {
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  async function go(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    const d = await r.json();
    if (d.ok) router.refresh(); else setMsg(d.message);
  }
  return (
    <section className="section"><div className="container-x max-w-sm">
      <h1 className="font-heading text-2xl font-bold text-brand-900">Admin sign in</h1>
      <form onSubmit={go} className="card mt-6 space-y-4 p-6">
        <div><label htmlFor="pw" className="label">Password</label><input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="input" autoComplete="current-password" required /></div>
        {msg && <p role="alert" className="field-error">{msg}</p>}
        <button className="btn-primary w-full">Sign in</button>
      </form>
    </div></section>
  );
}

export function AdminPanel({ reviews, inquiries, likes, summary }: { reviews: Review[]; inquiries: Inquiry[]; likes: number; summary: RatingSummary }) {
  const router = useRouter();
  const [tab, setTab] = useState<"reviews" | "inquiries">("reviews");
  const [err, setErr] = useState("");

  async function act(kind: "review" | "inquiry", id: string, action: string) {
    if (action === "delete" && !confirm("Delete permanently? This cannot be undone.")) return;
    const r = await fetch("/api/admin/items", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, id, action }) });
    const d = await r.json();
    if (d.ok) { setErr(""); router.refresh(); } else setErr(d.message);
  }
  async function logout() { await fetch("/api/admin/login", { method: "DELETE" }); router.refresh(); }

  const pending = reviews.filter((r) => r.status === "pending").length;
  const fresh = inquiries.filter((i) => i.status === "new").length;

  return (
    <section className="section"><div className="container-x">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-3xl font-bold text-brand-900">Shop dashboard</h1>
        <button onClick={logout} className="btn-outline">Sign out</button>
      </div>
      <dl className="mt-6 grid gap-4 sm:grid-cols-4">
        {[["Average rating", summary.count ? summary.average.toFixed(1) : "-"], ["Approved reviews", summary.count], ["Likes", likes], ["Awaiting action", pending + fresh]].map(([k, v]) => (
          <div key={String(k)} className="card p-5"><dt className="text-sm text-muted">{k}</dt><dd className="mt-1 font-heading text-3xl font-bold text-brand-900">{v}</dd></div>
        ))}
      </dl>
      <div role="tablist" className="mt-8 flex gap-2">
        {(["reviews", "inquiries"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-brand-700 text-white" : "bg-brand-100 text-brand-800"}`}>
            {t === "reviews" ? `Reviews (${pending} pending)` : `Inquiries (${fresh} new)`}
          </button>
        ))}
      </div>
      {err && <p role="alert" className="field-error mt-3">{err}</p>}
      <ul className="mt-4 space-y-3">
        {tab === "reviews" && (reviews.length ? reviews.map((r) => (
          <li key={r.id} className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{r.name} <Stars value={r.rating} size={14} /></p>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.status === "approved" ? "bg-brand-100 text-brand-800" : r.status === "pending" ? "bg-amber-100 text-amber-900" : "bg-red-100 text-red-800"}`}>{r.status}</span>
            </div>
            <p className="mt-2 text-sm">{r.comment}</p>
            <p className="mt-1 text-xs text-muted">{new Date(r.createdAt).toLocaleString("en-IN")} {r.product ? `· ${r.product}` : ""}</p>
            <div className="mt-3 flex gap-2">
              {r.status !== "approved" && <button onClick={() => act("review", r.id, "approve")} className="btn-primary !min-h-9 !px-3"><Check size={14} /> Approve</button>}
              {r.status !== "rejected" && <button onClick={() => act("review", r.id, "reject")} className="btn-outline !min-h-9 !px-3"><X size={14} /> Reject</button>}
              <button onClick={() => act("review", r.id, "delete")} aria-label="Delete review" className="btn-outline !min-h-9 !px-3 !border-red-300 !text-red-700"><Trash2 size={14} /></button>
            </div>
          </li>
        )) : <li className="card p-8 text-center text-muted">No reviews yet.</li>)}
        {tab === "inquiries" && (inquiries.length ? inquiries.map((i) => (
          <li key={i.id} className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{i.name} · <a className="text-brand-700 underline" href={`tel:${i.phone}`}>{i.phone}</a></p>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${i.status === "new" ? "bg-amber-100 text-amber-900" : "bg-brand-100 text-brand-800"}`}>{i.status}</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-wide text-brand-600">{i.type}{i.product ? ` · ${i.product}` : ""}{i.email ? ` · ${i.email}` : ""}</p>
            <p className="mt-2 text-sm">{i.message}</p>
            <p className="mt-1 text-xs text-muted">{new Date(i.createdAt).toLocaleString("en-IN")}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => act("inquiry", i.id, i.status === "new" ? "done" : "new")} className="btn-primary !min-h-9 !px-3">{i.status === "new" ? "Mark done" : "Reopen"}</button>
              <button onClick={() => act("inquiry", i.id, "delete")} aria-label="Delete inquiry" className="btn-outline !min-h-9 !px-3 !border-red-300 !text-red-700"><Trash2 size={14} /></button>
            </div>
          </li>
        )) : <li className="card p-8 text-center text-muted">No inquiries yet.</li>)}
      </ul>
    </div></section>
  );
}
