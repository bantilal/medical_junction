import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Disclaimer } from "@/components/PageHero";
import { ProductBrowser } from "@/components/ProductBrowser";
import { JsonLd } from "@/components/JsonLd";
import { categories, getCategory, products, productsIn } from "@/data/catalog";
import { abs, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  return pageMeta({ title: `${c.name} in Jaipur`, description: `${c.description} Visit Medical Junction, Jaipur.`, path: `/products/category/${c.slug}` });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  const list = productsIn(c.slug);
  return (
    <>
      <PageHero title={c.name} intro={c.description} crumbs={[{ name: "Products", path: "/products" }, { name: c.name, path: `/products/category/${c.slug}` }]} />
      <section className="section">
        <div className="container-x">
          <ProductBrowser products={products} initialCategory={c.slug} categories={categories.map((x) => ({ slug: x.slug, name: x.name }))} />
          {c.slug === "medicines" && <div className="mt-8"><Disclaimer>Prescription medicines are dispensed only against a valid prescription from a registered medical practitioner and under pharmacist supervision. Do not self-medicate - ask our pharmacist.</Disclaimer></div>}
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: c.name, itemListElement: list.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/products/${p.slug}`), name: p.name })) }} />
    </>
  );
}
