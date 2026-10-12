import { NextResponse } from "next/server";

/**
 * Contact form handler with server-side validation.
 *
 * Provider configuration (env):
 *   CONTACT_WEBHOOK_URL — POST the validated payload to a CRM/email bridge
 *   RESEND_API_KEY + CONTACT_TO_EMAIL — reserved for a real email provider
 *
 * If no provider is configured, this endpoint performs a clearly-labeled
 * DEVELOPMENT SIMULATION: it validates and logs but does NOT send anything.
 */
interface Body {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  if (!body.firstName?.trim()) errors.firstName = "First name is required.";
  if (!body.lastName?.trim()) errors.lastName = "Last name is required.";
  if (!body.email?.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(body.email)) errors.email = "Enter a valid email address.";
  if (!body.message?.trim()) errors.message = "Please tell us how we can help.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 422 });
  }

  const payload = {
    firstName: body.firstName!.trim(),
    lastName: body.lastName!.trim(),
    email: body.email!.trim(),
    company: body.company?.trim() ?? "",
    message: body.message!.trim(),
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Provider responded ${res.status}`);
      return NextResponse.json({ ok: true, delivered: true });
    } catch (err) {
      console.error("[contact] provider error:", err);
      return NextResponse.json(
        { error: "We couldn't deliver your message. Please email hello@ogakidigital.com." },
        { status: 502 }
      );
    }
  }

  // ---- Development fallback (no provider configured) ----
  console.info("[contact] DEV MODE — message accepted, nothing was sent:", payload);
  return NextResponse.json({
    ok: true,
    delivered: false,
    devMode: true,
    note: "No CONTACT_WEBHOOK_URL configured — development simulation only.",
  });
}
