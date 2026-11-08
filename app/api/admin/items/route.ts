import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ADMIN_COOKIE, sameOrigin, verifySession } from "@/lib/security";
import { deleteInquiry, deleteReview, setInquiryStatus, setReviewStatus } from "@/lib/store";

const schema = z.object({
  kind: z.enum(["review", "inquiry"]),
  id: z.string().uuid(),
  action: z.enum(["approve", "reject", "done", "new", "delete"]),
});

export async function POST(req: Request) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, message: "Request blocked." }, { status: 403 });
  if (!verifySession((await cookies()).get(ADMIN_COOKIE)?.value))
    return NextResponse.json({ ok: false, message: "Not signed in." }, { status: 401 });

  const p = schema.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ ok: false, message: "Bad request." }, { status: 422 });
  const { kind, id, action } = p.data;

  let done = false;
  if (kind === "review") {
    if (action === "delete") done = await deleteReview(id);
    else if (action === "approve") done = await setReviewStatus(id, "approved");
    else if (action === "reject") done = await setReviewStatus(id, "rejected");
  } else {
    if (action === "delete") done = await deleteInquiry(id);
    else if (action === "done" || action === "new") done = await setInquiryStatus(id, action);
  }
  if (!done) return NextResponse.json({ ok: false, message: "Item not found or action not allowed." }, { status: 404 });
  revalidatePath("/reviews");
  revalidatePath("/");
  return NextResponse.json({ ok: true, message: "Updated." });
}
