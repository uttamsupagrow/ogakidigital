import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup. With NEWSLETTER_WEBHOOK_URL set, forwards to the list
 * provider. Without it, runs in documented development-simulation mode.
 */
export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`Provider responded ${res.status}`);
      return NextResponse.json({ ok: true, delivered: true });
    } catch (err) {
      console.error("[newsletter] provider error:", err);
      return NextResponse.json({ error: "Subscription failed. Try again later." }, { status: 502 });
    }
  }

  console.info("[newsletter] DEV MODE — signup recorded locally, nothing was sent:", email);
  return NextResponse.json({ ok: true, delivered: false, devMode: true });
}
