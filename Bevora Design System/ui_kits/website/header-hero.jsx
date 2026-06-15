/* Bevora website — Header + Hero. Registers on window for app.jsx. */
const { Button, IconButton, Badge } = window.BevoraDesignSystem_cc741a;

function Logo({ dark = false }) {
  return (
    <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
      <img src="../../assets/bevora-mark.png" alt="Bevora" style={{ width: 40, height: 40, borderRadius: 9 }} />
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", color: dark ? "#fff" : "var(--text-primary)" }}>Bevora</span>
    </a>
  );
}

function Header({ onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector("[data-scroll]") || window;
    const onScroll = () => setScrolled((el.scrollTop || window.scrollY || 0) > 12);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Services", "Why Bevora", "Industries", "Contact"];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,.82)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      transition: "all var(--dur-base) var(--ease-out)",
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "16px var(--gutter)", display: "flex", alignItems: "center", gap: 24 }}>
        <Logo />
        <nav style={{ marginLeft: "auto", display: "flex", gap: 28 }} className="bv-desktop-nav">
          {links.map((l) => (
            <a key={l} href={"#" + l.toLowerCase().replace(/\s/g, "")} onClick={() => onNav?.(l)}
              style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14.5, color: "var(--text-secondary)", textDecoration: "none" }}>{l}</a>
          ))}
        </nav>
        <div className="bv-desktop-nav" style={{ display: "flex" }}>
          <Button variant="accent" size="sm" style={{ whiteSpace: "nowrap" }} iconRight={<i data-lucide="arrow-right" style={{ width: 16, height: 16 }} />}>Free assessment</Button>
        </div>
        <div className="bv-mobile-nav" style={{ marginLeft: "auto" }}>
          <IconButton variant="ghost" aria-label="Menu" onClick={() => setOpen(!open)}>
            <i data-lucide={open ? "x" : "menu"} style={{ width: 22, height: 22 }} />
          </IconButton>
        </div>
      </div>
      {open && (
        <div className="bv-mobile-nav" style={{ padding: "0 var(--gutter) 18px", display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map((l) => <a key={l} href={"#" + l.toLowerCase().replace(/\s/g, "")} onClick={() => setOpen(false)} style={{ padding: "12px 0", fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--border-subtle)" }}>{l}</a>)}
          <div style={{ marginTop: 12 }}><Button variant="accent" fullWidth>Get a free assessment</Button></div>
        </div>
      )}
    </header>
  );
}

function StatusPanel() {
  const rows = [
    ["Microsoft 365", "Operational", "success"],
    ["Azure Cloud", "Operational", "success"],
    ["Endpoint security", "Operational", "success"],
    ["Backup & DR", "Syncing", "warning"],
    ["Network", "Operational", "success"],
  ];
  return (
    <div style={{
      background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.12)",
      borderRadius: "var(--radius-xl)", padding: "var(--space-6)", backdropFilter: "blur(8px)",
      boxShadow: "var(--shadow-xl)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold-300)" }}>Live monitoring</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.7)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success-500)", boxShadow: "0 0 0 4px rgba(46,125,87,.25)" }} className="bv-pulse" />
          All systems
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {rows.map(([name, status, tone]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14.5, color: "rgba(255,255,255,.92)" }}>{name}</span>
            <Badge tone={tone}>{status}</Badge>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18 }}>
        <div><div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 26, color: "#fff" }}>99.98%</div><div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,.55)" }}>Uptime · 12 mo</div></div>
        <div><div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 26, color: "#fff" }}>&lt;15<span style={{ fontSize: 15, color: "var(--gold-300)" }}>min</span></div><div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,.55)" }}>Avg response</div></div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" style={{ position: "relative", background: "var(--grad-graphite)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "26px 26px", opacity: .6 }} />
      <div style={{ position: "absolute", top: -120, right: -80, width: 460, height: 460, background: "var(--grad-gold)", filter: "blur(120px)", opacity: .28, borderRadius: "50%" }} />
      <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "clamp(3.5rem,7vw,6rem) var(--gutter)", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 56, alignItems: "center" }} className="bv-hero-grid">
        <div>
          <span className="bv-kicker" style={{ color: "var(--gold-300)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-400)" }} />IT Services · Singapore
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.6rem,5.4vw,4.4rem)", lineHeight: 1.04, letterSpacing: "-0.025em", color: "#fff", margin: "18px 0 0" }}>
            Systems that<br />just <span style={{ background: "var(--grad-gold-soft)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>work.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "rgba(255,255,255,.72)", margin: "22px 0 0", maxWidth: "46ch" }}>
            Bevora is the IT partner that keeps your business running — managed support, cloud, and security, watched around the clock so you never have to think about it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32 }}>
            <Button variant="accent" size="lg" iconRight={<i data-lucide="arrow-right" style={{ width: 18, height: 18 }} />}>Book a consultation</Button>
            <Button size="lg" variant="secondary" style={{ background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.2)", color: "#fff" }} iconLeft={<i data-lucide="play" style={{ width: 16, height: 16 }} />}>See our services</Button>
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
            {[["200+", "Clients across SG"], ["24/7", "Monitoring & support"], ["10 yrs", "Keeping teams online"]].map(([v, l]) => (
              <div key={l}><div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 22, color: "var(--gold-300)" }}>{v}</div><div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,.55)" }}>{l}</div></div>
            ))}
          </div>
        </div>
        <StatusPanel />
      </div>
    </section>
  );
}

Object.assign(window, { Logo, Header, Hero, StatusPanel });
