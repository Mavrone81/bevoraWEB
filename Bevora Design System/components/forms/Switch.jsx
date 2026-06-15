import React from "react";

/** Toggle switch. Controlled via checked/onChange. */
export function Switch({ checked = false, onChange, label, disabled = false, id, style = {}, ...rest }) {
  const sid = id || React.useId();
  return (
    <label htmlFor={sid} style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <span style={{
        position: "relative", width: 42, height: 24, flex: "0 0 42px",
        borderRadius: "var(--radius-pill)",
        background: checked ? "var(--accent)" : "var(--neutral-300)",
        transition: "background var(--dur-base) var(--ease-out)",
      }}>
        <span style={{
          position: "absolute", top: 3, left: checked ? 21 : 3,
          width: 18, height: 18, borderRadius: "50%", background: "#fff",
          boxShadow: "var(--shadow-sm)",
          transition: "left var(--dur-base) var(--ease-spring)",
        }} />
      </span>
      <input id={sid} type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled} {...rest}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--text-primary)" }}>{label}</span>}
    </label>
  );
}
