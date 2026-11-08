import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";
import { discountPercent, getCategory, type Product } from "@/data/catalog";
import { whatsappLink } from "@/config/site";
import { ProductArt } from "./ProductArt";

export function ProductCard({ p }: { p: Product }) {
  const off = discountPercent(p);
  const cat = getCategory(p.category);
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/products/${p.slug}`} className="relative block bg-gradient-to-b from-brand-50 to-brand-100 p-6" aria-label={`${p.name} - view details`}>
        {off && <span className="absolute left-3 top-3 rounded-full bg-brand-700 px-2.5 py-1 text-xs font-bold text-white">{off}% OFF</span>}
        {p.image ? (
          <Image src={p.image} alt={p.name} width={400} height={300} className="mx-auto h-40 w-full object-contain" />
        ) : (
          <ProductArt kind={p.art} className="mx-auto h-40 w-40 transition group-hover:scale-105" />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">{cat?.name}</p>
        <h3 className="mt-1 font-heading text-lg font-semibold text-brand-900">
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </h3>
        <p className="mt-1.5 text-sm text-muted">{p.summary}</p>
        <div className="mt-3 flex items-baseline gap-2">
          {p.price ? (
            <>
              <span className="text-xl font-bold text-brand-900">{`₹${p.offerPrice ?? p.price}`}</span>
              {p.offerPrice && <span className="text-sm text-muted line-through">{`₹${p.price}`}</span>}
            </>
          ) : (
            <span className="text-sm font-medium text-brand-700">
              {p.availability === "in-stock" ? "In stock" : "Check availability in store"}
            </span>
          )}
        </div>
        <div className="mt-auto flex gap-2 pt-4">
          <Link href={`/products/${p.slug}`} className="btn-primary flex-1 !px-3">
            Details <ArrowRight size={15} aria-hidden />
          </Link>
          <a
            href={whatsappLink(`Hello Medical Junction, is "${p.name}" available?`)}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline !px-3" aria-label={`Ask about ${p.name} on WhatsApp`}
          >
            <MessageCircle size={16} aria-hidden /> Ask
          </a>
        </div>
      </div>
    </article>
  );
}
