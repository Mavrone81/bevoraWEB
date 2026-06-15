import React from "react";

/** Multi-line text field with label/hint/error. */
export function Textarea({ label, hint, error, id, rows = 4, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const tid = id || React.useId();
  const borderColor = error ? "var(--danger-500)" : focus ? "var(--accent)" : "var(--border-default)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && <label htmlFor={tid} style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13.5, color: "var(--text-primary)" }}>{label}</label>}
      <textarea
        id={tid}
        rows={rows}
        onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
        {...rest}
        style={{
          resize: "vertical", padding: "12px 14px",
          background: "var(--surface-card)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focus ? "var(--ring)" : "none", outline: 0,
          fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.5, color: "var(--text-primary)",
          transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        }}
      />
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: error ? "var(--danger-500)" : "var(--text-tertiary)" }}>{error || hint}</span>
      )}
    </div>
  );
}
