import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { StoreVisit } from "@/components/StoreVisit";
import { InquiryForm } from "@/components/Forms";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact & Location",
  description: "Contact Medical Junction in Hanumangarh - phone, WhatsApp, shop address, opening hours, map and directions.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <PageHero title="Contact & Location" intro="Call, WhatsApp, send an inquiry or visit us." crumbs={[{ name: "Contact", path: "/contact" }]} />
      <section className="section">
        <div className="container-x space-y-12">
          <StoreVisit />
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h2 className="h-title">Send an inquiry</h2>
              <p className="mt-4 text-muted">Product, offer, location or general question - we usually reply the same day during shop hours.</p>
              <p className="mt-3 text-sm text-muted">For prescription medicines, please visit the shop with your valid prescription.</p>
            </div>
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
