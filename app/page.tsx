import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutSplit, CategoryGrid, Hero, OffersSection, QualityBlock, StorePreview, WhyChoose } from "@/components/Sections";
import { ProductCard } from "@/components/ProductCard";
import { RatingSummaryCard, ReviewList } from "@/components/Ratings";
import { StoreVisit } from "@/components/StoreVisit";
import { JsonLd } from "@/components/JsonLd";
import { Disclaimer } from "@/components/PageHero";
import { featuredProducts } from "@/data/catalog";
import { faqs } from "@/data/content";
import { faqJsonLd, ratingJsonLd } from "@/lib/seo";
import { getLikes, listApprovedReviews, summarize } from "@/lib/store";

export const revalidate = 60;

export default async function Home() {
  const [reviews, likes] = await Promise.all([listApprovedReviews(), getLikes()]);
  const summary = summarize(reviews);
  return (
    <>
      {ratingJsonLd(summary) && <JsonLd data={ratingJsonLd(summary)} />}
      <Hero />
      <StorePreview />
      <CategoryGrid />

      <section className="section pt-0" aria-labelledby="featured">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="featured" className="h-title">Popular Products</h2>
              <p className="mt-3 text-muted">Everyday essentials - ask us for current availability.</p>
            </div>
            <Link href="/products" className="btn-outline">View All Products <ArrowRight size={16} aria-hidden /></Link>
          </div>
          <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts().map((p) => <li key={p.slug}><ProductCard p={p} /></li>)}
          </ul>
          <div className="mt-6"><Disclaimer>Products shown are examples of what we stock. Availability, brands and prices are confirmed in store.</Disclaimer></div>
        </div>
      </section>

      <OffersSection />
      <WhyChoose />
      <QualityBlock />
      <AboutSplit />

      <section className="section" aria-labelledby="reviews">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="reviews" className="h-title">What customers say</h2>
            <Link href="/reviews#write" className="btn-primary">Rate & review us</Link>
          </div>
          <div className="mt-8"><RatingSummaryCard s={summary} likes={likes} /></div>
          {reviews.length > 0 && <div className="mt-6"><ReviewList reviews={reviews} limit={4} /></div>}
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="visit">
        <div className="container-x">
          <h2 id="visit" className="h-title">Visit our store</h2>
          <div className="mt-8"><StoreVisit compact /></div>
        </div>
      </section>

      <section className="section bg-brand-50" aria-labelledby="faq">
        <div className="container-x max-w-3xl">
          <h2 id="faq" className="h-title center text-center">Frequently asked questions</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="card group p-5 open:shadow-lift">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-semibold text-brand-900">
                  {f.q}<span aria-hidden className="text-xl text-brand-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <JsonLd data={faqJsonLd(faqs)} />
      </section>
    </>
  );
}
