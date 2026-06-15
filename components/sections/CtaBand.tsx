"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CtaBand({
  title = "Ready to stop worrying about IT?",
  subtitle = "Book a free 30-minute assessment. We'll show you exactly where your setup can be safer, faster and cheaper to run.",
  ctaLabel = "Get a free assessment",
  ctaHref = "/contact",
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const router = useRouter();
  return (
    <section style={{ background: "var(--grad-gold)", padding: "clamp(3rem,6vw,5rem) 0" }}>
      <div style={{ maxWidth: "var(--container-md)", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-3xl)", color: "var(--neutral-950)", letterSpacing: "-0.015em", lineHeight: 1.1 }}>
          {title}
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "rgba(15,14,13,.78)", margin: "16px auto 0", maxWidth: "48ch" }}>
          {subtitle}
        </p>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
          <Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />} onClick={() => router.push(ctaHref)}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
