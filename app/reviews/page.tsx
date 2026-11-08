import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RatingSummaryCard, ReviewList } from "@/components/Ratings";
import { ReviewForm } from "@/components/Forms";
import { pageMeta } from "@/lib/seo";
import { getLikes, listApprovedReviews, summarize } from "@/lib/store";

export const revalidate = 60;
export const metadata: Metadata = pageMeta({
  title: "Customer Reviews & Ratings",
  description: "Read genuine customer ratings and quality feedback for Medical Junction, Hanumangarh - and share your own experience.",
  path: "/reviews",
});

export default async function Reviews() {
  const [reviews, likes] = await Promise.all([listApprovedReviews(), getLikes()]);
  return (
    <>
      <PageHero title="Ratings & Reviews" intro="Only genuine, checked customer feedback is shown - never invented." crumbs={[{ name: "Reviews", path: "/reviews" }]} />
      <section className="section">
        <div className="container-x space-y-10">
          <RatingSummaryCard s={summarize(reviews)} likes={likes} />
          <ReviewList reviews={reviews} />
          <div id="write" className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h2 className="h-title">Rate your experience</h2>
              <p className="mt-4 text-muted">Your rating and quality feedback help other families - and help us improve. Reviews appear after a quick check by our team.</p>
            </div>
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
}
