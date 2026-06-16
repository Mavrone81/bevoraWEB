import { VERIFY_TOKEN, STAFF_NUMBER, verifyWebhookSignature } from "@/lib/whatsapp";
import { routeStaffReply, appendMessages } from "@/lib/livechat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Meta webhook verification handshake.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token && token === VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

interface WaMessage {
  from?: string;
  id?: string;
  type?: string;
  text?: { body?: string };
  context?: { id?: string };
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (!verifyWebhookSignature(raw, request.headers.get("x-hub-signature-256"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let body: { entry?: { changes?: { value?: { messages?: WaMessage[] } }[] }[] };
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response("ok", { status: 200 });
  }

  try {
    const messages: WaMessage[] =
      body.entry?.flatMap((e) => e.changes?.flatMap((c) => c.value?.messages ?? []) ?? []) ?? [];

    for (const msg of messages) {
      // Only handle text replies from the staff number (the bridge is staff -> visitor).
      if (msg.type !== "text" || !msg.text?.body) continue;
      const from = (msg.from ?? "").replace(/[^0-9]/g, "");
      if (STAFF_NUMBER && from !== STAFF_NUMBER) continue;

      const text = msg.text.body.trim();
      const session = await routeStaffReply(msg.context?.id);
      if (!session) continue;

      const now = new Date().toISOString();
      if (text.toLowerCase() === "/close" || text.toLowerCase() === "close") {
        await appendMessages(session, [{ sender: "system", text: "Chat closed by Bevora.", at: now }], {
          status: "closed",
        });
      } else {
        await appendMessages(session, [{ sender: "staff", text, at: now }]);
      }
    }
  } catch (err) {
    console.error("[whatsapp webhook] processing error:", err);
  }

  // Always 200 quickly so Meta doesn't retry.
  return new Response("ok", { status: 200 });
}
