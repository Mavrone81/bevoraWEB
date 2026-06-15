import React from "react";

/** Checkbox with label. Controlled via checked/onChange. */
export function Checkbox({ label, checked = false, onChange, id, disabled = false, style = {}, ...rest }) {
  const cid = id || React.useId();
  return (
    <label htmlFor={cid} style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <span style={{
        width: 20, height: 20, flex: "0 0 20px",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-xs)",
        border: `1.5px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
        background: checked ? "var(--accent)" : "var(--surface-card)",
        color: "var(--text-on-gold)", fontSize: 13, fontWeight: 800, lineHeight: 1,
        transition: "all var(--dur-fast) var(--ease-out)",
      }}>{checked ? "✓" : ""}</span>
      <input id={cid} type="checkbox" checked={checked} onChange={onChange} disabled={disabled} {...rest}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--text-primary)" }}>{label}</span>}
    </label>
  );
}
