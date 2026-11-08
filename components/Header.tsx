"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/config/site";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const phone = site.contact.phones[0];

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x flex h-[72px] items-center justify-between gap-2 sm:gap-4">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {site.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active(n.href) ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition xl:px-3.5 ${
                  active(n.href) ? "bg-brand-100 text-brand-800" : "text-ink hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link href="/products" aria-label="Search products" className="grid size-11 place-items-center rounded-full text-brand-800 hover:bg-brand-100">
              <Search size={20} />
            </Link>
            <a href={`tel:${phone.tel}`} aria-label={`Call ${phone.label}`} className="btn-primary !px-3 sm:!px-5">
              <Phone size={16} aria-hidden />
              <span className="hidden sm:inline">{phone.label}</span>
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-brand-800 hover:bg-brand-100 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      {/* Rendered OUTSIDE the header: a backdrop-blur parent would trap this fixed panel inside the 72px bar. */}
      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-4">
            {site.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active(n.href) ? "page" : undefined}
                className={`rounded-xl px-4 py-3.5 text-base font-medium ${active(n.href) ? "bg-brand-100 text-brand-800" : "text-ink hover:bg-brand-50"}`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary mt-3">Contact Our Store</Link>
          </nav>
        </div>
      )}
    </>
  );
}
