import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Why Bevora",
  description:
    "Bevora is the dependable IT partner for growing Singapore teams — fixed pricing, a named engineer, security built in, and on-site support when you need it.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Dependable", body: "We show up, we follow through, and we keep things running. Reliability is the product." },
  { title: "Plain-spoken", body: "No jargon, no upsell. We explain what's happening and what we'd do, in clear terms." },
  { title: "Quietly premium", body: "The best IT is the kind you never think about. We aim to be invisible — in the good way." },
];

export default async function AboutPage() {
  const { whyPoints } = await getSiteSettings();
  return (
    <>
      <PageHero
        kicker="Why Bevora"
        title="The IT partner that just shows up"
        subtitle="We earn trust the boring way: by being there, being clear, and keeping your systems running — quietly, around the clock."
      />

      {/* Story + mascot */}
      <section className="bv-section" style={{ background: "var(--surface-card)" }}>
        <div className="bv-grid-2" style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)", alignItems: "center" }}>
          <div>
            <SectionHeading
              kicker="Our approach"
              title="Senior engineers, on your side of the table"
              subtitle="Bevora started with a simple idea: most businesses don't want to think about IT — they just want it to work."
            />
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-md)", lineHeight: 1.7, color: "var(--text-secondary)", marginTop: 18 }}>
              So we built the partner we&apos;d want ourselves. A named engineer who knows your setup. Fixed monthly pricing
              with no surprises. Monitoring, patching and backups included as standard. And the kind of response time that
              means a problem is fixed before it spreads.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-md)", lineHeight: 1.7, color: "var(--text-secondary)", marginTop: 14 }}>
              Today we keep teams across Singapore online — from clinics to law firms to logistics — with the same promise:
              technology that gets out of your way.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ background: "var(--grad-gold)", borderRadius: "var(--radius-2xl)", padding: 2, boxShadow: "var(--shadow-lg)" }}>
              <div style={{ background: "var(--surface-graphite)", borderRadius: "calc(var(--radius-2xl) - 2px)", padding: "var(--space-12)", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, textAlign: "center" }}>
                <Image src="/assets/bevora-mascot.svg" alt="Bevora beaver mascot" width={148} height={148} />
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#fff" }}>Industrious by nature</div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.7)", maxWidth: "34ch" }}>
                  Our beaver mascot says it best: build things that last, and keep them in good repair. That&apos;s the whole job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises / why points */}
      <section className="bv-section" style={{ background: "var(--bg-page)" }}>
        <div style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <SectionHeading kicker="What you get" title="Promises we actually keep" align="center" />
          <div className="bv-grid-2" style={{ marginTop: 48 }}>
            {whyPoints.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 80}>
                <div style={{ display: "flex", gap: 16, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "var(--space-6)", height: "100%" }}>
                  <span style={{ flex: "0 0 36px", width: 36, height: 36, borderRadius: "var(--radius-circle)", background: "var(--gold-50)", border: "1px solid var(--gold-200)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--gold-700)" }}>
                    <Check size={18} />
                  </span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-lg)", color: "var(--text-primary)" }}>{p.title}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)", marginTop: 4 }}>{p.detail}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      {/* Values */}
      <section className="bv-section" style={{ background: "var(--surface-card)" }}>
        <div style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)" }}>
          <SectionHeading kicker="How we work" title="The values behind the service" align="center" />
          <div className="bv-grid-3" style={{ marginTop: 48 }}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 80}>
                <div style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", height: "100%" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--gold-600)", fontWeight: 600 }}>0{i + 1}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-xl)", color: "var(--text-primary)", marginTop: 8 }}>{v.title}</div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)", marginTop: 8 }}>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
