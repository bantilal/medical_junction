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
  const r = await addLike(id);
  return NextResponse.json({ ok: true, ...r });
}
