import { NextResponse } from "next/server";
import { reviewSchema, fieldErrors } from "@/lib/validation";
import { addReview } from "@/lib/store";
import { clientId, rateLimit, sameOrigin } from "@/lib/security";

export async function POST(req: Request) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, message: "Request blocked." }, { status: 403 });
  if (!rateLimit(`rev:${await clientId()}`, 3, 60 * 60_000))
    return NextResponse.json({ ok: false, message: "You have sent several reviews recently. Please try again later." }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error) }, { status: 422 });

  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true, message: "Thank you for your feedback!" });

  await addReview({
    name: d.name,
    rating: d.rating,
    comment: d.comment,
    product: d.product || undefined,
    quality: { genuineness: d.genuineness, service: d.service, cleanliness: d.cleanliness, value: d.value },
  });
  return NextResponse.json({ ok: true, message: "Thank you! Your review will appear after our team checks it." });
}
