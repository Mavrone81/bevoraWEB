import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/Reveal";
import { getServices, getSiteSettings } from "@/lib/content";
import { iconFor } from "@/lib/icons";
import { JsonLd } from "@/components/JsonLd";
import { servicesSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Managed IT, cloud & migration, cybersecurity, backup & disaster recovery, networking and IT consulting — one partner for everything IT in Singapore.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [services, site] = await Promise.all([getServices(), getSiteSettings()]);
  return (
    <>
      <JsonLd
        data={[
          servicesSchema(site, services),
          breadcrumbSchema(site, [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <PageHero
        kicker="What we do"
        title="One partner for everything IT"
        subtitle="From the help desk to the data centre, we run the technology so your team can run the business. Here's how we help."
      />

      <section className="bv-section">
        <div style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)", display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
          {services.map((s, i) => {
            const Icon = iconFor(s.icon);
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.slug}>
                <article
                  id={s.slug}
                  className="bv-grid-2"
                  style={{
                    scrollMarginTop: 100,
                    alignItems: "center",
                    background: "var(--surface-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-xl)",
                    boxShadow: "var(--shadow-sm)",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "var(--space-10)", order: flip ? 2 : 1 }}>
                    <span
                      style={{
                        width: 56,
                        height: 56,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "var(--radius-md)",
                        color: "var(--gold-700)",
                        background: "var(--gold-50)",
                        border: "1px solid var(--gold-200)",
                      }}
                    >
                      <Icon size={26} />
                    </span>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 800, letterSpacing: "-0.015em", color: "var(--text-primary)", margin: "18px 0 0" }}>
                      {s.title}
                    </h2>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "var(--text-secondary)", margin: "12px 0 0" }}>
                      {s.detail}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
                      {s.features.map((f) => (
                        <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--text-primary)" }}>
                          <Check size={17} style={{ color: "var(--gold-600)", flex: "0 0 17px", marginTop: 2 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    style={{
                      order: flip ? 1 : 2,
                      minHeight: 280,
                      height: "100%",
                      background: i % 3 === 0 ? "var(--grad-graphite)" : i % 3 === 1 ? "var(--grad-ink)" : "var(--grad-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                    <Icon size={92} style={{ color: "rgba(255,255,255,.92)", position: "relative", strokeWidth: 1.25 }} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBand title="Not sure which you need?" subtitle="Tell us what's slowing your team down. We'll recommend the right mix — and only what you actually need." ctaLabel="Talk to an engineer" />
    </>
  );
}
