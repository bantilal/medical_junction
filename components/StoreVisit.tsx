import Image from "next/image";
import { Clock, MapPin, MessageCircle, Navigation, Phone, ExternalLink, AlertCircle } from "lucide-react";
import { site, fullAddress, mapsEmbedUrl, mapsLink, directionsLink, whatsappLink } from "@/config/site";

const addressKnown = Boolean(site.address.area || site.address.postalCode || site.address.geo);

export function StoreVisit({ compact = false }: { compact?: boolean }) {
  const phone = site.contact.phones[0];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card flex flex-col p-6 sm:p-8">
        <h3 className="font-heading text-xl font-bold text-brand-900">Visit Medical Junction</h3>
        <p className="mt-1 text-muted">Your trusted neighbourhood healthcare destination.</p>
        <ul className="mt-6 space-y-5 text-sm">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 shrink-0 text-brand-600" size={20} aria-hidden />
            <div>
              <p className="font-semibold">Shop address</p>
              <p className="text-muted">{fullAddress()}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 shrink-0 text-brand-600" size={20} aria-hidden />
            <div>
              <p className="font-semibold">Phone</p>
              {site.contact.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`} className="block text-muted hover:text-brand-700">{p.label}</a>)}
            </div>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 shrink-0 text-brand-600" size={20} aria-hidden />
            <div>
              <p className="font-semibold">Opening hours</p>
              {site.hoursConfirmed ? (
                site.hours.map((h) => <p key={h.opens} className="text-muted">{h.days.length > 1 ? `${h.days[0]} - ${h.days.at(-1)}` : h.days[0]}: {h.opens} - {h.closes}</p>)
              ) : (
                <p className="text-muted">Please call us to confirm today&apos;s timings.</p>
              )}
            </div>
          </li>
        </ul>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <a href={directionsLink()} target="_blank" rel="noopener noreferrer" className="btn-primary"><Navigation size={16} aria-hidden /> Get Directions</a>
          <a href={`tel:${phone.tel}`} className="btn-outline"><Phone size={16} aria-hidden /> Call Now</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle size={16} aria-hidden /> WhatsApp</a>
          <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="btn-outline"><ExternalLink size={16} aria-hidden /> Google Maps</a>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card overflow-hidden">
          <iframe
            title="Medical Junction location on Google Maps"
            src={mapsEmbedUrl()}
            className={`w-full border-0 ${compact ? "h-64" : "h-80"}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <figure className="card overflow-hidden">
          <Image src="/images/store-interior.webp" alt="Medical Junction pharmacy with green and white signboard and shelves" width={1672} height={941} className="h-64 w-full object-cover object-top" sizes="(min-width:1024px) 40vw, 100vw" />
          <figcaption className="px-4 py-2.5 text-xs text-muted">Look for the green Medical Junction signboard.</figcaption>
        </figure>
      </div>
    </div>
  );
}
