import React from "react";

/** Text field with optional label, hint, error, and leading icon. */
export function Input({ label, hint, error, iconLeft, id, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const borderColor = error ? "var(--danger-500)" : focus ? "var(--accent)" : "var(--border-default)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && <label htmlFor={inputId} style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13.5, color: "var(--text-primary)" }}>{label}</label>}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        height: 46, padding: "0 14px",
        background: "var(--surface-card)",
        border: `1.5px solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        boxShadow: focus ? "var(--ring)" : "none",
        transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      }}>
        {iconLeft && <span style={{ display: "inline-flex", color: "var(--text-tertiary)" }}>{iconLeft}</span>}
        <input
          id={inputId}
          onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
          {...rest}
          style={{
            flex: 1, border: 0, outline: 0, background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-primary)",
          }}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: error ? "var(--danger-500)" : "var(--text-tertiary)" }}>{error || hint}</span>
      )}
    </div>
  );
}
