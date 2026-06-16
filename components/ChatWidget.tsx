"use client";

import React from "react";
import { MessageCircle, X, ArrowUp } from "lucide-react";
import { whatsappNumber, whatsappUrl } from "@/cms/seed-data";

const WA_URL = whatsappUrl; // wa.me deep link with the pre-filled message
const WA_GREEN = "#25D366";
const AVATAR = "/assets/bevora-chat-avatar.svg"; // beaver chat-bot avatar

interface Msg {
  role: "user" | "assistant" | "staff" | "system";
  content: string;
  at?: string;
}

const GREETING =
  "Hi! I'm the Bevora assistant. Ask me about our managed IT, cloud, cybersecurity, or backup services — or how we could help your business.";

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [sending, setSending] = React.useState(false);
  // "bot" = talking to the assistant; "human" = bridged to Bevora staff on WhatsApp.
  const [mode, setMode] = React.useState<"bot" | "human">("bot");
  const [connecting, setConnecting] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const sessionIdRef = React.useRef<string>("");
  const lastSeenRef = React.useRef<string>("");

  // Keep the transcript pinned to the latest message.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // While bridged to a human, poll for staff replies and append them in-box.
  React.useEffect(() => {
    if (mode !== "human") return;
    const id = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/livechat/poll?sessionId=${encodeURIComponent(sessionIdRef.current)}&after=${encodeURIComponent(lastSeenRef.current)}`,
        );
        const data = await res.json().catch(() => null);
        if (!data?.ok) return;
        const incoming = (data.messages || []) as { sender: string; text: string; at: string }[];
        if (incoming.length) {
          setMessages((cur) => [
            ...cur,
            ...incoming.map((m) => ({
              role: (m.sender === "staff" ? "staff" : "system") as Msg["role"],
              content: m.text,
              at: m.at,
            })),
          ]);
          lastSeenRef.current = incoming[incoming.length - 1].at;
        }
        if (data.status === "closed") {
          clearInterval(id);
          setMode("bot");
        }
      } catch {
        /* transient — try again next tick */
      }
    }, 4000);
    return () => clearInterval(id);
  }, [mode]);

  function ensureSessionId() {
    if (!sessionIdRef.current) {
      sessionIdRef.current =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `s_${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    }
  }

  // Hand off to a live person: bridge the chat to Bevora staff on WhatsApp,
  // keeping the conversation in this box. Falls back to the WhatsApp deep link
  // if the bridge isn't configured.
  async function startLive() {
    if (mode === "human" || connecting) return;
    ensureSessionId();
    setConnecting(true);
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content || "";
    try {
      const res = await fetch("/api/livechat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, lastMessage: lastUser }),
      });
      if (res.status === 503) {
        window.open(WA_URL, "_blank", "noopener,noreferrer");
        return;
      }
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.error || "connect failed");
      setMode("human");
      setMessages((cur) => [
        ...cur,
        {
          role: "system",
          content: "You're connected to the Bevora team. Keep chatting here — someone will reply shortly.",
        },
      ]);
    } catch {
      window.open(WA_URL, "_blank", "noopener,noreferrer");
    } finally {
      setConnecting(false);
      inputRef.current?.focus();
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    // ── Live mode: relay to staff via the WhatsApp bridge ──
    if (mode === "human") {
      setMessages((cur) => [...cur, { role: "user", content: text }]);
      setInput("");
      setSending(true);
      try {
        const res = await fetch("/api/livechat/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionIdRef.current, text }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok) throw new Error();
      } catch {
        setMessages((cur) => [
          ...cur,
          { role: "system", content: `Couldn't send that — you can also reach us on WhatsApp ${whatsappNumber}.` },
        ]);
      } finally {
        setSending(false);
        inputRef.current?.focus();
      }
      return;
    }

    // ── Bot mode ──
    const next: Msg[] = [...messages, { role: "user", content: text }];
    // Add an empty assistant slot we'll stream into.
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Only send the real user/assistant turns (drop greeting + system/staff lines).
        body: JSON.stringify({
          messages: next.filter(
            (m, i) => (m.role === "user" || m.role === "assistant") && !(i === 0 && m.role === "assistant"),
          ),
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((cur) => {
          const copy = [...cur];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : `Sorry — I couldn't reach the assistant. Message us on WhatsApp ${whatsappNumber} instead.`;
      setMessages((cur) => {
        const copy = [...cur];
        copy[copy.length - 1] = { role: "assistant", content: message };
        return copy;
      });
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        aria-label={open ? "Close chat" : "Chat with Bevora"}
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 60,
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: "var(--grad-gold-soft)",
          color: "var(--text-on-gold)",
          boxShadow: "var(--shadow-gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform var(--dur-fast) var(--ease-out)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <X size={24} />
        ) : (
          <img src={AVATAR} alt="" width={56} height={56} style={{ borderRadius: "50%", display: "block" }} />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Bevora assistant"
          style={{
            position: "fixed",
            right: 20,
            bottom: 90,
            zIndex: 60,
            width: "min(380px, calc(100vw - 40px))",
            height: "min(560px, calc(100vh - 140px))",
            display: "flex",
            flexDirection: "column",
            background: "var(--surface-card)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg, 0 24px 48px rgba(0,0,0,.18))",
            overflow: "hidden",
            fontFamily: "var(--font-sans)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 18px",
              background: "var(--grad-ink)",
              color: "var(--text-inverse)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src={AVATAR}
                alt=""
                width={38}
                height={38}
                style={{ borderRadius: "50%", flex: "0 0 38px", border: "1.5px solid rgba(255,255,255,.25)" }}
              />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>
                  Bevora assistant
                </div>
                <div style={{ fontSize: 12.5, opacity: 0.7, marginTop: 2 }}>
                  IT services that just work
                </div>
              </div>
            </div>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with Bevora on WhatsApp (${whatsappNumber})`}
              style={{
                flex: "0 0 auto",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 11px",
                borderRadius: 999,
                background: WA_GREEN,
                color: "#fff",
                fontWeight: 700,
                fontSize: 12.5,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>

          {/* Transcript */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              background: "var(--bg-subtle)",
            }}
          >
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const isSystem = m.role === "system";
              const isStaff = m.role === "staff";
              const isBot = m.role === "assistant";
              const pending = sending && i === messages.length - 1 && m.content === "" && isBot;

              // System notices: centered, muted, no bubble.
              if (isSystem) {
                return (
                  <div
                    key={i}
                    style={{
                      alignSelf: "center",
                      maxWidth: "92%",
                      textAlign: "center",
                      fontSize: 12.5,
                      lineHeight: 1.45,
                      color: "var(--text-secondary)",
                      padding: "2px 8px",
                    }}
                  >
                    {m.content}
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  style={{
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    maxWidth: "90%",
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                  }}
                >
                  {isBot && (
                    <img
                      src={AVATAR}
                      alt=""
                      width={28}
                      height={28}
                      style={{ borderRadius: "50%", flex: "0 0 28px", marginTop: 2 }}
                    />
                  )}
                  {isStaff && (
                    <div
                      aria-hidden
                      style={{
                        flex: "0 0 28px",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: WA_GREEN,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        marginTop: 2,
                      }}
                    >
                      👤
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                    {isStaff && (
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-brand)" }}>Bevora team</span>
                    )}
                    <div
                      style={{
                        padding: "10px 13px",
                        borderRadius: "var(--radius-md)",
                        fontSize: 14,
                        lineHeight: 1.5,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        background: isUser ? "var(--neutral-900)" : "var(--surface-card)",
                        color: isUser ? "var(--text-inverse)" : "var(--text-primary)",
                        border: isUser ? "none" : "1px solid var(--border-subtle)",
                      }}
                    >
                      {pending ? "…" : m.content}
                      {isBot && !pending && mode === "bot" && /wa\.me|whatsapp|connect you|the team|a human|a person/i.test(m.content) && (
                        <button
                          onClick={startLive}
                          disabled={connecting}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 7,
                            marginTop: 10,
                            padding: "9px 12px",
                            borderRadius: "var(--radius-md)",
                            background: WA_GREEN,
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 13.5,
                            border: "none",
                            cursor: connecting ? "default" : "pointer",
                            width: "100%",
                          }}
                        >
                          <MessageCircle size={16} /> {connecting ? "Connecting…" : "Talk to a Bevora person"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              padding: 12,
              borderTop: "1px solid var(--border-subtle)",
              background: "var(--surface-card)",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder={mode === "human" ? "Message the Bevora team…" : "Ask about our services…"}
              style={{
                flex: 1,
                resize: "none",
                maxHeight: 120,
                padding: "10px 12px",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--text-primary)",
                background: "var(--surface-card)",
                outline: "none",
              }}
            />
            <button
              aria-label="Send message"
              onClick={send}
              disabled={sending || !input.trim()}
              style={{
                flex: "0 0 auto",
                width: 40,
                height: 40,
                borderRadius: "var(--radius-md)",
                border: "none",
                background: "var(--accent)",
                color: "var(--text-on-gold)",
                cursor: sending || !input.trim() ? "not-allowed" : "pointer",
                opacity: sending || !input.trim() ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
