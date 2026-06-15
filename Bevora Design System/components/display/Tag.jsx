import React from "react";

/** Removable keyword tag/chip. onRemove shows an × affordance. */
export function Tag({ children, onRemove, style = {}, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 28,
        padding: onRemove ? "0 6px 0 12px" : "0 12px",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 13,
        color: "var(--text-secondary)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-pill)",
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={onRemove}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 18, height: 18, padding: 0, border: 0, cursor: "pointer",
            borderRadius: "var(--radius-circle)", background: "var(--neutral-100)",
            color: "var(--text-tertiary)", fontSize: 13, lineHeight: 1,
          }}
        >×</button>
      )}
    </span>
  );
}
