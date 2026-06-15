/* Bevora website — Contact CTA + Footer. */
const { Input, Textarea, Select, Button, Alert } = window.BevoraDesignSystem_cc741a;

function Contact() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", company: "", service: "Managed IT support", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <section id="contact" style={{ padding: "var(--section-y) 0", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 56, alignItems: "start" }} className="bv-contact-grid">
        <div>
          <span className="bv-kicker"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />Get started</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-3xl)", letterSpacing: "-0.015em", lineHeight: 1.1, color: "var(--text-primary)", margin: "12px 0 0" }}>Let's talk about your IT</h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.6, color: "var(--text-secondary)", margin: "16px 0 0", maxWidth: "40ch" }}>Book a free 30-minute assessment. We'll review your setup and show you exactly where it can be safer, faster and cheaper to run.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
            {[["phone", "+65 6123 4567"], ["mail", "hello@bevorasg.com"], ["map-pin", "71 Robinson Road, Singapore"]].map(([ic, tx]) => (
              <div key={tx} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-secondary)" }}>
                <span style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--gold-700)" }}><i data-lucide={ic} style={{ width: 18, height: 18 }} /></span>
                {tx}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)", padding: "var(--space-8)" }}>
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "12px 0" }}>
              <Alert tone="success" title="Thanks — we'll be in touch">An engineer will reply within one business day to schedule your assessment.</Alert>
              <Button variant="secondary" onClick={() => setSent(false)}>Send another message</Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Input label="Name" placeholder="Your name" value={form.name} onChange={set("name")} required />
                <Input label="Work email" placeholder="you@company.com" value={form.email} onChange={set("email")} iconLeft={<i data-lucide="mail" style={{ width: 16, height: 16 }} />} required />
              </div>
              <Input label="Company" placeholder="Company name" value={form.company} onChange={set("company")} />
              <Select label="What can we help with?" value={form.service} onChange={set("service")}
                options={["Managed IT support", "Cloud & migration", "Cybersecurity", "Backup & disaster recovery", "Network & infrastructure", "Something else"]} />
              <Textarea label="Tell us a little more" rows={3} placeholder="A sentence or two about your setup…" value={form.message} onChange={set("message")} />
              <Button type="submit" variant="accent" size="lg" fullWidth iconRight={<i data-lucide="arrow-right" style={{ width: 18, height: 18 }} />}>Request my free assessment</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ["Services", ["Managed IT", "Cloud & migration", "Cybersecurity", "Backup & DR", "Networking"]],
    ["Company", ["About", "Why Bevora", "Careers", "Case studies", "Contact"]],
    ["Resources", ["IT health check", "Security guide", "Pricing", "Support portal"]],
  ];
  return (
    <footer style={{ background: "#222327", color: "rgba(255,255,255,.7)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "var(--space-16) var(--gutter) var(--space-8)", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }} className="bv-footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="../../assets/bevora-mark.png" alt="Bevora" style={{ width: 40, height: 40, borderRadius: 9 }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#fff" }}>Bevora</span>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, marginTop: 16, maxWidth: "32ch", color: "rgba(255,255,255,.55)" }}>The IT partner that keeps Singapore's growing teams running — quietly, reliably, around the clock.</p>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold-300)", marginBottom: 14 }}>{h}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((i) => <a key={i} href="#" style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,.62)", textDecoration: "none" }}>{i}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "20px var(--gutter)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,.45)" }}>
          <span>© 2026 Bevora · BevoraSG.com</span>
          <span style={{ display: "flex", gap: 20 }}><a href="#" style={{ color: "inherit" }}>Privacy</a><a href="#" style={{ color: "inherit" }}>Terms</a><a href="#" style={{ color: "inherit" }}>Status</a></span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Contact, Footer });
