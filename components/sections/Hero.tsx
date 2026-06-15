"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusPanel } from "./StatusPanel";

const heroStats: [string, string][] = [
  ["200+", "Clients across SG"],
  ["24/7", "Monitoring & support"],
  ["10 yrs", "Keeping teams online"],
];

export function Hero() {
  const router = useRouter();
  return (
    <section style={{ position: "relative", background: "var(--grad-graphite)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "26px 26px", opacity: 0.6 }} />
      <div style={{ position: "absolute", top: -120, right: -80, width: 460, height: 460, background: "var(--grad-gold)", filter: "blur(120px)", opacity: 0.28, borderRadius: "50%" }} />
      <div
        className="bv-grid-2 bv-hero-grid"
        style={{ position: "relative", maxWidth: "var(--container-lg)", margin: "0 auto", padding: "clamp(3.5rem,7vw,6rem) var(--gutter)", alignItems: "center" }}
      >
        <div>
          <span className="bv-kicker" style={{ color: "var(--gold-300)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-400)" }} />
            IT Services · Singapore
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.6rem,5.4vw,4.4rem)", lineHeight: 1.04, letterSpacing: "-0.025em", color: "#fff", margin: "18px 0 0" }}>
            Systems that
            <br />
            just <span style={{ background: "var(--grad-gold-soft)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>work.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "rgba(255,255,255,.72)", margin: "22px 0 0", maxWidth: "46ch" }}>
            Bevora is the IT partner that keeps your business running — managed support, cloud, and security, watched around the clock so you never have to think about it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32 }}>
            <Button variant="accent" size="lg" iconRight={<ArrowRight size={18} />} onClick={() => router.push("/contact")}>
              Book a consultation
            </Button>
            <Button
              size="lg"
              variant="secondary"
              style={{ background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.2)", color: "#fff" }}
              iconLeft={<Play size={16} />}
              onClick={() => router.push("/services")}
            >
              See our services
            </Button>
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
            {heroStats.map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 22, color: "var(--gold-300)" }}>{v}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,.55)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <StatusPanel />
      </div>
    </section>
  );
}
