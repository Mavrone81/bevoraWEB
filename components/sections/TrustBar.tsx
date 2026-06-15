const names = ["Meridian Group", "Sapphire Health", "Northwind Logistics", "Orchard Retail", "Vantage Legal"];

export function TrustBar() {
  return (
    <div style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-card)" }}>
      <div
        style={{
          maxWidth: "var(--container-lg)",
          margin: "0 auto",
          padding: "26px var(--gutter)",
          display: "flex",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>
          Trusted by teams across Singapore
        </span>
        <div style={{ display: "flex", gap: 30, flexWrap: "wrap", justifyContent: "center" }}>
          {names.map((n) => (
            <span key={n} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--neutral-300)", letterSpacing: "-0.01em" }}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
