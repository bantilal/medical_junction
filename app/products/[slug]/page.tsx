import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageCircle, Phone, Store } from "lucide-react";
import { PageHero, Disclaimer } from "@/components/PageHero";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { InquiryForm } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { discountPercent, getCategory, getProduct, products } from "@/data/catalog";
import { site, whatsappLink } from "@/config/site";
import { abs, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name} in Hanumangarh`, description: `${p.summary} ${p.description}`.slice(0, 158), path: `/products/${p.slug}` });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const off = discountPercent(p);
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, category: cat.name,
    ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
    ...(p.image ? { image: abs(p.image) } : {}),
  };
  // Offer data only when a verified price exists - never invent prices for Google.
  if (p.price) ld.offers = { "@type": "Offer", priceCurrency: "INR", price: p.offerPrice ?? p.price, availability: p.availability === "in-stock" ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability", seller: { "@type": "Organization", name: site.name } };

  return (
    <>
      <PageHero title={p.name} crumbs={[{ name: "Products", path: "/products" }, { name: cat.name, path: `/products/category/${cat.slug}` }, { name: p.name, path: `/products/${p.slug}` }]} />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="card grid place-items-center bg-gradient-to-b from-brand-50 to-brand-100 p-10">
            {p.image ? <Image src={p.image} alt={p.name} width={600} height={600} className="h-72 w-full object-contain" priority /> : <ProductArt kind={p.art} className="h-72 w-72" />}
          </div>
          <div>
            <Link href={`/products/category/${cat.slug}`} className="eyebrow">{cat.name}</Link>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-900">{p.name}</h2>
            {p.brand && <p className="mt-1 text-muted">Brand: {p.brand}</p>}
            <p className="mt-4 leading-relaxed text-muted">{p.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {p.price ? (
                <p className="flex items-baseline gap-2"><span className="text-3xl font-bold text-brand-900">₹{p.offerPrice ?? p.price}</span>{p.offerPrice && <span className="text-muted line-through">₹{p.price}</span>}{off && <span className="rounded-full bg-brand-700 px-2.5 py-1 text-xs font-bold text-white">{off}% OFF</span>}</p>
              ) : (
                <p className="rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-800">Price: confirm in store</p>
              )}
              <p className="flex items-center gap-1.5 text-sm font-medium text-brand-700"><Store size={16} aria-hidden /> {p.availability === "in-stock" ? "In stock" : "Check availability with store"}</p>
            </div>
            <h3 className="mt-6 font-heading font-semibold text-brand-900">Important information</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {p.details.map((d) => <li key={d} className="flex gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />{d}</li>)}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={whatsappLink(`Hello Medical Junction, is "${p.name}" available? What is the price?`)} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle size={16} aria-hidden /> Ask on WhatsApp</a>
              <a href={`tel:${site.contact.phones[0].tel}`} className="btn-outline"><Phone size={16} aria-hidden /> Call the shop</a>
            </div>
            <div className="mt-6"><Disclaimer>{p.needsPharmacist ? "Please speak to our pharmacist before use. " : ""}Information is general and not medical advice. Read the label and consult your doctor or pharmacist. Prescription medicines require a valid prescription.</Disclaimer></div>
          </div>
        </div>
      </section>
      <section className="section bg-brand-50 pt-10">
        <div className="container-x grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div><h2 className="h-title">Ask about this product</h2><p className="mt-4 text-muted">Leave your number and we will confirm availability and price.</p></div>
          <InquiryForm defaultProduct={p.name} defaultType="product" />
        </div>
      </section>
      {related.length > 0 && (
        <section className="section">
          <div className="container-x">
            <h2 className="h-title">Related products</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <li key={r.slug}><ProductCard p={r} /></li>)}</ul>
          </div>
        </section>
      )}
      <JsonLd data={ld} />
    </>
  );
}
