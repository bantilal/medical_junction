import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/config/site";

/** Persistent call + WhatsApp buttons - the main conversion path for a marketing site. */
export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lift transition hover:scale-105"
      >
        <MessageCircle size={26} />
      </a>
      <a
        href={`tel:${site.contact.phones[0].tel}`}
        aria-label="Call the shop"
        className="grid size-14 place-items-center rounded-full bg-brand-700 text-white shadow-lift transition hover:scale-105 sm:hidden"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
