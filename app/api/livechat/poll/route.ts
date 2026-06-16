import { findSession } from "@/lib/livechat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The widget polls this for new staff/system messages since the last one it saw.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = (url.searchParams.get("sessionId") || "").trim();
  const after = url.searchParams.get("after") || ""; // ISO timestamp of last seen
  if (!sessionId) return Response.json({ ok: false, error: "Missing sessionId." }, { status: 400 });

  const session = await findSession(sessionId);
  if (!session) return Response.json({ ok: true, messages: [], status: "closed" });

  const messages = (session.messages ?? [])
    .filter((m) => (m.sender === "staff" || m.sender === "system") && (!after || m.at > after))
    .map((m) => ({ sender: m.sender, text: m.text, at: m.at }));

  return Response.json({ ok: true, messages, status: session.status ?? "active" });
}
