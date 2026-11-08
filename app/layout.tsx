import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { JsonLd } from "@/components/JsonLd";
import { pharmacyJsonLd, websiteJsonLd } from "@/lib/seo";
import { listApprovedReviews, summarize } from "@/lib/store";

export const revalidate = 60; // rating in structured data refreshes at most every minute

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} - Pharmacy & Healthcare Store in ${site.address.city}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["pharmacy in Hanumangarh", "medical store Hanumangarh", "healthcare products Hanumangarh", "Medical Junction", "personal care", "wellness essentials"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: site.locale, url: "/", title: site.name, description: site.description },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  formatDetection: { telephone: true },
};

export const viewport: Viewport = { themeColor: "#176b45", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const rating = summarize(await listApprovedReviews());
  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingContact />
        <JsonLd data={pharmacyJsonLd(rating)} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
