import React from "react";

/** Headline metric block. value in mono gold; label + optional caption below. */
export function Stat({ value, label, caption, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, ...style }} {...rest}>
      <div style={{
        fontFamily: "var(--font-mono)", fontWeight: 600,
        fontSize: "var(--text-4xl)", lineHeight: 1, letterSpacing: "-0.02em",
        color: "var(--text-primary)",
      }}>{value}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, color: "var(--text-brand)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
      {caption && <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-tertiary)" }}>{caption}</div>}
    </div>
  );
}
