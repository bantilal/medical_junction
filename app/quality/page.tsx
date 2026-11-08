import type { Metadata } from "next";
import { PageHero, Disclaimer } from "@/components/PageHero";
import { QualityBlock } from "@/components/Sections";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "Quality & Authenticity",
  description: "How Medical Junction keeps products genuine - authorised suppliers, batch and expiry checks, proper storage and pharmacist guidance.",
  path: "/quality",
});

const checks = [
  "Check the seal and packaging is intact",
  "Check batch number, manufacturing and expiry dates",
  "Ask for the bill - it records the supplier trail",
  "Ask the pharmacist about storage and usage",
];

export default function Quality() {
  return (
    <>
      <PageHero title="Quality & Authenticity" intro="What we do to make sure every product on our shelf is the real thing." crumbs={[{ name: "Quality", path: "/quality" }]} />
      <QualityBlock showLicence />
      <section className="section bg-brand-50 pt-10">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="h-title">How you can check, too</h2>
            <ul className="mt-6 space-y-3">
              {checks.map((c, i) => <li key={c} className="flex items-center gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">{i + 1}</span>{c}</li>)}
            </ul>
          </div>
          <div className="space-y-4">
            <Disclaimer>We do not claim "100% certified" or government approval. Where licences or certificates apply, they are listed above with their numbers once published.</Disclaimer>
            <div className="card p-6">
              <h3 className="font-heading font-semibold text-brand-900">Had a quality concern?</h3>
              <p className="mt-2 text-sm text-muted">If anything about a product or our service did not meet your expectations, please tell us so we can fix it.</p>
              <div className="mt-4 flex flex-wrap gap-3"><Link href="/reviews#write" className="btn-primary">Share quality feedback</Link><Link href="/contact" className="btn-outline">Contact the shop</Link></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
