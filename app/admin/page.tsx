import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminConfigured, verifySession } from "@/lib/security";
import { listAllReviews, listInquiries, getLikes, summarize } from "@/lib/store";
import { AdminLogin, AdminPanel } from "@/components/AdminPanel";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function Admin() {
  if (!adminConfigured()) {
    return (
      <section className="section"><div className="container-x max-w-xl">
        <h1 className="font-heading text-2xl font-bold text-brand-900">Admin is not set up</h1>
        <p className="mt-3 text-muted">Set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> (16+ characters) in <code>.env.local</code>, then restart the server.</p>
      </div></section>
    );
  }
  if (!verifySession((await cookies()).get(ADMIN_COOKIE)?.value)) return <AdminLogin />;
  const [reviews, inquiries, likes] = await Promise.all([listAllReviews(), listInquiries(), getLikes()]);
  return <AdminPanel reviews={reviews} inquiries={inquiries} likes={likes} summary={summarize(reviews.filter((r) => r.status === "approved"))} />;
}
