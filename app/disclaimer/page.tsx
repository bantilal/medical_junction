import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Medical Disclaimer", description: "Medical disclaimer for the Medical Junction website: general information only, not medical advice. Consult a doctor or pharmacist before using any medicine.", path: "/disclaimer" });

export default function Disclaimer() {
  return (
    <LegalPage title="Medical Disclaimer" path="/disclaimer" updated="November 2026">
      <p>The content of this website is for general information only. It is not medical advice, diagnosis or treatment and does not create a doctor-patient or pharmacist-patient relationship.</p>
      <h2>Always consult a professional</h2>
      <p>Seek the advice of a qualified doctor or pharmacist about any health condition or before starting, changing or stopping any medicine or supplement. Never ignore professional advice because of something you read here.</p>
      <h2>Prescription medicines</h2>
      <p>Prescription-only medicines are dispensed only on a valid prescription from a registered medical practitioner. Do not self-medicate.</p>
      <h2>Products and supplements</h2>
      <p>Supplements and wellness products are not intended to diagnose, treat, cure or prevent any disease and do not replace a balanced diet. Follow the label and manufacturer's instructions.</p>
      <h2>Emergencies</h2>
      <p>In a medical emergency call <a href="tel:112">112</a> or go to the nearest hospital immediately.</p>
    </LegalPage>
  );
}
