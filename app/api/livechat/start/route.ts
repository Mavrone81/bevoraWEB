import { sendWhatsAppText, STAFF_NUMBER, bridgeEnabled } from "@/lib/whatsapp";
import { findSession, createSession, appendMessages, type LiveMsg } from "@/lib/livechat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Short, human-friendly ref shown to staff in WhatsApp (deterministic-ish).
function makeRef(sessionId: string): string {
  let h = 0;
  for (let i = 0; i < sessionId.length; i++) h = (h * 31 + sessionId.charCodeAt(i)) >>> 0;
  return h.toString(36).toUpperCase().slice(0, 4).padStart(4, "0");
}

export async function POST(request: Request) {
  if (!bridgeEnabled) {
    return Response.json({ ok: false, error: "Live chat is not configured yet." }, { status: 503 });
  }

  let body: { sessionId?: string; name?: string; lastMessage?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const sessionId = String(body.sessionId ?? "").trim();
  if (!sessionId) return Response.json({ ok: false, error: "Missing sessionId." }, { status: 400 });

  const name = String(body.name ?? "").trim().slice(0, 80);
  const lastMessage = String(body.lastMessage ?? "").trim().slice(0, 500);
  const now = new Date().toISOString();

  // Reuse an existing session if the visitor re-triggers handoff.
  let session = await findSession(sessionId);
  if (!session) {
    const ref = makeRef(sessionId);
    session = await createSession({
      sessionId,
      sessionRef: ref,
      visitorName: name || undefined,
      messages: [{ sender: "system", text: "Visitor requested a human.", at: now }],
    });
  }

  const ref = session.sessionRef || makeRef(sessionId);
  const notice =
    `🟡 New website chat [${ref}]${name ? ` from ${name}` : ""}\n` +
    (lastMessage ? `\nLast message: ${lastMessage}\n` : "") +
    `\nReply to this message to chat with the visitor. Send "/close" to end.`;

  const waId = await sendWhatsAppText(STAFF_NUMBER, notice);
  if (waId) {
    await appendMessages(session, [], { outboundWaId: waId });
  }

  return Response.json({ ok: true, ref });
}
