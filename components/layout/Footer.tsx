import Link from "next/link";
import Image from "next/image";
import { getSiteSettings, getServices } from "@/lib/content";
import { whatsappNumber } from "@/cms/seed-data";

export async function Footer() {
  const [site, services] = await Promise.all([getSiteSettings(), getServices()]);
  const waDigits = whatsappNumber.replace(/[^0-9]/g, "");
  const cols: { heading: string; items: { label: string; href: string }[] }[] = [
    {
      heading: "Services",
      items: services.slice(0, 5).map((s) => ({ label: s.title, href: `/services#${s.slug}` })),
    },
    {
      heading: "Company",
      items: [
        { label: "Why Bevora", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Case studies", href: "/case-studies" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Get started",
      items: [
        { label: "Free assessment", href: "/contact" },
        { label: `Email ${site.email}`, href: `mailto:${site.email}` },
        { label: `Call ${site.phone}`, href: `tel:${site.phone.replace(/\s/g, "")}` },
        { label: `WhatsApp ${whatsappNumber}`, href: `https://wa.me/${waDigits}` },
      ],
    },
  ];
  return (
    <footer style={{ background: "#222327", color: "rgba(255,255,255,.7)" }}>
      <div className="bv-footer-grid" style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "var(--space-16) var(--gutter) var(--space-8)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image src="/assets/bevora-mark.svg" alt="" width={40} height={40} style={{ borderRadius: 9 }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#fff" }}>{site.name}</span>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, marginTop: 16, maxWidth: "32ch", color: "rgba(255,255,255,.55)" }}>
            The IT partner that keeps Singapore&apos;s growing teams running — quietly, reliably, around the clock.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.heading}>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold-300)", marginBottom: 14 }}>
              {col.heading}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.items.map((i) => (
                <Link key={i.label} href={i.href} style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,.62)", textDecoration: "none" }}>
                  {i.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div
          style={{
            maxWidth: "var(--container-lg)",
            margin: "0 auto",
            padding: "20px var(--gutter)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "rgba(255,255,255,.45)",
          }}
        >
          <span>© {new Date().getFullYear()} {site.name} · {site.domain}</span>
          <span style={{ display: "flex", gap: 20 }}>
            <Link href="/contact" style={{ color: "inherit" }}>Privacy</Link>
            <Link href="/contact" style={{ color: "inherit" }}>Terms</Link>
            <Link href="/contact" style={{ color: "inherit" }}>Status</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
