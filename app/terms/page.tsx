import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Terms & Conditions", description: "Terms for using the Medical Junction website.", path: "/terms" });

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms" updated="November 2026">
      <h2>Informational website</h2>
      <p>This website presents Medical Junction and its range. It is not an online store: no orders or payments are taken here.</p>
      <h2>Prices, offers and availability</h2>
      <p>Prices, offers and stock shown are indicative, may change without notice and must be confirmed with the shop. Offers apply while stock lasts.</p>
      <h2>Prescription medicines</h2>
      <p>Prescription medicines are supplied only against a valid prescription and under a registered pharmacist's supervision. Nothing on this website is an offer to supply them.</p>
      <h2>Reviews</h2>
      <p>Reviews must reflect your genuine experience. We may decline to publish content that is abusive, misleading, promotional or unlawful.</p>
      <h2>Acceptable use</h2>
      <p>Do not misuse the website, attempt to disrupt it or submit false information.</p>
      <h2>Liability</h2>
      <p>We take care to keep information accurate but provide it "as is". Please verify important details with the shop.</p>
    </LegalPage>
  );
}
