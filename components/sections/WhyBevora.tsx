import Image from "next/image";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { getSiteSettings } from "@/lib/content";

export async function WhyBevora() {
  const { whyPoints } = await getSiteSettings();
  return (
    <section id="why" style={{ padding: "var(--section-y) 0", background: "var(--surface-card)" }}>
      <div className="bv-grid-2 bv-why-grid" style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)", alignItems: "center" }}>
        <div>
          <SectionHeading
            kicker="Why Bevora"
            title="The dependable choice for growing teams"
            subtitle="We earn trust the boring way: by being there, being clear, and keeping things running."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 32 }}>
            {whyPoints.map((p) => (
              <div key={p.title} style={{ display: "flex", gap: 14 }}>
                <span
                  style={{
                    flex: "0 0 28px",
                    width: 28,
                    height: 28,
                    borderRadius: "var(--radius-circle)",
                    background: "var(--gold-50)",
                    border: "1px solid var(--gold-200)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold-700)",
                  }}
                >
                  <Check size={16} />
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>{p.title}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55, color: "var(--text-secondary)", marginTop: 2 }}>{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ background: "var(--grad-gold)", borderRadius: "var(--radius-2xl)", padding: 2, boxShadow: "var(--shadow-lg)" }}>
            <div
              style={{
                background: "var(--surface-graphite)",
                borderRadius: "calc(var(--radius-2xl) - 2px)",
                padding: "var(--space-10)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
                textAlign: "center",
              }}
            >
              <Image src="/assets/bevora-mascot.svg" alt="Bevora beaver mascot" width={132} height={132} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#fff" }}>Industrious by nature</div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.7)", maxWidth: "34ch" }}>
                Like our mascot, we build things that last and keep them in good repair. That&apos;s the whole job.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
