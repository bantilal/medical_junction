import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";

/** Persistent WhatsApp button - the main conversion path for a marketing site. (Call button lives in the header.) */
export function FloatingContact() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lift transition hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  );
}
