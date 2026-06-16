import { sendWhatsAppText, STAFF_NUMBER, bridgeEnabled } from "@/lib/whatsapp";
import { findSession, appendMessages } from "@/lib/livechat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!bridgeEnabled) {
    return Response.json({ ok: false, error: "Live chat is not configured yet." }, { status: 503 });
  }

  let body: { sessionId?: string; text?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const sessionId = String(body.sessionId ?? "").trim();
  const text = String(body.text ?? "").trim().slice(0, 2000);
  if (!sessionId || !text) {
    return Response.json({ ok: false, error: "Missing sessionId or text." }, { status: 400 });
  }

  const session = await findSession(sessionId);
  if (!session) {
    return Response.json({ ok: false, error: "Session not found. Reconnect to a human." }, { status: 404 });
  }

  const now = new Date().toISOString();
  const ref = session.sessionRef || "----";
  const label = session.visitorName ? session.visitorName : "Visitor";

  // Forward to staff WhatsApp; the wamid lets their reply route back here.
  const waId = await sendWhatsAppText(STAFF_NUMBER, `[${ref}] ${label}: ${text}`);
  await appendMessages(session, [{ sender: "visitor", text, at: now }], waId ? { outboundWaId: waId } : undefined);

  return Response.json({ ok: true, delivered: Boolean(waId) });
}
