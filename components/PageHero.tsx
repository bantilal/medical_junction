import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function PageHero({ title, intro, crumbs }: { title: string; intro?: string; crumbs: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-100 via-white to-brand-50">
      <div aria-hidden className="absolute -right-20 -top-20 size-72 rounded-full bg-brand-200/50 blur-3xl" />
      <div className="container-x relative py-10 sm:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={14} aria-hidden />}
                {i === all.length - 1 ? <span aria-current="page" className="font-medium text-brand-800">{c.name}</span> : <Link href={c.path} className="hover:text-brand-700">{c.name}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-4 font-heading text-3xl font-extrabold text-brand-900 sm:text-5xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </section>
  );
}

export function Disclaimer({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{children}</p>;
}
