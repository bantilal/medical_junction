"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/catalog";

export function ProductBrowser({ products, categories, initialCategory = "all" }: { products: Product[]; categories: { slug: string; name: string }[]; initialCategory?: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(initialCategory);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return products.filter((p) => (cat === "all" || p.category === cat) && (!t || `${p.name} ${p.summary} ${p.brand ?? ""}`.toLowerCase().includes(t)));
  }, [products, q, cat]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-96">
          <label htmlFor="psearch" className="sr-only">Search products</label>
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input id="psearch" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="input !pl-10" />
        </div>
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {[{ slug: "all", name: "All" }, ...categories].map((c) => (
            <button
              key={c.slug} type="button" aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}
              className={`min-h-10 rounded-full border px-4 text-sm font-medium transition ${cat === c.slug ? "border-brand-700 bg-brand-700 text-white" : "border-line bg-white text-ink hover:border-brand-600 hover:bg-brand-50"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm text-muted" aria-live="polite">{list.length} product{list.length === 1 ? "" : "s"}</p>
      {list.length ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => <li key={p.slug}><ProductCard p={p} /></li>)}
        </ul>
      ) : (
        <p className="card mt-4 p-10 text-center text-muted">No product matches your search. Call or WhatsApp us - we may still have it.</p>
      )}
    </div>
  );
}
