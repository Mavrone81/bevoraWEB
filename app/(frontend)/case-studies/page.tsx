import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/Reveal";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case studies",
  description: "How Bevora keeps Singapore teams running — real client projects and the outcomes they delivered.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <>
      <PageHero
        kicker="Proof"
        title="Case studies"
        subtitle="Real projects, real outcomes. Here's how we've helped teams across Singapore run safer, faster and with fewer surprises."
      />

      <section className="bv-section">
        <div style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          {studies.length === 0 ? (
            <p style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", color: "var(--text-secondary)" }}>
              Case studies are on the way — check back soon.
            </p>
          ) : (
            <div className="bv-grid-2">
              {studies.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 2) * 80} style={{ display: "flex" }}>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      background: "var(--surface-card)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-xl)",
                      boxShadow: "var(--shadow-sm)",
                      overflow: "hidden",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        height: 196,
                        background: c.image?.url ? `center / cover no-repeat url(${c.image.url})` : "var(--grad-gold)",
                      }}
                    />
                    <div style={{ padding: "var(--space-8)", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                      {c.client && (
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--gold-600)", textTransform: "uppercase", letterSpacing: ".08em" }}>{c.client}</span>
                      )}
                      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-2xl)", color: "var(--text-primary)", letterSpacing: "-0.015em" }}>
                        {c.title}
                      </h2>
                      {c.summary && (
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)" }}>{c.summary}</p>
                      )}
                      {c.results.length > 0 && (
                        <div style={{ display: "flex", gap: 24, marginTop: 6, flexWrap: "wrap" }}>
                          {c.results.slice(0, 3).map((r) => (
                            <div key={r.label}>
                              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "var(--text-xl)", color: "var(--text-primary)" }}>{r.value}</div>
                              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--text-secondary)" }}>{r.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text-brand)" }}>
                        Read the story <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
