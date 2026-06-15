export function PageHero({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return (
    <section style={{ position: "relative", background: "var(--grad-graphite)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "26px 26px", opacity: 0.6 }} />
      <div style={{ position: "absolute", top: -140, right: -60, width: 420, height: 420, background: "var(--grad-gold)", filter: "blur(120px)", opacity: 0.22, borderRadius: "50%" }} />
      <div style={{ position: "relative", maxWidth: "var(--container-md)", margin: "0 auto", padding: "clamp(3.5rem,7vw,5.5rem) var(--gutter)", textAlign: "center" }}>
        <span className="bv-kicker" style={{ color: "var(--gold-300)", justifyContent: "center" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-400)" }} />
          {kicker}
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem,5vw,3.6rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "#fff", margin: "16px 0 0" }}>
          {title}
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "rgba(255,255,255,.72)", margin: "18px auto 0", maxWidth: "52ch" }}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
