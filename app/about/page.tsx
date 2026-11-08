import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Target, HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { AboutSplit, WhyChoose } from "@/components/Sections";
import { StoreVisit } from "@/components/StoreVisit";
import { pageMeta } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description: "Medical Junction is a neighbourhood pharmacy and healthcare store in Jaipur - our story, mission and commitment to genuine products and caring service.",
  path: "/about",
});

export default function About() {
  const cards = [
    { icon: Target, t: "Our mission", d: "To make genuine medicines and healthcare products easy to find, with honest advice and fair service for every family." },
    { icon: Eye, t: "Our vision", d: "To be the most trusted neighbourhood healthcare destination in Jaipur." },
    { icon: HeartHandshake, t: "Our promise", d: "We put safety before sales. If a product needs a prescription or a doctor, we will say so." },
  ];
  return (
    <>
      <PageHero title="About Medical Junction" intro={site.tagline + " - a pharmacy built on trust."} crumbs={[{ name: "About", path: "/about" }]} />
      <AboutSplit />
      <section className="section">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-3">
            {cards.map(({ icon: I, t, d }) => (
              <li key={t} className="card p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-100 text-brand-700"><I size={24} aria-hidden /></span>
                <h2 className="mt-4 font-heading text-xl font-bold text-brand-900">{t}</h2>
                <p className="mt-2 text-muted">{d}</p>
              </li>
            ))}
          </ul>
          <figure className="mt-12 overflow-hidden rounded-3xl shadow-card">
            <Image src="/images/shop-banner.jpg" alt="Medical Junction banner - Quality Medicines, Better Health, Healthier Tomorrow" width={1178} height={239} className="w-full" sizes="100vw" />
          </figure>
        </div>
      </section>
      <WhyChoose />
      <section className="section">
        <div className="container-x">
          <h2 className="h-title">Find us</h2>
          <div className="mt-8"><StoreVisit compact /></div>
        </div>
      </section>
    </>
  );
}
