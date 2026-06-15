import React from "react";

/** Styled native select with label/hint. options: [{value,label}] or strings. */
export function Select({ label, hint, options = [], id, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const sid = id || React.useId();
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && <label htmlFor={sid} style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13.5, color: "var(--text-primary)" }}>{label}</label>}
      <div style={{ position: "relative" }}>
        <select
          id={sid}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...rest}
          style={{
            width: "100%", height: 46, padding: "0 38px 0 14px",
            appearance: "none", WebkitAppearance: "none",
            background: "var(--surface-card)",
            border: `1.5px solid ${focus ? "var(--accent)" : "var(--border-default)"}`,
            borderRadius: "var(--radius-md)",
            boxShadow: focus ? "var(--ring)" : "none", outline: 0,
            fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-primary)", cursor: "pointer",
            transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
          }}
        >
          {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span aria-hidden="true" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-tertiary)", fontSize: 12 }}>▾</span>
      </div>
      {hint && <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--text-tertiary)" }}>{hint}</span>}
    </div>
  );
}
