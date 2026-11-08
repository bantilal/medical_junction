import { Phone, Sparkles } from "lucide-react";
import { site } from "@/config/site";

export function AnnouncementBar() {
  const soon = site.status === "opening-soon";
  const p = site.contact.phones[0];
  return (
    <div className="bg-brand-900 text-xs text-white sm:text-sm">
      <div className="container-x flex items-center justify-between gap-3 py-2">
        <p className="flex items-center gap-2">
          <Sparkles size={14} className="shrink-0 text-brand-300" aria-hidden />
          <span>
            <strong className="font-semibold">Welcome to Medical Junction</strong>
            <span className="hidden sm:inline"> - {soon ? "Opening soon in Hanumangarh" : "Visit our store today"}</span>
          </span>
        </p>
        <a href={`tel:${p.tel}`} className="flex shrink-0 items-center gap-1.5 font-medium hover:text-brand-300">
          <Phone size={14} aria-hidden /> {p.label}
        </a>
      </div>
    </div>
  );
}
