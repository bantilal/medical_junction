import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata: Metadata = pageMeta({ title: "Privacy Policy", description: "How Medical Junction collects, uses and protects your information.", path: "/privacy" });

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="November 2026">
      <p>{site.name} respects your privacy. This page explains what we collect through this website and why.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Inquiry details you submit: name, mobile number, optional e-mail and your message.</li>
        <li>Review details: your name, rating, quality scores and comment.</li>
        <li>A like count. We store only an irreversible hash to stop duplicate likes - not your IP address.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your inquiry about products, offers or the shop.</li>
        <li>To show approved reviews and ratings publicly (name, rating, comment).</li>
      </ul>
      <p>We do not sell your information and do not use it for unrelated marketing without your consent.</p>
      <h2>Health information</h2>
      <p>Please do not send prescriptions, diagnoses or medical history through the website forms. Discuss such matters in person with our pharmacist.</p>
      <h2>Retention and your rights</h2>
      <p>We keep inquiries only as long as needed to respond. You may ask us to correct or delete your inquiry or review by calling the shop{site.contact.email ? ` or writing to ${site.contact.email}` : ""}.</p>
      <h2>Third parties</h2>
      <p>The map is provided by Google Maps and WhatsApp links open WhatsApp; their own privacy policies apply once you use them.</p>
    </LegalPage>
  );
}
