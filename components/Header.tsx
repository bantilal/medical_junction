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
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                active(n.href) ? "bg-brand-100 text-brand-800" : "text-ink hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/products" aria-label="Search products" className="grid size-11 place-items-center rounded-full text-brand-800 hover:bg-brand-100">
            <Search size={20} />
          </Link>
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            <Phone size={16} aria-hidden /> Contact Us
          </Link>
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
    </header>
  );
}
