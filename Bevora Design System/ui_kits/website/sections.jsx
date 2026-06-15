/* Bevora website — Trust, Services, Stats, Why. */
const { SectionHeading, ServiceCard, Stat } = window.BevoraDesignSystem_cc741a;

function TrustBar() {
  const names = ["Meridian Group", "Sapphire Health", "Northwind Logistics", "Orchard Retail", "Vantage Legal"];
  return (
    <div style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "26px var(--gutter)", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>Trusted by teams across Singapore</span>
        <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
          {names.map((n) => <span key={n} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--neutral-300)", letterSpacing: "-0.01em" }}>{n}</span>)}
        </div>
      </div>
    </div>
  );
}

function Services() {
  const items = [
    ["life-buoy", "Managed IT support", "A responsive help desk and on-site team that fixes issues — often before you notice them."],
    ["cloud", "Cloud & migration", "Move to Microsoft 365 and Azure with zero downtime and a plan that fits your budget."],
    ["shield-check", "Cybersecurity", "Endpoint hardening, real-time threat monitoring and a rapid response when it matters."],
    ["database-backup", "Backup & disaster recovery", "Automated, tested backups so a bad day never becomes a lost week."],
    ["network", "Network & infrastructure", "Design, install and maintain the wired and wireless backbone your office runs on."],
    ["cpu", "IT consulting", "Senior engineers who plan your roadmap and right-size every investment."],
  ];
  return (
    <section id="services" style={{ padding: "var(--section-y) 0", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 var(--gutter)" }}>
        <SectionHeading kicker="What we do" title="One partner for everything IT" subtitle="From the help desk to the data centre, Bevora runs the technology so your team can run the business." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 48 }} className="bv-svc-grid">
          {items.map(([icon, title, body]) => (
            <ServiceCard key={title} icon={icon} title={title} href="#" linkLabel="Learn more">{body}</ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [["99.98%", "Uptime", "Across managed infrastructure"], ["<15min", "Response", "Average ticket first-response"], ["200+", "Clients", "Served across Singapore"], ["24/7", "Coverage", "Monitoring, every day"]];
  return (
    <section style={{ background: "var(--grad-graphite)", padding: "var(--section-y) 0" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }} className="bv-stats-grid">
        {stats.map(([v, l, c]) => (
          <div key={l} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "clamp(2.2rem,4vw,3rem)", lineHeight: 1, letterSpacing: "-0.02em", color: "#fff" }}>{v}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13, letterSpacing: ".09em", textTransform: "uppercase", color: "var(--gold-300)" }}>{l}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "rgba(255,255,255,.55)" }}>{c}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyBevora() {
  const points = [
    ["Fixed monthly pricing", "No surprise invoices — one predictable fee that covers your whole stack."],
    ["A team that knows you", "A named engineer who understands your setup, not a different voice every call."],
    ["Security built in", "Every plan includes monitoring, patching and backups as standard."],
    ["Singapore-based, on-site ready", "Remote-first support backed by engineers who can be at your door."],
  ];
  return (
    <section id="whybevora" style={{ padding: "var(--section-y) 0", background: "var(--surface-card)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 56, alignItems: "center" }} className="bv-why-grid">
        <div>
          <SectionHeading kicker="Why Bevora" title="The dependable choice for growing teams" subtitle="We earn trust the boring way: by being there, being clear, and keeping things running." />
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 32 }}>
            {points.map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: 14 }}>
                <span style={{ flex: "0 0 28px", width: 28, height: 28, borderRadius: "var(--radius-circle)", background: "var(--gold-50)", border: "1px solid var(--gold-200)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--gold-700)" }}>
                  <i data-lucide="check" style={{ width: 16, height: 16 }} />
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>{t}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55, color: "var(--text-secondary)", marginTop: 2 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ background: "var(--grad-gold)", borderRadius: "var(--radius-2xl)", padding: 2, boxShadow: "var(--shadow-lg)" }}>
            <div style={{ background: "var(--surface-graphite)", borderRadius: "calc(var(--radius-2xl) - 2px)", padding: "var(--space-10)", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, textAlign: "center" }}>
              <img src="../../assets/bevora-mascot.svg" alt="Bevora beaver mascot" style={{ width: 132, height: 132 }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#fff" }}>Industrious by nature</div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.7)", maxWidth: "34ch" }}>Like our mascot, we build things that last and keep them in good repair. That's the whole job.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TrustBar, Services, StatsBand, WhyBevora });
