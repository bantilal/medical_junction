import type { MetadataRoute } from "next";
import { categories, products } from "@/data/catalog";
import { abs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const top = ["", "/about", "/products", "/offers", "/quality", "/reviews", "/contact", "/privacy", "/terms", "/disclaimer"];
  return [
    ...top.map((p) => ({ url: abs(p || "/"), lastModified: now, changeFrequency: (p === "" ? "weekly" : "monthly") as "weekly" | "monthly", priority: p === "" ? 1 : p.match(/privacy|terms|disclaimer/) ? 0.2 : 0.8 })),
    ...categories.map((c) => ({ url: abs(`/products/category/${c.slug}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...products.map((p) => ({ url: abs(`/products/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
