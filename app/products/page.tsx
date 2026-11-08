import type { Metadata } from "next";
import { PageHero, Disclaimer } from "@/components/PageHero";
import { ProductBrowser } from "@/components/ProductBrowser";
import { categories, products } from "@/data/catalog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Products - Medicines, Healthcare, Personal Care & Wellness",
  description: "Browse healthcare products, personal care, wellness essentials and general medicines at Medical Junction, Jaipur. Call or WhatsApp to check availability.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero title="Our Products" intro="Browse our range, then call, WhatsApp or visit to check availability." crumbs={[{ name: "Products", path: "/products" }]} />
      <section className="section">
        <div className="container-x">
          <ProductBrowser products={products} categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />
          <div className="mt-10 space-y-3">
            <Disclaimer>Product list is illustrative and being updated. Prices and availability are confirmed in store. Prescription medicines are supplied only against a valid prescription.</Disclaimer>
          </div>
        </div>
      </section>
    </>
  );
}
