import { getSiteSettings } from "@/lib/content";

export async function StatsBand() {
  const { proofStats } = await getSiteSettings();
  return (
    <section style={{ background: "var(--grad-graphite)", padding: "var(--section-y) 0" }}>
      <div className="bv-grid-4" style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        {proofStats.map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "clamp(2.2rem,4vw,3rem)", lineHeight: 1, letterSpacing: "-0.02em", color: "#fff" }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13, letterSpacing: ".09em", textTransform: "uppercase", color: "var(--gold-300)" }}>
              {s.label}
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "rgba(255,255,255,.55)" }}>{s.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
