import Link from "next/link";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { site, fullAddress } from "@/config/site";
import { categories } from "@/data/catalog";

function Brand({ d }: { d: string }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} fillRule="evenodd" /></svg>;
}

export function Footer() {
  const s = site.social;
  return (
    <footer className="mt-10 bg-brand-950 text-brand-100">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">{site.description}</p>
          <div className="mt-4 flex gap-2">
            {s.instagram && <a aria-label="Instagram" href={s.instagram} rel="noopener noreferrer" target="_blank" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Brand d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" /></a>}
            {s.facebook && <a aria-label="Facebook" href={s.facebook} rel="noopener noreferrer" target="_blank" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Brand d="M14 8V6.5c0-.8.4-1.5 1.5-1.5H17V2h-2.5C11.8 2 10 3.8 10 6.3V8H7.5v3H10v11h4V11h2.8l.7-3Z" /></a>}
            {s.youtube && <a aria-label="YouTube" href={s.youtube} rel="noopener noreferrer" target="_blank" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Brand d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5 3Z" /></a>}
          </div>
        </div>
        <div>
          <h2 className="font-heading text-base font-semibold text-white">Quick links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.nav.map((n) => <li key={n.href}><Link className="hover:text-white hover:underline" href={n.href}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-base font-semibold text-white">Categories</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => <li key={c.slug}><Link className="hover:text-white hover:underline" href={`/products/category/${c.slug}`}>{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-base font-semibold text-white">Visit us</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-300" aria-hidden />{fullAddress()}</li>
            {site.contact.phones.map((p) => (
              <li key={p.tel} className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0 text-brand-300" aria-hidden /><a className="hover:text-white" href={`tel:${p.tel}`}>{p.label}</a></li>
            ))}
            {site.contact.email && <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0 text-brand-300" aria-hidden /><a className="hover:text-white" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>}
            <li className="flex gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand-300" aria-hidden />
              {site.hoursConfirmed ? (
                <span>{site.hours.map((h) => <span key={h.opens} className="block">{h.days.length > 1 ? `${h.days[0].slice(0, 3)} - ${h.days.at(-1)!.slice(0, 3)}` : h.days[0].slice(0, 3)}: {h.opens} - {h.closes}</span>)}</span>
              ) : (
                <span>Call us to confirm today&apos;s timings</span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-5 text-xs text-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-xl">Information on this website is for general awareness only and is not medical advice. Prescription medicines are supplied only against a valid prescription.</p>
          <nav aria-label="Legal" className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/disclaimer" className="hover:text-white">Medical Disclaimer</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

