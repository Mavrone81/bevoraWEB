import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const company = String(body.company ?? "").trim();
  const service = String(body.service ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!emailRe.test(email)) fieldErrors.email = "Email is invalid.";
  if (message.length < 10) fieldErrors.message = "Message is too short.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  // ── Persist to the CMS inbox ───────────────────────────────────────────
  // Stored as a Contact Submission, viewable/triageable in the admin at /admin.
  let payload;
  try {
    payload = await getPayload({ config });
    await payload.create({
      collection: "contact-submissions",
      data: { name, email, company, service, message, handled: false },
    });
  } catch (err) {
    console.error("[contact] failed to save submission:", err);
    return NextResponse.json({ ok: false, error: "Could not save your message. Please try again." }, { status: 500 });
  }

  // ── Notify the team by email (SMTP) ────────────────────────────────────
  // Best-effort: the submission is already saved, so an email failure does not
  // fail the request. Configured via SMTP_* env + Payload's email adapter.
  try {
    await payload.sendEmail({
      to: process.env.CONTACT_NOTIFY_TO || "enquiries@bevorasg.com",
      replyTo: email,
      subject: `New website enquiry — ${name}`,
      text:
        `New enquiry from the Bevora website:\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Company: ${company || "—"}\n` +
        `Service: ${service || "—"}\n\n` +
        `Message:\n${message}\n`,
    });
  } catch (err) {
    console.error("[contact] email notification failed:", err);
  }

  return NextResponse.json({ ok: true });
}
