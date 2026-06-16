import "server-only";
import crypto from "crypto";

// WhatsApp Cloud API config (server-only env). The bridge is inert until these
// are set, so the rest of the site is unaffected before Meta onboarding is done.
const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v21.0";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || "";
const APP_SECRET = process.env.WHATSAPP_APP_SECRET || "";

export const STAFF_NUMBER = (process.env.WHATSAPP_STAFF_NUMBER || "").replace(/[^0-9]/g, "");
export const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "";

// True only when we can actually send to staff over the Cloud API.
export const bridgeEnabled = Boolean(PHONE_NUMBER_ID && ACCESS_TOKEN && STAFF_NUMBER);

// Send a plain-text WhatsApp message. Returns the WhatsApp message id (wamid)
// so callers can map staff replies (via reply-context) back to a session.
export async function sendWhatsAppText(to: string, text: string): Promise<string | null> {
  if (!bridgeEnabled) return null;
  const digits = to.replace(/[^0-9]/g, "");
  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: digits,
        type: "text",
        text: { body: text.slice(0, 4096), preview_url: false },
      }),
    });
    const data = (await res.json().catch(() => null)) as
      | { messages?: { id: string }[]; error?: { message?: string } }
      | null;
    if (!res.ok) {
      console.error("[whatsapp] send failed:", data?.error?.message || res.status);
      return null;
    }
    return data?.messages?.[0]?.id ?? null;
  } catch (err) {
    console.error("[whatsapp] send error:", err);
    return null;
  }
}

// Verify Meta's X-Hub-Signature-256 header against the raw request body.
// Returns true when no app secret is configured (so dev/setup isn't blocked).
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!APP_SECRET) return true;
  if (!signatureHeader) return false;
  const expected = "sha256=" + crypto.createHmac("sha256", APP_SECRET).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
  } catch {
    return false;
  }
}
