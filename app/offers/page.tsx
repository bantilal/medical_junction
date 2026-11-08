import type { Metadata } from "next";
import { PageHero, Disclaimer } from "@/components/PageHero";
import { OffersSection } from "@/components/Sections";
import { InquiryForm } from "@/components/Forms";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Special Offers",
  description: "Current offers at Medical Junction, Jaipur on personal care, wellness and healthcare products. Ask in store or on WhatsApp.",
  path: "/offers",
});

export default function Offers() {
  return (
    <>
      <PageHero title="Special Offers" intro="Healthy choices. Special offers." crumbs={[{ name: "Offers", path: "/offers" }]} />
      <section className="section">
        <div className="container-x space-y-8">
          <OffersSection full />
          <Disclaimer>Only offers approved by the shop are shown, with their end date. Offers apply to selected products while stock lasts. We do not run promotions on prescription medicines.</Disclaimer>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div><h2 className="h-title">Ask about an offer</h2><p className="mt-4 text-muted">Tell us what you need and we will share the best current deal.</p></div>
            <InquiryForm defaultType="offer" />
          </div>
        </div>
      </section>
    </>
  );
}
