import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export interface FaqItem {
  q: string;
  a: string;
}

// Accessible FAQ accordion built on native <details>/<summary> — no client JS.
// The same `items` should feed faqSchema() so the visible copy matches the
// FAQPage structured data (a Google requirement for FAQ rich results).
export function Faq({
  items,
  kicker = "FAQ",
  title = "Questions, answered",
  subtitle,
}: {
  items: FaqItem[];
  kicker?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bv-section" style={{ background: "var(--surface-card)" }}>
      <div style={{ maxWidth: "var(--container-md)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <SectionHeading kicker={kicker} title={title} subtitle={subtitle} align="center" style={{ marginBottom: 36 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item) => (
            <details
              key={item.q}
              style={{
                background: "var(--bg-page)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-5) var(--space-6)",
              }}
            >
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  cursor: "pointer",
                  listStyle: "none",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-lg)",
                  color: "var(--text-primary)",
                }}
              >
                {item.q}
                <Plus size={18} style={{ flexShrink: 0, color: "var(--gold-600)" }} aria-hidden />
              </summary>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-md)",
                  lineHeight: 1.65,
                  color: "var(--text-secondary)",
                  margin: "14px 0 0",
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
