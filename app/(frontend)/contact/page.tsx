import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute IT assessment with Bevora. Tell us about your setup and we'll show you where it can be safer, faster and cheaper to run.",
};

export default async function ContactPage() {
  const site = await getSiteSettings();
  const contactRows = [
    { icon: Phone, text: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: Mail, text: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, text: site.address, href: undefined },
  ];
  return (
    <section className="bv-section" style={{ background: "var(--bg-page)" }}>
      <div className="bv-grid-2 bv-contact-grid" style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "0 var(--gutter)", alignItems: "start" }}>
        <div>
          <span className="bv-kicker">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
            Get started
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-4xl)", letterSpacing: "-0.02em", lineHeight: 1.08, color: "var(--text-primary)", margin: "12px 0 0" }}>
            Let&apos;s talk about your IT
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "var(--text-secondary)", margin: "16px 0 0", maxWidth: "42ch" }}>
            Book a free 30-minute assessment. We&apos;ll review your setup and show you exactly where it can be safer, faster
            and cheaper to run.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
            {contactRows.map(({ icon: Icon, text, href }) => {
              const inner = (
                <>
                  <span style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--gold-700)" }}>
                    <Icon size={18} />
                  </span>
                  {text}
                </>
              );
              const style: React.CSSProperties = { display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-secondary)" };
              return href ? (
                <a key={text} href={href} style={{ ...style, textDecoration: "none" }}>
                  {inner}
                </a>
              ) : (
                <div key={text} style={style}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)", padding: "var(--space-8)" }}>
          <ContactForm serviceOptions={site.serviceOptions} />
        </div>
      </div>
    </section>
  );
}
