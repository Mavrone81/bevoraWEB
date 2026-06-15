import React from "react";

/**
 * Feature/service tile: gold icon chip, title, description, optional link.
 * Pass a Lucide glyph name to `icon` (renders <i data-lucide>) or any node.
 */
export function ServiceCard({ icon, title, children, href, linkLabel = "Learn more", style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const glyph = typeof icon === "string" ? <i data-lucide={icon} style={{ width: 24, height: 24 }} /> : icon;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", display: "flex", flexDirection: "column", gap: 14,
        padding: "var(--space-6)", background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)",
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      <span style={{
        width: 52, height: 52, display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-md)", color: "var(--gold-700)",
        background: "var(--gold-50)", border: "1px solid var(--gold-200)",
      }}>{glyph}</span>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{title}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55, color: "var(--text-secondary)" }}>{children}</p>
      {href && (
        <a href={href} style={{
          marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
          color: "var(--text-brand)", textDecoration: "none",
        }}>
          {linkLabel}
          <span style={{ transform: hover ? "translateX(3px)" : "none", transition: "transform var(--dur-base) var(--ease-out)" }}>→</span>
        </a>
      )}
    </div>
  );
}
