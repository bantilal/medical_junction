import { NextResponse } from "next/server";
import { inquirySchema, fieldErrors } from "@/lib/validation";
import { addInquiry } from "@/lib/store";
import { clientId, rateLimit, sameOrigin } from "@/lib/security";

export async function POST(req: Request) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, message: "Request blocked." }, { status: 403 });
  if (!rateLimit(`inq:${await clientId()}`, 5, 10 * 60_000))
    return NextResponse.json({ ok: false, message: "Too many messages. Please wait a few minutes or call us." }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error) }, { status: 422 });

  // Honeypot filled: pretend success so bots learn nothing.
  if (parsed.data.website) return NextResponse.json({ ok: true, message: "Thank you! We will contact you soon." });

  const { consent: _c, website: _w, ...data } = parsed.data;
  await addInquiry({ ...data, email: data.email || undefined, product: data.product || undefined });
  return NextResponse.json({ ok: true, message: "Thank you! Medical Junction will contact you soon." });
}
