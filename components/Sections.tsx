import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, CalendarClock, HeartPulse, Headphones, ShieldCheck, Tag, Gift, FileCheck2 } from "lucide-react";
import { categories } from "@/data/catalog";
import { activeOffers, qualityPoints } from "@/data/content";
import { site, whatsappLink } from "@/config/site";
import { ProductArt } from "./ProductArt";
import { LogoMark } from "./Logo";

export function Hero() {
  const soon = site.status === "opening-soon";
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-100 via-white to-brand-50">
      <div aria-hidden className="absolute -left-24 top-10 size-80 rounded-full bg-brand-200/60 blur-3xl" />
      <div aria-hidden className="absolute -right-16 bottom-0 size-96 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="container-x relative grid grid-cols-[minmax(0,1fr)] items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="animate-rise">
          <span className="eyebrow"><HeartPulse size={14} aria-hidden /> {soon ? "Opening soon in Hanumangarh" : "Now open in Hanumangarh"}</span>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.1] text-brand-900 sm:text-5xl lg:text-6xl">
            Your Trusted Partner in <span className="text-brand-600">Everyday Healthcare</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Medical Junction is a pharmacy and healthcare store in Hanumangarh, Rajasthan. Discover medicines, healthcare products, wellness essentials and personal care - genuine products, honest advice, and a pharmacy that puts your health first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary px-6 py-3 text-base">Explore Products <ArrowRight size={18} aria-hidden /></Link>
            <Link href="/contact" className="btn-outline px-6 py-3 text-base">Contact Our Store</Link>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-brand-800">
            {["Authorised suppliers", "Batch & expiry checked", "Pharmacist guidance"].map((t) => (
              <li key={t} className="flex items-center gap-2"><BadgeCheck size={18} className="text-brand-600" aria-hidden /> {t}</li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full min-w-0 max-w-md animate-rise [animation-delay:150ms]">
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-lift">
            <Image src="/images/store-interior.webp" alt="Medical Junction signboard: Your Health, Our Priority" width={1672} height={941} priority className="h-28 w-full object-cover object-top sm:h-32" sizes="(min-width:1024px) 40vw, 90vw" />
            <div className="relative grid place-items-center bg-gradient-to-b from-brand-50 to-brand-200 px-6 py-10">
              <div className="flex w-full items-end justify-center gap-1 sm:gap-2">
                <ProductArt kind="pills" className="aspect-square w-1/4 max-w-28" />
                <ProductArt kind="firstaid" className="aspect-square w-1/3 max-w-36" />
                <ProductArt kind="sanitizer" className="aspect-square w-1/4 max-w-28" />
              </div>
              <p className="mt-2 font-heading text-lg font-semibold text-brand-900">Your Health, Our Priority</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const tones = {
  green: "from-brand-100 to-brand-200/70",
  blue: "from-sky-50 to-sky-100",
  teal: "from-teal-50 to-cyan-100",
  amber: "from-amber-50 to-lime-100",
} as const;

export function StorePreview() {
  return (
    <section className="section pt-0" aria-labelledby="preview">
      <div className="container-x">
        <h2 id="preview" className="sr-only">Step inside Medical Junction</h2>
        <figure className="overflow-hidden rounded-3xl border border-line shadow-lift">
          <Image
            src="/images/store-interior.webp"
            alt="Medical Junction store design: green and white pharmacy with shelves for Medicines, Healthcare Products, Personal Care and Wellness Essentials"
            width={1672}
            height={941}
            className="h-auto w-full"
            sizes="(min-width:1280px) 1216px, 100vw"
          />
          <figcaption className="bg-brand-50 px-5 py-3 text-xs text-muted">Medical Junction - illustration of our store design.</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function CategoryGrid() {
  return (
    <section className="section" aria-labelledby="cats">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="cats" className="h-title">Shop by Category</h2>
            <p className="mt-3 text-muted">Everything for everyday health, in one place.</p>
          </div>
          <Link href="/products" className="btn-outline">View All Categories <ArrowRight size={16} aria-hidden /></Link>
        </div>
        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/products/category/${c.slug}`} className={`group flex h-full flex-col rounded-2xl border border-line bg-gradient-to-br ${tones[c.tone]} p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lift`}>
                <ProductArt kind={c.art} className="h-28 w-28 self-center transition group-hover:scale-105" />
                <h3 className="mt-3 font-heading text-lg font-bold text-brand-900">{c.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted">{c.short}</p>
                <span className="mt-4 inline-flex size-9 items-center justify-center self-end rounded-full bg-brand-800 text-white transition group-hover:translate-x-1"><ArrowRight size={16} aria-hidden /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function OffersSection({ full = false }: { full?: boolean }) {
  const list = activeOffers();
  return (
    <section className={full ? "" : "section pt-0"} aria-labelledby="offers">
      <div className={full ? "" : "container-x"}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-brand-600 p-7 text-white sm:p-10">
          <Gift aria-hidden className="absolute -right-6 -top-6 size-48 rotate-12 text-white/10" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-200"><Tag size={14} aria-hidden /> Special offers</span>
              <h2 id="offers" className="mt-2 font-heading text-3xl font-bold">Healthy Choices. Special Offers.</h2>
              <p className="mt-2 text-brand-100">
                {list.length ? "Genuine deals, approved by our shop, on products you use every day." : "New offers are added here regularly. Ask us in store or on WhatsApp for the latest deals."}
              </p>
            </div>
            <Link href="/offers" className="btn-light shrink-0">{list.length ? "Shop Offers" : "Ask About Offers"} <ArrowRight size={16} aria-hidden /></Link>
          </div>
          {list.length > 0 && (
            <ul className="relative mt-8 grid gap-4 md:grid-cols-3">
              {list.slice(0, full ? 99 : 3).map((o) => (
                <li key={o.id} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  {o.badge && <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-brand-950">{o.badge}</span>}
                  <h3 className="mt-3 font-heading text-lg font-semibold">{o.title}</h3>
                  <p className="mt-1 text-sm text-brand-100">{o.description}</p>
                  {o.validUntil && <p className="mt-3 flex items-center gap-1.5 text-xs text-brand-200"><CalendarClock size={14} aria-hidden /> Valid till {new Date(o.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  const items = [
    { icon: ShieldCheck, t: "Quality Assurance", d: "Focus on genuine products and strict quality checks." },
    { icon: BadgeCheck, t: "Trusted Products", d: "Sourced through authorised distributors and brands." },
    { icon: HeartPulse, t: "Healthcare Focus", d: "Responsible, caring service for the whole family." },
    { icon: Headphones, t: "Customer Support", d: "Friendly help for everyday healthcare needs." },
  ];
  return (
    <section className="section bg-brand-50" aria-labelledby="why">
      <div className="container-x">
        <div className="text-center">
          <h2 id="why" className="h-title center">Why choose Medical Junction?</h2>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: I, t, d }) => (
            <li key={t} className="card p-6 text-center transition hover:-translate-y-1 hover:shadow-lift">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-100 text-brand-700"><I size={28} aria-hidden /></span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-brand-900">{t}</h3>
              <p className="mt-1.5 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function QualityBlock({ showLicence = false }: { showLicence?: boolean }) {
  const l = site.licence;
  const hasLicence = Boolean(l.drugLicenceNo || l.gstin || l.pharmacist);
  return (
    <section className="section" aria-labelledby="quality">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow"><FileCheck2 size={14} aria-hidden /> Quality & authenticity</span>
            <h2 id="quality" className="h-title mt-4">Genuine products. Honest practice.</h2>
            <p className="mt-4 text-muted">Trust is earned at the counter. These are the standards we hold ourselves to - we only make claims we can back with documents.</p>
            <Link href="/quality" className="btn-outline mt-6">Our quality promise <ArrowRight size={16} aria-hidden /></Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {qualityPoints.map((q) => (
              <li key={q.title} className="card flex gap-3 p-5">
                <BadgeCheck className="mt-0.5 shrink-0 text-brand-600" size={22} aria-hidden />
                <div><h3 className="font-heading font-semibold text-brand-900">{q.title}</h3><p className="mt-1 text-sm text-muted">{q.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
        {showLicence && (
          <div className="card mt-10 p-6">
            <h3 className="font-heading text-lg font-semibold text-brand-900">Licence & registration details</h3>
            {hasLicence ? (
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                {l.drugLicenceNo && <div><dt className="text-muted">Drug licence no.</dt><dd className="font-semibold">{l.drugLicenceNo}</dd></div>}
                {l.gstin && <div><dt className="text-muted">GSTIN</dt><dd className="font-semibold">{l.gstin}</dd></div>}
                {l.pharmacist && <div><dt className="text-muted">Registered pharmacist</dt><dd className="font-semibold">{l.pharmacist}{l.pharmacistRegNo ? ` (Reg. ${l.pharmacistRegNo})` : ""}</dd></div>}
              </dl>
            ) : (
              <p className="mt-2 text-sm text-muted">Licence and registration details will be displayed here once published by the shop. We do not claim certification or approvals that we cannot show documents for.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function AboutSplit() {
  return (
    <section className="section bg-brand-50" aria-labelledby="about">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <Image src="/images/store-interior.webp" alt="Medical Junction pharmacy shelves and counter" width={1672} height={941} className="row-span-2 h-full min-h-64 w-full rounded-2xl object-cover object-[70%_50%] shadow-card" sizes="(min-width:1024px) 25vw, 50vw" />
          <Image src="/images/store-interior.webp" alt="Medical Junction signboard" width={1672} height={941} className="h-40 w-full rounded-2xl object-cover object-top shadow-card" sizes="(min-width:1024px) 25vw, 50vw" />
          <div className="grid place-items-center rounded-2xl bg-brand-700 p-5 text-center text-white shadow-card">
            <LogoMark size={52} />
            <p className="mt-2 font-heading font-semibold">Your Health, Our Priority</p>
          </div>
        </div>
        <div>
          <h2 id="about" className="h-title">Your Health. Our Commitment.</h2>
          <p className="mt-5 leading-relaxed text-muted">
            Medical Junction is a neighbourhood pharmacy and healthcare store in Hanumangarh built around a simple idea: families should be able to find genuine medicines and healthcare products, and honest advice, under one roof.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            We keep the range focused, the shelves clean, the paperwork in order and the counter friendly - because when it comes to health, small details matter.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/about" className="btn-primary">About us</Link>
            <a href={whatsappLink()} className="btn-outline" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}
