import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, clientId, makeSession, rateLimit, sameOrigin, adminConfigured } from "@/lib/security";

export async function POST(req: Request) {
  if (!(await sameOrigin())) return NextResponse.json({ ok: false, message: "Request blocked." }, { status: 403 });
  if (!adminConfigured())
    return NextResponse.json({ ok: false, message: "Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." }, { status: 503 });
  if (!rateLimit(`login:${await clientId()}`, 5, 15 * 60_000))
    return NextResponse.json({ ok: false, message: "Too many attempts. Try again in 15 minutes." }, { status: 429 });

  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || !checkPassword(body.password))
    return NextResponse.json({ ok: false, message: "Wrong password." }, { status: 401 });

  const res = NextResponse.json({ ok: true, message: "Signed in." });
  res.cookies.set(ADMIN_COOKIE, makeSession(), {
    httpOnly: true, sameSite: "strict", secure: (process.env.NEXT_PUBLIC_SITE_URL ?? "").startsWith("https://"), path: "/", maxAge: 60 * 60 * 8,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true, message: "Signed out." });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
