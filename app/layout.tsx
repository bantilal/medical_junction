import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { JsonLd } from "@/components/JsonLd";
import { pharmacyJsonLd, websiteJsonLd } from "@/lib/seo";

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

// The layout does no storage I/O, so no page can hang on it. Ratings are added to the
// structured data by the home and reviews pages, which are cached and refreshed every minute.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingContact />
        <JsonLd data={pharmacyJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
