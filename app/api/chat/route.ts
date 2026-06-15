import Anthropic from "@anthropic-ai/sdk";
import {
  SYSTEM_PROMPT,
  CHAT_MODEL,
  CHAT_MAX_TOKENS,
  MAX_HISTORY_MESSAGES,
} from "@/lib/chatbot";

// The Anthropic SDK needs the Node.js runtime (not Edge).
export const runtime = "nodejs";
// Replies depend on the conversation; never cache.
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function sanitize(messages: unknown): Anthropic.MessageParam[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    // Keep only the most recent turns to bound token usage.
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The assistant isn't configured yet. Set ANTHROPIC_API_KEY." },
      { status: 503 },
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const messages = sanitize(body.messages);
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Send at least one user message." }, { status: 400 });
  }

  const client = new Anthropic();

  // Stream the reply back as plain text so the widget can render it as it arrives.
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const messageStream = client.messages.stream({
          model: CHAT_MODEL,
          max_tokens: CHAT_MAX_TOKENS,
          system: SYSTEM_PROMPT,
          messages,
        });

        messageStream.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        await messageStream.finalMessage();
        controller.close();
      } catch (err) {
        console.error("[chat] stream failed:", err);
        // If nothing has been sent yet, surface a readable fallback line.
        controller.enqueue(
          encoder.encode("Sorry — I ran into a problem. Please try again, or email hello@bevorasg.com."),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
