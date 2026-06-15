import { Badge } from "@/components/ui/Badge";

const rows: [string, string, "success" | "warning"][] = [
  ["Microsoft 365", "Operational", "success"],
  ["Azure Cloud", "Operational", "success"],
  ["Endpoint security", "Operational", "success"],
  ["Backup & DR", "Syncing", "warning"],
  ["Network", "Operational", "success"],
];

export function StatusPanel() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "var(--shadow-xl)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold-300)" }}>
          Live monitoring
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,.7)" }}>
          <span className="bv-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success-500)", boxShadow: "0 0 0 4px rgba(46,125,87,.25)" }} />
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
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 26, color: "#fff" }}>99.98%</div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,.55)" }}>Uptime · 12 mo</div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 26, color: "#fff" }}>
            &lt;15<span style={{ fontSize: 15, color: "var(--gold-300)" }}>min</span>
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,.55)" }}>Avg response</div>
        </div>
      </div>
    </div>
  );
}
