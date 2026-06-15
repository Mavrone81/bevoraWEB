"use client";

import React from "react";
import { MessageCircle, X, ArrowUp } from "lucide-react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hi! I'm the Bevora assistant. Ask me about our managed IT, cloud, cybersecurity, or backup services — or how we could help your business.";

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [sending, setSending] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // Keep the transcript pinned to the latest message.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    // Add an empty assistant slot we'll stream into.
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Don't send the greeting — it's UI-only, not part of the real conversation.
        body: JSON.stringify({ messages: next.filter((m, i) => !(i === 0 && m.role === "assistant")) }),
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
          : "Sorry — I couldn't reach the assistant. Please email hello@bevorasg.com.";
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
        {open ? <X size={24} /> : <MessageCircle size={24} />}
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
            }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>
              Bevora assistant
            </div>
            <div style={{ fontSize: 12.5, opacity: 0.7, marginTop: 2 }}>
              IT services that just work
            </div>
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
              const pending = sending && i === messages.length - 1 && m.content === "";
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    maxWidth: "85%",
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
              placeholder="Ask about our services…"
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
