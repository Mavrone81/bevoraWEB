import React from "react";

/** Kicker + heading + optional subtitle block. align left | center. */
export function SectionHeading({ kicker, title, subtitle, align = "left", style = {}, ...rest }) {
  const centered = align === "center";
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 12,
      alignItems: centered ? "center" : "flex-start",
      textAlign: centered ? "center" : "left",
      maxWidth: centered ? 640 : "none", margin: centered ? "0 auto" : 0,
      ...style,
    }} {...rest}>
      {kicker && (
        <span className="bv-kicker">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
          {kicker}
        </span>
      )}
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: 800, letterSpacing: "-0.015em", lineHeight: 1.1, color: "var(--text-primary)" }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.55, color: "var(--text-secondary)" }}>{subtitle}</p>}
    </div>
  );
}
