import { NextResponse } from "next/server";
import { addLike, getLikes } from "@/lib/store";
import { clientId, rateLimit, sameOrigin } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, count: await getLikes() });
}

export async function POST() {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, message: "Request blocked." }, { status: 403 });
  const id = await clientId();
  if (!rateLimit(`like:${id}`, 10, 60 * 60_000)) return NextResponse.json({ ok: false, message: "Slow down." }, { status: 429 });
  try {
    return NextResponse.json({ ok: true, ...(await addLike(id)) });
  } catch (e) {
    console.error("[like] failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, message: "Could not save your like right now. Please try again." }, { status: 503 });
  }
}
